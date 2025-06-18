import { useState, useEffect } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { getBlogById, updateBlog } from "../api/blogApi";
import { useParams, useNavigate } from "react-router-dom";
import type { BlogType } from "../types/blog";

function EditBlog() {
  const { id } = useParams<{ id: string }>(); 
  const [form, setForm] = useState({ blogTitle: "", blogBody: "", author: "", date: "" });
  const [image, setImage] = useState<File | null>(null);
  const [currentImage, setCurrentImage] = useState<string>("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      setError("Invalid blog ID.");
      return;
    }
    getBlogById(id)
      .then((blog: BlogType) => {
        setForm({
          blogTitle: blog.blogTitle || "",
          blogBody: blog.blogBody || "",
          author: blog.author || "",
          date: blog.date ? new Date(blog.date).toISOString().substring(0, 10) : "",
        });
        setCurrentImage(blog.image || "");
      })
      .catch(() => setError("Blog not found"));
  }, [id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;
    if (name === "image" && files && files.length > 0) {
      setImage(files[0]);
    } else if (name !== "image") {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!id) {
      setError("Invalid blog ID.");
      return;
    }
    const formData = new FormData();
    formData.append("blogTitle", form.blogTitle);
    formData.append("blogBody", form.blogBody);
    formData.append("author", form.author);
    formData.append("date", form.date);
    if (image) {
      formData.append("image", image);
    }
    try {
      await updateBlog(id, formData);
      navigate("/admin/blogs");
    } catch (err) {
      setError("Failed to update blog.");
    }
  };

  if (error) {
    return (
      <section>
        <div style={{ color: "red" }}>{error}</div>
        <button onClick={() => setError("")}>Clear Error</button>
      </section>
    );
  }

  return (
    <section>
      <h2>Edit Blog</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="blogTitle"
          placeholder="Blog Title"
          value={form.blogTitle}
          onChange={handleChange}
          required
        />
        {currentImage && (
          <div>
            <img
              src={currentImage}
              alt="Current"
              style={{ maxWidth: 200, marginBottom: 10 }}
              onError={() => setCurrentImage("")} // Fallback if image URL is invalid
            />
          </div>
        )}
        <input
          type="file"
          name="image"
          onChange={handleChange}
          accept="image/*"
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
        <button type="submit">Update</button>
        {error && <div style={{ color: "red", marginTop: 10 }}>{error}</div>}
      </form>
    </section>
  );
}

export default EditBlog;