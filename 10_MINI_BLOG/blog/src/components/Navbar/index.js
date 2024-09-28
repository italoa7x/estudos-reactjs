import { NavLink } from "react-router-dom";
import { useAuthentication } from "../../hooks/useAutentication";
import "./styles.css";
const Navbar = () => {
  // const { user } = useAuthValue();
  const { logout, isAuthenticated } = useAuthentication();

  return (
    <nav className="navbar">
      <h3>
        <a href="/">
          <span className="mini">Mini</span> <span className="blog">Blog</span>
        </a>
      </h3>
      <ul className="links_list">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Home
          </NavLink>

          {!isAuthenticated && (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Entrar
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Cadastrar
              </NavLink>
            </>
          )}

          {isAuthenticated && (
            <>
              <NavLink
                to="/dashboard"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/create-posts"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Novo post
              </NavLink>
            </>
          )}

          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Sobre
          </NavLink>
        </li>
        {isAuthenticated && (
          <li>
            <button onClick={logout}>Sair</button>
          </li>
        )}
      </ul>
    </nav>
  );
};
export default Navbar;
