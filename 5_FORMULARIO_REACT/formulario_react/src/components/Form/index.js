import { useState } from "react";
import "./styles.css";

const Form = ({ userData }) => {
  const [name, setName] = useState(userData?.name ?? "");
  const [user, setUser] = useState(userData?.user ?? "");
  const [bio, setBio] = useState(userData?.bio ?? "");
  const [role, setRole] = useState(userData?.role ?? "");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(name, user, bio, role);

    setName("");
    setUser("");
    setBio("");
    setRole("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Nome: </label>
        <input
          type="text"
          name="name"
          placeholder="Digite o nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <label>
        <span>Usuário</span>
        <input
          type="text"
          name="user"
          placeholder="Digite o usuário"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
      </label>

      <label>
        <span>Comentário</span>
        <textarea
          name="description"
          placeholder="Digite uma descrição"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
      </label>

      <label>
        <span>Função: </span>
        <select
          name="role"
          onChange={(e) => setRole(e.target.value)}
          value={role}
        >
          <option value="user">Usuário</option>
          <option value="editor">Editor</option>
          <option value="admin">Admin</option>
        </select>
      </label>

      <input type="submit" value="Enviar" />
    </form>
  );
};

export default Form;
