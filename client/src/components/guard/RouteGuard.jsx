import { Navigate, Outlet } from "react-router";
import { useUserContext } from "../../hooks/useUserContext";

const RouteGuard = ({ guest = false }) => {
  const { isAuthenticated } = useUserContext();

  if (guest) {
    if (isAuthenticated) {
      return <Navigate to="/" />;
    }
  } else {
    if (!isAuthenticated) {
      return <Navigate to="/auth/login" />;
    }
  }

  return <Outlet />;
};

export default RouteGuard;
