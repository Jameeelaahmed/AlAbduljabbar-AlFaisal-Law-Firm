import api from '../api/axiosInstance'

// Get all users with optional pagination and search
export const fetchUsers = async ({ queryKey }) => {
    const [
        _key,
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

    const { data: response } = await api.get("/api/ApplicationUsers/GetAll", { params });

    if (!response?.isSuccess) {
        throw new Error(response?.error?.description || "Failed to fetch users");
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


// Get a single user by ID
export const getUserById = async (userId) => {
    if (!userId) throw new Error('User ID is required');
    const { data } = await api.get(`/api/ApplicationUsers/${userId}`);
    return data;
};

// Update user details
export const updateUser = async ({ id, data }) => {
    console.log("id", id);       // now logs correctly
    console.log("data", data);   // now logs correctly
    const { data: response } = await api.put(`/api/ApplicationUsers/Update/${id}`, data);
    return response;
};


export const getUserForUpdate = async (userId) => {
    if (!userId) throw new Error('User ID is required');
    const { data } = await api.get(`/api/ApplicationUsers/GetForUpdate/${userId}`);
    return data.data;
}
// Delete user
export const deleteUser = async (userId) => {
    if (!userId) throw new Error('User ID is required');
    const { data } = await api.delete(`/api/ApplicationUsers/Delete/${userId}`);
    return data;
};