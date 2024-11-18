import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import StudentDashboard from "./pages/StudentDashboard/StudentDashboard";
import InstructorDashboard from "./pages/InstructorDashboard/InstructorDashboard";
import ClassDetails from "./components/ClassDetails/ClassDetails";
import ProtectedRoute from "./hooks/ProtectedRoute";
import { AuthProvider, useAuth } from "./hooks/AuthContext";
import { fetchActivities, getActivityDetails, loginUser } from "./services/apiService";


const App = () => {
  const { isAuthenticated, userRole } = useAuth(); // Usamos el hook useAuth para verificar el estado de autenticación

  return (
    <AuthProvider>
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
            <ProtectedRoute
                isAuthenticated={isAuthenticated}
                userRole={userRole}
                allowedRoles={["student"]}
              >
                
              <StudentDashboard fetchActivities={fetchActivities} />
            </ProtectedRoute>
          }
        />

        {/* Ruta para los detalles de una actividad */}
        <Route
          path="/student/activity/:activityId"
          element={
            <ProtectedRoute
                isAuthenticated={isAuthenticated}
                userRole={userRole}
                allowedRoles={["student"]}
              >
                <ClassDetails fetchActivityDetails={getActivityDetails} />
              </ProtectedRoute>
          }
        />

        {/* Ruta protegida para instructores */}
        <Route
          path="/instructor"
          element={
            <ProtectedRoute
                isAuthenticated={isAuthenticated}
                userRole={userRole}
                allowedRoles={["instructor"]}
              >
                <InstructorDashboard />
            </ProtectedRoute>
          }
        />

        {/* Ruta por defecto o desconocida */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
    </AuthProvider>
  );
};

export default App;
