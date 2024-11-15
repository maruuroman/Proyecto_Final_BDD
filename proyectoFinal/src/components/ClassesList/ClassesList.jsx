import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "./ClassesList.css";

const ClassesList = ({ classes, setClasses }) => {
  const navigate = useNavigate();

  const deleteClassById = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/clases?id=${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setClasses(classes.filter((classItem) => classItem.id !== id));
      } else {
        console.error("Error al eliminar la clase");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  const canModifyOrDelete = (startTime) => {
    const currentTime = new Date();
    return new Date(startTime) > currentTime; // Solo se puede modificar o eliminar si no ha comenzado.
  };

  return (
    <div className="classesList">
      {classes.map((classItem) => (
        <div key={classItem.id} className="classBox">
          <h3>{classItem.title}</h3>
          <p>Instructor: {classItem.instructor}</p>
          <p>Turno: {classItem.shift}</p>
          <p>Actividad: {classItem.activity}</p>
          {canModifyOrDelete(classItem.startTime) ? (
            <>
          <button
            className="detailsButton"
            onClick={() => navigate(`/class/${classItem.id}`)}
          >
            Detalles
          </button>
          <button
            className="deleteButton"
            onClick={() => deleteClassById(classItem.id)}
          >
            Borrar
          </button>
          </>
        ) : (
          <p className="notice">Clase en progreso. No se puede modificar.</p>
        )}
        </div>
      ))}
    </div>
  );
};

ClassesList.propTypes = {
  classes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      instructor: PropTypes.string.isRequired,
      shift: PropTypes.string.isRequired,
      activity: PropTypes.string.isRequired,
      startTime: PropTypes.string.isRequired,
    })
  ).isRequired,
  setClasses: PropTypes.func.isRequired,
};

export default ClassesList;
