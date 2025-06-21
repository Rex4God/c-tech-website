import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllBlogs } from "../api/blogApi";

// To properly parse blog HTML and get plain text for preview, use DOMPurify + a temporary element
import DOMPurify from "dompurify";

function getPlainTextFromHTML(html, maxLength = 100) {
  // Sanitize the HTML to remove scripts, then extract text content
  const clean = DOMPurify.sanitize(html, { ALLOWED_TAGS: [] });
  return clean.length > maxLength ? clean.slice(0, maxLength) + "..." : clean;
}

function Blog() {
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
        console.error("Error fetching blogs:", err);
        setBlogs([]);
      });
  }, []);

  return (
    <section style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>Our Blog</h2>
      <div className="card-container" style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div
              className="card"
              key={blog._id || blog.id}
              style={{
                width: "300px",
                background: "#fff",
                border: "1px solid #ddd",
                borderRadius: "8px",
                overflow: "hidden",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {blog.image && (
                <img
                  src={blog.image}
                  alt={blog.blogTitle}
                  style={{ width: "100%", height: "180px", objectFit: "cover" }}
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              )}

              <div style={{ padding: "15px", flex: 1 }}>
                <h4 style={{ fontSize: "18px", margin: "0 0 10px" }}>{blog.blogTitle}</h4>
                <p style={{ fontSize: "14px", color: "#555" }}>
                  {getPlainTextFromHTML(blog.blogBody, 100)}
                </p>
                <p style={{ fontSize: "13px", color: "#888", margin: "10px 0" }}>
                  {blog.date ? new Date(blog.date).toLocaleDateString() : ""} · {blog.readTime || "5"} min read
                </p>
                <Link to={`/blog/${blog._id || blog.id}`} style={{ color: "blue", fontWeight: "bold", textDecoration: "none" }}>
                  Read more ...
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>No blog posts available.</p>
        )}
      </div>
    </section>
  );
}

export default Blog;