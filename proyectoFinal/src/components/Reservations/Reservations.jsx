import  { useEffect, useState } from "react";
import styles from "./Reservations.module.css";

const Reservations = () => {
  const [reservas, setReservas] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const response = await fetch("http://localhost:5000/reservas");
        if (!response.ok) throw new Error("Error al cargar las reservas");
        const data = await response.json();
        setReservas(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchReservas();
  }, []);

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  if (!reservas.length) {
    return <p>No tienes reservas actualmente.</p>;
  }

  return (
    <div className={styles.reservationsContainer}>
      <h1 className={styles.header}>Mis Reservas</h1>
      <ul className={styles.reservationList}>
        {reservas.map((reserva) => (
          <li key={reserva.id} className={styles.reservationItem}>
            <h3>{reserva.descripcion}</h3>
            <p>
              <strong>Fecha:</strong> {reserva.fecha}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reservations;
