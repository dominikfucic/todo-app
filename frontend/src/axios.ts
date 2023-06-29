import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: "/api",
});

if (!process.env.TEST_MODE) {
  api.interceptors.request.use((config) => {
    const token = getTokenFromLocalStorage(); // Implement this function to retrieve the token from storage
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  });
}

const getTokenFromLocalStorage = () => {
  return localStorage.getItem("token");
};

export default api;
