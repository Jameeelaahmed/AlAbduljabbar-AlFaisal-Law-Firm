import api from '../api/axiosInstance'
import { ensureSuccess, normalizeApiError } from './apiError'

export const getContacts = async ({queryKey}) => {
    const [
        _key,
        { pageIndex = 1, pageSize = 5 },
    ] = queryKey;
    try {
        const { data: payload } = await api.get('/api/ContactUsForms/all', { params: { PageIndex: pageIndex, PageSize: pageSize } });
        ensureSuccess(payload, 'Failed to fetch contacts');

        return {
            data: payload.data,
            meta: {
                current_page: pageIndex,
                page_size: pageSize,
                total_records: payload.data.length,
                total_pages: Math.max(1, Math.ceil(payload.data.length / pageSize)),
            },
        };
    } catch (error) {
        throw normalizeApiError(error, 'Failed to fetch contacts');
    }
}
    