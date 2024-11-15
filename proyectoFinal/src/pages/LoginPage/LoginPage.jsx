import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.css";

const LoginForm = () => {
  const [formData, setFormData] = useState({ correo: "", contraseña: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Error de inicio de sesión");

      // Guardar token en localStorage o Context API
      localStorage.setItem("token", data.token);

      // Redirigir según el rol
      //const role = formData.correo.endsWith("@correo.ucu.edu.uy") ? "alumno" : "instructor";
      if (data.role === "alumno") {
        navigate("/dashboard-alumno");
      } else if (data.role === "instructor") {
        navigate("/dashboard-instructor");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.loginForm}>
      <h2>Iniciar sesión</h2>
      {error && <p className={styles.error}>{error}</p>}
      <input
        type="email"
        name="correo"
        placeholder="Correo electrónico"
        value={formData.correo}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="contraseña"
        placeholder="Contraseña"
        value={formData.contraseña}
        onChange={handleChange}
        required
      />
      <button type="submit">Iniciar sesión</button>
    </form>
  );
};

export default LoginForm;
