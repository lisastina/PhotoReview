import { Navigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

const RequireAuth = ({ children, redirect }) => {
  const { currentUser } = useAuthContext();

  return currentUser ? children : <Navigate to={redirect} />;
};

export default RequireAuth;
