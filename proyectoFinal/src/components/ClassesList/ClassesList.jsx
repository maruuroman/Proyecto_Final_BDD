import styles from "./ClassesList.module.css"; // Importa los estilos específicos del componente
import PropTypes from "prop-types"; // Importa la validación de tipos de propiedades
import { useNavigate } from "react-router-dom"; // Importa la función para navegación programática

const ClassesList = ({ classes, deleteClassById }) => {
  const navigate = useNavigate(); // Obtiene la función de navegación para redireccionar

  return (
    <div className={styles.classesList}>
      {classes.map((activity) => ( // Itera sobre la lista de clases para renderizarlas
        <div key={activity.id} className={styles.classBox}> {/* Contenedor de cada clase */}
          <h3>{activity.descripcion}</h3> {/* Muestra el título de la clase */}
          <p>Edad mínima: {activity.edad_minima}</p>
          <button
            className={styles.detailsButton}
            onClick={() => navigate(`/class/${activity.id}`)}> {/* Navega a la página de detalles */}
            Detalles
          </button>
          <button className={styles.deleteButton}
            onClick={() => deleteClassById(activity.id)}> {/* Llama a la función para borrar la clase */}
            Borrar
          </button>
        </div>
      ))}
    </div>
  );
};

ClassesList.propTypes = {
  classes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired, // El ID de la clase es obligatorio
      title: PropTypes.string.isRequired, // El título de la clase es obligatorio
      description: PropTypes.string, // La descripción de la clase es opcional
      players: PropTypes.string, // El número de jugadores es opcional
      categories: PropTypes.string, // Las categorías de la clase son opcionales
    })
  ).isRequired, // La lista de clases es obligatoria
  deleteClassById: PropTypes.func.isRequired, // La función para eliminar una clase es obligatoria
};

export default ClassesList; // Exporta el componente por defecto
