import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import StudentDashboard from "./pages/StudentDashboard/StudentDashboard";
import InstructorDashboard from "./pages/InstructorDashboard/InstructorDashboard";
import ActivityList from "./components/ActivityList/ActivityList.jsx"; // Asegúrate de que la ruta de importación sea correcta
import ActivityDetails from "./components/ActivityDetails/ActivityDetails.jsx"; // Asegúrate de que la ruta de importación sea correcta
import { useState, useEffect } from "react";
import { fetchActivities } from "./services/apiService";

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

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

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
          path="/activities"
          element={isAuthenticated ? <ActivityList /> : <Navigate to="/login" />}
        />
        <Route
          path="/details/:id"
          element={isAuthenticated ? <ActivityDetails /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
