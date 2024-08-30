import { NavLink } from "react-router-dom";
import "./styles.css";
const Navbar = () => {
  return (
    <nav>
      <NavLink to={"/"}>Home</NavLink>
      <NavLink to={"/products"}>Products</NavLink>
      <NavLink to={"/about"}>About</NavLink>
    </nav>
  );
};

export default Navbar;
