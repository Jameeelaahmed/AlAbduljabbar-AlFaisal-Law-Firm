import api from '../api/axiosInstance'
import { ensureSuccess, normalizeApiError } from './apiError'

// Get all users with optional pagination and search
export const fetchUsers = async ({ queryKey }) => {
    const [
        ,
        { searchTerm = "", pageIndex = 1, pageSize = 5, branchId = null, role = null },
    ] = queryKey;

    const params = {
        SearchTerm: searchTerm,
        PageIndex: pageIndex,
        PageSize: pageSize,
    };

    // ✅ Add optional filters
    if (branchId) params.BranchId = branchId;
    if (role) params.Role = role;

    try {
        const { data: payload } = await api.get("/api/ApplicationUsers/GetAll", { params });
        ensureSuccess(payload, "Failed to fetch users");

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
        throw normalizeApiError(error, "Failed to fetch users");
    }
};

// Create new user
export const createUser = async (userData) => {
    try {
        const { data: payload } = await api.post('/api/ApplicationUsers/AddWithRole', {
            fullNameAr: userData.fullNameAr,
            fullNameEn: userData.fullNameEn,
            mobileNumber: userData.mobileNumber,
            whatsAppNumber: userData.whatsAppNumber,
            email: userData.email,
            password: userData.password,
            confirmPassword: userData.confirmPassword,
            branchId: Number(userData.branchId),
            role: userData.role
        });

        ensureSuccess(payload, "Failed to create user");
        return payload.data;
    } catch (error) {
        throw normalizeApiError(error, "Failed to create user");
    }
};

// Get a single user by ID
export const getUserById = async (userId) => {
    if (!userId) throw new Error('User ID is required');
    try {
        const { data: payload } = await api.get(`/api/ApplicationUsers/GetById/${userId}`);
        ensureSuccess(payload, "Failed to fetch user");
        return payload.data;
    } catch (error) {
        throw normalizeApiError(error, "Failed to fetch user");
    }
};

// Update user details
export const updateUser = async ({ id, data }) => {
    try {
        const { data: payload } = await api.put(`/api/ApplicationUsers/Update`, { id, ...data });
        ensureSuccess(payload, "Failed to update user");
        return payload;
    } catch (error) {
        throw normalizeApiError(error, "Failed to update user");
    }
};


export const getUserForUpdate = async (userId) => {
    if (!userId) throw new Error('User ID is required');
    try {
        const { data: payload } = await api.get(`/api/ApplicationUsers/GetForUpdate/${userId}`);
        ensureSuccess(payload, "Failed to fetch user for update");
        return payload.data;
    } catch (error) {
        throw normalizeApiError(error, "Failed to fetch user for update");
    }
}
// Delete user
export const deleteUser = async (userId) => {
    if (!userId) throw new Error('User ID is required');
    try {
        const { data: payload } = await api.delete(`/api/ApplicationUsers/Delete/${userId}`);
        ensureSuccess(payload, "Failed to delete user");
        return payload;
    } catch (error) {
        throw normalizeApiError(error, "Failed to delete user");
    }
};

// Get current user information
export const getUserInfo = async () => {
    try {
        const { data: payload } = await api.get('/api/Auth/GetUserInfo');
        ensureSuccess(payload, 'Failed to fetch user information');
        return payload.data;
    } catch (error) {
        throw normalizeApiError(error, 'Failed to fetch user information');
    }
};