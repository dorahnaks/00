// AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import authAPI from '../api/AuthAPI';

const AuthContext = createContext();
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    console.error("AuthContext is not available. Make sure you are using the AuthProvider.");
    return {
      currentUser: null,
      isAdmin: false,
      isSuperAdmin: false,
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
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
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
          
          // Determine role from user object
          if (user.role === 'admin') {
            setIsAdmin(true);
            setIsSuperAdmin(false);
          } else if (user.role === 'superadmin') {
            setIsAdmin(true);
            setIsSuperAdmin(true);
          } else {
            setIsAdmin(false);
            setIsSuperAdmin(false);
          }
          
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

  const login = async (email, password) => {
    try {
      console.log(`=== LOGIN ATTEMPT ===`);
      console.log(`Email: ${email}`);
      console.log(`Password: ${password ? '***' : 'EMPTY'}`);
      
      // Single login call without specifying role
      const response = await authAPI.login({ email, password });
      console.log("Login response:", response);
      console.log("Response data:", response.data);
      
      // Check if response has expected structure
      if (!response.data) {
        console.error("No data in response:", response);
        throw new Error('Invalid response from server');
      }
      
      // Handle different response structures
      let access_token, role, user_id;
      
      if (response.data.data) {
        // New structure: response.data.data contains the tokens and user info
        ({ access_token, role, user_id } = response.data.data);
      } else if (response.data.access_token) {
        // Alternative structure: tokens are directly in response.data
        ({ access_token, role, user_id } = response.data);
      } else {
        console.error("Unexpected response structure:", response.data);
        throw new Error('Invalid response structure from server');
      }
      
      if (!access_token) {
        console.error("No access token in response");
        throw new Error('Access token not found in response');
      }
      
      // Create user object based on role
      let user = {
        id: user_id,
        role: role,
        email: email
      };
      
      console.log("Login successful:", user);
      
      // Update state first
      setCurrentUser(user);
      
      // Set admin flags based on role
      if (role === 'admin') {
        setIsAdmin(true);
        setIsSuperAdmin(false);
      } else if (role === 'superadmin') {
        setIsAdmin(true);
        setIsSuperAdmin(true);
      } else {
        setIsAdmin(false);
        setIsSuperAdmin(false);
      }
      
      setToken(access_token);
      
      // Then update localStorage
      localStorage.setItem('token', access_token);
      localStorage.setItem('user', JSON.stringify(user));
      
      console.log("State and localStorage updated");
      
      return { success: true, role, user };
    } catch (error) {
      console.error("=== LOGIN FAILED ===");
      console.error("Error object:", error);
      console.error("Error response:", error.response);
      console.error("Error message:", error.message);
      
      const errorMessage = error.response?.data?.error || 
                          error.response?.data?.message || 
                          error.message || 
                          'Login failed';
      
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
      
      // Handle different response structures
      let access_token, customer;
      
      if (response.data.data) {
        // New structure: response.data.data contains the tokens and user info
        ({ access_token, customer } = response.data.data);
      } else if (response.data.access_token) {
        // Alternative structure: tokens are directly in response.data
        ({ access_token, customer } = response.data);
      } else {
        console.error("Unexpected response structure:", response.data);
        throw new Error('Invalid response structure from server');
      }
      
      // Update state first
      setCurrentUser(customer);
      setIsAdmin(false);
      setIsSuperAdmin(false);
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
    setIsSuperAdmin(false);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    console.log("Logout completed");
  };

  const value = {
    currentUser,
    isAdmin,
    isSuperAdmin,
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