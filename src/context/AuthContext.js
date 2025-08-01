import React, { createContext, useState, useContext, useEffect } from 'react';
import { authAPI } from '../api/AuthAPI';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    console.error("AuthContext is not available. Make sure you are using the AuthProvider.");
    return {
      currentUser: null,
      isAdmin: false,
      loading: false,
      token: null,
      login: () => Promise.reject(new Error("AuthContext not available")),
      signup: () => Promise.reject(new Error("AuthContext not available")),
      logout: () => {}
    };
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [authState, setAuthState] = useState('idle'); // 'idle', 'loading', 'success', 'error'

  // On app load, check for existing token
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      
      if (storedToken && storedUser) {
        try {
          const user = JSON.parse(storedUser);
          setCurrentUser(user);
          setIsAdmin(user.role === 'admin');
          setToken(storedToken);
        } catch (error) {
          // Invalid user data, clear storage
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password, isAdminMode = false) => {
    try {
      setAuthState('loading');
      let response;
      
      if (isAdminMode) {
        // Explicit admin login
        console.log("Attempting admin login...");
        response = await authAPI.loginAdmin({ email, password });
        const { access_token, admin } = response.data;
        
        console.log("Admin login successful", admin);
        
        localStorage.setItem('token', access_token);
        localStorage.setItem('user', JSON.stringify(admin));
        
        setToken(access_token);
        setCurrentUser(admin);
        setIsAdmin(true);
        setAuthState('success');
        
        return { success: true, role: 'admin', user: admin };
      } else {
        // Try customer login first
        try {
          console.log("Attempting customer login...");
          response = await authAPI.loginCustomer({ email, password });
          const { access_token, customer } = response.data;
          
          console.log("Customer login successful", customer);
          
          localStorage.setItem('token', access_token);
          localStorage.setItem('user', JSON.stringify(customer));
          
          setToken(access_token);
          setCurrentUser(customer);
          setIsAdmin(false);
          setAuthState('success');
          
          return { success: true, role: 'customer', user: customer };
        } catch (customerError) {
          // If customer login fails, try admin login
          console.log("Customer login failed, trying admin login...");
          try {
            response = await authAPI.loginAdmin({ email, password });
            const { access_token, admin } = response.data;
            
            console.log("Admin login successful", admin);
            
            localStorage.setItem('token', access_token);
            localStorage.setItem('user', JSON.stringify(admin));
            
            setToken(access_token);
            setCurrentUser(admin);
            setIsAdmin(true);
            setAuthState('success');
            
            return { success: true, role: 'admin', user: admin };
          } catch (adminError) {
            // Both logins failed
            setAuthState('error');
            throw new Error('Invalid email or password');
          }
        }
      }
    } catch (error) {
      console.error("Login failed:", error);
      setAuthState('error');
      throw new Error(error.response?.data?.error || 'Login failed');
    }
  };

  const signup = async (name, email, password, phone, address) => {
    try {
      setAuthState('loading');
      const response = await authAPI.registerCustomer({
        name, email, password, phone, address
      });
      const { access_token, customer } = response.data;
      
      localStorage.setItem('token', access_token);
      localStorage.setItem('user', JSON.stringify(customer));
      
      setToken(access_token);
      setCurrentUser(customer);
      setIsAdmin(false);
      setAuthState('success');
      
      return { success: true, role: 'customer', user: customer };
    } catch (error) {
      setAuthState('error');
      throw new Error(error.response?.data?.error || 'Registration failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setCurrentUser(null);
    setIsAdmin(false);
    setAuthState('idle');
  };

  const value = {
    currentUser,
    isAdmin,
    loading,
    token,
    authState,
    login,
    signup,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};