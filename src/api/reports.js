import axios from "axios";

const base_URL = "http://localhost:8080";

// const base_URL = "https://ray-calculator.herokuapp.com";

export async function getAllReports() {
  try {
    const response = await axios.get(`${base_URL}/calculate`);
    return response;
  } catch (e) {
    console.error(e);
    return "";
  }
}
export async function createReport(report) {
  try {
    const response = await axios.post(`${base_URL}/calculate`, report, {
      "Content-Type": "application/json",
    });
    return response;
  } catch (e) {
    console.error(e);
  }
}
export async function removeReport(id) {
  try {
    const response = await axios.delete(`${base_URL}/calculate/${id}`);
    return response;
  } catch (e) {
    console.error(e);
  }
}
