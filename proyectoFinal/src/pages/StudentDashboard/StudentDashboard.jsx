import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ActivityList from "../../components/ActivityList/ActivityList";
import styles from "./StudentDashboard.module.css";

const StudentDashboard = ({ fetchActivities }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);

  const toggleDropdown = (event) => {
    event.stopPropagation(); // Detiene la propagación para evitar eventos no deseados
    setIsOpen(!isOpen);
  };

  // Función específica para manejar la navegación desde el menú
  const handleMenuNavigation = (path) => {
    setIsOpen(false); // Cierra el menú
    navigate(path); // Navega a la ruta especificada
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const loadActivities = async () => {
      try {
        const data = await fetchActivities();
        setActivities(data);
      } catch {
        setError("Error al cargar las actividades.");
      }
    };

    loadActivities();
  }, [navigate, fetchActivities]);

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div className={styles.dashboardContainer} onClick={() => setIsOpen(false)}>
      <div className={styles.headerBar}>
        <div className={styles.menuTrigger} onClick={toggleDropdown}>≡</div>
        {isOpen && (
          <div className={styles.dropdownContent} onClick={(e) => e.stopPropagation()}>
            <button onClick={() => handleMenuNavigation('/home')}>Inicio</button>
            <button onClick={() => handleMenuNavigation('/equipamiento/alquilar')}>Alquiler de Equipos</button>
            <button onClick={() => handleMenuNavigation('/inscripciones')}>Mis Inscripciones</button>
            <button onClick={() => {
              localStorage.removeItem('token');
              navigate('/login');
            }}>Logout</button>
          </div>
        )}
        <div className={styles.logo}>Dashboard del Alumno</div>
      </div>
      <ActivityList activities={activities} />
    </div>
  );
};

export default StudentDashboard;
