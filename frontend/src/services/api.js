import axios from "axios";

export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: API_URL,
});

// Interceptor to provide a clearer message when the backend cannot be reached
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error Detail:", {
      message: error.message,
      code: error.code,
      config: error.config,
      response: error.response
    });
    if (!error.response) {
      error.message = `Network Error: could not reach backend at ${API_URL}.\n` +
        `1. Check if VITE_API_URL (${API_URL}) is correct.\n` +
        `2. Ensure the backend is running and CORS is enabled.\n` +
        `3. If you just deployed, wait a few minutes for the DNS to propagate.`;
    }
    return Promise.reject(error);
  }
);

export default api;
