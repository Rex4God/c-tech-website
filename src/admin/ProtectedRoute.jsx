import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isAuthenticated = !!localStorage.getItem("adminToken");
  return isAuthenticated ? children : <Navigate to="/admin/login" />;
}

export default ProtectedRoute;