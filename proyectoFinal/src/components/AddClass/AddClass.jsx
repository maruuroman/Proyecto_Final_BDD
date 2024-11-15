import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddClass.css";

const AddClass = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [players, setPlayers] = useState("");
  const [categories, setCategories] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newClass = { title, description, players, categories };

    try {
      const response = await fetch("http://localhost:5000/clases", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newClass),
      });
      if (response.ok) {
        navigate("/");
      } else {
        console.error("Error al agregar la clase");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  return (
    <div className="addClassContainer">
      <button className="backButton" onClick={() => navigate("/")}>
        Atrás
      </button>
      <h2>Agregar nueva clase</h2>
      <form onSubmit={handleSubmit}>
        <div className="formGroup">
          <label>Título:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="formGroup">
          <label>Descripción:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="formGroup">
          <label>Cantidad de participantes:</label>
          <input
            type="text"
            value={players}
            onChange={(e) => setPlayers(e.target.value)}
            required
          />
        </div>
        <div className="formGroup">
          <label>Categorías:</label>
          <input
            type="text"
            value={categories}
            onChange={(e) => setCategories(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submitButton">
          Agregar clase
        </button>
      </form>
    </div>
  );
};

export default AddClass;
