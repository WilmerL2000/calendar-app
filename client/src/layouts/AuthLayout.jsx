import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../hooks';

export const AuthLayout = () => {
  const { status } = useAuthStore();

  return status === 'authenticated' ? <Navigate to="/" /> : <Outlet />;
};
