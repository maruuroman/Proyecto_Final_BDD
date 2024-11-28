import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types"; 
import styles from "./ActivityDetails.module.css";

const ActivityDetails = ({ getActivityDetails, handleInscription  }) => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [clases, setClases] = useState([]); 
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  

  const handleInscriptionClick = async (classId) => {
    try {
      setLoading(true);
      const ci = localStorage.getItem("ci");
      if (!ci) throw new Error("No se encontró la cédula en el sistema");
      console.log(`Inscribiendo a la clase ${classId} con cédula ${ci}`);
      await handleInscription(classId, ci); 
      alert("¡Inscripción exitosa!");
    } catch (error) {
      console.error("Error en inscripción:", error.message);
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await getActivityDetails(id);
        setClases(data); 
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
        
        <button
          className={styles.subscribeButton}
          onClick={() => handleInscriptionClick(clase.id)}
          disabled={clase.cupos === 0 || loading}
        >
         {loading
                ? "Procesando..."
                : clase.cupos === 0
                ? "Sin cupos"
                : "Inscribirme"}
            </button>
            
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
  handleInscription: PropTypes.func.isRequired,
};

export default ActivityDetails;
