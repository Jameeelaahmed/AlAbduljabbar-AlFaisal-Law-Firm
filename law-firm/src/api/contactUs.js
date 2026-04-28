import api from "./axiosInstance";
import { ensureSuccess, normalizeApiError } from "./apiError";

const API_URL = "/api/ContactUsForms";

export const createContactUs = async (data) => {
    try {
        const { data: payload } = await api.post(`${API_URL}/submit`, data);
        ensureSuccess(payload, "Failed to submit contact form");
        return payload.data;
    } catch (error) {
        throw normalizeApiError(error, "Failed to submit contact form");
    }
};