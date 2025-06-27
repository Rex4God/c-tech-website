import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBlogById } from "../api/blogApi";
import DOMPurify from "dompurify";

const IconFacebook = () => (
  <svg width="27" height="27" fill="#1877F3" viewBox="0 0 24 24">
    <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.406.595 24 1.326 24h11.495v-9.294H9.691V11.01h3.13V8.413c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.312h3.587l-.467 3.696h-3.12V24h6.116c.73 0 1.324-.594 1.324-1.326V1.326C24 .592 23.405 0 22.675 0"/>
  </svg>
);

const IconX = () => (
  <svg width="27" height="27" fill="#000" viewBox="0 0 24 24">
    <path d="M17.53 2.477h3.827l-8.375 9.62 9.846 12.426h-7.742l-6.07-7.658-6.944 7.658H.142l8.969-9.983L.003 2.478h7.937l5.219 6.59 6.371-6.59zm-1.334 17.324h2.124L6.604 4.075H4.334l11.862 15.726z"/>
  </svg>
);

const IconLinkedIn = () => (
  <svg width="27" height="27" fill="#0077B5" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.785-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.336-.025-3.061-1.867-3.061-1.87 0-2.155 1.46-2.155 2.969v5.696h-3v-10h2.881v1.367h.041c.401-.757 1.381-1.557 2.845-1.557 3.042 0 3.602 2.004 3.602 4.609v5.581z"/>
  </svg>
);

const ShareIcons = ({ layout, blogTitle }) => {
  const blogUrl = window.location.href;
  const encodedTitle = encodeURIComponent(blogTitle || "");

  const shareOn = (url) => (e) => {
    e.stopPropagation();
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const icons = [
    {
      icon: <IconLinkedIn />,
      label: "LinkedIn",
      onClick: shareOn(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(blogUrl)}&text=${encodedTitle}`),
    },
    {
      icon: <IconX />,
      label: "X",
      onClick: shareOn(`https://twitter.com/intent/tweet?url=${encodeURIComponent(blogUrl)}&text=${encodedTitle}`),
    },
    {
      icon: <IconFacebook />,
      label: "Facebook",
      onClick: shareOn(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(blogUrl)}&text=${encodedTitle}`),
    },
  ];

  return (
    <div
      className={layout === "sidebar" ? "share-sidebar" : "share-inline"}
      style={{
        display: "flex",
        flexDirection: layout === "sidebar" ? "column" : "row",
        alignItems: "center",
        gap: "1rem",
        padding: layout === "sidebar" ? "2rem 1rem" : "1rem 0",
        borderRight: layout === "sidebar" ? "1px solid #eee" : "none",
        borderTop: layout === "inline" ? "1px solid #eee" : "none",
        width: layout === "sidebar" ? "60px" : "100%",
      }}
    >
      <div style={{ fontWeight: 400 }}>Share</div>
      <div
        style={{
          display: "flex",
          flexDirection: layout === "sidebar" ? "column" : "row",
          gap: "1rem",
        }}
      >
        {icons.map((item, i) => (
          <button
            key={i}
            aria-label={`Share on ${item.label}`}
            onClick={item.onClick}
            style={{
              background: "none",
              border: "1px solid #999",
              borderRadius: "50%",
              width: "44px",
              height: "44px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            {item.icon}
          </button>
        ))}
      </div>
    </div>
  );
};

function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    getBlogById(id)
      .then((res) => setBlog(res?.data || null))
      .catch(() => setBlog(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!blog) return <div>Blog not found.</div>;

  return (
    <div style={{ display: "flex", flexDirection: "row", background: "#fff" }}>
      {/* Desktop Sidebar */}
      <div className="desktop-share" style={{ display: "none" }}>
        <ShareIcons layout="sidebar" blogTitle={blog.blogTitle} />
      </div>

      {/* Main Blog Content */}
      <main
        style={{
          flex: 1,
          padding: "2.4rem 4vw",
          boxSizing: "border-box",
        }}
      >
        <section>
          <img
            src={blog.image}
            alt={blog.blogTitle}
            style={{
              width: "100%",
              maxHeight: "200px",
              objectFit: "cover",
              borderRadius: "5px",
            }}
            onError={(e) => (e.currentTarget.style.display = "none")}
          />

          {/* Mobile Share Icons */}
          <div className="mobile-share">
            <ShareIcons layout="inline" blogTitle={blog.blogTitle} />
          </div>

          <div style={{ marginTop: "1rem" }}>
            <div style={{ color: "#666", fontSize: "1rem", marginBottom: "0.5rem" }}>
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
              <span>{blog.readTime || "7"} min read</span>
            </div>
            <h2 style={{ fontSize: "1.5rem", margin: "1rem 0" }}>{blog.blogTitle}</h2>
            <div
              style={{ fontSize: "1.1rem", lineHeight: 1.7 }}
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.blogBody) }}
            />
          </div>
        </section>
      </main>
    </div>
  );
}

export default BlogDetail;
