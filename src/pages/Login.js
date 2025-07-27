import React from 'react';
import LoginForm from '../components/LoginForm';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Check if coming from checkout or auto-order flow
  const fromCheckout = location.search.includes('checkout');
  const fromAutoOrder = location.search.includes('autoOrder');
  
  // Get return URL from query parameters
  const returnUrl = new URLSearchParams(location.search).get('returnUrl') || '/products';
  
  const handleLoginSuccess = () => {
    // If coming from checkout, redirect to checkout
    if (fromCheckout) {
      navigate('/checkout', { replace: true });
    } 
    // If coming from auto-order, redirect to order confirmation
    else if (fromAutoOrder) {
      navigate('/order-confirmation', { replace: true });
    }
    // Default redirect
    else {
      navigate(returnUrl, { replace: true });
    }
  };
  
  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>Welcome Back!</h1>
          {fromCheckout && (
            <p className="checkout-notice">Please login to complete your purchase</p>
          )}
          {fromAutoOrder && (
            <p className="auto-order-notice">Please login to place your order</p>
          )}
        </div>
        
        <LoginForm onLoginSuccess={handleLoginSuccess} />
        
        <div className="login-links">
          <p>Don't have an account? <a href="/signup">Sign up</a></p>
          <p><a href="/forgot-password">Forgot password?</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;