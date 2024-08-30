import { useColorContext } from "../../hook/useColorContext";

const Products = () => {
  const { color, dispatch } = useColorContext();

  const changeColor = (color) => {
    dispatch({ type: color });
  };
  return (
    <div style={{ backgroundColor: color }}>
      <span>Products</span>

      <button onClick={() => changeColor("YELLOW")}>Mudar cor</button>
    </div>
  );
};

export default Products;
