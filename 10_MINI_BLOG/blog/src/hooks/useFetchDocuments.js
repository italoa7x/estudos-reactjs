import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
} from "firebase/firestore";
export const useFetchDocuments = (docCollection, search = null, uid = null) => {
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (cancelled) {
        return;
      }
      setLoading(true);
      const collectionRef = await collection(db, docCollection);

      try {
        let q;
        if (search) {
          q = await query(
            collectionRef,
            where("tag", "array-contains", search),
            orderBy("createdAt", "desc")
          );
        } else if (uid) {
          q = await query(
            collectionRef,
            where("uid", "==", uid),
            orderBy("createdAt", "desc")
          );
        } else {
          q = await query(collectionRef, orderBy("createdAt", "desc"));
        }
        await onSnapshot(q, (querySnapshot) => {
          setDocuments(
            querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          );
        });
      } catch (error) {
        console.log(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }

      setLoading(false);
    }

    loadData();
  }, [docCollection, search, uid, cancelled]);

  useEffect(() => () => setCancelled(true), []);
  return {
    documents,
    error,
    loading,
  };
};
