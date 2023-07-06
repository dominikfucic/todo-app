import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: "/api",
});

api.interceptors.request.use((config) => {
  const token = getTokenFromLocalStorage();
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

const getTokenFromLocalStorage = () => {
  return localStorage.getItem("token");
};

export default api;
