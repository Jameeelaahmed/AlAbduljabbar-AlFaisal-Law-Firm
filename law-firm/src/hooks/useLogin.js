import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { getErrorMessage } from "../api/apiError";

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
                } else if (lastRole === "CustomerService") {
                    navigate("/admin/requests");
                } else {
                    navigate('/');
                }
            } else {
                console.error("❌ Login failed:", data?.error?.description || data);
            }
        },

        onError: (err) => {
            console.error("⚠️ Login request error:", err);
            
            const status = err?.status || err.response?.status;
            const fallbackMessage = status === 400 || status === 401
                ? t('auth.invalidCredentials')
                : t('auth.serverError');

            const errorMessage = getErrorMessage(err, fallbackMessage);
            toast.error(errorMessage);
            err.message = errorMessage;
        },
    });
};
