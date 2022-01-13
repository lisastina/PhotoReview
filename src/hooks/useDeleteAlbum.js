import { db } from "../firebase";
import { useState } from "react";
import { doc, deleteDoc } from "firebase/firestore";

const useDeleteAlbum = (album) => {
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(null);

  const deleteAlbum = async () => {
    setError(null);
    setIsError(false);
    setIsDeleting(true);

    try {
      // await deleteObject(ref(storage, meme.path));

      await deleteDoc(doc(db, "albums", album._id));
      setIsDeleting(false);
    } catch (e) {
      setError(e.message);
      setIsError(true);
      setIsDeleting(false);
    }
  };

  return {
    error,
    isError,
    isDeleting,
    deleteAlbum,
  };
};

export default useDeleteAlbum;
