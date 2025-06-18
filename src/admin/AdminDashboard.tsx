import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <section>
      <h2>Admin Dashboard</h2>
      <div>
        <Link to="/admin/blogs" className="card">
          Manage Blogs
        </Link>
        <Link to="/admin/blogs/create" className="card">
          Create New Blog
        </Link>
        <Link to="/admin/create" className="card">
          Create Admin
        </Link>
      </div>
    </section>
  );
}

export default AdminDashboard;