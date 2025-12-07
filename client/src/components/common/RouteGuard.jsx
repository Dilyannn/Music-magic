import { Navigate, Outlet } from 'react-router';
import { useUserContext } from '../../hooks/useUserContext';

const RouteGuard = () => {
    const { isAuthenticated } = useUserContext();

    if (!isAuthenticated) {
        return <Navigate to="/auth/login" />;
    }

    return <Outlet />;
};

export default RouteGuard;
