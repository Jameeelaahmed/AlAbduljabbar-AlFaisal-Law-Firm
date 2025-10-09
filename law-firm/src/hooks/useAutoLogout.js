// src/hooks/useAutoLogout.js
import { useEffect, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";

export const useAutoLogout = () => {
    const refreshTokenExpiration = useAuthStore((s) => s.user?.refreshTokenExpiration);
    const logout = useAuthStore((s) => s.logout);

    const logoutCalledRef = useRef(false);
    const timerRef = useRef(null);

    useEffect(() => {
        // no expiration known → skip
        if (!refreshTokenExpiration || logoutCalledRef.current) return;

        const expireAt = new Date(refreshTokenExpiration).getTime();
        const now = Date.now();
        const timeLeft = expireAt - now;

        if (timeLeft <= 0) {
            // already expired
            console.warn("🔴 Refresh token already expired — logging out immediately");
            logoutCalledRef.current = true;
            logout();
            return;
        }

        console.log(`⏱ Auto logout scheduled in ${(timeLeft / 1000 / 60).toFixed(1)} minutes`);

        // ✅ schedule logout only once
        timerRef.current = setTimeout(() => {
            if (!logoutCalledRef.current) {
                logoutCalledRef.current = true;
                console.warn("🔴 Refresh token expired — auto logging out");
                logout();
            }
        }, timeLeft);

        // ✅ cleanup to avoid multiple timers stacking
        return () => clearTimeout(timerRef.current);
    }, [refreshTokenExpiration, logout]);
};
