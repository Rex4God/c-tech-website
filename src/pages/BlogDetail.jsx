import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBlogById } from "../api/blogApi";
import DOMPurify from "dompurify"; 
const IconFacebook = () => (
  <svg width="28" height="28" fill="#1877F3" viewBox="0 0 24 24">
    <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.406.595 24 1.326 24h11.495v-9.294H9.691V11.01h3.13V8.413c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.312h3.587l-.467 3.696h-3.12V24h6.116c.73 0 1.324-.594 1.324-1.326V1.326C24 .592 23.405 0 22.675 0"/>
  </svg>
);
const IconX = () => (
  <svg width="28" height="28" fill="#000" viewBox="0 0 24 24">
    <path d="M17.53 2.477h3.827l-8.375 9.62 9.846 12.426h-7.742l-6.07-7.658-6.944 7.658H.142l8.969-9.983L.003 2.478h7.937l5.219 6.59 6.371-6.59zm-1.334 17.324h2.124L6.604 4.075H4.334l11.862 15.726z"/>
  </svg>
);
const IconTiktok = () => (
  <svg width="28" height="28" fill="#000" viewBox="0 0 48 48">
    <path d="M41.5 16.1c-3.1 0-6.2-1-8.7-2.9V31c0 6.6-5.4 12-12 12s-12-5.4-12-12 5.4-12 12-12c.6 0 1.2.1 1.8.2v6.1c-.6-.2-1.2-.3-1.8-.3-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6V2.6h6.3c.5 4.3 4.1 7.6 8.5 7.8v5.7z" />
  </svg>
);
const IconInstagram = () => (
  <svg width="28" height="28" fill="#E1306C" viewBox="0 0 24 24">
    <path d="M7.8 2C4.2 2 2 4.2 2 7.8v8.4C2 19.8 4.2 22 7.8 22h8.4c3.6 0 5.8-2.2 5.8-5.8V7.8C22 4.2 19.8 2 16.2 2H7.8zm0 1.8h8.4c3.2 0 4.4 1.2 4.4 4.4v8.4c0 3.2-1.2 4.4-4.4 4.4H7.8C4.6 21 3.4 19.8 3.4 16.6V7.8C3.4 4.6 4.6 3.4 7.8 3.4zm4.2 2.2A6.4 6.4 0 1 0 18.4 12 6.39 6.39 0 0 0 12 5.6zm0 1.8a4.6 4.6 0 1 1-4.6 4.6A4.6 4.6 0 0 1 12 7.4zm6.1-.2a1.5 1.5 0 1 1-1.5 1.5 1.49 1.49 0 0 1 1.5-1.5z"/>
  </svg>
);
const IconLinkedIn = () => (
  <svg width="28" height="28" fill="#0077B5" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.785-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.336-.025-3.061-1.867-3.061-1.87 0-2.155 1.46-2.155 2.969v5.696h-3v-10h2.881v1.367h.041c.401-.757 1.381-1.557 2.845-1.557 3.042 0 3.602 2.004 3.602 4.609v5.581z"/>
  </svg>
);

function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    getBlogById(id)
      .then((res) => {
        if (res && res.data) {
          setBlog(res.data);
        } else {
          setBlog(null);
        }
      })
      .catch((err) => {
        console.error("Error loading blog:", err);
        setBlog(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!blog) return <div>Blog not found.</div>;

  const blogUrl = window.location.href;

  // Each handler receives the event and prevents default behavior
  const shareOnFacebook = (e) => {
    e.stopPropagation();
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent()}`,
      "_blank",
      "noopener,noreferrer"
    );
  };
  const shareOnX = (e) => {
    e.stopPropagation();
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(blogUrl)}&text=${encodeURIComponent(blog.blogTitle)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };blogUrl
  const shareOnTikTok = (e) => {
    e.stopPropagation();
    window.open("https://www.tiktok.com/upload", "_blank", "noopener,noreferrer");
  };
  const shareOnInstagram = (e) => {
    e.stopPropagation();
    window.open("https://www.instagram.com/", "_blank", "noopener,noreferrer");
  };
  const shareOnLinkedIn = (e) => {
    e.stopPropagation();
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(blogUrl)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        minHeight: "100vh",
        background: "#fff"
      }}
    >
      {/* Static Share Icons Sidebar */}
      <aside
        style={{
          position: "sticky",
          top: 0,
          alignSelf: "flex-start",
          minHeight: "100vh",
          padding: "2rem 1rem 2rem 2rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          background: "#fff",
          borderRight: "1px solid #eee",
          zIndex: 2
        }}
      >
        <div style={{ fontWeight: 600, marginBottom: "1rem" }}>Share</div>
        <button
          type="button"
          aria-label="Share on Facebook"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0
          }}
          onClick={shareOnFacebook}
        >
          <IconFacebook />
        </button>
        <button
          type="button"
          aria-label="Share on X"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0
          }}
          onClick={shareOnX}
        >
          <IconX />
        </button>
        <button
          type="button"
          aria-label="Share on TikTok"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0
          }}
          onClick={shareOnTikTok}
        >
          <IconTiktok />
        </button>
        <button
          type="button"
          aria-label="Share on Instagram"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0
          }}
          onClick={shareOnInstagram}
        >
          <IconInstagram />
        </button>
        <button
          type="button"
          aria-label="Share on LinkedIn"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0
          }}
          onClick={shareOnLinkedIn}
        >
          <IconLinkedIn />
        </button>
      </aside>

      {/* Scrollable Blog Content */}
      <main
        style={{
          flex: 1,
          maxHeight: "100vh",
          overflowY: "auto",
          padding: "2.5rem 4vw",
          boxSizing: "border-box"
        }}
      >
        <section>
          <img
            src={blog.image}
            alt={blog.blogTitle}
            style={{
              width: "100%",
              maxHeight: "300px",
              objectFit: "cover",
              borderRadius: "5px"
            }}
            onError={e => (e.currentTarget.style.display = "none")}
          />
          <div style={{ marginTop: "1rem" }}>
            <div
              style={{
                color: "#666",
                fontSize: "1rem",
                marginBottom: "0.5rem"
              }}
            >
              <span>{blog.author || "Unknown"}</span>
              {" · "}
              <span>
                {blog.date
                  ? new Date(blog.date).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : ""}
              </span>
              {" · "}
              <span>{blog.readTime || "9"} min read</span>
            </div>
            <h2 style={{ fontSize: "2.5rem", margin: "1rem 0" }}>
              {blog.blogTitle}
            </h2>
            {/* Render rich text safely */}
            <div
              style={{ fontSize: "1.2rem", lineHeight: 1.7 }}
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.blogBody) }}
            />
          </div>
        </section>
      </main>
    </div>
  );
}

export default BlogDetail;