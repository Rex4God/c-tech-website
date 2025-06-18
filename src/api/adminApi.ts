import axios from "axios";

const API_URL = "http://localhost:8000/v1/auth"; 

export const adminLogin = async ({ email, password }: { email: string; password: string }) => {
  const res = await axios.post(`${API_URL}/login`, { email, password });
  return res.data;
};

export const createAdmin = async ({ firstName, lastName, phoneNumber, email, password }: { firstName: string; lastName: string; phoneNumber: string; email: string; password: string }) => {
  const token = localStorage.getItem("adminToken");
  const res = await axios.post(
    `${API_URL}/create-user`,
    { firstName, lastName, phoneNumber, email, password },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};