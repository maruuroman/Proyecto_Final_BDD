import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import PropTypes from "prop-types";

const StudentDashboard = ({ fetchActivities }) => {
  const navigate = useNavigate();
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirigir a login si no está autenticado
      return;
    }

    // Cargar las actividades desde el backend
    const loadActivities = async () => {
      try {
        const data = await fetchActivities();
        setActivities(data);
      } catch  {
        setError("Error al cargar las actividades.");
      }
    };

    loadActivities();
  }, [navigate, fetchActivities]);

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div>
      <h1>Dashboard del Alumno</h1>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {activities.map((activity) => (
          <div
            key={activity.id}
            style={{
              border: "1px solid #ccc",
              padding: "20px",
              borderRadius: "8px",
              width: "250px",
            }}
          >
            <h3>{activity.name}</h3>
            <p>{activity.description}</p>
            <Link to={`/student/activity/${activity.id}`}>
              <button>Detalles</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

// Validación de las props
StudentDashboard.propTypes = {
  fetchActivities: PropTypes.func.isRequired, // Se espera una función y es requerida
};

export default StudentDashboard;
