// src/api/axiosInstance.js
import axios from "axios";
import { queryClient } from "../main"; // We'll use the same client from React Query setup

const API_BASE_URL = "https://alabduljabbarandalfaisalapi.runasp.net";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: { "Content-Type": "application/json" },
});

// Helper to get tokens from React Query cache
const getTokens = () => {
    const user = queryClient.getQueryData(["authUser"]);
    return {
        token: user?.token,
        refreshToken: user?.refreshToken,
    };
};

// ---- Interceptor for attaching token ----
api.interceptors.request.use(
    (config) => {
        const { token } = getTokens();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// ---- Interceptor for refreshing token ----
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const { refreshToken } = getTokens();

        // If token expired and we have a refresh token
        if (error.response?.status === 401 && refreshToken && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const res = await axios.post(`${API_BASE_URL}/api/RefreshToken`, { refreshToken });
                const newToken = res.data.data?.token;

                if (newToken) {
                    // Update user data in React Query cache
                    const user = queryClient.getQueryData(["authUser"]);
                    queryClient.setQueryData(["authUser"], {
                        ...user,
                        token: newToken,
                        refreshToken: res.data.data?.refreshToken || refreshToken,
                    });

                    // Retry original request with new token
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                    return api(originalRequest);
                }
            } catch (refreshError) {
                console.error("Refresh token failed:", refreshError);
                queryClient.removeQueries(["authUser"]);
                window.location.href = "/login"; // force logout
            }
        }

        return Promise.reject(error);
    }
);

export default api;
