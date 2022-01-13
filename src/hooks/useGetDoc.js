import { useFirestoreDocumentData } from "@react-query-firebase/firestore";
import { collection, doc } from "firebase/firestore";
import { db } from "../firebase";

const useGetDoc = (col, docName, id) => {
  const colRef = collection(db, col);
  const docRef = doc(colRef, id);

  const docQuery = useFirestoreDocumentData(
    [docName, id],
    docRef,
    {
      subscribe: true,
    },
    {
      refetchOnMount: "always",
    }
  );

  return docQuery;
};

export default useGetDoc;
