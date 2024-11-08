import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import GameDetails from "./components/GameDetails/GameDetails";
import AddGame from "./components/AddGame/AddGame";
import EditGame from "./components/Editgame/EditGame";
const App = () => {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);

  // GET all games
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/games");
        const data = await response.json();
        setGames(data);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    fetchGames();
  }, []);

  // GET a game by ID
  const fetchGameById = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/games/${id}`);
      const data = await response.json();
      setSelectedGame(data[0]); // Asumimos que data es un array con un único elemento
    } catch (error) {
      console.error("Error fetching game by ID:", error);
    }
  };

  // DELETE a game by ID
  const deleteGameById = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/games/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setGames((prevGames) => prevGames.filter((game) => game.id !== id));
      
      } else {
        console.error('Error deleting game');
      }
    } catch (error) {
      console.error("Error deleting game:", error);
    }
  };

  // POST a new game
  const addGame = async (newGame) => {
    try {
      const response = await fetch("http://localhost:3000/api/games", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newGame),
      });
      const data = await response.json();
      setGames((prevGames) => [...prevGames, data]);
    } catch (error) {
      console.error("Error adding new game:", error);
    }
  };

  // PUT (update) a game by ID
  const updateGameById = async (id, updatedGame) => {
    try {
      const response = await fetch(`http://localhost:3000/api/games/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedGame),
      });
      if (response.ok) {
        const data = await response.json();
        setGames(data); // Actualiza la lista de juegos con la respuesta
      } else {
        console.error('Error updating game');
      }
    } catch (error) {
      console.error("Error updating game:", error);
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home games={games} deleteGameById={deleteGameById} />} />
        <Route path="/game/:id" element={<GameDetails games={games} fetchGameById={fetchGameById} selectedGame={selectedGame}  />} />
        <Route path="/add-game" element={<AddGame onAddGame={addGame} />} />
        <Route path="/edit-game/:gameId" element={<EditGame games={games} onUpdateGame={updateGameById} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
