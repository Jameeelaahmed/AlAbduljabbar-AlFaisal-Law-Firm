import api from "./axiosInstance";

const API_URL = "/api/Services";

export const createService = async (data) => {
    const res = await api.post(`${API_URL}/Create`, data);
    return res.data.data;
};

export const updateService = async (id, data) => {
    const res = await api.put(`${API_URL}/Update/${id}`, data);
    return res.data.data;
};

export const deleteServicr = async (id) => {
    const res = await api.delete(`${API_URL}/Delete/${id}`);
    return res.data;
};

export const getAllServices = async () => {
    const res = await api.get(`${API_URL}/all`);
    return res.data.data;
};

export const getServiceById = async (id) => {
    const res = await api.get(`${API_URL}/${id}`);
    return res.data.data;
};

export const getServiceForUpdate = async (id) => {
    const res = await api.get(`${API_URL}/GetForUpdate/${id}`);
    return res.data.data;
}

export const getServiceByCategoryId = async (id) => {
    const res = await api.get(`${API_URL}/GetServicesByCategoryId/${id}`);
    return res.data.data
}