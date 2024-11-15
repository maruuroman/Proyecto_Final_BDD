import { useParams, useNavigate } from "react-router-dom"; // Importa hooks para acceder a los parámetros de la URL y para la navegación
import PropTypes from "prop-types"; // Importa PropTypes para la validación de las props
import styles from "./ClassDetails.module.css"; // Importa los estilos específicos del componente
import { Link } from "react-router-dom"; // Importa el componente Link para la navegación

const ClassDetails = ({ classes }) => {
  const { id } = useParams(); // Obtiene el parámetro "id" de la URL
  const navigate = useNavigate(); // Hook para programar la navegación

  // Busca la clase con el id correspondiente en la lista de clases
  const classItem = classes.find((cl) => cl.id === id);

  // Si no se encuentra la clase, muestra un mensaje o redirige
  if (!classItem) {
    return <p>La clase no existe o los datos aún no están cargados.</p>; // Muestra mensaje de error si no hay clase
  }

  return (
    <div className={styles.classDetailsContainer}>
      <button className={styles.backButton} onClick={() => navigate("/")}>
        Atrás
      </button>
      <h2>{classItem.title}</h2> {/* Muestra el título de la clase */}
      <p>Descripción: {classItem.description}</p> {/* Muestra la descripción de la clase */}
      <p>Jugadores: {classItem.players}</p> {/* Muestra la cantidad de jugadores */}
      <p>Categorías: {classItem.categories}</p> {/* Muestra las categorías de la clase */}

      <Link to={`/edit-class/${classItem.id}`}> {/* Link para editar la clase */}
        <button className={styles.editButton}>Editar clase</button>
      </Link>
    </div>
  );
};

// Definir PropTypes para validar las props del componente
ClassDetails.propTypes = {
  classes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired, // "id" es obligatorio y debe ser una cadena
      title: PropTypes.string.isRequired, // "title" es obligatorio y debe ser una cadena
      description: PropTypes.string, // "description" es opcional y debe ser una cadena
      players: PropTypes.string, // "players" es opcional y debe ser una cadena
      categories: PropTypes.string, // "categories" es opcional y debe ser una cadena
    })
  ).isRequired,
};

export default ClassDetails; // Exporta el componente para su uso en otros archivos
