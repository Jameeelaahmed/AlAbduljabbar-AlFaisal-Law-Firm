import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { getErrorMessage } from "../api/apiError";

export const useResetPassword = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    return useMutation({
        mutationFn: resetPassword,

        onSuccess: (data) => {
            if (data?.isSuccess) {
                // Navigate to login page after successful password reset
                localStorage.removeItem("forgotPasswordEmail");
                localStorage.removeItem("resetToken")
                toast.success(t("ForgetPassword.passwordChanged"))
                navigate("/login");
            } else {
                console.error("❌ Password reset failed:", data?.error?.description || data);
            }
        },

        onError: (err) => {
            console.error("⚠️ Password reset request error:", err);
            toast.error(getErrorMessage(err, t("ForgetPassword.passwordChangeError")));
        },
    });
};
