// src/api/axiosInstance.js
import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(({ resolve, reject }) => {
        if (error) reject(error);
        else resolve(token);
    });
    failedQueue = [];
};

// 🔹 Request interceptor
api.interceptors.request.use(
    (config) => {
        const token = useAuthStore.getState().token; 
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // 🔸 Auto set language header (optional)
        try {
            const savedLang =
                typeof window !== "undefined"
                    ? localStorage.getItem("selectedLanguage")
                    : null;
            const lang =
                savedLang
            config.headers["Accept-Language"] = lang;
        } catch {
            // ignore if server-side or inaccessible
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// 🔹 Response interceptor (handles refresh token logic)
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // skip if no response, not 401, or already retried
        if (!error.response || error.response.status !== 401 || originalRequest._retry)
            return Promise.reject(error);

        originalRequest._retry = true;

        if (isRefreshing) {
            // Wait for refresh to complete
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
            // 🔹 Call refresh endpoint
            const { data } = await api.post("/api/Auth/RefreshToken", {});
            const newAccessToken = data?.token || data?.accessToken;
            const currentUser = useAuthStore.getState().user;

            if (!newAccessToken) throw new Error("No new access token received");

            // 🔹 Update Zustand store (auto syncs to sessionStorage)
            useAuthStore.getState().login(newAccessToken, currentUser);

            // Process queued requests
            processQueue(null, newAccessToken);

            // Retry the original request with the new token
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return api(originalRequest);
        } catch (refreshError) {
            console.error("🔴 Refresh token failed:", refreshError);
            processQueue(refreshError, null);
            useAuthStore.getState().logout();
            window.location.href = "/login";
            return Promise.reject(refreshError);
        } finally {
            isRefreshing = false;
        }
    }
);

export default api;
