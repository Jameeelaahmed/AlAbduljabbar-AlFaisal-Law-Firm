import api from './axiosInstance';

// Get all requests with pagination and filters
export const fetchRequests = async ({ queryKey }) => {
    const [
        _key,
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

    const { data: response } = await api.get("/api/UserService/GetAll", { params });

    if (!response?.isSuccess) {
        throw new Error(response?.error?.description || "Failed to fetch requests");
    }

    return {
        data: response.data,
        meta: {
            current_page: pageIndex,
            page_size: pageSize,
            total_records: response.data.length,
            total_pages: Math.max(1, Math.ceil(response.data.length / pageSize)),
        },
    };
};
export const fetchRequestsByUserId = async ({ queryKey }) => {
    const [
        _key,
        { userId = null, pageIndex = 1, pageSize = 5 },
    ] = queryKey;

    const { data: response } = await api.get(`/api/UserService/GetAllByUserId/${userId}`, { params: { PageIndex: pageIndex, PageSize: pageSize } });

    if (!response?.isSuccess) {
        throw new Error(response?.error?.description || "Failed to fetch requests");
    }

    return {
        data: response.data,
        meta: {
            current_page: pageIndex,
            page_size: pageSize,
            total_records: response.data.length,
            total_pages: Math.max(1, Math.ceil(response.data.length / pageSize)),
        },
    };
}

export const fetchRequestsByBranch = async ({ queryKey }) => {
    const [
        _key,
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

    const { data: response } = await api.get(`/api/UserService/GetAllByBranchId/${branchId}`, { params });

    if (!response?.isSuccess) {
        throw new Error(response?.error?.description || "Failed to fetch requests");
    }

    return {
        data: response.data,
        meta: {
            current_page: pageIndex,
            page_size: pageSize,
            total_records: response.data.length,
            total_pages: Math.max(1, Math.ceil(response.data.length / pageSize)),
        },
    };
};

// Get request details by ID
export const getRequestById = async (requestId) => {
    if (!requestId) throw new Error('Request ID is required');
    const { data } = await api.get(`/api/UserService/GetById/${requestId}`);

    if (!data?.isSuccess) {
        throw new Error(data?.error?.description || "Failed to fetch request details");
    }

    return data.data;
};

// Create new request
export const createRequest = async (requestData) => {
    const { data: response } = await api.post('/api/UserService/RequestService', requestData);

    if (!response?.isSuccess) {
        throw new Error(response?.error?.description || "Failed to create request");
    }

    // Notifications are handled automatically by the backend NotificationService
    // The backend will call NotifyStaff method which sends notifications to Admin and CustomerService users
    // No need to make additional API calls for notifications

    return response.data;
};

// Update request
export const updateRequest = async ({ id, data }) => {
    if (!id) throw new Error('Request ID is required');

    const { data: response } = await api.put(`/api/UserService/UpdateService/${id}`, data);

    if (!response?.isSuccess) {
        throw new Error(response?.error?.description || "Failed to update request");
    }

    return response.data;
};

// Get request for update
export const getRequestForUpdate = async (requestId) => {
    if (!requestId) throw new Error('Request ID is required');
    const { data } = await api.get(`/api/Requests/GetForUpdate/${requestId}`);

    if (!data?.isSuccess) {
        throw new Error(data?.error?.description || "Failed to fetch request for update");
    }

    return data.data;
};

// Delete request
export const deleteRequest = async (requestId) => {
    if (!requestId) throw new Error('Request ID is required');
    const { data } = await api.delete(`/api/Requests/Delete/${requestId}`);

    if (!data?.isSuccess) {
        throw new Error(data?.error?.description || "Failed to delete request");
    }

    return data;
};

// Reject request
export const rejectRequest = async (id) => {
    if (!id) throw new Error('Request ID is required');

    const { data: response } = await api.put(`/api/UserService/RejectRequest/${id}`);

    if (!response?.isSuccess) {
        throw new Error(response?.error?.description || "Failed to reject request");
    }

    return response.data;
};

// Resolve request
export const resolveRequest = async (id) => {
    if (!id) throw new Error('Request ID is required');

    const { data: response } = await api.put(`/api/UserService/ResolveRequest/${id}`);

    if (!response?.isSuccess) {
        throw new Error(response?.error?.description || "Failed to resolve request");
    }

    return response.data;
};

// Contact request
export const contactRequest = async (id) => {
    if (!id) throw new Error('Request ID is required');

    const { data: response } = await api.put(`/api/UserService/ContactRequest/${id}`);

    if (!response?.isSuccess) {
        throw new Error(response?.error?.description || "Failed to mark request as contacted");
    }

    return response.data;
};

// Add request note/comment
export const addRequestNote = async ({ requestId = null, content, userConsultationId = null }) => {

    if (!content) throw new Error('Note content is required');

    const { data: response } = await api.post(`/api/Notes/Create`, { content, userServiceId: requestId, userConsultationId });

    if (!response?.isSuccess) {
        throw new Error(response?.error?.description || "Failed to add note");
    }

    // Notifications are handled automatically by the backend NotificationService
    // The backend will call Notify method which sends notifications to the specific user
    // No need to make additional API calls for notifications

    return response.data;
};

export const getALLNotes = async ({ queryKey }) => {
    const [_key, { requestId = null, pageIndex = 1, pageSize = 5 }] = queryKey;
    const { data: response } = await api.get(`/api/Notes/GetByUserServiceId/${requestId}`, { requestId, pageIndex, pageSize })

    if (!response?.isSuccess) {
        throw new Error(response?.error?.description || "Failed to fetch Notes");
    }

    return {
        data: response.data,
        meta: {
            current_page: pageIndex,
            page_size: pageSize,
            total_records: response.data.length,
            total_pages: Math.max(1, Math.ceil(response.data.length / pageSize)),
        },
    };
}

// Get request timeline/history
export const getRequestTimeline = async (requestId) => {
    if (!requestId) throw new Error('Request ID is required');
    const { data } = await api.get(`/api/Requests/${requestId}/Timeline`);

    if (!data?.isSuccess) {
        throw new Error(data?.error?.description || "Failed to fetch request timeline");
    }

    return data.data;
};

// Get request statistics/summary
export const getRequestStats = async (params = {}) => {
    const { data } = await api.get('/api/Requests/Statistics', { params });

    if (!data?.isSuccess) {
        throw new Error(data?.error?.description || "Failed to fetch request statistics");
    }

    return data.data;
};