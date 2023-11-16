import axios from "axios";

export const api = new axios.create({
  baseURL: "https://api-renovada-production.up.railway.app",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("@Auth:token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);