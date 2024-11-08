import { useState } from "react"; 
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./EditClass.module.css"; // Asegúrate de tener un archivo de estilos si es necesario

const EditClass = ({ classes, onUpdateClass }) => {
  const { classId } = useParams(); // Obtener el ID de la clase de la URL
  const navigate = useNavigate();
  const classToEdit = classes.find((cl) => cl.id === classId);

  const [title, setTitle] = useState(classToEdit?.title || "");
  const [description, setDescription] = useState(classToEdit?.description || "");
  const [players, setPlayers] = useState(classToEdit?.players || "");
  const [categories, setCategories] = useState(classToEdit?.categories || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedClass = { title, description, players, categories };
    onUpdateClass(classId, updatedClass);
    navigate("/"); // Vuelve al home tras actualizar la clase
  };

  return (
    <div className={styles.editClassContainer}>
      <button className={styles.backButton} onClick={() => navigate("/")}>
        Atrás
      </button>
      <h2>Editar clase</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Título:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Descripción:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Cantidad de participantes:</label>
          <input
            type="text"
            value={players}
            onChange={(e) => setPlayers(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Categorías:</label>
          <input
            type="text"
            value={categories}
            onChange={(e) => setCategories(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.submitButton}>Guardar cambios</button>
      </form>
    </div>
  );
};

// Validación de props
EditClass.propTypes = {
  classes: PropTypes.array.isRequired,
  onUpdateClass: PropTypes.func.isRequired,
};

export default EditClass;
