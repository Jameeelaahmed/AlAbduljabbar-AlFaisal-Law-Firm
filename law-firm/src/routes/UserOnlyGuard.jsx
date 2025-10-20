import { Navigate, useLocation } from 'react-router-dom';
import { useUserInfo } from '../hooks/useUserInfo';
import { Loading } from '../components/Common/Loading';

export default function UserOnlyGuard({ children }) {
    const location = useLocation();
    const { data: userData, isLoading } = useUserInfo();
    const user = userData?.data;

    if (isLoading) {
        return (
            <Loading />
        );
    }

    // Check if user is authenticated and has the 'User' role
    if (user && user.role === 'User') {
        return children;
    }

    // If not a user, redirect to home or login page
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
}
