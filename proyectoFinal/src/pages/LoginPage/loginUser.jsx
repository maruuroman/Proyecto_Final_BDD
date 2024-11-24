const BASE_URL = "http://localhost:5000";

export const loginUser = async (credentials) => {
  const response = await fetch("http://localhost:5000/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error("Error al iniciar sesión.");
  }

  const data = await response.json();
  localStorage.setItem("token", data.token);
  localStorage.setItem("userRole", data.role);

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

export const getActivityDetails = async (activityId) => {
  const response = await fetch(`${BASE_URL}/activities/${activityId}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

  if (!response.ok) {
    throw new Error("Error al obtener los detalles de la actividad");
  }

  return response.json();
};
