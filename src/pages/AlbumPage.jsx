import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Button,
  InputGroup,
  FormControl,
  Form,
} from "react-bootstrap";
import useGetDoc from "../hooks/useGetDoc";
import useGetCol from "../hooks/useGetCol";
import useUploadAlbum from "../hooks/useUploadAlbum";
import { useAuthContext } from "../contexts/AuthContext";
import { db } from "../firebase";
import { collection, doc } from "firebase/firestore";
import { useFirestoreDocumentMutation } from "@react-query-firebase/firestore";
import ImageDropzone from "../components/ImageDropzone";
import { useDropzone } from "react-dropzone";
import { SRLWrapper } from "simple-react-lightbox";
import ImageList from "../components/ImageList";
import useCreateNewAlbum from "../hooks/useCreateNewAlbum";
import SelectedImages from "../components/SelectedImages";

const AlbumPage = () => {
  const { id } = useParams();
  const { currentUser } = useAuthContext();
  const [edit, setEdit] = useState(false);
  const [add, setAdd] = useState(false);
  const albumNameRef = useRef();
  const [newImages, setNewImages] = useState();
  const [selectedImages, setSelectedImages] = useState([]);
  const [dislikedImages, setDislikedImages] = useState([]);
  const uploadAlbum = useUploadAlbum(newImages);
  const { data: album } = useGetDoc("albums", "album", id);
  const { data: images } = useGetCol("images", {
    album: id,
  });
  const createNewAlbum = useCreateNewAlbum(selectedImages, album);

  /* Update album name */
  const editName = useFirestoreDocumentMutation(
    doc(collection(db, "albums"), id),
    {
      merge: true,
    }
  );

  /* Edit album name */
  const handleEditName = () => {
    setEdit(false);
    if (edit) {
      editName.mutate({
        name: albumNameRef.current.value,
      });
    }
  };

  /* Add images */
  const handleAdd = () => {
    setAdd(!add);
    if (!acceptedFiles.length) {
      return;
    }
    uploadAlbum.upload(acceptedFiles, id);
  };

  /* Create new album */
  const handleNewAlbum = async (e) => {
    e.preventDefault();
    await createNewAlbum.upload();
  };

  /* Image dropzone */
  const {
    getRootProps,
    getInputProps,
    acceptedFiles,
    isDragActive,
    isDragAccept,
  } = useDropzone({
    accept: "image/gif, image/jpeg, image/png, image/webp",
    handleAdd,
  });

  /* Dropped images */
  useEffect(() => {
    if (acceptedFiles) {
      setNewImages(acceptedFiles);
    }
  }, [acceptedFiles]);

  return (
    <>
      {album && (
        <Container className="my-5">
          {/* Edit album name */}
          {edit ? (
            <InputGroup className="mb-3">
              <FormControl
                required
                type="text"
                defaultValue={album.name}
                ref={albumNameRef}
              />
              <Button variant="primary" onClick={handleEditName}>
                Save album name
              </Button>
            </InputGroup>
          ) : (
            <h1>{album.name}</h1>
          )}

          {/* Buttons */}
          {currentUser && (
            <>
              <Button
                className="mx-1 my-2"
                onClick={() => setEdit(!edit)}
                variant={edit ? "danger" : "secondary"}
              >
                {edit ? "back" : "✏️"}
              </Button>
            </>
          )}
          {/* Drop zone */}
          {edit && (
            <>
              <ImageDropzone
                params={{
                  uploadAlbum,
                  acceptedFiles,
                  getRootProps,
                  getInputProps,
                  isDragActive,
                  isDragAccept,
                }}
              />
              <Button className="my-2" onClick={handleAdd}>
                upload images
              </Button>
            </>
          )}

          {/* Images */}
          {edit ? (
            <>
              <ImageList
                images={images}
                edit={edit}
                setSelectedImages={setSelectedImages}
                selectedImages={selectedImages}
              />
              <p>Click on images to select</p>
              <Button onClick={handleNewAlbum}>
                Create new album with selected photos
              </Button>
            </>
          ) : (
            <Form onSubmit={handleNewAlbum}>
              <>
                <SRLWrapper>
                  <ImageList
                    images={images}
                    edit={edit}
                    setSelectedImages={setSelectedImages}
                    selectedImages={selectedImages}
                    dislikedImages={dislikedImages}
                    setDislikedImages={setDislikedImages}
                  />
                </SRLWrapper>
                {!currentUser && (
                  <>
                    <p>
                      {selectedImages?.length}/{images?.length}
                      images selected
                    </p>
                    <SelectedImages
                      images={images}
                      selectedImages={selectedImages}
                      dislikedImages={dislikedImages}
                      handleNewAlbum={handleNewAlbum}
                    />
                  </>
                )}
              </>
            </Form>
          )}
        </Container>
      )}
    </>
  );
};

export default AlbumPage;
