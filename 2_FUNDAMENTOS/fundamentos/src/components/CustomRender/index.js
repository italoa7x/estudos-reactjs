import { useEffect, useState } from "react";
const CustomRender = ({ isAdmin }) => {
  const [label, setLabel] = useState("");
  useEffect(() => {
    setLabel(isAdmin ? "Admin" : "usuário");
  }, [isAdmin]);

  return <h1>Sema bem vindo(a), {label}</h1>;
};
export default CustomRender;
