import { useEffect, useState } from "react";
import { useAuthentication } from "../../hooks/useAutentication";
import "./styles.css";
const Register = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");

  const {
    createUser,
    error: authError,
    loading,
    successCreateAccount,
  } = useAuthentication();

  useEffect(() => {
    if (password && passwordConfirmation && password !== passwordConfirmation) {
      setError("As senhas precisam ser iguais!");
    } else {
      setError("");
    }
  }, [password, passwordConfirmation]);

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      displayName,
      email,
      password,
    };

    const res = await createUser(user);

    if (res) {
      clearError();
      clearForm();
    }
  };

  const clearError = () => {
    setError("");
  };

  const clearForm = () => {
    setDisplayName("");
    setEmail("");
    setPassword("");
    setPasswordConfirmation("");
  };

  return (
    <div className="register">
      <h1>Cadastre-se para postar</h1>
      <p>Crie seu usuário e compartilhe suas ideias com o mundo!</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Nome:</span>
          <input
            type="text"
            name="displayName"
            placeholder="Nome do usuário"
            required
            onChange={(e) => setDisplayName(e.target.value)}
            value={displayName}
          />
        </label>

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

        <label>
          <span>Confirmação de senha</span>
          <input
            type="password"
            name="password"
            placeholder="Confirme sua senha"
            required
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            value={passwordConfirmation}
          />

          {!loading && <button className="btn">Cadastrar</button>}

          {loading && (
            <button className="btn" disabled>
              Aguarde...
            </button>
          )}
          {error && <p className="error">{error}</p>}

          {successCreateAccount && (
            <p className="card-success">Usuário criado com sucesso!</p>
          )}
        </label>
      </form>
    </div>
  );
};
export default Register;
