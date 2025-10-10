import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export const useLogin = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const loginToStore = useAuthStore((state) => state.login);

    return useMutation({
        mutationFn: loginUser,

        onSuccess: (data) => {
            if (data?.isSuccess) {
                const userData = data.data;
                const {
                    token,
                    id,
                    name,
                    email,
                    lastRole,
                    refreshTokenExpiration,
                } = userData;

                // ✅ Save to Zustand (persisted automatically in sessionStorage)
                loginToStore(token, {
                    id,
                    name,
                    email,
                    lastRole,
                    refreshTokenExpiration,
                });

                // ✅ Optional caching for React Query
                queryClient.setQueryData(["authUser"], { id, name, email, lastRole });

                // ✅ Redirect based on role
                if (lastRole === "Admin") {
                    navigate("/admin/dashboard");
                } else {
                    navigate("/");
                }
            } else {
                console.error("❌ Login failed:", data?.error?.description || data);
            }
        },

        onError: (err) => {
            console.error("⚠️ Login request error:", err);
        },
    });
};
