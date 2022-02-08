import { Container, Button } from "react-bootstrap";
import AlbumList from "../components/AlbumList";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <Container>
        <h1>Photo Review</h1>
        <h2>Your albums</h2>
        <Link to="/upload">
          <Button>Create new Album</Button>
        </Link>
        <AlbumList />
      </Container>
    </>
  );
};

export default HomePage;
