import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to add JWT token
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  loginAdmin: (credentials) => api.post('/api/v1/auth/admin/login', credentials),
  loginCustomer: (credentials) => api.post('/api/v1/auth/customer/login', credentials),
  registerCustomer: (userData) => api.post('/api/v1/auth/customer/register', userData),
  refreshToken: () => api.post('/api/v1/auth/refresh')
};

export default api;