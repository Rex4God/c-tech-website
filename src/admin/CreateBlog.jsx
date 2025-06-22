import { useState } from "react";
import { createBlog } from "../api/blogApi";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; 

function CreateBlog() {
  const [form, setForm] = useState({ blogTitle: "", blogBody: "", author: "", date: "" });
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files) {
      setImage(files[0]);
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleBodyChange = (value) => {
    setForm((prev) => ({ ...prev, blogBody: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      setError("Image is required.");
      return;
    }
    const formData = new FormData();
    formData.append("blogTitle", form.blogTitle);
    formData.append("blogBody", form.blogBody); // will be HTML from Quill
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
        <div style={{ marginBottom: 16 }}>
          <ReactQuill
            value={form.blogBody}
            onChange={handleBodyChange}
            placeholder="Blog Body"
            modules={{
              toolbar: [
                [{ header: [1, 2, 3, false] }],
                ["bold", "italic", "underline", "strike"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["blockquote", "code-block"],
                ["link", "image"],
                ["clean"],
              ],
            }}
            formats={[
              "header",
              "bold",
              "italic",
              "underline",
              "strike",
              "list",
              "bullet",
              "blockquote",
              "code-block",
              "link",
              "image",
            ]}
            style={{ height: 200, marginBottom: 20 }}
          />
        </div>
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