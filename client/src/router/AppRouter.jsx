import { Routes, Route, Navigate } from 'react-router-dom';
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

  if (status === 'checking') {
    return <Loader />;
  }

  return (
    <Routes>
      {status === 'authenticated' ? (
        <>
          <Route path="/" element={<CalendarLayout />}>
            <Route index element={<CalendarPage />} />
          </Route>
          <Route path="/*" element={<Navigate to="/" />} />
        </>
      ) : (
        <>
          <Route path="/login" element={<AuthLayout />}>
            <Route index element={<LoginPage />} />
          </Route>
          <Route path="/*" element={<Navigate to="/login" />} />
        </>
      )}
    </Routes>
  );
};
