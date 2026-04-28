import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";

const api = axios.create({
baseURL: import.meta.env.VITE_API_BASE_URL,
headers: {
"Content-Type": "application/json",
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

const isRefreshEndpoint = (url = "") => String(url).includes("/api/Auth/RefreshToken");

api.interceptors.request.use(
(config) => {
const accessToken = useAuthStore.getState().accessToken;
if (accessToken) {
config.headers.Authorization = "Bearer " + accessToken;
}

try {
const savedLang =
typeof window !== "undefined"
? localStorage.getItem("selectedLanguage")
: null;

config.headers["Accept-Language"] = savedLang || "ar";
} catch {
config.headers["Accept-Language"] = "ar";
}

return config;
},
(error) => Promise.reject(error)
);

api.interceptors.response.use(
(response) => response,
async (error) => {
const originalRequest = error?.config || {};

if (!error?.response || error.response.status !== 401 || originalRequest._retry) {
return Promise.reject(error);
}

if (isRefreshEndpoint(originalRequest.url)) {
await useAuthStore.getState().logout();
if (typeof window !== "undefined") window.location.href = "/login";
return Promise.reject(error);
}

originalRequest._retry = true;

if (isRefreshing) {
return new Promise((resolve, reject) => {
failedQueue.push({ resolve, reject });
})
.then((newToken) => {
originalRequest.headers = originalRequest.headers || {};
originalRequest.headers.Authorization = "Bearer " + newToken;
return api(originalRequest);
})
.catch((err) => Promise.reject(err));
}

isRefreshing = true;

try {
const refreshUrl =
String(import.meta.env.VITE_API_BASE_URL || "").replace(/\/+$/, "") +
"/api/Auth/RefreshToken";

const { data } = await axios.post(
refreshUrl,
{},
{
withCredentials: true,
headers: { "Content-Type": "application/json" },
}
);

const payload = data?.data || data;
const newAccessToken = payload?.token || payload?.accessToken;

if (!newAccessToken) {
throw new Error("No new access token received");
}

const { user: currentUser, refreshTokenExpiration } = useAuthStore.getState();

useAuthStore.getState().login(newAccessToken, {
...(currentUser || {}),
refreshTokenExpiration:
payload?.refreshTokenExpiration || refreshTokenExpiration || null,
branchId:
payload?.branchId !== undefined
? payload.branchId
: currentUser?.branchId,
});

processQueue(null, newAccessToken);

originalRequest.headers = originalRequest.headers || {};
originalRequest.headers.Authorization = "Bearer " + newAccessToken;
return api(originalRequest);
} catch (refreshError) {
processQueue(refreshError, null);
await useAuthStore.getState().logout();
if (typeof window !== "undefined") window.location.href = "/login";
return Promise.reject(refreshError);
} finally {
isRefreshing = false;
}
}
);

export default api;