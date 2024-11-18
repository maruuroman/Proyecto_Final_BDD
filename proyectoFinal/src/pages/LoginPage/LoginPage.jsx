import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const LoginPage = ({ onLogin }) => {
  const [correo, setCorreo] = useState(""); // Correo en lugar de email
  const [contraseña, setContraseña] = useState(""); // Contraseña en lugar de password
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Para redirigir al usuario después del login

  const handleLogin = async (e) => {
    e.preventDefault();

    const credentials = { correo, contraseña }; // Usamos los nuevos nombres
    try {
      const data = await onLogin(credentials); // Llamamos a la función loginUser pasada como prop

      // Almacenar token y rol del usuario en el localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("userRole", data.role); // Asumimos que el backend devuelve un campo 'role' ('student' o 'instructor')

      // Redirigir al dashboard según el rol del usuario
      if (data.role === "student") {
        navigate("/student"); // Redirigir a /student si el rol es "student"
      } else if (data.role === "instructor") {
        navigate("/instructor"); // Redirigir a /instructor si el rol es "instructor"
      }
    } catch (error) {
      setError("Error en el inicio de sesión");
    }
  };

  return (
    <div>
      <h2>Iniciar sesión</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
          required
        />
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
};

LoginPage.propTypes = {
  onLogin: PropTypes.func.isRequired, // Se espera una función y es requerida
};

export default LoginPage;
