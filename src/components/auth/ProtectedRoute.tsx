import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store';
import type { AppDispatch } from '../../store';
import { CircularProgress, Box } from '@mui/material';
import { logout, checkAuth } from '../../store/slices/authSlice';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const { token, loading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    // Check token validity on mount
    dispatch(checkAuth());

    // Set up periodic token check (every minute)
    const intervalId = setInterval(() => {
      dispatch(checkAuth());
    }, 60000);

    return () => {
      clearInterval(intervalId);
    };
  }, [dispatch]);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!token) {
    // Redirect to login page but save the attempted url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}; 