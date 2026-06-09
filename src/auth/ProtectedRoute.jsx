import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import LoadingBar from "../components/LoadingBar";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingBar />; // Or a spinner component
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
