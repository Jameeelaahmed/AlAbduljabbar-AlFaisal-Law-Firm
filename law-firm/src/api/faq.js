import api from "./axiosInstance";

const API_URL = "/api/Faqs";

export const createFaq = async (data) => {
    const res = await api.post(`${API_URL}/Add`, data);
    return res.data.data;
};

export const updateFaq = async (id, data) => {
    const res = await api.put(`${API_URL}/Update/${id}`, data);
    return res.data.data;
};

export const deleteFaq = async (id) => {
    const res = await api.delete(`${API_URL}/Delete/${id}`);
    return res.data;
};

export const getAllFaqs = async () => {
    const res = await api.get(`${API_URL}/GetAll`);
    return res.data.data;
};

export const getFaqById = async (id) => {
    const res = await api.get(`${API_URL}/GetById/${id}`);
    return res.data.data;
};

export const getFaqForUpdate = async (id) => {
    const res = await api.get(`${API_URL}/GetForUpdate/${id}`);
    return res.data.data;
};

export const testFaqCulture = async () => {
    const res = await api.get(`${API_URL}/test-culture`);
    return res.data;
};