import { Container, Button } from "react-bootstrap";
import AlbumList from "../components/AlbumList";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const handleClick = (e) => {
    navigate("/upload");
  };

  return (
    <>
      <Container>
        <h1>Photo Review</h1>
        <h2>Your albums</h2>
        <Button onClick={handleClick}>Create new Album</Button>
        <AlbumList />
      </Container>
    </>
  );
};

export default HomePage;
