import { useState } from "react";

const FirstComponent = () => {
  const [value, setValue] = useState(0);
  return (
    <div>
      <span>Valor: {value}</span>
      <br />
      <button onClick={() => setValue((value) => value + 1)}>
        incrementar +
      </button>

      <button onClick={() => setValue((value) => value - 1)}>
        decrementar -{" "}
      </button>
    </div>
  );
};
export default FirstComponent;
