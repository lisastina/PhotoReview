import { useState, useEffect } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { useAuthContext } from "../contexts/AuthContext";
import useDeleteimage from "../hooks/useDeleteImage";

const ImageCard = ({ image, edit, selectedImages, setSelectedImages }) => {
  const { currentUser } = useAuthContext();
  const deleteImage = useDeleteimage(image);
  const [isSelected, setIsSelected] = useState(false);

  const handleDelete = () => {
    deleteImage.deleteImage();
  };

  /* Select card on click */
  const handleClick = (e) => {
    if (edit && e.target.type !== "button") {
      setIsSelected(!isSelected);
    }
  };

  /* Set selected images */
  useEffect(() => {
    if (isSelected) {
      setSelectedImages([...selectedImages, image]);
    }
    if (!isSelected) {
      setSelectedImages(
        selectedImages.filter((image) => image._id !== image._id)
      );
    }
  }, [isSelected]);

  return (
    <Card
      onClick={handleClick}
      style={{
        cursor: "pointer",
        border: `${isSelected && currentUser ? "3px solid" : "0.5px solid"}`,
      }}
      border={isSelected && currentUser && "warning"}
    >
      {/* Remove button */}
      {currentUser && edit && (
        <Card.Header>
          <Button variant="danger" onClick={handleDelete}>
            x
          </Button>
        </Card.Header>
      )}

      {/* image */}
      {edit ? (
        <Card.Img src={image.imageUrl} />
      ) : (
        <a href={image.imageUrl}>
          <Card.Img src={image.imageUrl} />
        </a>
      )}

      {/* Like buttons */}
      {!currentUser && (
        <>
          <Card.Footer className="justify-content-between d-flex">
            <Form.Check
              id={`${image._id}-like`}
              inline
              label="👍"
              name={image._id}
              type="radio"
              required
              onClick={() => {
                setIsSelected(true);
              }}
            />
            <Form.Check
              inline
              label="👎"
              name={image._id}
              type="radio"
              id={`${image._id}-dislike`}
              required
              onClick={() => {
                setIsSelected(false);
              }}
            />
          </Card.Footer>
        </>
      )}
    </Card>
  );
};

export default ImageCard;
