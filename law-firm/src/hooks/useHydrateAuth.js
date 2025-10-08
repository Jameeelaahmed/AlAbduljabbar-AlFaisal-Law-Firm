// src/hooks/useHydrateAuth.js
import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import api from "../api/axiosInstance";

export const useHydrateAuth = () => {
    const login = useAuthStore((state) => state.login);
    const logout = useAuthStore((state) => state.logout);
    const setHydrated = useAuthStore((state) => state.setHydrated);

    useEffect(() => {
        const hydrate = async () => {
            try {
                const { data } = await api.post("/api/Auth/RefreshToken", {});
                const newToken = data.data.token

                login(newToken, {
                    id: data.data.id,
                    name: data.data.name,
                    email: data.data.email,
                    lastRole: data.data.lastRole,
                });
            } catch (err) {
                console.warn("⚠️ No valid refresh session:", err);
                logout();
            } finally {
                setHydrated(true);
            }
        };

        hydrate();
    }, [login, logout, setHydrated]);
};
