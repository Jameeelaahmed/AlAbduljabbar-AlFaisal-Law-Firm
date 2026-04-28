import api from './axiosInstance';
import { ensureSuccess, normalizeApiError } from './apiError';

// Get all requests with pagination and filters
export const fetchRequests = async ({ queryKey }) => {
    const [
        ,
        { searchTerm = "", pageIndex = 1, pageSize = 5, status = null, branchId = null },
    ] = queryKey;

    const params = {
        SearchTerm: searchTerm,
        PageIndex: pageIndex,
        PageSize: pageSize,
    };

    // Add optional filters
    if (status) params.Status = status;
    if (branchId) params.BranchId = branchId;

    try {
        const { data: payload } = await api.get("/api/UserService/GetAll", { params });
        ensureSuccess(payload, "Failed to fetch requests");

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
        throw normalizeApiError(error, "Failed to fetch requests");
    }
};
export const fetchRequestsByUserId = async ({ queryKey }) => {
    const [
        ,
        { userId = null, pageIndex = 1, pageSize = 5 },
    ] = queryKey;

    try {
        const { data: payload } = await api.get(`/api/UserService/GetAllByUserId/${userId}`, { params: { PageIndex: pageIndex, PageSize: pageSize } });
        ensureSuccess(payload, "Failed to fetch requests");

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
        throw normalizeApiError(error, "Failed to fetch requests");
    }
}

export const fetchRequestsByBranch = async ({ queryKey }) => {
    const [
        ,
        { searchTerm = "", pageIndex = 1, pageSize = 5, status = null, branchId = null },
    ] = queryKey;

    const params = {
        SearchTerm: searchTerm,
        PageIndex: pageIndex,
        PageSize: pageSize,
    };

    // Add optional filters
    if (status) params.Status = status;
    if (branchId) params.BranchId = branchId;

    try {
        const { data: payload } = await api.get(`/api/UserService/GetAllByBranchId/${branchId}`, { params });
        ensureSuccess(payload, "Failed to fetch requests");

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
        throw normalizeApiError(error, "Failed to fetch requests");
    }
};

// Get request details by ID
export const getRequestById = async (requestId) => {
    if (!requestId) throw new Error('Request ID is required');
    try {
        const { data: payload } = await api.get(`/api/UserService/GetById/${requestId}`);
        ensureSuccess(payload, "Failed to fetch request details");
        return payload.data;
    } catch (error) {
        throw normalizeApiError(error, "Failed to fetch request details");
    }
};

// Create new request
export const createRequest = async (requestData) => {
    try {
        const { data: payload } = await api.post('/api/UserService/RequestService', requestData);
        ensureSuccess(payload, "Failed to create request");

        // Notifications are handled automatically by the backend NotificationService
        // The backend will call NotifyStaff method which sends notifications to Admin and CustomerService users
        // No need to make additional API calls for notifications

        return payload.data;
    } catch (error) {
        throw normalizeApiError(error, "Failed to create request");
    }
};

// Update request
export const updateRequest = async ({ id, data }) => {
    if (!id) throw new Error('Request ID is required');
    try {
        const { data: payload } = await api.put(`/api/UserService/UpdateService/${id}`, data);
        ensureSuccess(payload, "Failed to update request");
        return payload.data;
    } catch (error) {
        throw normalizeApiError(error, "Failed to update request");
    }
};

// Get request for update
export const getRequestForUpdate = async (requestId) => {
    if (!requestId) throw new Error('Request ID is required');
    try {
        const { data: payload } = await api.get(`/api/Requests/GetForUpdate/${requestId}`);
        ensureSuccess(payload, "Failed to fetch request for update");
        return payload.data;
    } catch (error) {
        throw normalizeApiError(error, "Failed to fetch request for update");
    }
};

// Delete request
export const deleteRequest = async (requestId) => {
    if (!requestId) throw new Error('Request ID is required');
    try {
        const { data: payload } = await api.delete(`/api/Requests/Delete/${requestId}`);
        ensureSuccess(payload, "Failed to delete request");
        return payload;
    } catch (error) {
        throw normalizeApiError(error, "Failed to delete request");
    }
};

// Reject request
export const rejectRequest = async (id) => {
    if (!id) throw new Error('Request ID is required');
    try {
        const { data: payload } = await api.put(`/api/UserService/RejectRequest/${id}`);
        ensureSuccess(payload, "Failed to reject request");
        return payload.data;
    } catch (error) {
        throw normalizeApiError(error, "Failed to reject request");
    }
};

// Resolve request
export const resolveRequest = async (id) => {
    if (!id) throw new Error('Request ID is required');
    try {
        const { data: payload } = await api.put(`/api/UserService/ResolveRequest/${id}`);
        ensureSuccess(payload, "Failed to resolve request");
        return payload.data;
    } catch (error) {
        throw normalizeApiError(error, "Failed to resolve request");
    }
};

// Contact request
export const contactRequest = async (id) => {
    if (!id) throw new Error('Request ID is required');
    try {
        const { data: payload } = await api.put(`/api/UserService/ContactRequest/${id}`);
        ensureSuccess(payload, "Failed to mark request as contacted");
        return payload.data;
    } catch (error) {
        throw normalizeApiError(error, "Failed to mark request as contacted");
    }
};

// Add request note/comment
export const addRequestNote = async ({ requestId = null, content, userConsultationId = null }) => {

    if (!content) throw new Error('Note content is required');

    try {
        const { data: payload } = await api.post(`/api/Notes/Create`, { content, userServiceId: requestId, userConsultationId });
        ensureSuccess(payload, "Failed to add note");

    // Notifications are handled automatically by the backend NotificationService
    // The backend will call Notify method which sends notifications to the specific user
    // No need to make additional API calls for notifications

        return payload.data;
    } catch (error) {
        throw normalizeApiError(error, "Failed to add note");
    }
};

export const getALLNotes = async ({ queryKey }) => {
    const [, { requestId = null, pageIndex = 1, pageSize = 5 }] = queryKey;
    try {
        const { data: payload } = await api.get(`/api/Notes/GetByUserServiceId/${requestId}`, { requestId, pageIndex, pageSize })
        ensureSuccess(payload, "Failed to fetch notes");

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
        throw normalizeApiError(error, "Failed to fetch notes");
    }
}

// Get request timeline/history
export const getRequestTimeline = async (requestId) => {
    if (!requestId) throw new Error('Request ID is required');
    try {
        const { data: payload } = await api.get(`/api/Requests/${requestId}/Timeline`);
        ensureSuccess(payload, "Failed to fetch request timeline");
        return payload.data;
    } catch (error) {
        throw normalizeApiError(error, "Failed to fetch request timeline");
    }
};

// Get request statistics/summary
export const getRequestStats = async (params = {}) => {
    try {
        const { data: payload } = await api.get('/api/Requests/Statistics', { params });
        ensureSuccess(payload, "Failed to fetch request statistics");
        return payload.data;
    } catch (error) {
        throw normalizeApiError(error, "Failed to fetch request statistics");
    }
};