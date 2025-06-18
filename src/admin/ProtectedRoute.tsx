import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: ReactNode;
}

function ProtectedRoute({ children }: Props) {
  const isAuthenticated = !!localStorage.getItem("adminToken");
  return isAuthenticated ? children : <Navigate to="/admin/login" />;
}

export default ProtectedRoute;