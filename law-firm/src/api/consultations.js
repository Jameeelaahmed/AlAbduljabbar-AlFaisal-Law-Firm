import api from "./axiosInstance"
export const getAllUserConsultations = async ({ queryKey }) => {
    const [_key, { pageIndex = 1, pageSize = 5, status = null }] = queryKey

    const { data: response } = await api.get("/api/UserConsultations/All", {
        params: { pageIndex, pageSize, status },
    });

    if (!response?.isSuccess) {
        throw new Error(response?.error?.description || "Failed to fetch s");
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

export const createConsutationsTypes = async (data) => {
    const res = await api.post(`/api/Consultations/Create`, data);
    return res.data.data;
}
export const updateConsutationsTypes = async (id, data) => {
    console.("update", id, data);
    const res = await api.put(`/api/Consultations/Update/${id}`, data);
    return res.data.data;
}
export const getForUpdateConsutationsTypes = async (id) => {
    const res = await api.get(`/api/Consultations/GetForUpdate/${id}`);
    return res.data.data;
}


export const getAllConsutationsTypes = async () => {
    const res = await api.get(`/api/Consultations/all`);
    return res.data.data;
};

export const deleteConsutationsTypes = async (id) => {
    const res = await api.delete(`api/Consultations/${id}`);
    return res.data;
};


export const getConsultationById = async (consultationId) => {
    if (!consultationId) throw new Error('consultation ID is required');
    const { data } = await api.get(`/api/UserConsultations/${consultationId}`);

    if (!data?.isSuccess) {
        throw new Error(data?.error?.description || "Failed to fetch consultation details");
    }

    return data.data;
};



export const createConsultationRequest = async (data) => {
    const res = await api.post(`/api/UserConsultations/Request`, data);

    // Notifications are handled automatically by the backend NotificationService
    // The backend will call NotifyStaff method which sends notifications to Admin and CustomerService users

    return res.data.data;
}

// Reject 
export const rejectConsultation = async (id) => {
    if (!id) throw new Error('Consultation ID is required');

    const { data: response } = await api.put(`/api/UserConsultations/Reject/${id}`);

    if (!response?.isSuccess) {
        throw new Error(response?.error?.description || "Failed to reject consultation");
    }

    return response.data;
};

// Resolve 
export const resolveConsultation = async (id) => {
    if (!id) throw new Error('Consultation ID is required');

    const { data: response } = await api.put(`/api/UserConsultations/Resolve/${id}`);

    if (!response?.isSuccess) {
        throw new Error(response?.error?.description || "Failed to resolve consultation");
    }

    return response.data;
};

// Contact 
export const contactConsultation = async (id) => {
    if (!id) throw new Error('Consultation ID is required');

    const { data: response } = await api.put(`/api/UserConsultations/Contact/${id}`);

    if (!response?.isSuccess) {
        throw new Error(response?.error?.description || "Failed to mark consultation as contacted");
    }

    return response.data;
};
