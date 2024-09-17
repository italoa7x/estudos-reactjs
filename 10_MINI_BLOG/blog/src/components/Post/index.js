import { Link } from "react-router-dom";
import "./styles.css";

const Post = ({ post }) => {
  return (
    <div className="post">
      <img src={post?.image} alt={post?.title} />
      <h1>{post?.title}</h1>
      <p className="createdBy">{post?.createdBy}</p>
      <div className="tags">
        {post?.tag?.map((tag) => (
          <p key={tag}>
            <span>#</span>
            {tag}
          </p>
        ))}
      </div>
      <Link className="btn btn-outline" to={`/posts/${post?.id}`}>
        Ler
      </Link>
    </div>
  );
};

export default Post;
