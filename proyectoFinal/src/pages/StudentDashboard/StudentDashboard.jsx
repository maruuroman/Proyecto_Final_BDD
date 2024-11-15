import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirigir a login si no está autenticado
    }
  }, [navigate]);

  return <h1>Dashboard del Alumno</h1>;
};

export default StudentDashboard;
