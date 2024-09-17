import { useQuery } from "../../hooks/useQuery";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import Post from "../../components/Post";
import { Link } from "react-router-dom";
import "./styles.css";
const Search = () => {
  const query = useQuery();
  const search = query.get("q");
  const { documents: posts } = useFetchDocuments("posts", search);

  return (
    <div className="search-container">
      <h2>Search</h2>

      <div>
        {posts && posts?.length === 0 && (
          <div className="noposts">
            <p>Não foram encontrados posts a partir da sua busca...</p>
            <Link to="/" className="btn btn-dark">
              Voltar
            </Link>
          </div>
        )}
        {posts && posts?.map((post) => <Post key={post?.id} post={post} />)}
      </div>
    </div>
  );
};

export default Search;
