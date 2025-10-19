import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const GuestOnlyGuard = ({ children }) => {
    const { isAuthenticated, user } = useAuthStore();
    
    // If user is authenticated, redirect based on role
    if (isAuthenticated && user?.lastRole) {
        switch(user.lastRole) {
            case 'Admin':
                return <Navigate to="/admin" replace />;
            case 'CustomerService':
                return <Navigate to="/admin/requests" replace />;
            case 'User':
            default:
                return <Navigate to="/" replace />;
        }
    }
    
    // If not authenticated, render the children
    return children;
};

export default GuestOnlyGuard;