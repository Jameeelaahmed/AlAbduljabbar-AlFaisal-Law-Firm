import api from "./axiosInstance"
import { ensureSuccess, normalizeApiError } from "./apiError"
export const getAllUserConsultations = async ({ queryKey }) => {
    const [, { pageIndex = 1, pageSize = 5, status = null }] = queryKey

    try {
        const { data: payload } = await api.get("/api/UserConsultations/All", {
            params: { pageIndex, pageSize, status },
        });

        ensureSuccess(payload, "Failed to fetch consultations");

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
        throw normalizeApiError(error, "Failed to fetch consultations");
    }
}

export const createConsutationsTypes = async (data) => {
    try {
        const { data: payload } = await api.post(`/api/Consultations/Create`, data);
        ensureSuccess(payload, "Failed to create consultation type");
        return payload.data;
    } catch (error) {
        throw normalizeApiError(error, "Failed to create consultation type");
    }
}
export const updateConsutationsTypes = async (id, data) => {
    try {
        const { data: payload } = await api.put(`/api/Consultations/Update/${id}`, data);
        ensureSuccess(payload, "Failed to update consultation type");
        return payload.data;
    } catch (error) {
        throw normalizeApiError(error, "Failed to update consultation type");
    }
}
export const getForUpdateConsutationsTypes = async (id) => {
    try {
        const { data: payload } = await api.get(`/api/Consultations/GetForUpdate/${id}`);
        ensureSuccess(payload, "Failed to fetch consultation type");
        return payload.data;
    } catch (error) {
        throw normalizeApiError(error, "Failed to fetch consultation type");
    }
}


export const getAllConsutationsTypes = async () => {
    try {
        const { data: payload } = await api.get(`/api/Consultations/all`);
        ensureSuccess(payload, "Failed to fetch consultation types");
        return payload.data;
    } catch (error) {
        throw normalizeApiError(error, "Failed to fetch consultation types");
    }
};

export const deleteConsutationsTypes = async (id) => {
    try {
        const { data: payload } = await api.delete(`api/Consultations/${id}`);
        ensureSuccess(payload, "Failed to delete consultation type");
        return payload;
    } catch (error) {
        throw normalizeApiError(error, "Failed to delete consultation type");
    }
};


export const getConsultationById = async (consultationId) => {
    if (!consultationId) throw new Error('consultation ID is required');
    try {
        const { data: payload } = await api.get(`/api/UserConsultations/${consultationId}`);
        ensureSuccess(payload, "Failed to fetch consultation details");
        return payload.data;
    } catch (error) {
        throw normalizeApiError(error, "Failed to fetch consultation details");
    }
};



export const createConsultationRequest = async (data) => {
    try {
        const { data: payload } = await api.post(`/api/UserConsultations/Request`, data);
        ensureSuccess(payload, "Failed to create consultation request");

        // Notifications are handled automatically by the backend NotificationService
        // The backend will call NotifyStaff method which sends notifications to Admin and CustomerService users

        return payload.data;
    } catch (error) {
        throw normalizeApiError(error, "Failed to create consultation request");
    }
}

// Reject 
export const rejectConsultation = async (id) => {
    if (!id) throw new Error('Consultation ID is required');
    try {
        const { data: payload } = await api.put(`/api/UserConsultations/Reject/${id}`);
        ensureSuccess(payload, "Failed to reject consultation");
        return payload.data;
    } catch (error) {
        throw normalizeApiError(error, "Failed to reject consultation");
    }
};

// Resolve 
export const resolveConsultation = async (id) => {
    if (!id) throw new Error('Consultation ID is required');
    try {
        const { data: payload } = await api.put(`/api/UserConsultations/Resolve/${id}`);
        ensureSuccess(payload, "Failed to resolve consultation");
        return payload.data;
    } catch (error) {
        throw normalizeApiError(error, "Failed to resolve consultation");
    }
};

// Contact 
export const contactConsultation = async (id) => {
    if (!id) throw new Error('Consultation ID is required');
    try {
        const { data: payload } = await api.put(`/api/UserConsultations/Contact/${id}`);
        ensureSuccess(payload, "Failed to mark consultation as contacted");
        return payload.data;
    } catch (error) {
        throw normalizeApiError(error, "Failed to mark consultation as contacted");
    }
};
