import api from "./axiosInstance";

const API_URL = "/api/Faqs";
const API_URLCAt = "/api/FaqCategories";


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
export const getFaqByFaqCategoryId = async (id) => {
    const res = await api.get(`${API_URL}/GetFaqsByFaqCategoryId/${id}`);
    return res.data.data;
};

export const testFaqCulture = async () => {
    const res = await api.get(`${API_URL}/test-culture`);
    return res.data;
};


// ********* FAQ CATEGORY


export const createFaqCategory = async (data) => {
    const res = await api.post(`${API_URLCAt}/Create`, data);
    return res.data.data;
};


export const getAllFaqCategory = async () => {
    const res = await api.get(`${API_URLCAt}/GetAll`);
    return res.data.data;
};

export const deleteFaqCategory = async (id) => {
    const res = await api.delete(`${API_URLCAt}/Delete/${id}`);
    return res.data;
};

export const updateFaqCategory = async (id, data) => {
    const res = await api.put(`${API_URLCAt}/Update/${id}`, data);
    return res.data.data;
};

export const getFaqCategoryForUpdate = async (id) => {
    const res = await api.get(`${API_URL}/GetForUpdate/${id}`);
    return res.data.data;
};
