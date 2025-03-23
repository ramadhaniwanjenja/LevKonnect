import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedTypes: ('client' | 'engineer' | 'admin')[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedTypes }) => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null;

  // Store user data after login
  React.useEffect(() => {
    const loginResponse = localStorage.getItem('loginResponse');
    if (loginResponse) {
      const parsedResponse = JSON.parse(loginResponse);
      localStorage.setItem('user', JSON.stringify(parsedResponse.user));
    }
  }, []);

  // If not logged in, redirect to login
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // Check if the user's type is allowed
  if (!allowedTypes.includes(user.user_type.toLowerCase() as 'client' | 'engineer' | 'admin')) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;