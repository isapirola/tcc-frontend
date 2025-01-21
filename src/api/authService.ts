import { AuthResponse, UserData } from "../interfaces";
import axiosInstance from "./axiosInstance";

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  const response = await axiosInstance.post("/user/login", { email, password });

  localStorage.setItem("authToken", response.data.accessToken);
  localStorage.setItem("refreshToken", response.data.refreshToken);

  return response.data;
};

export const register = async (
  name: string,
  email: string,
  password: string
): Promise<AuthResponse> => {
  const response = await axiosInstance.post("/user/register", { name, email, password });

  localStorage.setItem("authToken", response.data.accessToken);
  localStorage.setItem("refreshToken", response.data.refreshToken);
  return response.data;
};

export const getUserData = async (): Promise<UserData> => {
  try {
    const response = await axiosInstance.get("/user/data");
    return response.data;
  } catch (error: any) {
    throw new Error("Erro ao obter dados do usuário: " + error.message);
  }
};

export const refreshAccessToken = async (refreshToken: string) => {
  try {
    const response = await axiosInstance.post("/user/refresh", { refreshToken });
    // Atualiza o access token armazenado no localStorage
    localStorage.setItem("authToken", response.data.accessToken);
    return response.data.accessToken;
  } catch (error: any) {
    throw new Error("Erro ao renovar o token: " + error.message);
  }
};
