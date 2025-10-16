import api from "./axiosInstance";

const API_URL = "/api/ContactUsForms";

export const createContactUs = async (data) => {
    const res = await api.post(`${API_URL}/submit`, data);
    return res.data.data;
};