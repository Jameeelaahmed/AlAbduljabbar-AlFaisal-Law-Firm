import api from './axiosInstance';
import { ensureSuccess, normalizeApiError } from './apiError';

export const getDashboardData = async () => {
    try {
        const { data: payload } = await api.get('/api/Dashborad/Summary');
        ensureSuccess(payload, 'Failed to fetch dashboard data');
        return payload.data;
    } catch (error) {
        throw normalizeApiError(error, 'Failed to fetch dashboard data');
    }
};