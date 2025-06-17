import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const PublicRoute = ({ children }) => {
  const { authUser } = useAuthStore();
  return !authUser ? children : <Navigate to="/" replace />;
};

export default PublicRoute;
