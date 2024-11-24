import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./ActivityDetails.module.css";

const ActivityDetails = ({ getActivityDetails }) => {
  const { id } = useParams(); // Extraer "id" directamente
  const navigate = useNavigate();
  const [clase, setClase] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
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
    <div className={styles.detailsContainer}>
      <h1 className={styles.detailsHeader}>Detalles de la Actividad</h1>
      {clase.map((detalle) => (
        <div key={detalle.id} className={styles.detailBox}>
          <p className={styles.detailItem}><strong>Fecha:</strong> {detalle.fecha_clase}</p>
          <p className={styles.detailItem}><strong>Tipo:</strong> {detalle.tipo_clase}</p>
          <p className={styles.detailItem}>
            <strong>Instructor:</strong> {detalle.instructor_nombre} {detalle.instructor_apellido}
          </p>
          <p className={styles.detailItem}><strong>Dictada:</strong> {detalle.dictada ? "Sí" : "No"}</p>
        </div>
      ))}
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        Volver
      </button>
    </div>
  );
};

export default ActivityDetails;
