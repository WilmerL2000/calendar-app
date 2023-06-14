import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../hooks';

export const CalendarLayout = () => {
  const { status } = useAuthStore();
  return status !== 'authenticated' ? <Navigate to="/login" /> : <Outlet />;
};
