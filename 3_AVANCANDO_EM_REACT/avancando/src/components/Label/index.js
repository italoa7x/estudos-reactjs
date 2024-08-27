import { useState } from "react";
const RandomButton = () => {
  const [label, setLabel] = useState("");

  const randomName = () => {
    const labels = ["State", "ReactJs", "NodeJs", "Typescript"];
    setLabel(labels[Math.floor(Math.random() * labels.length)]);
  };
  return (
    <div>
      <h1 className="label">Label: {label}</h1>

      <button onClick={randomName}>Generate new label</button>
    </div>
  );
};

export default RandomButton;
