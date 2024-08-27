import "./App.css";

import Image2 from "./assets/image2.png";
import CustomList from "./components/CustomList";
import Label from "./components/Label";

function App() {
  return (
    <div>
      <h1>Imagens no reactJs</h1>

      <img
        className="img"
        src="/image1.png"
        alt="Imagem da cidade de São Paulo"
      />

      <img className="img" src={Image2} alt="Imagem da cidade de São Paulo" />

      <Label></Label>

      <CustomList dataList={["A", "B", "C", "D"]}></CustomList>
    </div>
  );
}

export default App;
