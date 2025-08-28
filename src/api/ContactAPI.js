import axios from 'axios';
const API_URL = 'http://localhost:5000/api/v1';

const contactAPI = {
  // Get contact info - public
  getContactInfo: async () => {
    try {
      const response = await axios.get(`${API_URL}/contact`);
      return response.data;
    } catch (error) {
      console.error('Error fetching contact info:', error);
      // Return default data if API fails
      return {
        phone: '',
        email: '',
        location: '',
        map_link: '',
        social_media_links: {
          facebook: '',
          twitter: '',
          instagram: '',
          linkedin: ''
        }
      };
    }
  },
  
  // Update contact info - admin only
  updateContactInfo: async (contactData, token) => {
    try {
      const response = await axios.put(`${API_URL}/contact`, contactData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error updating contact info:', error);
      throw error;
    }
  }
};

export default contactAPI;