import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./EquipmentRental.module.css";

const EquipmentRental = ({ equipment }) => {
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [ciAlumno, setCiAlumno] = useState(null);
  const [message, setMessage] = useState("");

  /* Efecto para cargar el CI del alumno al cargar el componente
  useEffect(() => {
    fetch('/alumno/ci')
      .then((response) => response.json())
      .then((data) => {
        setCiAlumno(data.ci_alumno); 
      })
      .catch((error) => {
        console.error("Error al obtener el CI del alumno:", error);
        setMessage("No se pudo cargar la información del alumno.");
      });
  }, []);
*/
  const handleRent = () => {
    if (!ciAlumno || !selectedEquipment) {
      setMessage("Falta información para realizar el alquiler.");
      return;
    }

    const alquilerData = {
      ci_alumno: ciAlumno,
      id_equipamiento: selectedEquipment,
    };

    fetch('/equipamiento/alquilar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(alquilerData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          setMessage(`Alquiler exitoso: ${data.message}`);
        } else {
          setMessage(`Error: ${data.error}`);
        }
      })
      .catch((error) =>
        setMessage(`Error en la solicitud: ${error.message}`)
      );
  };

  return (
    <div className={styles.equipmentRental}>
      <h2>Alquilar Equipamiento</h2>
      <div>
        <label htmlFor="equipment-select">Selecciona un equipamiento:</label>
        <select
          id="equipment-select"
          value={selectedEquipment || ""}
          onChange={(e) => setSelectedEquipment(e.target.value)}
        >
          <option value="" disabled>
            -- Seleccionar --
          </option>
          {equipment.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name} - {item.price} USD
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleRent}>Alquilar</button>
      {message && <p>{message}</p>}
    </div>
  );
};

EquipmentRental.propTypes = {
  equipment: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default EquipmentRental;
