import { useState } from "react";
import PropTypes from "prop-types"; // Importa PropTypes

const LoginPage = ({ onLogin }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onLogin(formData);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {error && <p className="error">{error}</p>}
      <form className="loginForm" onSubmit={handleSubmit}>
        <h2>Iniciar sesión</h2>
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
