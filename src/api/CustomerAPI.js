import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1';

const customerAPI = {
  // Get all customers - admin only
  getAllCustomers: async (token) => {
    try {
      const response = await axios.get(`${API_URL}/customers`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data.data.customers;
    } catch (error) {
      console.error('Error fetching customers:', error);
      throw error;
    }
  },
  
  // Get customer by ID
  getCustomer: async (customerId, token) => {
    try {
      const response = await axios.get(`${API_URL}/customers/${customerId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data.data;
    } catch (error) {
      console.error('Error fetching customer:', error);
      throw error;
    }
  },
  
  // Update customer - admin only
  updateCustomer: async (customerId, customerData, token) => {
    try {
      const response = await axios.put(`${API_URL}/customers/${customerId}`, customerData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data.data;
    } catch (error) {
      console.error('Error updating customer:', error);
      throw error;
    }
  },
  
  // Delete customer - admin only
  deleteCustomer: async (customerId, token) => {
    try {
      const response = await axios.delete(`${API_URL}/customers/${customerId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data.data;
    } catch (error) {
      console.error('Error deleting customer:', error);
      throw error;
    }
  },
  
  // Search customers - admin only
  searchCustomers: async (query, token) => {
    try {
      const response = await axios.get(`${API_URL}/customers/search`, {
        params: { q: query },
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data.data.customers;
    } catch (error) {
      console.error('Error searching customers:', error);
      throw error;
    }
  }
};

export default customerAPI;