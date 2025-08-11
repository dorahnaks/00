// src/api/FeedbackAPI.js
import axios from 'axios';

const API_URL = '/api/v1/feedback';

// Get auth token from localStorage
const getAuthConfig = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No authentication token found');
  }
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Get all feedback (admin/superadmin)
const getAllFeedback = async () => {
  try {
    const config = getAuthConfig();
    const response = await axios.get(API_URL, config);
    return response.data.feedbacks;
  } catch (error) {
    console.error('Error fetching all feedback:', error);
    if (error.response?.status === 401) {
      // Token might be expired, clear it and redirect to login
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    throw error;
  }
};

// Get feedback by ID (admin/superadmin)
const getFeedbackById = async (id) => {
  try {
    const config = getAuthConfig();
    const response = await axios.get(`${API_URL}/${id}`, config);
    return response.data;
  } catch (error) {
    console.error('Error fetching feedback by ID:', error);
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    throw error;
  }
};

// Submit feedback (customer)
const submitFeedback = async (feedbackData) => {
  try {
    const config = getAuthConfig();
    const response = await axios.post(API_URL, feedbackData, config);
    return response.data;
  } catch (error) {
    console.error('Error submitting feedback:', error);
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    throw error;
  }
};

// Get customer's own feedback
const getMyFeedback = async () => {
  try {
    const config = getAuthConfig();
    const response = await axios.get(`${API_URL}/mine`, config);
    return response.data.feedbacks;
  } catch (error) {
    console.error('Error fetching my feedback:', error);
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    throw error;
  }
};

export default {
  getAllFeedback,
  getFeedbackById,
  submitFeedback,
  getMyFeedback,
};