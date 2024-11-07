import { Link } from "react-router-dom"; // Importa Link para la navegación interna
import PropTypes from "prop-types"; // Importa PropTypes para la validación de props
import GamesList from "../GamesList/GamesList"; // Importa el componente GamesList
import styles from "./Home.module.css"; // Importa los estilos específicos para el componente Home

const Home = ({ games, deleteGameById }) => {
  return (
    <div className={styles.homeContainer}> {/* Contenedor principal con estilos específicos */}
      <h2>Juegos Olímpicos</h2> {/* Título de la página */}
      <Link to="/add-game"> {/* Enlace para navegar a la página de agregar juego */}
        <button className={styles.addButton}>Agregar juego</button> {/* Botón para agregar un juego */}
      </Link>
      
      <GamesList games={games} deleteGameById={deleteGameById} /> {/* Renderiza la lista de juegos, pasando los datos y la función para eliminar */}
    </div>
  );
};

// Validación de los tipos de las props
Home.propTypes = {
  games: PropTypes.arrayOf( // games es un array de objetos
    PropTypes.shape({ // Cada objeto en el array debe tener la siguiente forma
      id: PropTypes.string.isRequired, // id es un string obligatorio
      title: PropTypes.string.isRequired, // title es un string obligatorio
      description: PropTypes.string, // description es un string opcional
      players: PropTypes.string, // players es un string opcional
      categories: PropTypes.string, // categories es un string opcional
    })
  ).isRequired, // games es un prop obligatorio
  deleteGameById: PropTypes.func.isRequired, // deleteGameById es una función obligatoria
};

export default Home; // Exporta el componente para ser usado en otros archivos
