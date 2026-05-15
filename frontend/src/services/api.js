import axios from "axios";

export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: API_URL,
});

// Interceptor to provide a clearer message when the backend cannot be reached
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      error.message = `Network Error: could not reach backend at ${API_URL}.\n` +
        `Check your VITE_API_URL environment variable and that the backend is deployed and CORS-enabled.`;
    }
    return Promise.reject(error);
  }
);

export default api;
