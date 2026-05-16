import axios from "axios";

const getApiUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL?.trim();
  const isBrowser = typeof window !== "undefined";

  if (envUrl) {
    const isLocalhostApi =
      envUrl.includes("localhost") || envUrl.includes("127.0.0.1");
    const isProductionBrowser =
      isBrowser && !["localhost", "127.0.0.1"].includes(window.location.hostname);

    if (isLocalhostApi && isProductionBrowser) {
      return window.location.origin;
    }

    return envUrl.replace(/\/$/, "");
  }

  if (isBrowser && !["localhost", "127.0.0.1"].includes(window.location.hostname)) {
    return window.location.origin;
  }

  return "http://localhost:5000";
};

export const API_URL = getApiUrl();

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
