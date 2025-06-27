import { useState } from "react";
import { Link } from "react-router-dom";
import brandLogo from "../assets/brand logo.jpg";

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header>
      <div className="header-left">
        <img src={brandLogo} alt="C Tech Logo" />
        <div className="brand-text">
          <h1>C-Tech</h1>
          <p>Empowering Your Digital Journey</p>
        </div>
      </div>
      <button
        className="menu-toggle"
        aria-label="Toggle menu"
        onClick={() => setShowMenu((prev) => !prev)}
      >
        &#9776;
      </button>
      <nav className={`main-nav${showMenu ? " show" : ""}`}>
        <Link to="/">Home</Link>
        <Link to="/about">About Us</Link>
        <Link to="/courses">Courses</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/blog">Blogs</Link>
        <Link to="/faq">FAQ</Link>
        {/* <Link to="/admin/login" style={{ color: "#0072ff" }}>
          Admin
        </Link> */}
      </nav>
    </header>
  );
}

export default Navbar;