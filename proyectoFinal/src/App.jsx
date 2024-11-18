import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import StudentDashboard from "./pages/StudentDashboard/StudentDashboard";
import InstructorDashboard from "./pages/InstructorDashboard/InstructorDashboard";
import ClassDetails from "./components/ClassDetails/ClassDetails";
import useAuth from "./hooks/useAuth"; // Usar el hook useAuth



// BASE URL para centralizar las solicitudes
const BASE_URL = "http://localhost:5000";

// Función para iniciar sesión
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
  console.log("Datos recibidos del backend:", data); // Verifica los datos
  
  // Almacenar token y rol del usuario en el localStorage
  localStorage.setItem("token", data.token);
  localStorage.setItem("userRole", data.role); // Asumimos que el backend devuelve un campo 'role' ('student' o 'instructor')

  return data;
};

// Función para obtener detalles de una actividad
const getActivityDetails = async (activityId) => {
  const response = await fetch(`${BASE_URL}/activities/${activityId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch activity details");
  }
  return response.json();
};

export const fetchActivities = async () => {
  const response = await fetch(`${BASE_URL}/activities`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

  if (!response.ok) {
    throw new Error("Error al obtener las actividades");
  }

  return response.json();
};

const App = () => {
  const { isAuthenticated, userRole } = useAuth(); // Usamos el hook useAuth para verificar el estado de autenticación

  return (
    <Router>
      <Routes>
        {/* Ruta de inicio de sesión */}
        <Route
          path="/login"
          element={<LoginPage onLogin={loginUser} />} // Pasamos la función loginUser como prop
        />

        {/* Ruta protegida para alumnos */}
        <Route
          path="/student"
          element={
            isAuthenticated && userRole === "student" ? (
              <StudentDashboard fetchActivities={fetchActivities} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Ruta para los detalles de una actividad */}
        <Route
          path="/student/activity/:activityId"
          element={
            isAuthenticated && userRole === "student" ? (
              <ClassDetails fetchActivityDetails={getActivityDetails} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Ruta protegida para instructores */}
        <Route
          path="/instructor"
          element={
            isAuthenticated && userRole === "instructor" ? (
              <InstructorDashboard />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Ruta por defecto o desconocida */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
