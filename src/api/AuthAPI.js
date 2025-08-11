// AuthAPI.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1';

const authAPI = {
  // Login function that works for all user types
  login: async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, credentials);
      return response;
    } catch (error) {
      console.error('Login API error:', error);
      throw error;
    }
  },
  
  // Customer registration
  registerCustomer: async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register/customer`, userData);
      return response;
    } catch (error) {
      console.error('Register API error:', error);
      throw error;
    }
  },
  
  // Admin registration (requires superadmin)
  registerAdmin: async (adminData, token) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register/admin`, adminData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response;
    } catch (error) {
      console.error('Register admin API error:', error);
      throw error;
    }
  },
  
  // Superadmin registration (requires superadmin)
  registerSuperadmin: async (superadminData, token) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register/superadmin`, superadminData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response;
    } catch (error) {
      console.error('Register superadmin API error:', error);
      throw error;
    }
  },
  
  // Update user profile
  updateUserProfile: async (userData) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('Authentication token not found');
    }
    
    try {
      const response = await axios.put(`${API_URL}/users/profile`, userData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  },
  
  // Password reset request
  requestPasswordReset: async (email) => {
    try {
      const response = await axios.post(`${API_URL}/auth/password-reset-request`, { email });
      return response;
    } catch (error) {
      console.error('Password reset API error:', error);
      throw error;
    }
  },
  
  // Refresh token
  refreshToken: async (refreshToken) => {
    try {
      const response = await axios.post(`${API_URL}/auth/refresh`, {}, {
        headers: {
          Authorization: `Bearer ${refreshToken}`
        }
      });
      return response;
    } catch (error) {
      console.error('Refresh token API error:', error);
      throw error;
    }
  }
};

export default authAPI;