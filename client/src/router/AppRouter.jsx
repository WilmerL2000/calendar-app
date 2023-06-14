import { Routes, Route } from 'react-router-dom';
import { LoginPage } from '../auth';
import { CalendarPage, Loader } from '../calendar';
import { useAuthStore } from '../hooks';
import { useEffect } from 'react';
import { AuthLayout } from '../layouts/AuthLayout';
import { CalendarLayout } from '../layouts/CalendarLayout';

export const AppRouter = () => {
  const { status, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, []);

  if (status === 'checking' || status === undefined) {
    return <Loader />;
  }

  return (
    <Routes>
      <Route path="/" element={<CalendarLayout />}>
        <Route index element={<CalendarPage />} />
      </Route>
      <Route path="/login" element={<AuthLayout />}>
        <Route index element={<LoginPage />} />
      </Route>
    </Routes>
  );
};
