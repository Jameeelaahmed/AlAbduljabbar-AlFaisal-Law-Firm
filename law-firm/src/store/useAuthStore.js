// src/store/useAuthStore.js
import { create } from "zustand";

export const useAuthStore = create((set, get) => ({
    accessToken: null,
    user: null,
    isAuthenticated: false,
    isHydrated: false,

    login: (token, userData) =>
        set({
            accessToken: token,
            user: userData,
            isAuthenticated: true,
        }),

    logout: () =>
        set({
            accessToken: null,
            user: null,
            isAuthenticated: false,
        }),

    setHydrated: (val) => set({ isHydrated: val }),
}));
