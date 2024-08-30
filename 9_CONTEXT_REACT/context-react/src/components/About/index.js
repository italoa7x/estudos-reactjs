import { useCounterContext } from "../../hook/useCounterContext";

import { useColorContext } from "../../hook/useColorContext";
const About = () => {
  // const { counter } = useContext(CounterContext);
  const { counter } = useCounterContext();
  const { color, dispatch } = useColorContext();

  const changeColor = () => {
    dispatch({
      type: color,
    });
  };
  return (
    <div style={{ backgroundColor: color }}>
      <p>About</p>
      <span>Valor do contador {counter}</span>

      <button onClick={() => changeColor("BLUE")}>Mudar cor</button>
    </div>
  );
};

export default About;
