
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { Navigate } from "react-router-dom";

// HOC => Higher Order Component

function IsAdmin({ children }) {
  const { isAdmin } = useContext(AuthContext);

  // si el usuario esta logeado, renderiza el componente children
  if (isAdmin) {
    return children;
  } else {
    // si no esta logeado redirecciona ao tro lugar
    // React no nos permite usar navigate en la base del componente
    // Entonces en estos casos usamos el component Navigate
    return <Navigate to="/" />;
  }
}

export default IsAdmin;
