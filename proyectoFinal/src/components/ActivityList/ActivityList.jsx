import styles from "./ActivityList.module.css"; // Estilos del componente
import PropTypes from "prop-types"; // Validar las props
import { useNavigate } from "react-router-dom"; // Para navegación programática

const ActivityList = ({ activities }) => {
  const navigate = useNavigate(); // Navegación programática

  const handleDetails = (activityId) => {
    navigate(`/clases/${activityId}`); // Redirige a los detalles de la actividad
  };

  return (
    <div className={styles.classesList}>
      {activities.map((activity) => (
        <div key={activity.id} className={styles.classBox}>
          <h3>{activity.descripcion}</h3>
          <p>Edad mínima: {activity.edad_minima}</p>
          <button
            className={styles.detailsButton}
            onClick={() => handleDetails(activity.id)}
          >
            Detalles
          </button>

        </div>
      ))}
    </div>
  );
};

ActivityList.propTypes = {
  activities: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired, // ID de la actividad
      descripcion: PropTypes.string.isRequired, // Nombre de la actividad
      edad_minima: PropTypes.number, // Descripción de la actividad
    })
  ).isRequired, // Lista de actividades es requerida

};

export default ActivityList;
