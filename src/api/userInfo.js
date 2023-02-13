const USER_INFO = "userInfo";

export function saveUserInfo(response) {
  const userInfo = JSON.stringify(response.data);
  localStorage.setItem(USER_INFO, userInfo);
}
export function getUserInfo() {
  const userInfo = localStorage.getItem(USER_INFO);
  if (!userInfo) return { token: "", name: "", email: "", admin: "" };
  return JSON.parse(userInfo);
}
export function clearUserInfo() {
  localStorage.clear(USER_INFO);
}
