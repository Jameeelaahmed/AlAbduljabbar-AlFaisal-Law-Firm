import api from "./axiosInstance";

// Since axiosInstance already has baseURL, use relative paths
const API_URL = "/api/Categories";

export const createCategory = (data) => api.post(`${API_URL}/Create`, data);
export const updateCategory = (id, data) => api.put(`${API_URL}/${id}`, data);
export const deleteCategory = (id) => api.delete(`${API_URL}/${id}`);
export const getAllCategories = () => api.get(`${API_URL}/GetAll`);
export const getCategoryById = (id) => api.get(`${API_URL}/${id}`);