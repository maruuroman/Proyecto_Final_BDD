import styles from "./ActivityList.module.css";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const ActivityList = ({ activities }) => {
  const navigate = useNavigate();

  const handleDetails = (activityId) => {
    navigate(`/details/${activityId}`); // Asegúrate de que la ruta sea '/details/:id'
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
      id: PropTypes.number.isRequired,
      descripcion: PropTypes.string.isRequired,
      edad_minima: PropTypes.number,
    })
  ).isRequired,
};

export default ActivityList;
