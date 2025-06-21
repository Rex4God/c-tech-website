import { useState, useEffect } from "react";
import { getBlogById, updateBlog } from "../api/blogApi";
import { useParams, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function EditBlog() {
  const { id } = useParams();
  const [form, setForm] = useState({
    blogTitle: "",
    blogBody: "",
    author: "",
    date: "",
  });
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch blog data on mount
  useEffect(() => {
    if (!id) {
      setError("Invalid blog ID.");
      setLoading(false);
      return;
    }
    setLoading(true);
    getBlogById(id)
      .then((res) => {
        // Support both direct and .data return
        const blog = res?.data || res;
        setForm({
          blogTitle: blog.blogTitle || "",
          blogBody: blog.blogBody || "",
          author: blog.author || "",
          date: blog.date
            ? new Date(blog.date).toISOString().substring(0, 10)
            : "",
        });
        setCurrentImage(blog.image || "");
        setLoading(false);
      })
      .catch(() => {
        setError("Blog not found");
        setLoading(false);
      });
  }, [id]);

  // Input change for normal fields and file
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files && files.length > 0) {
      setImage(files[0]);
    } else if (name !== "image") {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // For ReactQuill
  const handleBodyChange = (value) => {
    setForm((prev) => ({ ...prev, blogBody: value }));
  };

  // Submit updated data
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!id) {
      setError("Invalid blog ID.");
      return;
    }
    if (!form.blogTitle || !form.author || !form.date) {
      setError("Please fill all required fields.");
      return;
    }
    if (!form.blogBody || form.blogBody === "<p><br></p>") {
      setError("Blog body cannot be empty.");
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
      navigate("/admin/blog");
    } catch (err) {
      setError("Failed to update blog.");
    }
  };

  if (loading) {
    return (
      <section>
        <div>Loading...</div>
      </section>
    );
  }

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
              onError={() => setCurrentImage("")}
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
        <button type="submit">Update</button>
        {error && <div style={{ color: "red", marginTop: 10 }}>{error}</div>}
      </form>
    </section>
  );
}

export default EditBlog;