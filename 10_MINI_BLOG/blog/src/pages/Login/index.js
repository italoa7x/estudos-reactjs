import { useEffect, useState } from "react";
import { useAuthentication } from "../../hooks/useAutentication";
import "./styles.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login, error: authError, loading } = useAuthentication();

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    const res = await login(user);

    if (res) {
      clearError();
      clearForm();
    }
  };

  const clearError = () => {
    setError("");
  };

  const clearForm = () => {
    setEmail("");
    setPassword("");
  };

  return (
    <div className="login">
      <h1>Entrar</h1>
      <p>Faça o login para criar seus posts</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>E-mail:</span>
          <input
            type="email"
            name="email"
            placeholder="E-mail do usuário"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
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
