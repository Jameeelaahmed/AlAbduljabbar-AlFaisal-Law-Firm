import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { getErrorMessage } from "../api/apiError";

export const useForgotPassword = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return useMutation({
        mutationFn: forgotPassword,

        onSuccess: () => {
            toast.success(t("ForgetPassword.codeSent"));
            navigate("/verify-otp");
        },

        onError: (err) => {
            const message = getErrorMessage(err, t("ForgetPassword.serverError"));
            toast.error(message);
            console.error("⚠️ Forgot password request error:", err);
        },
    });
};
