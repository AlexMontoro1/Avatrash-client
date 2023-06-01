import { createContext, useEffect, useState } from "react";
import { verifyService } from "../services/auth.services";
import { Orbit } from '@uiball/loaders'
const AuthContext = createContext();

function AuthWrapper({ children }) {
  // estados y funciones que se van a exportar para ser usadas en todo el contexto
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // la app empieza validando el token, por eso el loading siempre

  // funcion que va a invocar el servicio de verify para validar el usuario

  const authenticateUser = async () => {
    try {
      const response = await verifyService();
      console.log("token validado");
      setIsLoggedIn(true);
      setUser(response.data.payload);
      setIsLoading(false);
    } catch (err) {
      console.log("token invalido o no hay token");
      setIsLoggedIn(false);
      setUser(null);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  // el objeto de contexto que vamos a pasar
  const passedContext = {
    isLoggedIn,
    user,
    authenticateUser,
  };
  if (isLoading) {
    return (
      <div className="App">
        <Orbit 
        textAlign="center"
        size={25}
        speed={1.5} 
        color="black" 
        />
      </div>
    );
  }
  return (
    <AuthContext.Provider value={passedContext}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthWrapper };
