import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ActivityDetails = ({ getActivityDetails }) => {
  const { id } = useParams(); // Extraer "id" directamente
  const [clase, setClase] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!id) {
        setError("El ID de la actividad no es válido");
        return;
      }

      try {
        const data = await getActivityDetails(id);
        setClase(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchDetails();
  }, [id, getActivityDetails]);

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  if (!clase) {
    return <p>Cargando detalles de la actividad...</p>;
  }

  return (
    <div>
      <h1>Detalles de la Actividad</h1>
      {clase.map((clase) => (
      <div key={clase.id}>
        <p>Fecha: {clase.fecha_clase}</p>
        <p>Tipo: {clase.tipo_clase}</p>
        <p>Instructor: {clase.instructor_nombre} {clase.instructor_apellido}</p>
        <p>Dictada: {clase.dictada ? "Sí" : "No"}</p>
      </div>
    ))}
    </div>
  );
};

export default ActivityDetails;
