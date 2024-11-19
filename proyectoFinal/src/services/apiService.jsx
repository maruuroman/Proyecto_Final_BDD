const BASE_URL = "http://localhost:5000";

export const loginUser = async (credentials) => {
  const response = await fetch(`${BASE_URL}/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    // Mejor manejo del error, lanzando lo que el servidor responda
    const error = await response.text();
    throw new Error(error || "Login failed");
  }

  const data = await response.json();
  localStorage.setItem("token", data.token);
  localStorage.setItem("userRole", data.role);

  return data;
};

export const fetchActivities = async () => {
  const response = await fetch(`${BASE_URL}/actividades`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Error al obtener las actividades");
  }

  return response.json();
};

export const getActivityDetails = async (activityId) => {
  const response = await fetch(`${BASE_URL}/actividades/${activityId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Error al obtener los detalles de la actividad");
  }

  return response.json();
};
