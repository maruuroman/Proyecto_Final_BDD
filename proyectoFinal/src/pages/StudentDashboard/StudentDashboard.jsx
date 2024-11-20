import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ActivityList from "../../components/ActivityList/ActivityList";
import styles from "./StudentDashboard.module.css"; // Asegúrate de importar tus estilos CSS

const StudentDashboard = ({ fetchActivities }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false); // Cierra el menú después de navegar
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirigir a login si no está autenticado
      return;
    }

    // Cargar las actividades desde el backend
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
    <div className={styles.dashboardContainer}>
      <div className={styles.headerBar}>
        <div className={styles.menuTrigger} onClick={toggleDropdown}>
          ≡
        </div>
        {isOpen && (
          <div className={styles.dropdownContent}>
            <button onClick={() => handleNavigation('/')}>Inicio</button>
            <button onClick={() => handleNavigation('/equipos')}>Alquiler de Equipos</button>
            <button onClick={() => handleNavigation('/inscripciones')}>Mis Inscripciones</button>
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
