import styles from "./GamesList.module.css"; 
import PropTypes from "prop-types"; 
import { useNavigate } from "react-router-dom"; 

const GamesList = ({ games, deleteGameById }) => {
  const navigate = useNavigate(); // Obtiene la función de navegación para redireccionar

  return (
    <div className={styles.gamesList}>
      {games.map((game) => ( // Itera sobre la lista de juegos para renderizarlos
        <div key={game.id} className={styles.gameBox}> {/* Contenedor de cada juego */}
          <h3>{game.title}</h3> {/* Muestra el título del juego */}
          <button
            className={styles.detailsButton}
            onClick={() => navigate(`/game/${game.id}`)}> {/* Navega a la página de detalles */}
            Detalles
          </button>
          <button className={styles.deleteButton}
            onClick={() => deleteGameById(game.id)}> {/* Llama a la función para borrar el juego */}
            Borrar
          </button>
        </div>
      ))}
    </div>
  );
};

GamesList.propTypes = {
  games: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired, // El ID del juego es obligatorio
      title: PropTypes.string.isRequired, // El título del juego es obligatorio
      description: PropTypes.string, // La descripción del juego es opcional
      players: PropTypes.string, // El número de jugadores es opcional
      categories: PropTypes.string, // Las categorías del juego son opcionales
    })
  ).isRequired, // La lista de juegos es obligatoria
  deleteGameById: PropTypes.func.isRequired, // La función para eliminar un juego es obligatoria
};

export default GamesList; // Exporta el componente por defecto
