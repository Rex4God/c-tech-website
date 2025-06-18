import axios from "axios";
import type { BlogType } from "../types/blog";

const API_URL = "http://localhost:8000/v1/blog";

export const getAllBlogs = async (): Promise<BlogType[]> => {
  const res = await axios.get(`${API_URL}`);
  return res.data;
};

export const getBlogById = async (id: string): Promise<BlogType> => {
  if (!id) throw new Error("No blog ID provided");
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

export const createBlog = async (data: FormData) => {
  const token = localStorage.getItem("adminToken");
  const res = await axios.post(`${API_URL}`, data, {
    headers: { 
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const updateBlog = async (id: string, data: FormData) => {
  const token = localStorage.getItem("adminToken");
  if (!id) throw new Error("No blog ID provided");
  const res = await axios.put(`${API_URL}/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const deleteBlog = async (id: string) => {
  const token = localStorage.getItem("adminToken");
  if (!id) throw new Error("No blog ID provided");
  await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};