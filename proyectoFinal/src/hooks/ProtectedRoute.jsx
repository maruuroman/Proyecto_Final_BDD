import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "./AuthContext"; // Asegúrate de la ruta correcta

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { isAuthenticated, userRole } = useAuth(); // Obtén el estado directamente del contexto

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && (!userRole || !allowedRoles.includes(userRole))) {
    return <Navigate to="/login" />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  allowedRoles: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
