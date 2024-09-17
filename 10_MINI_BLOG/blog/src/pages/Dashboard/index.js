import { useAuthValue } from "../../context/authContext";
import { Link } from "react-router-dom";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import "./styles.css";
import { useDeletedDocument } from "../../hooks/useDeleteDocument";
const Dashboard = () => {
  const { user } = useAuthValue();
  const { documents: posts, loading } = useFetchDocuments(
    "posts",
    null,
    user?.uid
  );

  const { deleteDocument } = useDeletedDocument("posts");
  if (loading) {
    return <p>Carregando seus posts...</p>;
  }
  return (
    <div className={"dashboard"}>
      <h2>Dashboard</h2>
      <p>Gerencie os seus posts</p>
      {posts && posts.length === 0 ? (
        <div className={"noposts"}>
          <p>Não foram encontrados posts</p>
          <Link to="/posts/create" className="btn">
            Criar primeiro post
          </Link>
        </div>
      ) : (
        <div className={"post-header"}>
          <span>Título</span>
          <span>Ações</span>
        </div>
      )}

      {posts &&
        posts.map((post) => (
          <div className={"post-row"} key={post.id}>
            <p>{post.title}</p>
            <div className={"actions"}>
              <Link to={`/posts/${post.id}`} className="btn btn-outline">
                Ver
              </Link>
              <Link to={`/posts/edit/${post.id}`} className="btn btn-outline">
                Editar
              </Link>
              <button
                onClick={() => deleteDocument(post.id)}
                className="btn btn-outline btn-danger"
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Dashboard;
