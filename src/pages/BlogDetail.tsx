import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBlogById } from "../api/blogApi";
import type { BlogType } from "../types/blog";

function BlogDetail() {
  const { id } = useParams<{ id: string }>(); // Explicitly type id
  const [blog, setBlog] = useState<BlogType | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setError("Invalid blog ID.");
      setLoading(false);
      return;
    }
    setLoading(true);
    getBlogById(id)
      .then((data) => {
        setBlog(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Blog not found");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <section>Loading...</section>;
  if (error) {
    return (
      <section>
        <div style={{ color: "red" }}>{error}</div>
        <button onClick={() => setError("")}>Clear Error</button>
      </section>
    );
  }
  if (!blog) return <section>No blog data available.</section>;

  return (
    <section>
      <h2>{blog.blogTitle}</h2>
      <div>
        <p>{blog.blogBody}</p>
        <p><strong>Author:</strong> {blog.author}</p>
        <p><strong>Date:</strong> {new Date(blog.date).toLocaleDateString()}</p>
        {blog.image && (
          <img
            src={blog.image}
            alt={blog.blogTitle}
            style={{ width: "100%", maxHeight: "400px", objectFit: "cover" }}
            onError={(e) => (e.currentTarget.style.display = "none")} // Hide broken images
          />
        )}
      </div>
    </section>
  );
}

export default BlogDetail;