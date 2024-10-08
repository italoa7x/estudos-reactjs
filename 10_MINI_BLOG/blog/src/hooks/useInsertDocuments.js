import { useEffect, useReducer, useState } from "react";
import { db } from "../firebase/config";

import { collection, addDoc, Timestamp } from "firebase/firestore";
const initialState = {
  loading: null,
  error: null,
};

const insertReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return {
        loading: true,
        error: null,
      };
    case "INSERTED_DOC":
      return {
        loading: false,
        error: null,
      };
    case "ERROR":
      return {
        loading: false,
        error: action?.payload,
      };
    default:
      return state;
  }
};

export const useInsertDocument = (docCollection) => {
  const [response, dispatch] = useReducer(insertReducer, initialState);

  const [cancelled, setCancelled] = useState(false);

  const checkCancelBeforeDispatch = (action) => {
    if (!cancelled) {
      dispatch(action);
    }
  };

  const insertDocument = async (doc) => {
    checkCancelBeforeDispatch({
      type: "LOADING",
    });
    try {
      const newDoc = {
        ...doc,
        createdAt: Timestamp.now(),
      };

      const insertDocument = await addDoc(
        collection(db, docCollection),
        newDoc
      );

      checkCancelBeforeDispatch({
        type: "INSERTED_DOC",
        payload: insertDocument,
      });
    } catch (error) {
      checkCancelBeforeDispatch({
        type: "ERROR",
        payload: error?.message,
      });
    }
  };

  useEffect(() => {
    setCancelled(true);
  }, []);

  return {
    insertDocument,
    response,
  };
};
