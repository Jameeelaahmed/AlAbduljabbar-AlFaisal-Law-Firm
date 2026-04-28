import api from "./axiosInstance";
import { ensureSuccess, normalizeApiError } from "./apiError";

const API_URL = "/api/Categories";

export const createCategory = async (data) => {
    try {
        const { data: payload } = await api.post(`${API_URL}/Create`, data);
        ensureSuccess(payload, "Failed to create category");
        return payload.data;
    } catch (error) {
        throw normalizeApiError(error, "Failed to create category");
    }
};

export const updateCategory = async (id, data) => {
    try {
        const { data: payload } = await api.put(`${API_URL}/Update/${id}`, data);
        ensureSuccess(payload, "Failed to update category");
        return payload.data;
    } catch (error) {
        throw normalizeApiError(error, "Failed to update category");
    }
};

export const deleteCategory = async (id) => {
    try {
        const { data: payload } = await api.delete(`${API_URL}/Delete/${id}`);
        ensureSuccess(payload, "Failed to delete category");
        return payload;
    } catch (error) {
        throw normalizeApiError(error, "Failed to delete category");
    }
};

export const getAllCategories = async () => {
    try {
        const { data: payload } = await api.get(`${API_URL}/GetAll`);
        ensureSuccess(payload, "Failed to fetch categories");
        return payload.data;
    } catch (error) {
        throw normalizeApiError(error, "Failed to fetch categories");
    }
};

export const getCategoryById = async (id) => {
    try {
        const { data: payload } = await api.get(`${API_URL}/${id}`);
        ensureSuccess(payload, "Failed to fetch category");
        return payload.data;
    } catch (error) {
        throw normalizeApiError(error, "Failed to fetch category");
    }
};

export const getCategoryForUpdate = async (id) => {
    try {
        const { data: payload } = await api.get(`${API_URL}/GetForUpdate/${id}`);
        ensureSuccess(payload, "Failed to fetch category for update");
        return payload.data;
    } catch (error) {
        throw normalizeApiError(error, "Failed to fetch category for update");
    }
}

export const getCategoryByBranchId = async (id) => {
    try {
        const { data: payload } = await api.get(`${API_URL}/GetByBranchId/${id}`);
        ensureSuccess(payload, "Failed to fetch categories by branch");
        return payload.data;
    } catch (error) {
        throw normalizeApiError(error, "Failed to fetch categories by branch");
    }
}