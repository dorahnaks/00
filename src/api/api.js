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

// Auth endpoints
export const authAPI = {
  loginAdmin: (credentials) => api.post('/api/v1/auth/admin/login', credentials),
  loginCustomer: (credentials) => api.post('/api/v1/auth/customer/login', credentials),
  registerCustomer: (userData) => api.post('/api/v1/auth/customer/register', userData),
  refreshToken: () => api.post('/api/v1/auth/refresh')
};

// Contact endpoints
export const contactAPI = {
  getContact: () => api.get('/api/v1/contact/'),
  updateContact: (data) => api.put('/api/v1/contact/', data)
};

// Feedback endpoints
export const feedbackAPI = {
  submitFeedback: (data) => api.post('/api/v1/feedback/', data),
  getMyFeedback: () => api.get('/api/v1/feedback/mine'),
  getAllFeedback: () => api.get('/api/v1/feedback/'),
  getFeedbackById: (id) => api.get(`/api/v1/feedback/${id}`)
};

// Product endpoints
export const productAPI = {
  getAllProducts: () => api.get('/api/v1/products/'),
  getProductById: (id) => api.get(`/api/v1/products/${id}`),
  createProduct: (data) => api.post('/api/v1/products/', data),
  updateProduct: (id, data) => api.put(`/api/v1/products/${id}`, data),
  deleteProduct: (id) => api.delete(`/api/v1/products/${id}`)
};

// Customer endpoints
export const customerAPI = {
  getCustomerProfile: (id) => api.get(`/api/v1/customers/${id}`),
  updateCustomerProfile: (id, data) => api.put(`/api/v1/customers/edit/${id}`, data),
  deleteCustomer: (id) => api.delete(`/api/v1/customers/delete/${id}`)
};

// Order endpoints
export const orderAPI = {
  placeOrder: (data) => api.post('/api/v1/orders/', data),
  getMyOrders: () => api.get('/api/v1/orders/mine'),
  getOrderById: (id) => api.get(`/api/v1/orders/${id}`),
  updateOrderStatus: (id, status) => api.patch(`/api/v1/orders/${id}/status`, { status })
};

export default api;