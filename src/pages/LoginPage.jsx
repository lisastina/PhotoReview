import { useRef, useState } from "react";
import { Container, Button, Alert } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

const LoginPage = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuthContext();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <>
      <h1>Login</h1>
      <Container>
        {error && <Alert variant="warning">{error}</Alert>}
        <form
          onSubmit={handleLogin}
          className="d-flex flex-column"
          style={{ maxWidth: "400px" }}
        >
          <input type="email" ref={emailRef} />
          <input type="password" ref={passwordRef} />
          <Button disabled={loading} type="submit">
            Login
          </Button>
          <Link to="/register">Don't have an account?</Link>
        </form>
      </Container>
    </>
  );
};

export default LoginPage;
