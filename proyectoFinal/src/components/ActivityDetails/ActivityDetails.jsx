import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types"; // Importar PropTypes
import styles from "./ActivityDetails.module.css";

const ActivityDetails = ({ getActivityDetails }) => {
  const { id } = useParams(); // Extraer "id" directamente
  const navigate = useNavigate();
  const [clases, setClases] = useState([]); // Cambiado a plural para reflejar que son varias clases
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await getActivityDetails(id);
        setClases(data); // Asignar el array de clases
      } catch (err) {
        setError(err.message);
      }
    };

    fetchDetails();
  }, [id, getActivityDetails]);

  if (error) {
    return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;
  }

  if (!clases.length) {
    return <p style={{ textAlign: "center" }}>Cargando detalles de la actividad...</p>;
  }

  return (
    <div className={styles.detailsContainer}>
      <h1 className={styles.detailsHeader}>Detalles de la Actividad</h1>
      <div className={styles.classesList}>
        {clases.map((clase) => (
          <div key={clase.id} className={styles.detailBox}>
            <p className={styles.detailItem}>
  <strong>Fecha:</strong> {new Date(clase.fecha_clase).toLocaleDateString()}
</p>

            <p className={styles.detailItem}>
              <strong>Tipo:</strong> {clase.tipo_clase}
            </p>
            <p className={styles.detailItem}>
              <strong>Instructor:</strong> {clase.instructor_nombre} {clase.instructor_apellido}
            </p>
            <p className={styles.detailItem}>
              <strong>Dictada:</strong> {clase.dictada ? "Sí" : "No"}
            </p>
          </div>
        ))}
      </div>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        Volver
      </button>
    </div>
  );
};

// Validar las props con PropTypes
ActivityDetails.propTypes = {
  getActivityDetails: PropTypes.func.isRequired, // Se espera una función obligatoria
};

export default ActivityDetails;
