import { useState } from "react";
import "./styles.css";
import { useInsertDocument } from "../../hooks/useInsertDocuments";
import { useAuthValue } from "../../context/authContext";
import { Navigate, useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tag, setTag] = useState([]);
  const [formError, setFormError] = useState("");

  const { insertDocument, response } = useInsertDocument("posts");

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
    await insertDocument({
      title,
      image,
      body,
      tag: tagSplit,
      uid: user?.uid,
      createdBy: user?.displayName,
    });

    clearForm();
    navigate("/");
  };

  const validateUrlImage = () => {
    try {
      new URL(image);
    } catch (error) {
      setFormError("A url precisa ser válida.");
    }
  };

  const clearForm = () => {
    setTag([]);
    setBody("");
    setImage("");
    setTitle("");
    setFormError("");
  };
  return (
    <div className="create-post">
      <h2>Criar post</h2>

      <p>Escreva suas ideias...</p>

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
        {!response?.loading && <button className="btn">Cadastrar</button>}

        {response?.loading && (
          <button className="btn" disabled>
            Aguarde...
          </button>
        )}
        {response?.error && <p className="error">{response?.error}</p>}
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default CreatePost;
