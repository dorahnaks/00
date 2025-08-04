// src/api/contactAPI.js
import api from './index';

export const contactAPI = {
  // Get contact information
  getContactInfo: async () => {
    try {
      const response = await api.get('/contact');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update contact information (admin only)
  updateContactInfo: async (contactData) => {
    try {
      const response = await api.put('/contact', contactData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Submit contact form
  submitContactForm: async (formData) => {
    try {
      const response = await api.post('/contact/submit', formData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default contactAPI;