import { useState } from "react";
import "./App.css";
import CustomButton from "./components/CustomButton";
import CustomRender from "./components/CustomRender";
import FirstComponent from "./components/FirstComponent";
import TemplateExpression from "./components/TemplateExpression";

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  const clickEvent = () => {
    console.log("botao clicado");
  };


  setTimeout(() => {
    setIsAdmin(true)
  }, 2000)

  return (
    <div className="App">
      <span>Fundamentos</span>

      <FirstComponent></FirstComponent>

      <TemplateExpression></TemplateExpression>

      <CustomButton actionClick={clickEvent}></CustomButton>

      <CustomRender isAdmin={isAdmin}></CustomRender>
    </div>
  );
}

export default App;
