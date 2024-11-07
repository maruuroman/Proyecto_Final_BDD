import { useParams, useNavigate } from "react-router-dom"; // Importa hooks para acceder a los parámetros de la URL y para la navegación
import PropTypes from "prop-types"; // Importa PropTypes para la validación de las props
import styles from "./GameDetails.module.css"; // Importa los estilos específicos del componente
import { Link } from "react-router-dom"; // Importa el componente Link para la navegación

const GameDetails = ({ games }) => {
  const { id } = useParams(); // Obtiene el parámetro "id" de la URL
  const navigate = useNavigate(); // Hook para programar la navegación

  // Busca el juego con el id correspondiente en la lista de juegos
  const game = games.find((game) => game.id === id);

  // Si no se encuentra el juego, muestra un mensaje o redirige
  if (!game) {
    return <p>El juego no existe o los datos aún no están cargados.</p>; // Muestra mensaje de error si no hay juego
  }

  return (
    <div className={styles.gameDetailsContainer}>
      <button className={styles.backButton} onClick={() => navigate("/")}>
        Atrás
      </button>
      <h2>{game.title}</h2> {/* Muestra el título del juego */}
      <p>Descripción: {game.description}</p> {/* Muestra la descripción del juego */}
      <p>Jugadores: {game.players}</p> {/* Muestra la cantidad de jugadores */}
      <p>Categorías: {game.categories}</p> {/* Muestra las categorías del juego */}

      <Link to={`/edit-game/${game.id}`}> {/* Link para editar el juego */}
        <button className={styles.editButton}>Editar deporte</button>
      </Link>
    </div>
  );
};

// Definir PropTypes para validar las props del componente
GameDetails.propTypes = {
  games: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired, // "id" es obligatorio y debe ser una cadena
      title: PropTypes.string.isRequired, // "title" es obligatorio y debe ser una cadena
      description: PropTypes.string, // "description" es opcional y debe ser una cadena
      players: PropTypes.string, // "players" es opcional y debe ser una cadena
      categories: PropTypes.string, // "categories" es opcional y debe ser una cadena
    })
  ).isRequired,
};

export default GameDetails; // Exporta el componente para su uso en otros archivos
