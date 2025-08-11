// src/api/ContactAPI.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1';

const contactAPI = {
  // Get contact information (public)
  getContactInfo: async () => {
    try {
      const response = await axios.get(`${API_URL}/contact`);
      return response.data;
    } catch (error) {
      console.error('Error fetching contact info:', error);
      throw error;
    }
  },
  
  // Update contact information (admin only)
  updateContactInfo: async (contactData, token) => {
    try {
      const response = await axios.put(`${API_URL}/contact/`, contactData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error updating contact info:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
        console.error('Error status:', error.response.status);
      }
      throw error;
    }
  }
};

export default contactAPI;