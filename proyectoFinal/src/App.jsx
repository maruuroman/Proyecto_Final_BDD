import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import StudentDashboard from "./pages/StudentDashboard/StudentDashboard";
import InstructorDashboard from "./pages/InstructorDashboard/InstructorDashboard";
import ActivityList from "./components/ActivityList/ActivityList.jsx"; 
import ActivityDetails from "./components/ActivityDetails/ActivityDetails.jsx"; 
import { useState, useEffect } from "react";
import { fetchActivities } from "./services/apiService";
import EquipmentRental from "./components/EquipmentRental/EquipmentRental";

const BASE_URL = "http://localhost:5000";

const loginUser = async (credentials) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  const data = await response.json();
  return data;
};

const getActivityDetails = async (id) => {
  if (!id) {
    throw new Error("El ID de la actividad no es válido");
  }

  const response = await fetch(`${BASE_URL}/clases/${id}`);

  if (!response.ok) {
    throw new Error("No se pudieron obtener los detalles de la actividad");
  }

  return await response.json();
};

const handleInscription = async (classId, ci_alumno) => {
  
  try {
    const yaInscripto = await verificarInscripcion(ci_alumno, classId);
    if (yaInscripto) {
        alert('Ya estás inscripto en esta clase.');
        return;
    }
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Usuario no autenticado");

    const response = await fetch(`${BASE_URL}/clases/${classId}/inscribirse`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({"ci_alumno": ci_alumno}),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al inscribirse en la clase");
    }

    const data = await response.json();
    console.log("Inscripción exitosa:", data); 
    return data; 
  } catch (error) {
    console.error("Error en inscripción:", error.message);
    throw error; 
  }
};

async function verificarInscripcion(ciAlumno, idClase) {
  try {
      const response = await fetch(`${BASE_URL}/equipamiento/disponible`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ci_alumno: ciAlumno, id_clase: idClase }),
      });
      const data = await response.json();
      return data.inscripto;
  } catch (error) {
      console.error('Error al verificar inscripción:', error);
  }
}




const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [equipment, setEquipment] = useState([]);

  
  useEffect(() => {
    fetch(`${BASE_URL}/api/equipment/available`)
      .then((response) => response.json())
      .then((data) => setEquipment(data))
      .catch((error) => console.error("Error al cargar el equipamiento:", error));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("userRole");

    if (token && role) {
      setIsAuthenticated(true);
      setUserRole(role);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={<LoginPage onLogin={loginUser} />}
        />
        <Route
          path="/student"
          element={isAuthenticated && userRole === "student" ? <StudentDashboard fetchActivities={fetchActivities} /> : <Navigate to="/login" />}
        />
        <Route
          path="/instructor"
          element={isAuthenticated && userRole === "instructor" ? <InstructorDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/actividades"
          element={isAuthenticated ? <ActivityList /> : <Navigate to="/login" />}
        />
        <Route
          path="/clases/:id"
          element={isAuthenticated ? <ActivityDetails  getActivityDetails={getActivityDetails}  handleInscription={handleInscription} /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
        <Route
          path="/alquilar"
          element={<EquipmentRental equipment={equipment} />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
