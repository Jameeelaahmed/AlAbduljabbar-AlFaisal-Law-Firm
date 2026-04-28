import api from "./axiosInstance";
import { ensureSuccess, normalizeApiError } from "./apiError";

const API_URL = "/api/Services";

export const createService = async (data) => {
    try {
        const { data: payload } = await api.post(`${API_URL}/Create`, data);
        ensureSuccess(payload, "Failed to create service");
        return payload.data;
    } catch (error) {
        throw normalizeApiError(error, "Failed to create service");
    }
};

export const updateService = async (id, data) => {
    try {
        const { data: payload } = await api.put(`${API_URL}/Update/${id}`, data);
        ensureSuccess(payload, "Failed to update service");
        return payload.data;
    } catch (error) {
        throw normalizeApiError(error, "Failed to update service");
    }
};

export const deleteService = async (id) => {
    try {
        const { data: payload } = await api.delete(`${API_URL}/${id}`);
        ensureSuccess(payload, "Failed to delete service");
        return payload;
    } catch (error) {
        throw normalizeApiError(error, "Failed to delete service");
    }
};

export const getAllServices = async () => {
    try {
        const { data: payload } = await api.get(`${API_URL}/all`);
        ensureSuccess(payload, "Failed to fetch services");
        return payload.data;
    } catch (error) {
        throw normalizeApiError(error, "Failed to fetch services");
    }
};

export const getServiceById = async (id) => {
    try {
        const { data: payload } = await api.get(`${API_URL}/Id?Id=${id}`);
        ensureSuccess(payload, "Failed to fetch service");
        return payload.data;
    } catch (error) {
        throw normalizeApiError(error, "Failed to fetch service");
    }
};

export const getServiceForUpdate = async (id) => {
    try {
        const { data: payload } = await api.get(`${API_URL}/GetForUpdate/${id}`);
        ensureSuccess(payload, "Failed to fetch service for update");
        return payload.data;
    } catch (error) {
        throw normalizeApiError(error, "Failed to fetch service for update");
    }
}

export const getServiceByCategoryId = async (id) => {
    try {
        const { data: payload } = await api.get(`${API_URL}/GetServicesByCategoryId/${id}`);
        ensureSuccess(payload, "Failed to fetch services by category");
        return payload.data
    } catch (error) {
        throw normalizeApiError(error, "Failed to fetch services by category");
    }
}