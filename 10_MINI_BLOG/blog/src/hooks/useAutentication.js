import { getAuth } from "firebase/auth";
import { authenticate, createAccount } from "../services/auth";
import { getToken } from "../services/token";
import { clearStorage, setItem } from "../utils/session-storage";
const { useState, useEffect } = require("react");
export const useAuthentication = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cancelled, setCancelled] = useState(false);
  const [successCreateAccount, setSuccessCreateAccount] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const token = getToken();

  const auth = getAuth();
  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  useEffect(() => {
    // exibe a msg de sucesso e some depois de 5 segundos
    if (successCreateAccount) {
      setTimeout(() => {
        setSuccessCreateAccount(false);
      }, 5000);
    }
  }, [successCreateAccount]);

  useEffect(() => {
    setIsAuthenticated(token !== null);
  }, [token]);

  function checkIfIsCancelled() {
    if (cancelled) {
      return;
    }
  }

  const createUser = async (data) => {
    checkIfIsCancelled();
    setLoading(true);
    setError("");
    setSuccessCreateAccount(false);

    try {
      const userData = {
        username: data.displayName,
        password: data.password,
        email: data.email,
      };
      const userCreated = await createAccount(userData);

      setSuccessCreateAccount(userCreated?.data !== null);

      setUser(userCreated?.data);

      return user;
    } catch (error) {
      console.error("Erro ao cadastrar usuario ", error);
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
    // signOut(auth);
    clearStorage();
  };

  const login = async (data) => {
    checkIfIsCancelled();
    setLoading(true);
    setError(false);
    try {
      const userData = {
        username: data?.username,
        password: data?.password,
      };

      const userLogged = await authenticate(userData);

      if (userLogged?.data) {
        setItem("token", userLogged.data?.token);
      }
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
    successCreateAccount,
    isAuthenticated,
    createUser,
    logout,
    login,
  };
};
