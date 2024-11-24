import { useEffect, useState } from "react";
import PropTypes from "prop-types"; // Importa PropTypes para validar las props
import { useParams } from "react-router-dom";

const ClassDetails = ({ fetchActivityDetails }) => {
  const { activityId } = useParams();
  const [activity, setActivity] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadActivityDetails = async () => {
      try {
        const data = await fetchActivityDetails(activityId);
        setActivity(data);
      } catch (err) {
        setError(err.message);
      }
    };

    loadActivityDetails();
  }, [activityId, fetchActivityDetails]);

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  if (!activity) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{activity.name}</h1>
      <p>{activity.description}</p>
      <ul>
        {activity.classes.map((cls) => (
          <li key={cls.id}>
            {cls.title} - Instructor: {cls.instructor}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Validación de las props
ClassDetails.propTypes = {
  fetchActivityDetails: PropTypes.func.isRequired, // Se espera una función y es requerida
};

export default ClassDetails;
