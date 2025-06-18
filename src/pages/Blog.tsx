import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllBlogs } from "../api/blogApi";
import type{ BlogType } from "../types/blog";

function Blog() {
  const [blogs, setBlogs] = useState<BlogType[]>([]);

  useEffect(() => {
    getAllBlogs().then(setBlogs);
  }, []);

  return (
    <section>
      <h2>Our Blog</h2>
      <div className="card-container">
        {blogs.map((blog) => (
          <div className="card" key={blog._id}>
            <h4>{blog.blogTitle}</h4>
            <p>{blog.author || blog.blogBody  }</p>
            <img src={blog.image} alt={blog.blogTitle} />
            <p>{new Date(blog.date).toLocaleDateString()}</p>
            <Link to={`/blog/${blog._id}`}>Read More</Link>
          </div>
        ))}
      </div>
    </section>
  );
}
export default Blog;