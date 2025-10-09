// src/api/axiosInstance.js
import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true, // ensures refresh cookie is sent automatically
});

let isRefreshing = false;
let failedQueue = [];

// Helper: process queued requests
const processQueue = (error, token = null) => {
    failedQueue.forEach(({ resolve, reject }) => {
        if (error) reject(error);
        else resolve(token);
    });
    failedQueue = [];
};

// 🔹 Request interceptor
api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().accessToken;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// 🔹 Response interceptor
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Ignore if no response or other than 401
        if (!error.response || error.response.status !== 401 || originalRequest._retry)
            return Promise.reject(error);

        originalRequest._retry = true;

        // If a refresh is already happening, queue this request
        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                failedQueue.push({ resolve, reject });
            })
                .then((newToken) => {
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                    return api(originalRequest);
                })
                .catch((err) => Promise.reject(err));
        }

        isRefreshing = true;

        try {
            const { data } = await api.post("/api/Auth/RefreshToken", {});

            const newAccessToken = data.token || data.accessToken;
            const currentUser = useAuthStore.getState().user;

            // Update Zustand state
            useAuthStore.getState().login(newAccessToken, currentUser);

            // Resolve queued requests
            processQueue(null, newAccessToken);

            // Retry the failed request with the new token
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return api(originalRequest);
        } catch (refreshError) {
            console.error("🔴 Refresh token failed:", refreshError);

            // Reject all queued requests
            processQueue(refreshError, null);

            // Logout and redirect
            useAuthStore.getState().logout();
            window.location.href = "/login";

            return Promise.reject(refreshError);
        } finally {
            isRefreshing = false;
        }
    }
);

export default api;
