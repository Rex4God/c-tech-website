import { useEffect, useState } from "react";
import { getAllBlogs, deleteBlog } from "../api/blogApi";
import { Link } from "react-router-dom";
import type { BlogType } from "../types/blog";

function AdminBlogs() {
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setLoading(true);
    getAllBlogs()
      .then((data) => {
        setBlogs(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch blogs");
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await deleteBlog(id);
      setBlogs((b) => b.filter((blog) => blog._id !== id));
    } catch (err) {
      setError("Failed to delete blog.");
    }
  };

  if (loading) return <section>Loading...</section>;
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
      <h2>Manage Blogs</h2>
      <table style={{ width: "100%", background: "#fff" }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Body</th>
            <th>Date</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog._id}>
              <td>{blog.blogTitle}</td>
              <td>{blog.author}</td>
              <td>{blog.blogBody}...</td>
              <td>{new Date(blog.date).toLocaleDateString()}</td>
              <td>
                {blog.image && (
                  <img
                    src={blog.image}
                    alt={blog.blogTitle}
                    style={{ width: 100 }}
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                )}
              </td>
              <td>
                <Link to={`/admin/blogs/edit/${blog._id}`}>Edit</Link> |{" "}
                <button onClick={() => handleDelete(blog._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default AdminBlogs;