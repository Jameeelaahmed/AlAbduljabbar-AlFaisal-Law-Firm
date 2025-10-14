import { useMutation } from "@tanstack/react-query";
import { verifyOTP } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export const useVerifyOTP = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return useMutation({
        mutationFn: verifyOTP,

        onSuccess: (data) => {
            if (data?.isSuccess) {
                // Navigate to reset password page
                const token = data?.data;

                if (token) {
                    localStorage.setItem("resetToken", token);
                }
                toast.success(t("ForgetPassword.codeVerified"));

                navigate("/reset-password");
            } else {
                console.error("❌ OTP verification failed:", data?.error?.description || data);
            }
        },

        onError: (err) => {
            console.error("⚠️ OTP verification request error:", err);
        },
    });
};
