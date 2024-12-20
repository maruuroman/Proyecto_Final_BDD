import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./EquipmentRental.module.css";
import PropTypes from "prop-types"; 

const EquipamientRental = ({handleRentEquipment }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [equipamiento, setEquipamiento] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEquipamiento = async () => {
      try {
        const response = await fetch(`http://localhost:5000/equipamiento/${id}`);
        if (!response.ok) throw new Error("Error al cargar el equipamiento");
        const data = await response.json();
        setEquipamiento(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchEquipamiento();
  }, [id]); // id es una dependencia adecuada.
  

  const handleAlquilar = async (equipamientoId) => {
    try {
        const ci = localStorage.getItem("ci");
        if (!ci) {
          throw new Error("No se encontró la cédula del alumno.");
        }
        await handleRentEquipment(equipamientoId,ci);
        alert("Equipamiento alquilado con éxito.");
      } catch (error) {
        alert(`Error al alquilar el equipamiento: ${error.message}`);
      }
    };
    if (error) {
      return <p>Error: {error}</p>;
    }
      
  if (!equipamiento.length) {
    return <p>No hay equipamientos disponibles.</p>;
  }

  return (
    <div className={styles.equipamientoContainer}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        Volver
      </button>
      <h1 className={styles.header}>Equipamiento disponible</h1>
      <div className={styles.grid}>
      {equipamiento.map((item) => (
          <div key={item.id} className={styles.card}>
            <h3>{item.descripcion}</h3>
            <p>
              <strong>Costo:</strong> ${item.costo}
            </p>
            <button
              className={styles.rentButton}
              onClick={() => handleAlquilar(item.id)}
            >
              Alquilar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};


EquipamientRental.propTypes = {
  handleRentEquipment: PropTypes.func.isRequired,
};


export default EquipamientRental;