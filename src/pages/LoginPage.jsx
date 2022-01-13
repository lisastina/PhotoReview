import { useRef, useState } from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
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
        <form onSubmit={handleLogin}>
          <input type="email" ref={emailRef} />
          <input type="password" ref={passwordRef} />
          <Button disabled={loading} type="submit">
            Login
          </Button>
        </form>
      </Container>
    </>
  );
};

export default LoginPage;
