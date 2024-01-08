import { Navigate, Outlet } from 'react-router-dom';
import useUserStore from './useUserStore';

type Props = {};

const ProtectedRoute = (props: Props) => {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default ProtectedRoute;
