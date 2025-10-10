import api from "./axiosInstance";

const API_URL = "/api/Categories";

export const createCategory = async (data) => {
    const res = await api.post(`${API_URL}/Create`, data);
    return res.data.data;
};

export const updateCategory = async (id, data) => {
    const res = await api.put(`${API_URL}/Update/${id}`, data);
    return res.data.data;
};

export const deleteCategory = async (id) => {
    const res = await api.delete(`${API_URL}/Delete/${id}`);
    return res.data;
};

export const getAllCategories = async () => {
    const res = await api.get(`${API_URL}/GetAll`);
    return res.data.data;
};

export const getCategoryById = async (id) => {
    const res = await api.get(`${API_URL}/${id}`);
    return res.data.data;
};

export const getCategoryForUpdate = async (id) => {
    const res = await api.get(`${API_URL}/GetForUpdate/${id}`);
    return res.data.data;
}