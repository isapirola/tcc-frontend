import axios from "axios";
import { refreshAccessToken } from "./authService";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken"); // Busca o token mais recente
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

let isRefreshing = false;
let pendingRequests: Array<(token: string) => void> = [];

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = { ...error.config };

    // Caso o erro seja 401
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        // Adiciona a requisição na fila para ser resolvida após o token ser atualizado
        return new Promise((resolve) => {
          pendingRequests.push((token: string) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(axiosInstance(originalRequest));
          });
        });
      }

      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          throw new Error("Refresh token não disponível.");
        }

        const newAccessToken = await refreshAccessToken(refreshToken);
        localStorage.setItem("authToken", newAccessToken);

        // Processa todas as requisições pendentes com o novo token
        pendingRequests.forEach((callback) => callback(newAccessToken));
        pendingRequests = [];
        isRefreshing = false;

        // Atualiza a requisição original com o novo token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        // Limpa a fila de requisições pendentes em caso de falha
        pendingRequests = [];
        isRefreshing = false;
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
