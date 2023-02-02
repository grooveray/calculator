import axios from "axios";

const base_URL = "http://localhost:8080";

export async function getAllUsers() {
  try {
    const response = await axios.get(`${base_URL}/auth`);
    return response;
  } catch (e) {
    console.error(e);
    return "";
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
    return response;
  } catch (e) {
    console.error(e);
    return "";
  }
}
