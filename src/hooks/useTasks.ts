import { useCallback, useEffect, useMemo, useState } from "react";
import useAuth from "./useAuth";
import { addTask, deleteTask, fetchTasks, updateTask } from "../api/taskService";
import { addCategory, fetchCategories } from "../api";
import { Category, GroupedTasks, Task, TaskUpdatePayload } from "../interfaces/Tasks";
import { Filters } from "../interfaces/Filters";
import { deleteCategory, fetchCategoryDuration, updateCategory } from "../api/categoryService";

const useTasks = () => {
  const { isLogged } = useAuth();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loadingTaskList, setLoadingTaskList] = useState<boolean>(false);
  const [filters, setFilters] = useState<Filters>({
    showCompleted: true,
    showPending: true,
    showHighPriority: true,
    showMediumPriority: true,
    showLowPriority: true,
  });

  useEffect(() => {
    if (isLogged) {
      const loadCategories = async () => {
        try {
          setError(null);
          const fetchedCategories = await fetchCategories();
          const categoriesWithDuration = await Promise.all(
            fetchedCategories.map(async (category: any) => {
              // Chamar a rota que retorna a duração total das tarefas para cada categoria
              const totalDuration = await fetchCategoryDuration(category._id);
              return {
                id: category._id,
                name: category.name,
                duration: totalDuration, // Adiciona a duração total da categoria
              };
            })
          );

          setCategories(categoriesWithDuration);
        } catch (err: any) {
          setError(err.message || "Erro ao carregar categorias.");
        }
      };

      const loadTasks = async () => {
        try {
          setError(null);
          const fetchedTasks = await fetchTasks();
          setTasks(
            fetchedTasks.map((task: any) => ({
              id: task._id,
              title: task.title,
              priority: task.priority,
              duration: task.duration,
              notes: task.notes,
              category: task.category,
              finished: task.finished,
            }))
          );
        } catch (err: any) {
          setError(err.message || "Erro ao carregar tarefas.");
        }
      };
      const loadData = async () => {
        setLoadingTaskList(true); // Inicia o carregamento
        try {
          await Promise.all([loadCategories(), loadTasks()]); // Aguarda todas as requisições
        } finally {
          setLoadingTaskList(false); // Finaliza o carregamento
        }
      };

      loadData();
    }
  }, [isLogged]);

  const handleAddCategory = useCallback(
    async (name: string) => {
      if (isLogged) {
        setLoadingTaskList(true);

        try {
          const response = await addCategory(name);
          const newCategory = response.category;
          const totalDuration = await fetchCategoryDuration(newCategory._id);

          setCategories((prevCategories) => [
            ...prevCategories,
            { id: newCategory._id, name: newCategory.name, duration: totalDuration },
          ]);
        } catch (err: any) {
          setError(err.message || "Erro ao adicionar categoria.");
        } finally {
          setLoadingTaskList(false);
        }
      }
    },
    [isLogged]
  );

  const handleAddTask = useCallback(
    async (
      title: string,
      category: string,
      priority: string,
      notes: string,
      duration: number
    ) => {
      if (isLogged) {
        setLoadingTaskList(true);
        try {
          const newTaskResponse = await addTask(title, category, priority, notes, duration);
          const newTask = newTaskResponse.task;
          setTasks((prevTasks) => [
            ...prevTasks,
            {
              id: newTask._id,
              title: newTask.title,
              priority: newTask.priority,
              duration: newTask.duration,
              notes: newTask.notes,
              category: newTask.category,
              finished: newTask.finished,
            },
          ]);
          await updateCategoryDuration(newTask.category);
        } catch (err: any) {
          setError(err.message || "Erro ao adicionar tarefa.");
        } finally {
          setLoadingTaskList(false);
        }
      }
    },
    [isLogged]
  );

  const handleUpdateTask = useCallback(async (taskId: string, payload: TaskUpdatePayload) => {
    try {
      setLoadingTaskList(true);
      // Atualiza a tarefa na API
      const updatedTask = await updateTask(taskId, payload);

      // Atualiza a tarefa no estado local
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === taskId ? { ...task, ...updatedTask.task } : task))
      );

      await updateCategoryDuration(updatedTask.task.category);

      return updatedTask; // Retorna a tarefa atualizada
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao atualizar tarefa");
      throw err; // Repropaga o erro
    } finally {
      setLoadingTaskList(false);
    }
  }, []);

  const handleDeleteTask = useCallback(async (taskId: string, taskName: string) => {
    const confirmDelete = window.confirm(
      `Você tem certeza que deseja excluir a tarefa "${taskName}"?`
    );
    if (confirmDelete) {
      try {
        setLoadingTaskList(true);
        setError(null);

        setTasks((prevTasks) => {
          const taskToDelete = prevTasks.find((task) => task.id === taskId);
          if (taskToDelete) {
            updateCategoryDuration(taskToDelete.category);
          }
          return prevTasks.filter((task) => task.id !== taskId);
        });
        await deleteTask(taskId);
      } catch (err: any) {
        setError(err.response?.data?.message || "Erro ao deletar tarefa.");
      } finally {
        setLoadingTaskList(false);
      }
    }
  }, []);

  const handleUpdateCategory = useCallback(
    async (categoryId: string, categoryName: string) => {
      try {
        setLoadingTaskList(true);
        // Atualiza a tarefa na API
        const response = await updateCategory(categoryId, categoryName);
        const updatedCategory = response.category;

        // Atualiza a tarefa no estado local
        setCategories((prevCategories) =>
          prevCategories.map((category) =>
            category.id === categoryId ? { ...category, ...updatedCategory } : category
          )
        );

        return updatedCategory; // Retorna a tarefa atualizada
      } catch (err: any) {
        setError(err.response?.data?.message || "Erro ao atualizar tarefa");
        throw err; // Repropaga o erro
      } finally {
        setLoadingTaskList(false);
      }
    },
    []
  );

  const handleDeleteCategory = useCallback(
    async (categoryId: string, categoryName: string) => {
      const confirmDelete = window.confirm(
        `Você tem certeza que deseja excluir a categoria "${categoryName}"? Todas as tarefas dentro dela também serão excluídas!`
      );
      if (confirmDelete) {
        try {
          setLoadingTaskList(true);
          setError(null);

          setCategories((prevCategories) => {
            return prevCategories.filter((category) => category.id !== categoryId);
          });
          await deleteCategory(categoryId);
        } catch (err: any) {
          setError(err.response?.data?.message || "Erro ao deletar tarefa.");
        } finally {
          setLoadingTaskList(false);
        }
      }
    },
    []
  );

  const updateCategoryDuration = useCallback(async (categoryId: string) => {
    try {
      const totalDuration = await fetchCategoryDuration(categoryId);
      setCategories((prevCategories) => {
        return prevCategories.map((category) =>
          category.id === categoryId ? { ...category, duration: totalDuration } : category
        );
      });
    } catch (err: any) {
      setError(err.message || "Erro ao atualizar duração da categoria.");
    }
  }, []);

  const groupedTasks = useMemo<GroupedTasks[]>(() => {
    return categories.map((category) => {
      const tasksByCategory = tasks.filter((task) => {
        const matchesPriority =
          (filters.showHighPriority && task.priority === "Alta") ||
          (filters.showMediumPriority && task.priority === "Média") ||
          (filters.showLowPriority && task.priority === "Baixa");
        const matchesStatus =
          (filters.showCompleted && task.finished) || (filters.showPending && !task.finished);
        return task.category === category.id && matchesPriority && matchesStatus;
      });
      return { ...category, tasks: tasksByCategory };
    });
  }, [categories, tasks, filters]);

  return {
    error,
    loadingTaskList,
    groupedTasks,
    tasks,
    categories,
    filters,
    setFilters,
    handleAddCategory,
    handleAddTask,
    handleUpdateTask,
    handleDeleteTask,
    handleUpdateCategory,
    handleDeleteCategory,
  };
};

export default useTasks;
