// src/store/useAuthStore.js
import { create } from "zustand";
import { logoutUser } from "../api/auth";

export const useAuthStore = create((set, get) => ({
    accessToken: null,
    user: null,
    isAuthenticated: false,
    isHydrated: false,
    refreshTokenExpiration: null,

    login: (token, userData) => {
        set({
            accessToken: token,
            user: {
                id: userData.id,
                name: userData.name,
                email: userData.email,
                lastRole: userData.lastRole,
            },
            refreshTokenExpiration: userData.refreshTokenExpiration || null,
            isAuthenticated: true,
        });
    },

    logout: async () => {
        try {
            await logoutUser();
        } catch (err) {
            console.warn("⚠️ Logout request failed (ignored):", err);
        }

        set({
            user: null,
            accessToken: null,
            isAuthenticated: false,
            refreshTokenExpiration: null,
        });

        window.location.href = "/";
    },

    setHydrated: (val) => set({ isHydrated: val }),
}));
