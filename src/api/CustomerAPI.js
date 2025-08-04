// src/api/customerAPI.js
import api from './index';

export const customerAPI = {
  // Get all customers (admin only)
  getAllCustomers: async () => {
    try {
      const response = await api.get('/customers');
      return response.data.customers;
    } catch (error) {
      throw error;
    }
  },

  // Get single customer by ID
  getCustomerById: async (id) => {
    try {
      const response = await api.get(`/customers/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Create new customer (admin only)
  createCustomer: async (customerData) => {
    try {
      const response = await api.post('/customers', customerData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update customer (admin only)
  updateCustomer: async (id, customerData) => {
    try {
      const response = await api.put(`/customers/${id}`, customerData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete customer (admin only)
  deleteCustomer: async (id) => {
    try {
      const response = await api.delete(`/customers/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get customer orders
  getCustomerOrders: async (customerId) => {
    try {
      const response = await api.get(`/customers/${customerId}/orders`);
      return response.data.orders;
    } catch (error) {
      throw error;
    }
  }
};

export default customerAPI;