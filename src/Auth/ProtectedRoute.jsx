import { useAuth } from "../ContextProvider/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ element }) {
  const { currentUser } = useAuth();
  return currentUser ? element : <Navigate to={"/login"} />;
}
