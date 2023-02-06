import axios from "axios";
import { clearToken, getToken, saveToken } from "./token";
import { saveUserInfo } from "./userInfo";

const base_URL = "http://localhost:8080";

export async function getAllUsers() {
  try {
    const token = getToken();
    const response = await axios.get(`${base_URL}/auth`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (e) {
    console.error(e);
    return e.reponse;
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
    console.log(response);
    saveToken(response.data.token);
    saveUserInfo(response);
    return response;
  } catch (e) {
    console.error(e);
    return e.response;
  }
}
export function logoutUser() {
  if (window.confirm("Do you want to log out?")) {
    clearToken();
  }
}
