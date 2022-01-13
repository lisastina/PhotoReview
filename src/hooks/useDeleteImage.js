import { db } from "../firebase";
import { useState } from "react";
import { doc, deleteDoc } from "firebase/firestore";

const useDeleteimage = (image) => {
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(null);

  const deleteImage = async () => {
    setError(null);
    setIsError(false);
    setIsDeleting(true);

    try {
      // await deleteObject(ref(storage, meme.path));

      await deleteDoc(doc(db, "images", image._id));
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
    deleteImage,
  };
};

export default useDeleteimage;
