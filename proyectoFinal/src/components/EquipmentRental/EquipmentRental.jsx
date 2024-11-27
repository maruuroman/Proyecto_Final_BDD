import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const EquipamientRental = () => {
  const { id } = useParams();
  const [equipamiento, setEquipamiento] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEquipamiento = async () => {
      try {
        const response = await fetch(`http://localhost:5000/equipamiento/${id}/disponibles`);
        if (!response.ok) throw new Error("Error al cargar el equipamiento");
        const data = await response.json();
        setEquipamiento(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchEquipamiento();
  }, [id]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!equipamiento.length) {
    return <p>No hay equipamientos disponibles.</p>;
  }

  return (
    <div>
      <h1>Equipamiento para la Actividad</h1>
      <ul>
        {equipamiento.map((item) => (
          <li key={item.id}>{item.descripcion} - ${item.costo}</li>
        ))}
      </ul>
    </div>
  );
};

export default EquipamientRental;
