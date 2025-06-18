import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { createBlog } from "../api/blogApi";
import { useNavigate } from "react-router-dom";

function CreateBlog() {
  const [form, setForm] = useState({ blogTitle: "", blogBody: "", author: "", date: "" });
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;
    if (name === "image" && files) {
      setImage(files[0]);
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!image) {
      setError("Image is required.");
      return;
    }
    const formData = new FormData();
    formData.append("blogTitle", form.blogTitle);
    formData.append("blogBody", form.blogBody);
    formData.append("author", form.author);
    formData.append("date", form.date);
    formData.append("image", image);

    try {
      await createBlog(formData);
      navigate("/admin/blog");
    } catch (err) {
      setError("Failed to create blog.");
    }
  };

  return (
    <section>
      <h2>Create Blog</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="blogTitle"
          placeholder="Blog Title"
          value={form.blogTitle}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          name="image"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={form.author}
          onChange={handleChange}
          required
        />
        <textarea
          name="blogBody"
          placeholder="Blog Body"
          rows={10}
          value={form.blogBody}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="date"
          placeholder="Date"
          value={form.date}
          onChange={handleChange}
          required
        />
        <button type="submit">Create</button>
        {error && <div style={{ color: "red", marginTop: 10 }}>{error}</div>}
      </form>
    </section>
  );
}

export default CreateBlog;