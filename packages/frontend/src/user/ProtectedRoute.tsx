import { Navigate, Outlet } from 'react-router-dom';
import useUserStore from './useUserStore';
import { useEffect, useState } from 'react';

const ProtectedRoute = () => {
  const [loadingUser, setLoadingUser] = useState(true);
  const setRequestedPath = useUserStore((state) => state.setRequestedPath);
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const loadUser = useUserStore((state) => state.loadUser);

  useEffect(() => {
    loadUser().finally(() => setLoadingUser(false));
  }, []);

  if (loadingUser) return null;

  if (!isAuthenticated) {
    setRequestedPath(window.location.pathname);
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
