import { Link } from "react-router-dom"; // Importa Link para la navegación interna
import PropTypes from "prop-types"; // Importa PropTypes para la validación de props
import ClassesList from "../ClassesList/ClassesList"; // Importa el componente ClassesList
import styles from "./Home.module.css"; // Importa los estilos específicos para el componente Home

const Home = ({ classes, deleteClassById }) => {
  return (
    <div className={styles.homeContainer}> {/* Contenedor principal con estilos específicos */}
      <h2>Clases</h2> {/* Título de la página */}
      <Link to="/add-class"> {/* Enlace para navegar a la página de agregar clase */}
        <button className={styles.addButton}>Agregar clase</button> {/* Botón para agregar una clase */}
      </Link>
      
      <ClassesList classes={classes} deleteClassById={deleteClassById} /> {/* Renderiza la lista de clases, pasando los datos y la función para eliminar */}
    </div>
  );
};

// Validación de los tipos de las props
Home.propTypes = {
  classes: PropTypes.arrayOf( // classes es un array de objetos
    PropTypes.shape({ // Cada objeto en el array debe tener la siguiente forma
      id: PropTypes.string.isRequired, // id es un string obligatorio
      title: PropTypes.string.isRequired, // title es un string obligatorio
      description: PropTypes.string, // description es un string opcional
      players: PropTypes.string, // players es un string opcional
      categories: PropTypes.string, // categories es un string opcional
    })
  ).isRequired, // classes es un prop obligatorio
  deleteClassById: PropTypes.func.isRequired, // deleteClassById es una función obligatoria
};

export default Home; // Exporta el componente para ser usado en otros archivos
