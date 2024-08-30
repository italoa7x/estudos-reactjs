import ChangeCounter from "../../context/ChangeCounter";
import { useColorContext } from "../../hook/useColorContext";
import { useCounterContext } from "../../hook/useCounterContext";

const Home = () => {
  const { counter } = useCounterContext();
  const { color, dispatch } = useColorContext();

  const changeColor = (color) => {
    dispatch({ type: color });
  };
  return (
    <div style={{ backgroundColor: color }}>
      <span>Home</span>

      <h2>Counter: {counter && counter}</h2>

      <ChangeCounter />

      <button onClick={() => changeColor("RED")}>Mudar cor</button>
    </div>
  );
};

export default Home;
