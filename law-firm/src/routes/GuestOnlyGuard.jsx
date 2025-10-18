import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const GuestOnlyGuard = ({ children }) => {
    const { isAuthenticated, user } = useAuthStore();
    
    const restrictedRoles = ['CustomerService'];
    const allowedRoles = ['User', 'Admin'];
    
    if (isAuthenticated && user?.lastRole) {
        if (restrictedRoles.includes(user.lastRole)) {
            return <Navigate to="/unauthorized" replace />;
        }
        if (allowedRoles.includes(user.lastRole)) {
            return children;
        }
        return <Navigate to="/" replace />;
    }
    
    return children;
};

export default GuestOnlyGuard;