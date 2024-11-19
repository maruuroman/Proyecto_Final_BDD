import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import ActivityList from "../../components/ActivityList/ActivityList";

import styles from "./StudentDashboard.module.css"; 

const StudentDashboard = ({ fetchActivities }) => {
  const navigate = useNavigate();
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);

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
      } catch  {
        setError("Error al cargar las actividades.");
      }
    };

    loadActivities();
  }, [navigate, fetchActivities]);

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

   // Función para eliminar actividad
   const deleteActivityById = (id) => {
    setActivities((prevActivities) =>
      prevActivities.filter((activity) => activity.id !== id)
    );
  };

  return (
    <div className={styles.dashboardContainer}>
      <h1>Dashboard del Alumno</h1>
      <ActivityList
        activities={activities} // Reutilizamos ActivityList para mostrar actividades
        deleteActivityById={deleteActivityById} // Pasamos la función para eliminar
      />
    </div>
  );
};


// Validación de las props
StudentDashboard.propTypes = {
  fetchActivities: PropTypes.func.isRequired, // Se espera una función y es requerida
};

export default StudentDashboard;
