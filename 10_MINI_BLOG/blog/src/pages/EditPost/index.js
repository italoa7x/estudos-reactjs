import { useEffect, useState } from "react";
import "./styles.css";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";
import { useAuthValue } from "../../context/authContext";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchDocument } from "../../hooks/useFetchDocument";

const EditPost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tag, setTag] = useState([]);
  const [formError, setFormError] = useState("");

  const { updateDocument, response } = useUpdateDocument("posts");

  const { id } = useParams();

  const { document: post, loading: loadingEditPost } = useFetchDocument(
    "posts",
    id
  );

  const { user } = useAuthValue();
  const bodySizeMax = 621;

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    validateUrlImage();

    const tagSplit = tag
      ?.split(",")
      ?.map((value) => value.trim()?.toLowerCase());

    if (!title || !image || !tag || !body) {
      setFormError("Por favor, preencha todos os campos.");
      return;
    }

    if (formError) {
      return;
    }

    const postObj = {
      title,
      image,
      body,
      tag: tagSplit,
      uid: user?.uid,
      createdBy: user?.displayName,
    };
    await updateDocument(id, postObj);
    navigate("/dashboard");
  };

  const validateUrlImage = () => {
    try {
      new URL(image);
    } catch (error) {
      setFormError("A url precisa ser válida.");
    }
  };

  useEffect(() => {
    setTitle(post?.title);
    setBody(post?.body);
    setImage(post?.image);
    setTag(post?.tag?.join(", "));
  }, [post]);

  return (
    <div className="edit-post">
      <h2>Editar post</h2>
      <p>Edite suas ideias...</p>

      {post && (
        <form onSubmit={handleSubmit}>
          <label>
            <span>Título:</span>
            <input
              type="text"
              name="title"
              placeholder="Digite sua ideia..."
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </label>

          <label>
            <span>URL da image:</span>
            <input
              type="text"
              name="image"
              placeholder="Insira a URL da imagem"
              onChange={(e) => setImage(e.target.value)}
              value={image}
            />
          </label>

          <p className="preview-title">Preview da imagem atual: </p>
          <img className="image-preview" src={post?.image} alt={post?.title} />

          <label>
            <span>Conteúdo:</span>
            <textarea
              className="body-post"
              name="body"
              placeholder="Insira o conteúdo do post"
              onChange={(e) => setBody(e.target.value)}
              value={body}
              maxLength={bodySizeMax}
            />
          </label>

          <p className="body-size">
            Quantidade de caracteres: {body?.length}/{bodySizeMax}
          </p>

          <label>
            <span>Tags:</span>
            <input
              type="text"
              name="tags"
              placeholder="Insira as tags separadas por vírgula"
              onChange={(e) => setTag(e.target.value)}
              value={tag}
            />
          </label>
          {!response?.loading && <button className="btn">Editar</button>}

          {response?.loading && (
            <button className="btn" disabled>
              Aguarde...
            </button>
          )}
          {response?.error && <p className="error">{response?.error}</p>}
          {formError && <p className="error">{formError}</p>}
        </form>
      )}
    </div>
  );
};

export default EditPost;
