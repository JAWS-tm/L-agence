import { Navigate } from 'react-router-dom';
import useUserStore from './useUserStore';

type Props = {
  children: React.ReactNode;
};

const ProtectedRoute = (props: Props) => {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return props.children;
};

export default ProtectedRoute;
