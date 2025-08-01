import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, redirectTo }) => {
  const { currentUser, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      if (isAdmin && redirectTo === 'admin') {
        navigate('/admin/dashboard', { replace: true });
      } else if (!isAdmin && redirectTo === 'customer') {
        navigate('/', { replace: true });
      }
    }
  }, [currentUser, isAdmin, navigate, redirectTo]);

  return children;
};

export default ProtectedRoute;