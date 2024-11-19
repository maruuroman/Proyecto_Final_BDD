// ActivityDetails.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getActivityDetails } from '../../services/apiService';  // Asegúrate de que la ruta de importación sea correcta

const ActivityDetails = () => {
  const { id } = useParams();
  const [activityDetails, setActivityDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const details = await getActivityDetails(id);
        setActivityDetails(details);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchDetails();
  }, [id]);

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  if (!activityDetails) {
    return <p>Cargando detalles de la actividad...</p>;
  }

  return (
    <div>
      <h1>Detalles de la Actividad</h1>
      <p>{activityDetails.descripcion}</p>
      {/* Añade más detalles de la actividad si es necesario */}
    </div>
  );
};

export default ActivityDetails;
