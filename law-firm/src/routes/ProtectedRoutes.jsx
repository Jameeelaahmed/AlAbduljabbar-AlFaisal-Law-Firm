// ProtectedRoute.jsx
// import { Navigate, Outlet } from "react-router-dom";
// import { useAuth } from "../context/AuthContext"; // your auth context

// export default function ProtectedRoute({ roles }) {
//     const { user } = useAuth(); // user = { role: "admin" | "support" | "client" }

//     if (!user) {
//         return <Navigate to="/login" replace />;
//     }

//     if (roles && !roles.includes(user.role)) {
//         return <Navigate to="/" replace />;
//     }

//     return <Outlet />;
// }
