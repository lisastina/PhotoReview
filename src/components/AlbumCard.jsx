import { Link } from "react-router-dom";
import { ListGroup, Button } from "react-bootstrap";
import useDeleteAlbum from "../hooks/useDeleteAlbum";

const AlbumCard = ({ album }) => {
  const deleteAlbum = useDeleteAlbum(album);

  const handleDelete = () => {
    deleteAlbum.deleteAlbum();
  };

  return (
    <>
      {album && (
        <ListGroup.Item className="d-flex justify-content-between align-items-center">
          <Link to={`/${album._id}`}>{album.name}</Link>
          <Button variant="danger" onClick={handleDelete}>
            x
          </Button>
        </ListGroup.Item>
      )}
    </>
  );
};

export default AlbumCard;
