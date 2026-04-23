import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./authContext.tsx";

export default function PublicRoute() {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
}