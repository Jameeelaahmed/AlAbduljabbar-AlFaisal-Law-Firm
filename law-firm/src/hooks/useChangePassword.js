import { useMutation } from "@tanstack/react-query";
import { changePassword } from "../api/auth";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { getErrorMessage } from "../api/apiError";

export const useChangePassword = () => {
    const { t } = useTranslation();

    return useMutation({
        mutationFn: changePassword,

        onSuccess: (data) => {
            if (data?.isSuccess) {
                toast.success(t('Settings.passwordChangedSuccess'));
            } else {
                console.error("Password change failed:", data?.error?.description || data);
                toast.error(data?.error?.description || t('Settings.passwordChangeError'));
            }
        },

        onError: (err) => {
            console.error("⚠️ Password change request error:", err);
            const errorMessage = getErrorMessage(err, t('Settings.passwordChangeError'));
            toast.error(errorMessage);
        },
    });
};
