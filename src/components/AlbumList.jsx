import { Card, ListGroup } from "react-bootstrap";
import AlbumCard from "./AlbumCard";
import useGetCol from "../hooks/useGetCol";

const AlbumList = () => {
  const albums = useGetCol("albums", {
    fetchOnlyCurrentUser: true,
  });

  return (
    <Card className="mt-3">
      <ListGroup variant="flush">
        {albums.data &&
          albums.data.map((album, index) => (
            <AlbumCard album={album} key={index} index={index} />
          ))}
      </ListGroup>
    </Card>
  );
};

export default AlbumList;
