import { useContext } from "react";
import { CounterContext } from "./CounterContext";

const ChangeCounter = () => {
  const { setCounter } = useContext(CounterContext);

  const incrementCounter = () => {
    setCounter((current) => current + 1);
  };

  const decrementCounter = () => {
    setCounter((current) => current - 1);
  };

  return (
    <div>
      <button onClick={incrementCounter}>Incrementar</button>
      <button onClick={decrementCounter}>Decrementar</button>
    </div>
  );
};

export default ChangeCounter;
