import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Signin from "./auth/Signin";
import Login from "./auth/Login";

import { AuthContext } from "../context/auth.context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom"
import { Nav } from "react-bootstrap";

function NavBar() {
  const navigate = useNavigate();

  const { isLoggedIn, authenticateUser, isAdmin } = useContext(AuthContext);

  const handleLogout = () => {
    // 1. borrar el token
    localStorage.removeItem("authToken");

    // 2 validar en el backEnd que el token fue borrado
    authenticateUser();

    // 3. redireccionamos a "/"
    navigate("/");
  };
  return (
    <Nav  className="custom-navbar d-flex justify-content-around">
      <DropdownButton id="dropdown-basic-button" title="General">
        <Dropdown.Item href="/">Home</Dropdown.Item>
        <Dropdown.Item href="/catalog">Catálogo de Avatares</Dropdown.Item>
        <Dropdown.Item href="/avatar/create">Create Avatar</Dropdown.Item>
      </DropdownButton>

      <DropdownButton id="dropdown-basic-button" title="Personal">
        {!isLoggedIn && <Signin />}
        {!isLoggedIn && <Login />}
        {isLoggedIn && <Dropdown.Item href="/profile">Perfil</Dropdown.Item>}
        {isAdmin() && <Dropdown.Item href="/admin">Admin</Dropdown.Item>}
        {isLoggedIn && (
          <Dropdown.Item onClick={handleLogout}>Cerrar Sesion</Dropdown.Item>
        )}
      </DropdownButton>
    </Nav>
  );
}

export default NavBar;
