import api from "./axiosInstance";
// const API_URL = "https://alabduljabbarandalfaisalapi.runasp.net/";

// export const registerUser = async (userData) => {
//     const response = await axios.post(`${API_URL}/Register`, userData);
//     return response.data;
// }

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
