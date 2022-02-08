import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useAuthContext } from "../contexts/AuthContext";

const Navigation = () => {
  const { currentUser } = useAuthContext();
  return (
    <Navbar bg="dark" variant="dark" text="light">
      <Container className="py-2">
        <NavLink to="/">My albums</NavLink>
        {currentUser ? (
          <NavLink to="/logout">Logout</NavLink>
        ) : (
          <div>
            <NavLink to="/login" className="mx-2">
              Login
            </NavLink>
            <NavLink to="/register">Register</NavLink>
          </div>
        )}
      </Container>
    </Navbar>
  );
};

export default Navigation;
