import { useState } from "react";
import "./styles.css";
import { Link, useNavigate } from "react-router-dom";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import Post from "../../components/Post";
const Home = () => {
  const [query, setQuery] = useState("");
  const { documents: posts, loading } = useFetchDocuments("posts");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (query) {
      return navigate(`/search?q=${query}`);
    }
  };

  return (
    <div className="home">
      <h1>Veja os posts mais recentes.</h1>

      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          placeholder="ou filtre por tags."
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />
        <button className="btn btn-dark">Pesquisar</button>
      </form>

      <div>
        {loading && <p>Carregando...</p>}
        {!loading &&
          posts &&
          posts?.map((value) => <Post key={value?.id} post={value} />)}

        {!loading && posts && posts.length === 0 && (
          <div className="noposts">
            <p>Não foram escontados nenhum post.</p>
            <Link to="/create-posts" className="btn">
              Criar primeiro post
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
