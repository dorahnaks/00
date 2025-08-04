// src/api/adminAPI.js
import api from './index';

export const adminAPI = {
  // Get all admins (super admin only)
  getAllAdmins: async () => {
    try {
      const response = await api.get('/admins');
      return response.data.admins;
    } catch (error) {
      throw error;
    }
  },

  // Get single admin by ID
  getAdminById: async (id) => {
    try {
      const response = await api.get(`/admins/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Create new admin (super admin only)
  createAdmin: async (adminData) => {
    try {
      const response = await api.post('/admins', adminData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update admin (super admin only)
  updateAdmin: async (id, adminData) => {
    try {
      const response = await api.put(`/admins/${id}`, adminData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete admin (super admin only)
  deleteAdmin: async (id) => {
    try {
      const response = await api.delete(`/admins/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default adminAPI;