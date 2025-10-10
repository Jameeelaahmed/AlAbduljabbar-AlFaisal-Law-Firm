import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const ProtectedRoute = ({ children, allowedRoles = [], requireAuth = true }) => {
    const { isAuthenticated, user, isHydrated } = useAuthStore();

    // Wait for hydration to complete
    // if (!isHydrated) {
    //     return <div>Loading...</div>; // Or your loading component
    // }

    // Check authentication
    if (requireAuth && !isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Check role authorization
    if (allowedRoles.length > 0 && (!user?.lastRole || !allowedRoles.includes(user.lastRole))) {
        return <Navigate to="/unauthorized" replace />; // Or redirect to appropriate page
    }

    return children;
};

export default ProtectedRoute;