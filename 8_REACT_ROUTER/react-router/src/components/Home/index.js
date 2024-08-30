import { Link } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import "./styles.css";

const Home = () => {
  const { data, error } = useFetch();
  return (
    <div>
      <h1>Produtos</h1>
      {error && <p>Erro ao carregar os produtos.</p>}

      <ul className="products">
        {data &&
          data.map((value) => (
            <li key={value?.id}>
              <h2>{value?.name}</h2>
              <p>R$: {value?.price}</p>
              <button>
                <Link to={`/products/${value?.id}`}>Detalhes</Link>
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Home;
