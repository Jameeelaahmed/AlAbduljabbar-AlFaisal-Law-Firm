import api from '../api/axiosInstance'
import { ensureSuccess, normalizeApiError } from './apiError'

export const fetchSliders = async () => {
    try {
        const { data: payload } = await api.get('/api/Sliders/all');
        ensureSuccess(payload, 'Failed to fetch sliders');
        // Sort by order
        const sortedData = payload.data.sort((a, b) => a.order - b.order);
        return sortedData;
    } catch (error) {
        throw normalizeApiError(error, 'Failed to fetch sliders');
    }
};

export const getHomePageData = async () => {
    try {
        const { data: payload } = await api.get("/api/Homepage");
        ensureSuccess(payload, "Failed to fetch homepage data");
        return payload.data;
    } catch (error) {
        throw normalizeApiError(error, "Failed to fetch homepage data");
    }
}