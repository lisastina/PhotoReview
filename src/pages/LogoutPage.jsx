import { useAuthContext } from "../contexts/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LogoutPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuthContext();

  useEffect(() => {
    logout();
    navigate("/login");
    // eslint-disable-next-line
  }, []);

  return <>You are logging out...</>;
};

export default LogoutPage;
