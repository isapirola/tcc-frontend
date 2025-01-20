import { TaskUpdatePayload } from "../interfaces/Tasks";
import axiosInstance from "./axiosInstance";

export const fetchTasks = async () => {
  try {
    const response = await axiosInstance.get("/tasks");
    return response.data.tasks;
  } catch (err: any) {
    console.error("Erro ao buscar tarefas", err);
    throw err.response?.data || { message: "Erro ao buscar tarefas" };
  }
};

export const addTask = async (
  title: string,
  category: string,
  priority: string,
  notes: string,
  duration: number
) => {
  try {
    const response = await axiosInstance.post("/tasks", {
      title,
      category,
      priority,
      notes,
      duration,
    });
    return response.data;
  } catch (err: any) {
    throw err.response?.data || { message: "Erro ao criar tarefa" };
  }
};

export const updateTask = async (taskId: string, payload: TaskUpdatePayload) => {
  try {
    const response = await axiosInstance.put(`/tasks/${taskId}`, payload);

    return response.data;
  } catch (err: any) {
    throw err;
  }
};

export const deleteTask = async (taskId: string) => {
  try {
    const response = await axiosInstance.delete(`/tasks/${taskId}`);

    return response.data;
  } catch (err: any) {
    throw err;
  }
};
