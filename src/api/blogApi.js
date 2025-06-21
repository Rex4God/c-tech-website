import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getAllBlogs = async () => {
  const res = await axios.get(`${API_URL}/blog`);
  return res.data;
};

export const getBlogById = async (id) => {
  if (!id) throw new Error("No blog ID provided");
  const res = await axios.get(`${API_URL}/blog/${id}`);
  return res.data;
};

export const createBlog = async (data) => {
  const token = localStorage.getItem("adminToken");
  if (!token) throw new Error("Not authenticated.");

  const res = await axios.post(`${API_URL}/blog/create`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data;
};


export const updateBlog = async (id, data) => {
  const token = localStorage.getItem("adminToken");
  if (!id) throw new Error("No blog ID provided");
  const res = await axios.put(`${API_URL}/blog/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const deleteBlog = async (id) => {
  const token = localStorage.getItem("adminToken");
  if (!token) throw new Error("Not authenticated.");
  if (!id) throw new Error("No blog ID provided");

  await axios.delete(`${API_URL}/blog/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
;

