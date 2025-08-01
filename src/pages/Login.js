import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginMode, setLoginMode] = useState('customer'); // 'customer' or 'admin'
  const [loginAttempted, setLoginAttempted] = useState(false);
  const { login, isAdmin, authState } = useAuth();
  const navigate = useNavigate();

  // Handle redirection based on auth state
  useEffect(() => {
    if (loginAttempted && authState === 'success') {
      if (isAdmin) {
        console.log("Redirecting to admin dashboard");
        navigate('/admin/dashboard');
      } else {
        console.log("Redirecting to home");
        navigate('/');
      }
      setLoginAttempted(false);
    } else if (loginAttempted && authState === 'error') {
      setLoginAttempted(false);
    }
  }, [loginAttempted, authState, isAdmin, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setError('');
      setLoading(true);
      setLoginAttempted(false);
      console.log(`Submitting ${loginMode} login for:`, email);
      
      const result = await login(email, password, loginMode === 'admin');
      console.log("Login result:", result);
      setLoginAttempted(true);
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || 'Failed to log in. Check your email and password.');
      setLoginAttempted(false);
    } finally {
      setLoading(false);
    }
  };

  const toggleLoginMode = (mode) => {
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
        
        {error && <div className="auth-error">{error}</div>}
        
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
            disabled={loading || authState === 'loading'}
          >
            {loading || authState === 'loading' ? (
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