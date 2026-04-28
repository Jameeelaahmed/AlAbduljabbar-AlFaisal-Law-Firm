import api from "./axiosInstance";
import { ensureSuccess, normalizeApiError } from "./apiError";

export const registerUser = async (userData) => {
    try {
        const { data: payload } = await api.post("api/ApplicationUsers/Register", userData);
        ensureSuccess(payload, "Registration failed");
        return payload;
    } catch (error) {
        console.error("Registration error:", error);
        throw normalizeApiError(error, "Registration failed");
    }
};

export const loginUser = async (userData) => {
    try {
        const { data: payload } = await api.post("api/Auth/Login", userData);
        ensureSuccess(payload, "Login failed");
        return payload;
    } catch (error) {
        console.error("Login error:", error);
        throw normalizeApiError(error, "Login failed");
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
    try {
        const { data: payload } = await api.post(`/api/Auth/ForgotPassword/?Email=${email}`);
        ensureSuccess(payload, "Forgot password failed");
        localStorage.setItem("forgotPasswordEmail", email);
        return payload;
    } catch (error) {
        throw normalizeApiError(error, "Forgot password failed");
    }
};


export const verifyOTP = async (otpData) => {
    try {
        const { data: payload } = await api.post("/api/Auth/VerifyOTP", otpData);
        ensureSuccess(payload, "OTP verification failed");
        return payload;
    } catch (error) {
        console.error("Verify OTP error:", error);
        throw normalizeApiError(error, "OTP verification failed");
    }
};

export const resetPassword = async (passwordData) => {
    try {
        const { data: payload } = await api.post("/api/Auth/ResetPassword", passwordData);
        ensureSuccess(payload, "Reset password failed");
        return payload;
    } catch (error) {
        console.error("Reset password error:", error);
        throw normalizeApiError(error, "Reset password failed");
    }
};

export const changePassword = async (passwordData) => {
    try {
        const { data: payload } = await api.put("/api/Auth/ChangePassword", passwordData);
        ensureSuccess(payload, "Change password failed");
        return payload;
    } catch (error) {
        console.error("Change password error:", error);
        throw normalizeApiError(error, "Change password failed");
    }
};
