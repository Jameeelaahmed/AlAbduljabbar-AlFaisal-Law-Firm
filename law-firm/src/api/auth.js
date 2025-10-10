import api from "./axiosInstance";

export const registerUser = async (userData) => {
    try {
        const response = await api.post("api/ApplicationUsers/Register", userData); // Keep the /Register endpoint
        return response.data;
    } catch (error) {
        console.error("Registration error:", error);
        throw error;
    }
};

export const loginUser = async (userData) => {
    try {
        const response = await api.post("api/Auth/Login", userData);
        return response.data;
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
}

export const logoutUser = async () => {
    try {
        await api.post("/api/Auth/Logout");
    } catch (e) {
        console.warn("Logout request failed:", e);
    }
};
