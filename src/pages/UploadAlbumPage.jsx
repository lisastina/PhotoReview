import { useEffect, useState, useRef } from "react";
import { Container, Form, Button } from "react-bootstrap";
import useUploadAlbum from "../hooks/useUploadAlbum";
import { useDropzone } from "react-dropzone";
import ImageDropzone from "../components/ImageDropzone";
import { v4 as uuidv4 } from "uuid";

const UploadAlbumPage = () => {
  const [images, setImages] = useState(null);
  const albumNameRef = useRef();
  const uploadAlbum = useUploadAlbum(images);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!acceptedFiles.length) {
      return;
    }

    const albumUuid = uuidv4();

    uploadAlbum.createAlbum(albumNameRef.current.value, albumUuid);
    uploadAlbum.upload(acceptedFiles, albumUuid);
    // navigate(`/${uploadImages.albumUuid}`);
  };

  const {
    getRootProps,
    getInputProps,
    acceptedFiles,
    isDragActive,
    isDragAccept,
  } = useDropzone({
    accept: "image/gif, image/jpeg, image/png, image/webp",
    handleSubmit,
  });

  useEffect(() => {
    if (acceptedFiles) {
      setImages(acceptedFiles);
    }
  }, [acceptedFiles]);

  return (
    <>
      <Container>
        <h1>Create new photo album</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group id="album-name">
            <Form.Label>Album name</Form.Label>
            <Form.Control required type="text" ref={albumNameRef} />
          </Form.Group>
          <Form.Group id="images">
            <Form.Label>Upload photos</Form.Label>

            <ImageDropzone
              required
              params={{
                uploadAlbum,
                acceptedFiles,
                getRootProps,
                getInputProps,
                isDragActive,
                isDragAccept,
              }}
            />
          </Form.Group>
          <Button type="submit">Create album</Button>
        </Form>
      </Container>
    </>
  );
};

export default UploadAlbumPage;
