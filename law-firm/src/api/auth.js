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

export const forgotPassword = async (email) => {
    console.log(email)
    try {
        const response = await api.post(`/api/Auth/ForgotPassword/?Email=${email}`);

        if (!response.data?.isSuccess) {
            throw new Error(response.data?.error?.description || "Request failed");
        }
        localStorage.setItem("forgotPasswordEmail", email);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};


export const verifyOTP = async (otpData) => {
    try {
        const response = await api.post("/api/Auth/VerifyOTP", otpData);

        if (!response.data?.isSuccess) {
            throw new Error(response.data?.error?.description || "Request failed");
        }

        return response.data;
    } catch (error) {
        console.error("Verify OTP error:", error);
        throw error;
    }
};

export const resetPassword = async (passwordData) => {
    try {
        const response = await api.post("/api/Auth/ResetPassword", passwordData);
        return response.data;
    } catch (error) {
        console.error("Reset password error:", error);
        throw error;
    }
};
