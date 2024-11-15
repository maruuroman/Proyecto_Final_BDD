import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./StudentDashboard.module.css";


const StudentDashboard = () => {
  const navigate = useNavigate();
  const [studentInfo, setStudentInfo] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirigir a login si no está autenticado
    } else {
        // llamada a la API para obtener información del alumno
        const fetchStudentInfo = async () => {
          const response = await fetch("/api/student", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          setStudentInfo(data);
        };
        fetchStudentInfo();
      }
    }, [navigate]);
  
    return (
        <div className={styles.dashboardContainer}>
        <h1>Dashboard del Alumno</h1>
        {studentInfo ? (
          <div>
            <p>Nombre: {studentInfo.name}</p>
            <p>Email: {studentInfo.email}</p>
            
          </div>
        ) : (
          <p>Cargando...</p>
        )}
      </div>
    );
  };
  
  export default StudentDashboard;