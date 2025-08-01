import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginMode, setLoginMode] = useState('customer');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setError('');
      setLoading(true);
      console.log(`=== LOGIN FORM SUBMIT ===`);
      console.log(`Email: ${email}`);
      console.log(`Password: ${password ? '***' : 'EMPTY'}`);
      console.log(`Mode: ${loginMode}`);
      
      const result = await login(email, password, loginMode === 'admin');
      console.log("=== LOGIN RESULT ===");
      console.log("Result:", result);
      
      // Redirect immediately after successful login
      if (result.role === 'admin') {
        console.log("Redirecting to admin dashboard");
        navigate('/admin/dashboard', { replace: true });
      } else {
        console.log("Redirecting to home");
        navigate('/', { replace: true });
      }
    } catch (err) {
      console.error("=== LOGIN FORM ERROR ===");
      console.error("Error:", err);
      console.error("Error message:", err.message);
      
      setError(err.message || 'Failed to log in. Check your email and password.');
    } finally {
      setLoading(false);
    }
  };

  const toggleLoginMode = (mode) => {
    console.log(`=== TOGGLE LOGIN MODE ===`);
    console.log(`New mode: ${mode}`);
    setLoginMode(mode);
    setError('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="auth-container">
      <div className="auth-form-container">
        <div className="auth-header">
          <h1>Welcome Back</h1>
          <p>Login to your account to continue</p>
        </div>
        
        <div className="auth-mode-selector">
          <div className="mode-toggle">
            <button 
              type="button" 
              className={`mode-btn ${loginMode === 'customer' ? 'active' : ''}`}
              onClick={() => toggleLoginMode('customer')}
            >
              <i className="fas fa-user"></i> Customer
            </button>
            <button 
              type="button" 
              className={`mode-btn ${loginMode === 'admin' ? 'active' : ''}`}
              onClick={() => toggleLoginMode('admin')}
            >
              <i className="fas fa-user-shield"></i> Admin
            </button>
          </div>
        </div>
        
        {error && (
          <div className="auth-error">
            <strong>Error:</strong> {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-with-icon">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder={loginMode === 'admin' ? "admin@yourdomain.com" : "your@email.com"}
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-with-icon">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
              />
            </div>
          </div>
          
          <div className="form-options">
            <div className="remember-me">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <Link to="/forgot-password" className="forgot-password">
              Forgot Password?
            </Link>
          </div>
          
          <button 
            type="submit" 
            className={`auth-button ${loginMode === 'admin' ? 'admin-btn' : ''}`}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="loading-spinner"></span>
                Logging in...
              </>
            ) : (
              <>
                {loginMode === 'admin' ? (
                  <>
                    <i className="fas fa-sign-in-alt"></i> Login as Admin
                  </>
                ) : (
                  <>
                    <i className="fas fa-sign-in-alt"></i> Login as Customer
                  </>
                )}
              </>
            )}
          </button>
        </form>
        
        <div className="auth-footer">
          <p>Don't have an account? <Link to="/signup" className="signup-link">Sign Up</Link></p>
          
          {loginMode === 'admin' && (
            <div className="admin-login-info">
              <div className="info-header">
                <i className="fas fa-info-circle"></i>
                <h3>Admin Information</h3>
              </div>
              <p>Use your admin credentials to access the admin dashboard.</p>
              <p>If you don't have admin access, please contact your system administrator.</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="auth-image">
        <div className="auth-image-content">
          <h2>Fresh Fruits & Juices</h2>
          <p>Login to access your personalized shopping experience</p>
        </div>
      </div>
    </div>
  );
};

export default Login;