import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage"; // Página de login
import StudentDashboard from "./pages/StudentDashboard/StudentDashboard"; // Dashboard del alumno
import InstructorDashboard from "./pages/InstructorDashboard/InstructorDashboard"; // Dashboard del instructor
import useAuth from "./hooks/useAuth"; // Hook para gestionar la autenticación
import ClassDetails from "./components/ClassDetails/ClassDetails";

const App = () => {
  const { isAuthenticated, userRole } = useAuth(); // Verifica si está autenticado y el rol del usuario

  return (
    <Router>
      <Routes>
        {/* Ruta de inicio de sesión */}
        <Route path="/login" element={<LoginPage />} />

        {/* Ruta protegida para alumnos */}
        <Route
          path="/student"
          element={
            isAuthenticated && userRole === "student" ? (
              <StudentDashboard />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/student/activity/:activityId"
          element={
            isAuthenticated && userRole === "student" ? (
              <ClassDetails />
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
