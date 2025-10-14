import { Navigate } from "react-router-dom";

export default function VerifyOtpGuard({ children }) {
    const email = localStorage.getItem("forgotPasswordEmail");

    if (!email) {
        return <Navigate to="/forget-password" replace />;
    }

    return children;
}
