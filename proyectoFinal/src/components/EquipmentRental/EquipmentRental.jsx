import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./EquipmentRental.module.css";

const EquipamientRental = ({handleRentEquipment }) => {
  const { id } = useParams();
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
      const id_clase = localStorage.getItem("id_clase");
      await handleRentEquipment(equipamientoId,ci, id_clase);
      alert("Equipamiento alquilado con éxito.");
    } catch (error) {
      alert("Error al alquilar el equipamiento.", error);
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
export default EquipamientRental;