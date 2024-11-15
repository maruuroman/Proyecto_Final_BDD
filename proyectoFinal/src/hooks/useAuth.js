import { useState, useEffect } from "react";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Simulación de validación de autenticación
    const user = JSON.parse(localStorage.getItem("user")); // Recupera datos del usuario almacenados
    if (user) {
      setIsAuthenticated(true);
      setUserRole(user.role); // Define el rol del usuario
    } else {
      setIsAuthenticated(false);
      setUserRole(null);
    }
  }, []);

  return { isAuthenticated, userRole };
};

export default useAuth;
