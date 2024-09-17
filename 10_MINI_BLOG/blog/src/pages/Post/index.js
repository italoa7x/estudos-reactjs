import { useParams } from "react-router-dom";
import "./styles.css";
import { useFetchDocument } from "../../hooks/useFetchDocument";

const Post = () => {
  const { id } = useParams();
  const { document, loading } = useFetchDocument("posts", id);

  return (
    <div className="post-container">
      {loading && <p>Carregando post..</p>}
      {document && <h1>{document.title}</h1>}
      <img src={document?.image} alt={document?.title} />
      <p>{document?.body}</p>
      <h3>Este post trata sobre:</h3>
      <div className="tags">
        {document?.tag?.map((x) => (
          <p key={x}>
            <span>#</span>
            {x}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Post;
