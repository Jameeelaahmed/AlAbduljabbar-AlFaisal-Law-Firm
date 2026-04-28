import api from "./axiosInstance";
import { ensureSuccess, normalizeApiError } from "./apiError";

const API_URL = "/api/Faqs";
const API_URLCAt = "/api/FaqCategories";


export const createFaq = async (data) => {
    try {
        const { data: payload } = await api.post(`${API_URL}/Add`, data);
        ensureSuccess(payload, "Failed to create FAQ");
        return payload.data;
    } catch (error) {
        throw normalizeApiError(error, "Failed to create FAQ");
    }
};

export const updateFaq = async (id, data) => {
    try {
        const { data: payload } = await api.put(`${API_URL}/Update/${id}`, data);
        ensureSuccess(payload, "Failed to update FAQ");
        return payload.data;
    } catch (error) {
        throw normalizeApiError(error, "Failed to update FAQ");
    }
};

export const deleteFaq = async (id) => {
    try {
        const { data: payload } = await api.delete(`${API_URL}/Delete/${id}`);
        ensureSuccess(payload, "Failed to delete FAQ");
        return payload;
    } catch (error) {
        throw normalizeApiError(error, "Failed to delete FAQ");
    }
};

export const getAllFaqs = async () => {
    try {
        const { data: payload } = await api.get(`${API_URL}/GetAll`);
        ensureSuccess(payload, "Failed to fetch FAQs");
        return payload.data;
    } catch (error) {
        throw normalizeApiError(error, "Failed to fetch FAQs");
    }
};

export const getFaqById = async (id) => {
    try {
        const { data: payload } = await api.get(`${API_URL}/GetById/${id}`);
        ensureSuccess(payload, "Failed to fetch FAQ");
        return payload.data;
    } catch (error) {
        throw normalizeApiError(error, "Failed to fetch FAQ");
    }
};

export const getFaqForUpdate = async (id) => {
    try {
        const { data: payload } = await api.get(`${API_URL}/GetForUpdate/${id}`);
        ensureSuccess(payload, "Failed to fetch FAQ for update");
        return payload.data;
    } catch (error) {
        throw normalizeApiError(error, "Failed to fetch FAQ for update");
    }
};
export const getFaqByFaqCategoryId = async (id) => {
    try {
        const { data: payload } = await api.get(`${API_URL}/GetFaqsByFaqCategoryId/${id}`);
        ensureSuccess(payload, "Failed to fetch FAQs by category");
        return payload.data;
    } catch (error) {
        throw normalizeApiError(error, "Failed to fetch FAQs by category");
    }
};

export const testFaqCulture = async () => {
    try {
        const { data: payload } = await api.get(`${API_URL}/test-culture`);
        ensureSuccess(payload, "Failed to test FAQ culture");
        return payload;
    } catch (error) {
        throw normalizeApiError(error, "Failed to test FAQ culture");
    }
};


// ********* FAQ CATEGORY


export const createFaqCategory = async (data) => {
    try {
        const { data: payload } = await api.post(`${API_URLCAt}/Create`, data);
        ensureSuccess(payload, "Failed to create FAQ category");
        return payload.data;
    } catch (error) {
        throw normalizeApiError(error, "Failed to create FAQ category");
    }
};


export const getAllFaqCategory = async () => {
    try {
        const { data: payload } = await api.get(`${API_URLCAt}/GetAll`);
        ensureSuccess(payload, "Failed to fetch FAQ categories");
        return payload.data;
    } catch (error) {
        throw normalizeApiError(error, "Failed to fetch FAQ categories");
    }
};

export const deleteFaqCategory = async (id) => {
    try {
        const { data: payload } = await api.delete(`${API_URLCAt}/Delete/${id}`);
        ensureSuccess(payload, "Failed to delete FAQ category");
        return payload;
    } catch (error) {
        throw normalizeApiError(error, "Failed to delete FAQ category");
    }
};

export const updateFaqCategory = async (id, data) => {
    try {
        const { data: payload } = await api.put(`${API_URLCAt}/Update/${id}`, data);
        ensureSuccess(payload, "Failed to update FAQ category");
        return payload.data;
    } catch (error) {
        throw normalizeApiError(error, "Failed to update FAQ category");
    }
};

export const getFaqCategoryForUpdate = async (id) => {
    try {
        const { data: payload } = await api.get(`${API_URLCAt}/GetForUpdate/${id}`);
        ensureSuccess(payload, "Failed to fetch FAQ category for update");
        return payload.data;
    } catch (error) {
        throw normalizeApiError(error, "Failed to fetch FAQ category for update");
    }
};
