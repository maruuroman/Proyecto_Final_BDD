import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./LoginPage.module.css";

const LoginPage = ({ onLogin }) => {
  const [correo, setCorreo] = useState(""); // Correo en lugar de email
  const [contraseña, setContraseña] = useState(""); // Contraseña en lugar de password
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Para redirigir al usuario después del login

  const handleLogin = async (e) => {
    e.preventDefault();
  
    const credentials = { correo, contraseña };
    try {
      const data = await onLogin(credentials);
      console.log("Datos recibidos del backend:", data); // Verificar los datos
  
      // Verifica si la respuesta tiene los datos correctos
      if (data && data.token && data.role) {
        console.log("Login exitoso", data);
  
        // Almacenar token y rol del usuario en el localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("userRole", data.role); // Asumimos que el backend devuelve un campo 'role'
  
        // Redirigir al dashboard según el rol del usuario
        if (data.role === "student") {
          navigate("/student"); // Redirigir a /student si el rol es "student"
        } else if (data.role === "instructor") {
          navigate("/instructor"); // Redirigir a /instructor si el rol es "instructor"
        }
      } else {
        setError("Error en los datos recibidos.");
      }
    } catch (error) {
      setError("Error en el inicio de sesión");
      console.error("Error en el login:", error); // Verificar si hay errores en el bloque catch
    }
  };
  

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Iniciar sesión</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleLogin} className={styles.loginForm}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
          required
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Iniciar sesión
        </button>
      </form>
    </div>
  );
};

LoginPage.propTypes = {
  onLogin: PropTypes.func.isRequired, // Se espera una función y es requerida
};

export default LoginPage;
