import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ onLogin }) => {
  const [formData, setFormData] = useState({ correo: "", contraseña: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Formulario enviado:", formData); // Depuración
    try {
      await onLogin(formData);
      const emailDomain = formData.correo.split('@')[1];
      if (emailDomain === "correo.ucu.edu.uy") {
        navigate("/student");
      } else if (emailDomain === "ucu.edu.uy") {
        navigate("/instructor");
      } else {
        setError("Correo electrónico no válido.");
      }
    } catch (err) {
      console.error("Error de inicio de sesión:", err); // Depuración
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

LoginPage.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LoginPage;
