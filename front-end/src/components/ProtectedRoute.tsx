import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

interface ProtectedRouteProps {
  children: ReactElement;
}

export default function ProtectedRoute({
  children,
}: ProtectedRouteProps): ReactElement | null {
  const { user, loading } = useAuth();

  // Optional: prevent redirect flicker while checking session
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}