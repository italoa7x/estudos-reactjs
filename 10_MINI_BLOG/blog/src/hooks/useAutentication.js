import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { db } from "../firebase/config";

const { useState, useEffect } = require("react");
export const useAuthentication = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cancelled, setCancelled] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  function checkIfIsCancelled() {
    if (cancelled) {
      return;
    }
  }

  const createUser = async (data) => {
    checkIfIsCancelled();
    setLoading(true);
    setError("");

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(user, {
        displayName: data.displayName,
      });
      setUser(user);
      return user;
    } catch (error) {
      console.error(error);
      let errorMsg = "";
      if (error?.message?.includes("Password")) {
        errorMsg = "A senha precisa conter pelo menos 6 caracteres";
      } else if (error?.message?.includes("email-already")) {
        errorMsg = "E-mail já cadastrado";
      } else {
        errorMsg = "Ocorreu um erro!";
      }

      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    checkIfIsCancelled();
    setUser(null);
    signOut(auth);
  };

  const login = async (data) => {
    checkIfIsCancelled();
    setLoading(true);
    setError(false);
    try {
      const { user: userDataLogged } = await signInWithEmailAndPassword(
        auth,
        data?.email,
        data?.password
      );
      setUser(userDataLogged);
    } catch (error) {
      let errorMsg = "";
      if (error?.message?.includes("Password")) {
        errorMsg = "Usuário não encontrado.";
      } else if (error?.message?.includes("wrong-password")) {
        errorMsg = "Senha incorreta.";
      } else {
        errorMsg = "Ocorreu um erro. Tente novamente mais tarde.";
      }
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };
  return {
    user,
    error,
    auth,
    loading,
    createUser,
    logout,
    login,
  };
};
