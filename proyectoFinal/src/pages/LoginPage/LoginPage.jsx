import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const LoginPage = ({ onLogin }) => { 
  const [correo, setCorreo] = useState(""); 
  const [contraseña, setContraseña] = useState("");
  const [role, setRole] = useState(""); 
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Para redirigir al usuario después del login

  const handleLogin = async (e) => {
    e.preventDefault();

    const credentials = { correo, contraseña, role }; // Usamos los nuevos nombres
    try {
      const data = await onLogin(credentials); // Llamamos a la función loginUser pasada como prop

      // Verifica si la respuesta es correcta antes de proceder
      if (data && data.success) {
        console.log("Inicio de sesión exitoso", data);

        // Redirigir según el rol seleccionado
        if (role === "student") {
          navigate("/student");
        } else if (role === "instructor") {
          navigate("/instructor");
        }
      } else {
        setError("Error al iniciar sesión. Verifica tus datos.");
      }
    } catch (error) {
      setError("Error en el proceso de inicio de sesión.");
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
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        >
        <option value="" disabled>
            Selecciona tu rol
          </option>
          <option value="student">Alumno</option>
          <option value="instructor">Instructor</option>
        </select>
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
};

LoginPage.propTypes = {
  onLogin: PropTypes.func.isRequired, 
};

export default LoginPage;
