import { Link } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { AiOutlineHome } from "react-icons/ai";
import "./Navbar.css";

export const Navbar = () => {
  return (
    <nav className="nav-container">
      <Header title="Lista de Tareas" />
      <Link className="btn-nav" to={"/"}>
        <AiOutlineHome className="icon" />
      </Link>
    </nav>
  );
};
