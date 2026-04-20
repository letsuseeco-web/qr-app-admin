import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { token, loading } = useAuth();

  // 🔥 wait for auth to load
  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  // 🔥 then check token
  if (!token) {
    return <Navigate to="/" />;
  }

  return children;
}