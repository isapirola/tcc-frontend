import axiosInstance from "./axiosInstance";

export const fetchCategories = async () => {
  const response = await axiosInstance.get("/categories");
  return response.data.categories;
};

export const addCategory = async (name: string) => {
  try {
    const response = await axiosInstance.post("/categories", { name });
    return response.data.category; // Retorna a nova categoria
  } catch (err: any) {
    throw err.response?.data || { message: "Erro ao criar categoria" }; // Mensagem de erro personalizada
  }
};

export const fetchCategoryDuration = async (categoryId: string) => {
  const response = await axiosInstance.get(`/categories/${categoryId}/total-duration`);
  return response.data.totalDuration;
};

export const updateCategory = async (categoryId: string, categoryName: string) => {
  try {
    const response = await axiosInstance.put(`/categories/${categoryId}`, {
      name: categoryName,
    });

    return response.data;
  } catch (err: any) {
    throw err;
  }
};

export const deleteCategory = async (categoryId: string) => {
  try {
    const response = await axiosInstance.delete(`/categories/${categoryId}`);

    return response.data;
  } catch (err: any) {
    throw err;
  }
};
