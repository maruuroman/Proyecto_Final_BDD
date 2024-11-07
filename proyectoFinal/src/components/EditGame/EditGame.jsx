import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./EditGame.module.css"; // Asegúrate de tener un archivo de estilos si es necesario

const EditGame = ({ games, onUpdateGame }) => {
  const { gameId } = useParams(); // Obtener el ID del deporte de la URL
  const navigate = useNavigate();
  const gameToEdit = games.find(game => game.id === gameId);

  const [title, setTitle] = useState(gameToEdit?.title || "");
  const [description, setDescription] = useState(gameToEdit?.description || "");
  const [players, setPlayers] = useState(gameToEdit?.players || "");
  const [categories, setCategories] = useState(gameToEdit?.categories || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedGame = { title, description, players, categories };
    onUpdateGame(gameId, updatedGame);
    navigate("/"); // Vuelve al home tras actualizar el juego
  };

  return (
    <div className={styles.editGameContainer}>
      <button className={styles.backButton} onClick={() => navigate("/")}>
        Atrás
      </button>
      <h2>Editar juego</h2>
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
EditGame.propTypes = {
  games: PropTypes.array.isRequired,
  onUpdateGame: PropTypes.func.isRequired,
};

export default EditGame;
