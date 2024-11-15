import { useState } from "react"; // Importa el hook useState para manejar el estado local
import { useNavigate } from "react-router-dom"; // Importa useNavigate para la navegación programática
import PropTypes from "prop-types"; // Importa PropTypes para la validación de propiedades
import styles from "./AddClass.module.css"; // Importa los estilos CSS específicos del componente

const AddClass = ({ onAddClass }) => {
  const [title, setTitle] = useState(""); // Estado local para el título de la clase
  const [description, setDescription] = useState(""); // Estado local para la descripción de la clase
  const [players, setPlayers] = useState(""); // Estado local para la cantidad de jugadores 
  const [categories, setCategories] = useState(""); // Estado local para las categorías de la clase
  const navigate = useNavigate(); // Hook para la navegación

  const handleSubmit = (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    const newClass = { title, description, players, categories }; // Crea un objeto con los datos 
    onAddClass(newClass); // Llama a la función onAddClass pasando el nuevo 
    navigate("/"); // Vuelve a la página de inicio después de agregar la clase 
  };

  return (
    <div className={styles.addClassContainer}> {/* Contenedor principal con estilos CSS */}
      <button className={styles.backButton} onClick={() => navigate("/")}>
        Atrás {/* Botón para regresar a la página de inicio */}
      </button>
      <h2>Agregar nuevo clase</h2> {/* Título del formulario */}
      <form onSubmit={handleSubmit}> {/* Formulario para agregar una clase */}
        <div className={styles.formGroup}>
          <label>Título:</label> {/* Etiqueta para el título */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)} // Actualiza el estado del título
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Descripción:</label> {/* Etiqueta para la descripción */}
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)} // Actualiza el estado de la descripción
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Cantidad de participantes:</label> {/* Etiqueta para la cantidad de jugadores */}
          <input
            type="text"
            value={players}
            onChange={(e) => setPlayers(e.target.value)} // Actualiza el estado de los jugadores
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Categorías:</label> {/* Etiqueta para las categorías */}
          <input
            type="text"
            value={categories}
            onChange={(e) => setCategories(e.target.value)} // Actualiza el estado de las categorías
            required
          />
        </div>
        <button type="submit" className={styles.submitButton}>Agregar clase</button> {/* Botón para enviar el formulario */}
      </form>
    </div>
  );
};

// Validación de props
AddClass.propTypes = {
  onAddClass: PropTypes.func.isRequired, // Requiere una función para la prop
};

export default AddClass; // Exporta el componente  para su uso en otros archivos
