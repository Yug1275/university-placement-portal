import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://university-placement-portal-production.up.railway.app/api",
});

// Attach token automatically
API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user?.token) {
    req.headers.Authorization = `Bearer ${user.token}`;
  }

  return req;
});

export default API;