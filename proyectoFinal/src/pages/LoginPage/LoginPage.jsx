import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom"; // Importar useNavigate para redirigir

const LoginPage = ({ onLogin }) => {
  const [formData, setFormData] = useState({ correo: "", contraseña: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Instanciar useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Iniciar sesión con las credenciales
      await onLogin(formData); // Aquí no es necesario guardar 'userData'

      // Redireccionar según el dominio del correo electrónico
      const emailDomain = formData.correo.split('@')[1];

      if (emailDomain === "correo.ucu.edu.uy") {
        navigate("/student"); // Redirigir al Dashboard de Estudiantes
      } else if (emailDomain === "ucu.edu.uy") {
        navigate("/instructor"); // Redirigir al Dashboard de Instructores
      } else {
        setError("Correo electrónico no válido.");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo"
          value={formData.correo}
          onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={formData.contraseña}
          onChange={(e) => setFormData({ ...formData, contraseña: e.target.value })}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

// Validación de las props
LoginPage.propTypes = {
  onLogin: PropTypes.func.isRequired, // Se espera una función y es requerida
};

export default LoginPage;
