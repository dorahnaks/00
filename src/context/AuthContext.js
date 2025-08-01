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
          console.log("Auth initialized from storage:", user);
        } catch (error) {
          console.error("Error parsing stored user:", error);
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
      console.log(`=== LOGIN ATTEMPT ===`);
      console.log(`Email: ${email}`);
      console.log(`Password: ${password ? '***' : 'EMPTY'}`);
      console.log(`Admin Mode: ${isAdminMode}`);

      let response;
      
      if (isAdminMode) {
        console.log("Attempting admin login...");
        response = await authAPI.loginAdmin({ email, password });
        console.log("Admin login response:", response);
        console.log("Response data:", response.data);
        
        // Check if response has expected structure
        if (!response.data || !response.data.access_token || !response.data.admin) {
          console.error("Invalid admin response structure:", response.data);
          throw new Error('Invalid response from server');
        }
        
        const { access_token, admin } = response.data;
        
        console.log("Admin login successful:", admin);
        
        // Update state first
        setCurrentUser(admin);
        setIsAdmin(true);
        setToken(access_token);
        
        // Then update localStorage
        localStorage.setItem('token', access_token);
        localStorage.setItem('user', JSON.stringify(admin));
        
        console.log("State and localStorage updated");
        
        return { success: true, role: 'admin', user: admin };
      } else {
        console.log("Attempting customer login...");
        response = await authAPI.loginCustomer({ email, password });
        console.log("Customer login response:", response);
        console.log("Response data:", response.data);
        
        // Check if response has expected structure
        if (!response.data || !response.data.access_token || !response.data.customer) {
          console.error("Invalid customer response structure:", response.data);
          throw new Error('Invalid response from server');
        }
        
        const { access_token, customer } = response.data;
        
        console.log("Customer login successful:", customer);
        
        // Update state first
        setCurrentUser(customer);
        setIsAdmin(false);
        setToken(access_token);
        
        // Then update localStorage
        localStorage.setItem('token', access_token);
        localStorage.setItem('user', JSON.stringify(customer));
        
        console.log("State and localStorage updated");
        
        return { success: true, role: 'customer', user: customer };
      }
    } catch (error) {
      console.error("=== LOGIN FAILED ===");
      console.error("Error object:", error);
      console.error("Error response:", error.response);
      console.error("Error message:", error.message);
      
      // Extract error message from response if available
      const errorMessage = error.response?.data?.error || 
                          error.response?.data?.message || 
                          error.message || 
                          'Login failed';
      
      console.error("Final error message:", errorMessage);
      throw new Error(errorMessage);
    }
  };

  const signup = async (name, email, password, phone, address) => {
    try {
      console.log("=== SIGNUP ATTEMPT ===");
      const response = await authAPI.registerCustomer({
        name, email, password, phone, address
      });
      
      console.log("Signup response:", response);
      console.log("Response data:", response.data);
      
      const { access_token, customer } = response.data;
      
      // Update state first
      setCurrentUser(customer);
      setIsAdmin(false);
      setToken(access_token);
      
      // Then update localStorage
      localStorage.setItem('token', access_token);
      localStorage.setItem('user', JSON.stringify(customer));
      
      console.log("Signup successful");
      
      return { success: true, role: 'customer', user: customer };
    } catch (error) {
      console.error("=== SIGNUP FAILED ===");
      console.error("Error object:", error);
      console.error("Error response:", error.response);
      
      const errorMessage = error.response?.data?.error || 
                          error.response?.data?.message || 
                          error.message || 
                          'Registration failed';
      
      throw new Error(errorMessage);
    }
  };

  const logout = () => {
    console.log("=== LOGOUT ===");
    setCurrentUser(null);
    setIsAdmin(false);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    console.log("Logout completed");
  };

  const value = {
    currentUser,
    isAdmin,
    loading,
    token,
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