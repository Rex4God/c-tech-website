import { useEffect, useState } from "react";
import { getAllBlogs, deleteBlog } from "../api/blogApi";
import { Link } from "react-router-dom";

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    getAllBlogs()
      .then((res) => {
        if (res && Array.isArray(res.data)) {
          setBlogs(res.data);
        } else {
          setBlogs([]);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch blogs:", err);
        setBlogs([]);
      });
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await deleteBlog(id);
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
      } catch (err) {
        console.error("Failed to delete blog:", err);
        alert("Failed to delete blog.");
      }
    }
  };

  return (
    <section>
      <h2>Manage Blogs</h2>
      <Link
        to="/admin/blog/create"
        style={{
          display: "inline-block",
          marginBottom: 15,
          background: "#007bff",
          color: "#fff",
          padding: "8px 16px",
          borderRadius: 4,
          textDecoration: "none",
        }}
      >
        Create New Blog
      </Link>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "2rem",
          marginTop: 20,
        }}
      >
        {Array.isArray(blogs) && blogs.length > 0 ? (
          blogs.map(
            (blog) =>
              blog.id && (
                <div
                  key={blog.id}
                  style={{
                    background: "#fff",
                    border: "1px solid #eee",
                    borderRadius: 8,
                    width: 340,
                    minHeight: 320,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    overflow: "hidden",
                  }}
                >
                  {blog.image && (
                    <img
                      src={blog.image}
                      alt={blog.blogTitle}
                      style={{
                        width: "100%",
                        height: 160,
                        objectFit: "cover",
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                        background: "#f6f6f6",
                      }}
                      onError={(e) => (e.currentTarget.style.display = "none")}
                    />
                  )}
                  <div style={{ padding: "1rem" }}>
                    <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "1.1rem" }}>
                      {blog.blogTitle}
                    </h3>
                    <div
                      style={{
                        fontSize: ".95rem",
                        color: "#555",
                        marginBottom: 6,
                      }}
                    >
                    <p> {blog.author || "Unknown"}</p>
                    </div>
                    <div
                      style={{
                        fontSize: ".9rem",
                        color: "#777",
                        marginBottom: 6,
                        minHeight: 40,
                        maxHeight: 48,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                      title={blog.blogBody}
                    >
                      {blog.blogBody}
                    </div>
                    <div
                      style={{
                        fontSize: ".85rem",
                        color: "#888",
                        marginBottom: 10,
                      }}
                    >
                      {" "}
                      {blog.date
                        ? new Date(blog.date).toLocaleDateString()
                        : ""}
                    </div>
                    <div style={{ display: "flex", gap: 6 }}>
                      <Link
                        to={`/admin/blog/edit/${blog.id}`}
                        style={{
                          fontSize: ".92rem",
                          color: "#007bff",
                          textDecoration: "none",
                        }}
                      >
                        Edit
                      </Link>
                      <span style={{ color: "#ccc" }}>|</span>
                      <button
                        style={{
                          fontSize: ".92rem",
                          color: "#dc3545",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                        }}
                        onClick={() => handleDelete(blog.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )
          )
        ) : (
          <div
            style={{
              fontSize: "1.1rem",
              color: "#888",
              padding: "2rem",
              background: "#fafafa",
              borderRadius: 8,
            }}
          >
            No blogs found.
          </div>
        )}
      </div>
    </section>
  );
}