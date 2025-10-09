// src/hooks/useHydrateAuth.js
import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import api from "../api/axiosInstance";

export const useHydrateAuth = () => {
    const login = useAuthStore((state) => state.login);
    const logout = useAuthStore((state) => state.logout);
    const setHydrated = useAuthStore((state) => state.setHydrated);
    const user = useAuthStore((state) => state.user);

    useEffect(() => {
        const hydrate = async () => {
            try {
                const { data } = await api.post("/api/Auth/RefreshToken", {});
                const payload = data.data;

                login(payload.token, {
                    id: payload.id,
                    name: payload.name,
                    email: payload.email,
                    lastRole: payload.lastRole,
                    refreshTokenExpiration: payload.refreshTokenExpiration,
                });

            } catch (err) {
                console.warn("⚠️ Session refresh failed:", err);
                logout();

                window.location.href = "/login";
            } finally {
                setHydrated(true);
            }
        };

        // Run once on mount
        if (!user) {
            hydrate();
        } else {
            setHydrated(true);
        }
    }, [login, logout, setHydrated, user]);
};
