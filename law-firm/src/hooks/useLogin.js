import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

export const useLogin = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const loginToStore = useAuthStore((state) => state.login);
    const { t } = useTranslation();

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
                    branchId
                } = userData;

                // ✅ Save to Zustand (persisted automatically in sessionStorage)
                loginToStore(token, {
                    id,
                    name,
                    email,
                    lastRole,
                    refreshTokenExpiration,
                    branchId
                });

                // ✅ Optional caching for React Query
                queryClient.setQueryData(["authUser"], { id, name, email, lastRole });

                // ✅ Redirect based on role
                if (lastRole === "Admin") {
                    navigate("/admin");
                } else {
                    navigate("/");
                }
            } else {
                console.error("❌ Login failed:", data?.error?.description || data);
            }
        },

        onError: (err) => {
            console.error("⚠️ Login request error:", err);
            
            const status = err.response?.status;
            let errorMessage;
            
            if (status === 500) {
                errorMessage = t('auth.serverError');
            } else if (status === 400 || status === 401 || status === 404) {
                errorMessage = t('auth.invalidCredentials');
            } else {
                errorMessage = t('auth.invalidCredentials');
            }
            
            toast.error(errorMessage);
            err.message = errorMessage;
        },
    });
};
