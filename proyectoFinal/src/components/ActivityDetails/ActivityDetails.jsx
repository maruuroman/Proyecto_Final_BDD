import { useEffect, useState } from "react";
import PropTypes from "prop-types"; // Validar las props
import { useParams } from "react-router-dom";

const ActivityDetails = ({ fetchClassesByActivity }) => {
  const { activityId } = useParams(); // ID de la actividad seleccionada
  const [classes, setClasses] = useState([]); // Lista de clases de la actividad
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadClasses = async () => {
      try {
        const data = await fetchClassesByActivity(activityId); // Fetch clases asociadas a la actividad
        setClasses(data);
      } catch (err) {
        setError(err.message);
      }
    };

    loadClasses();
  }, [activityId, fetchClassesByActivity]);

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  if (!classes.length) {
    return <p>No hay clases disponibles para esta actividad o están cargando...</p>;
  }

  return (
    <div>
      <h1>Clases para la Actividad</h1>
      <ul>
        {classes.map((cls) => (
          <li key={cls.id}>
            <strong>{cls.title}</strong> - Instructor: {cls.instructor} - Edad mínima: {cls.edad_minima}
          </li>
        ))}
      </ul>
    </div>
  );
};

ActivityDetails.propTypes = {
  fetchClassesByActivity: PropTypes.func.isRequired, // Se espera una función que obtenga clases
};

export default ActivityDetails;
