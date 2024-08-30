import { useContext } from "react";
import { TitleColorContext } from "../context/TitleColorContext";

export const useColorContext = () => {
  const context = useContext(TitleColorContext);

  return context ? context : new Error("Contexto não encontrado");
};
