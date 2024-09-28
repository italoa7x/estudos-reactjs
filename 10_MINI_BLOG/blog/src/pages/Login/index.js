import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthentication } from "../../hooks/useAutentication";
import "./styles.css";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login, error: authError, loading } = useAuthentication();
  const navigate = useNavigate();
  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      username,
      password,
    };

    const res = await login(user);

    if (res) {
      clearError();
      clearForm();
      navigate("/");
    }
  };

  const clearError = () => {
    setError("");
  };

  const clearForm = () => {
    setUsername("");
    setPassword("");
  };

  return (
    <div className="login">
      <h1>Entrar</h1>
      <p>Faça o login para criar seus posts</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Usuário:</span>
          <input
            type="username"
            name="username"
            placeholder="Digite seu usuário"
            required
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </label>

        <label>
          <span>Senha</span>
          <input
            type="password"
            name="password"
            placeholder="Senha do usuário"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>

        {error && <p className="error">{error}</p>}
        {loading && (
          <button className="btn" disabled>
            Aguarde...
          </button>
        )}
        {!loading && <button className="btn">Logar</button>}
      </form>
    </div>
  );
};

export default Login;
