// src/api/ProductAPI.js

import axios from 'axios';
import api from './axiosConfig';

const API_URL = '/api/v1/products';

export const productAPI = {
  // Get all products - no auth required for public access
  getAllProducts: async (token = null) => {
    try {
      const config = token ? { headers: { 'Authorization': `Bearer ${token}` } } : {};
      const response = await api.get(API_URL, config);
      return response.data.products;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },
  
  // Get a single product by ID - no auth required
  getProduct: async (productId) => {
    try {
      const response = await api.get(`${API_URL}/${productId}`);
      return response.data.product;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  },
  
  // Create a new product - admin only
  createProduct: async (productData, token) => {
    try {
      console.log('Creating product with token:', token ? 'Token present' : 'No token');
      
      // Create a separate axios instance for FormData
      const formDataInstance = axios.create({
        baseURL: api.defaults.baseURL,
        timeout: 30000, // Increase timeout for file uploads
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const response = await formDataInstance.post(API_URL, productData);
      return response.data;
    } catch (error) {
      console.error('Error creating product:', error);
      if (error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);
        console.error('Response headers:', error.response.headers);
      }
      throw error;
    }
  },
  
  // Update a product - admin only
  updateProduct: async (productId, productData, token) => {
    try {
      console.log('Updating product with token:', token ? 'Token present' : 'No token');
      
      // Create a separate axios instance for FormData
      const formDataInstance = axios.create({
        baseURL: api.defaults.baseURL,
        timeout: 30000, // Increase timeout for file uploads
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const response = await formDataInstance.put(`${API_URL}/${productId}`, productData);
      return response.data;
    } catch (error) {
      console.error('Error updating product:', error);
      if (error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);
        console.error('Response headers:', error.response.headers);
      }
      throw error;
    }
  },
  
  // Delete a product - admin only
  deleteProduct: async (productId, token) => {
    try {
      const response = await axios.delete(`${api.defaults.baseURL}${API_URL}/${productId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  },
  
  // Search products - no auth required
  searchProducts: async (query) => {
    try {
      const response = await api.get(`${API_URL}/search`, {
        params: { q: query }
      });
      return response.data.products;
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  },
  
  // Get products by category - no auth required
  getProductsByCategory: async (categoryName) => {
    try {
      const response = await api.get(`${API_URL}/category/${categoryName}`);
      return response.data.products;
    } catch (error) {
      console.error('Error fetching products by category:', error);
      throw error;
    }
  },
  
  // Get featured products - no auth required
  getFeaturedProducts: async () => {
    try {
      const response = await api.get(`${API_URL}/featured`);
      return response.data.products;
    } catch (error) {
      console.error('Error fetching featured products:', error);
      throw error;
    }
  },
  
  // Get best seller products - no auth required
  getBestSellerProducts: async () => {
    try {
      const response = await api.get('/api/v1/content/home/best-sellers');
      return response.data;
    } catch (error) {
      console.error('Error fetching best seller products:', error);
      throw error;
    }
  },
  
  // Update product stock - admin only
  updateProductStock: async (productId, stockQuantity, token) => {
    try {
      const response = await axios.put(
        `${api.defaults.baseURL}${API_URL}/${productId}/stock`,
        { stock_quantity: stockQuantity },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error updating product stock:', error);
      throw error;
    }
  },
  
  // Get low stock products - admin only
  getLowStockProducts: async (threshold = 10, token) => {
    try {
      const response = await axios.get(`${api.defaults.baseURL}${API_URL}/low-stock`, {
        params: { threshold },
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data.products;
    } catch (error) {
      console.error('Error fetching low stock products:', error);
      throw error;
    }
  },
  
  // Toggle product featured status - admin only
  toggleProductFeatured: async (productId, token) => {
    try {
      const response = await axios.put(
        `${api.defaults.baseURL}${API_URL}/${productId}/toggle-featured`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error toggling product featured status:', error);
      throw error;
    }
  },
  
  // Toggle product best seller status - admin only
  toggleProductBestSeller: async (productId, token) => {
    try {
      const response = await axios.put(
        `${api.defaults.baseURL}${API_URL}/${productId}/toggle-best-seller`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error toggling product best seller status:', error);
      throw error;
    }
  },
  
  // Toggle product active status - admin only
  toggleProductActive: async (productId, token) => {
    try {
      const response = await axios.put(
        `${api.defaults.baseURL}${API_URL}/${productId}/toggle-active`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error toggling product active status:', error);
      throw error;
    }
  },
  
  // Get product categories - no auth required
  getCategories: async () => {
    try {
      // First get all products
      const products = await productAPI.getAllProducts();
      
      // Extract unique categories
      const categories = [...new Set(products.map(product => product.category))];
      
      return categories;
    } catch (error) {
      console.error('Error fetching product categories:', error);
      throw error;
    }
  }
};

export default productAPI;