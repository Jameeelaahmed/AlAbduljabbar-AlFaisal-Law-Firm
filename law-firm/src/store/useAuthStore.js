// src/store/useAuthStore.js
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useAuthStore = create(
    persist(
        (set) => ({
            accessToken: null,
            user: null,
            isAuthenticated: false,
            refreshTokenExpiration: null,

            login: (token, userData) => {
                set({
                    accessToken: token,
                    user: {
                        id: userData.id,
                        name: userData.name,
                        email: userData.email,
                        lastRole: userData.lastRole,
                        branchId: userData.branchId
                    },
                    refreshTokenExpiration: userData.refreshTokenExpiration || null,
                    isAuthenticated: true,
                });
            },

            logout: async () => {
                try {
                    // await logoutUser();
                } catch (err) {
                    console.warn("⚠️ Logout request failed (ignored):", err);
                }

                set({
                    accessToken: null,
                    user: null,
                    isAuthenticated: false,
                    refreshTokenExpiration: null,
                });
            },
        }),
        {
            name: "auth-store",
            storage: createJSONStorage(() => sessionStorage), // ✅ Proper JSON-safe storage
        }
    )
);
