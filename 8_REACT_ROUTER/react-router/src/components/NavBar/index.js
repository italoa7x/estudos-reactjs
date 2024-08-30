import { NavLink } from "react-router-dom";
import "./styles.css";
const NavBar = () => {
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/about">About</NavLink>
    </nav>
  );
};

export default NavBar;
