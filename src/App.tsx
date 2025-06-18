import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Courses from "./pages/Courses";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import FAQ from "./components/FAQ";
import AdminLogin from "./admin/adminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import AdminBlogs from "./admin/AdminBlogs";
import CreateBlog from "./admin/CreateBlog";
import EditBlog from "./admin/EditBlog";
import CreateAdmin from "./admin/CreateAdmin";
import ProtectedRoute from "./admin/ProtectedRoute";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/create" element={<CreateAdmin />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/blogs"
          element={
            <ProtectedRoute>
              <AdminBlogs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/blogs/create"
          element={
            <ProtectedRoute>
              <CreateBlog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/blogs/edit/:id"
          element={
            <ProtectedRoute>
              <EditBlog />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;