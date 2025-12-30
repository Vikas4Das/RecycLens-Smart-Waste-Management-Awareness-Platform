import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function AdminProtectedRoute() {
  const { user } = useContext(AuthContext);

  if (!user || user.role !== "admin") {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}
















