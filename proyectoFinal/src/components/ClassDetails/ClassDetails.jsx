import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./ClassDetails.module.css";

const ClassDetails = () => {
  const { activityId } = useParams();
  const navigate = useNavigate();
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error


  useEffect(() => {
    const fetchActivityDetails = async () => {
      try {
        setLoading(true); // Iniciamos la carga
        setError(null); // Limpiamos errores anteriores
        const response = await fetch(`/api/activities/${activityId}`); // Petición al backend
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        setActivity(data); // Guardamos los datos de la actividad
      } catch (err) {
        setError(err.message); // Guardamos el mensaje de error
      } finally {
        setLoading(false); // Finalizamos la carga
      }
    };

  fetchActivityDetails();
  }, [activityId]);

  if (loading) {
    return <p>Cargando detalles de la actividad...</p>; // Indicador de carga
  }

  if (error) {
    return <p>Error al cargar los detalles: {error}</p>; // Mensaje de error
  }

  if (!activity) {
    return <p>No se encontraron detalles para esta actividad.</p>; // Manejo de actividad no encontrada
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
            <button className={styles.enrollButton}  onClick={() => handleEnroll(cls.id)}>
              Inscribirse
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const handleEnroll = async (classId) => {
  try {
    const response = await fetch(`/api/classes/${classId}/enroll`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentId: "ID_DEL_ESTUDIANTE" }),
    });
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    alert("¡Inscripción exitosa!");
  } catch (err) {
    alert(`Error al inscribirse: ${err.message}`);
  }
};

ClassDetails.propTypes = {
  activityId: PropTypes.string,
};

export default ClassDetails;
