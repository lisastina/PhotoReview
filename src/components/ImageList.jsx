import { Row, Col } from "react-bootstrap";
import ImageCard from "./ImageCard";

const AlbumList = ({ images, edit, setSelectedImages, selectedImages }) => {
  return (
    <Row className="mt-3">
      {images?.map((image, i) => {
        return (
          <Col key={i} xs={12} sm={6} md={4} lg={3} className="mb-3">
            <ImageCard
              image={image}
              edit={edit}
              selectedImages={selectedImages}
              setSelectedImages={setSelectedImages}
            />
          </Col>
        );
      })}
    </Row>
  );
};

export default AlbumList;
