import { useEffect, useState, useRef } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import useUploadAlbum from "../hooks/useUploadAlbum";
import { useDropzone } from "react-dropzone";
import { Link } from "react-router-dom";

import ImageDropzone from "../components/ImageDropzone";
import { v4 as uuidv4 } from "uuid";

const UploadAlbumPage = () => {
  const [images, setImages] = useState(null);
  const albumNameRef = useRef();
  const uploadAlbum = useUploadAlbum(images);
  const albumUuid = uuidv4();
  const [alert, setAlert] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!acceptedFiles.length) {
      return;
    }

    uploadAlbum.createAlbum(albumNameRef.current.value, albumUuid);
    uploadAlbum.upload(acceptedFiles, albumUuid);
  };

  useEffect(() => {
    if (uploadAlbum.isSuccess) {
      setAlert(true);
    }
  }, [uploadAlbum.isSuccess]);

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
          {alert && (
            <Alert variant="success">
              A new album has been created.
              <Link to="/">
                <Button className="mx-2"> Go to my albums.</Button>
              </Link>
            </Alert>
          )}
          <Button type="submit">Create album</Button>
        </Form>
      </Container>
    </>
  );
};

export default UploadAlbumPage;
