import { create } from "zustand";

export const useAuthStore = create((set) => ({
    token: localStorage.getItem("token") || null,
    refreshToken: localStorage.getItem("refreshToken") || null,
    role: localStorage.getItem("role") || null,
    isAuthenticated: !!localStorage.getItem("token"),
    name: localStorage.getItem('name') || null,

    login: (data) => {

        localStorage.setItem("token", data.token);
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("role", data.lastRole);
        localStorage.setItem('name', data.name),
            set({
                token: data.token,
                refreshToken: data.refreshToken,
                role: data.lastRole,
                name: data.name,
                isAuthenticated: true,
            });
    },

    logout: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("role");
        localStorage.removeItem("name");

        set({
            token: null,
            refreshToken: null,
            role: null,
            name: null,
            isAuthenticated: false,
        });
    },
}));
