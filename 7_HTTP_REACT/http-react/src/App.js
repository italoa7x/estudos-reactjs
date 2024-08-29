import { useState } from "react";
import "./App.css";
import { useFetch } from "./hooks/useFetch";
function App() {
  // const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const { data, postData, loading, error, deleteProduct } = useFetch();

  const postProduct = async (e) => {
    e.preventDefault();

    if (name && price) {
      const product = {
        name,
        price,
      };

      await postData(product);
      setName("");
      setPrice("");
    }
  };
  return (
    <div className="App">
      <h1>Produtos</h1>
      {loading && <span>Carregando...</span>}
      {error && <span>{error}</span>}
      {!loading && (
        <ul>
          {data &&
            data.map((value) => (
              <li key={value?.id}>
                {value?.name} - R${value?.price}
                <button
                  className="btn-excluir"
                  onClick={() => deleteProduct(value?.id)}
                >
                  Excluir
                </button>
              </li>
            ))}
        </ul>
      )}

      <div className="add-product">
        <form onSubmit={postProduct}>
          <label>
            Produto
            <input
              type="text"
              name="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </label>

          <label>
            Preço
            <input
              type="text"
              name="price"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
            />
          </label>
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}

export default App;
