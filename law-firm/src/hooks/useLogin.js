import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser } from "../api/auth";
import { useNavigate } from "react-router-dom";
export const useLogin = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            if (data.isSuccess) {
                const userData = data.data;
                queryClient.setQueryData(["authUser"], userData);

                console.log("✅ Logged in successfully:", userData);

                if (userData.lastRole === "Admin") {
                    navigate("/admin/dashboard");
                } else {
                    navigate("/");
                }
            } else {
                console.error("❌ Login failed:", data.error?.description);
            }
        },
        onError: (err) => console.error("❌ Login request error:", err),
    });
};
