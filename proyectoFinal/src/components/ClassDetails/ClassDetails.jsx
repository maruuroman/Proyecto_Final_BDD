import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
//import PropTypes from "prop-types";
import styles from "./ClassDetails.module.css";

const ClassDetails = () => {
  const { activityId } = useParams();
  const navigate = useNavigate();
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error


  useEffect(() => {
    // Reemplaza la URL con la API de tu backend
    fetch(`/api/activities/${activityId}`)
      .then((response) => response.json())
      .then((data) => setActivity(data))
      .catch((error) => console.error("Error al cargar la actividad:", error));
  }, [activityId]);

  if (!activity) {
    return <p>Cargando detalles de la actividad...</p>;
  }

  return (
    <div className={styles.classDetailsContainer}>
      <button className={styles.backButton} onClick={() => navigate("/student")}>
        Atrás
      </button>
      <h2>{activity.name}</h2>
      <p>{activity.description}</p>
      <h3>Clases disponibles:</h3>
      <ul>
        {activity.classes.map((cls) => (
          <li key={cls.id}>
            <p>Clase: {cls.title}</p>
            <p>Profesor: {cls.instructor}</p>
            <button className={styles.enrollButton}>Inscribirse</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClassDetails;
