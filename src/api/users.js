import axios from "axios";
import { clearToken, getToken, saveToken } from "./token";
import { clearUserInfo, saveUserInfo } from "./userInfo";

// const base_URL = "http://localhost:8080";
// const client_URL = "http://localhost:3000";

const base_URL = "https://ray-calculator.herokuapp.com";
const client_URL = "https://suwon-minhong.netlify.app";

export async function getAllUsers() {
  try {
    const token = getToken();
    const response = await axios.get(`${base_URL}/auth`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (e) {
    console.error(e);
    clearToken();
    clearUserInfo();
    window.location.replace(`${client_URL}`);
    return alert("올바르지 않은 접근입니다. 다시 로그인해주세요.");
  }
}
export async function signupUser(user) {
  try {
    const response = await axios.post(`${base_URL}/auth/signup`, user);
    saveUserInfo(response);
    return response;
  } catch (e) {
    console.error(e);
    return e.response;
  }
}
export async function loginUser(email, password) {
  try {
    const response = await axios.post(
      `${base_URL}/auth/login`,
      {
        email,
        password,
      },
      { "Content-Type": "application/json" }
    );
    saveToken(response.data.token);
    saveUserInfo(response);
    return response;
  } catch (e) {
    console.error(e);
    return e.response;
  }
}
export async function updateUser(id, filter, value, password) {
  try {
    const token = getToken();
    const response = await axios.put(
      `${base_URL}/auth/${id}`,
      { filter, value, password: password ? password : "" },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (e) {
    console.error(e);
    return e.reponse;
  }
}
export function logoutUser() {
  if (window.confirm("Do you want to log out?")) {
    clearToken();
  }
}
