import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;


export const adminLogin = async ({ email, password }) => {
  const res = await axios.post(`${API_URL}/v1/auth/login`, { email, password });

  const token = res.data?.data?.token;
  if (token) {
    console.log("Login successful, token received:", token);
    localStorage.setItem("adminToken", token);
    return token;
  } else {
    console.log("Login result:", res.data);
    throw new Error("Login successful but token is missing.");
  }
};

export const createAdmin = async ({ firstName, lastName, phoneNumber, email, password }) => {
  const token = localStorage.getItem("adminToken");
  const res = await axios.post(
    `${API_URL}/v1/auth/create-user`,
    { firstName, lastName, phoneNumber, email, password },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};