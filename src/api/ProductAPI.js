// src/api/ProductAPI.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1';

const productAPI = {
  // Get all products
  getAllProducts: async () => {
    try {
      const response = await axios.get(`${API_URL}/products`);
      return response.data.products;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  // Get a single product by ID
  getProduct: async (productId) => {
    try {
      const response = await axios.get(`${API_URL}/products/${productId}`);
      return response.data.product;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  },

  // Create a new product
  createProduct: async (productData, token) => {
    try {
      // Create FormData for file upload
      const formData = new FormData();
      
      // Append all form fields
      Object.keys(productData).forEach(key => {
        if (key !== 'image') {
          formData.append(key, productData[key]);
        }
      });
      
      // Append image if it exists
      if (productData.image) {
        formData.append('image', productData.image);
      }
      
      const response = await axios.post(`${API_URL}/products`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  },

  // Update a product
  updateProduct: async (productId, productData, token) => {
    try {
      // Create FormData for file upload
      const formData = new FormData();
      
      // Append all form fields
      Object.keys(productData).forEach(key => {
        if (key !== 'image') {
          formData.append(key, productData[key]);
        }
      });
      
      // Append image if it exists
      if (productData.image && typeof productData.image === 'object') {
        formData.append('image', productData.image);
      }
      
      const response = await axios.put(`${API_URL}/products/${productId}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },

  // Delete a product
  deleteProduct: async (productId, token) => {
    try {
      const response = await axios.delete(`${API_URL}/products/${productId}`, {
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

  // Search products
  searchProducts: async (query) => {
    try {
      const response = await axios.get(`${API_URL}/products/search`, {
        params: { q: query }
      });
      return response.data.products;
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  },

  // Get products by category
  getProductsByCategory: async (categoryName) => {
    try {
      const response = await axios.get(`${API_URL}/products/category/${categoryName}`);
      return response.data.products;
    } catch (error) {
      console.error('Error fetching products by category:', error);
      throw error;
    }
  },

  // Update product stock
  updateProductStock: async (productId, stockQuantity, token) => {
    try {
      const response = await axios.put(
        `${API_URL}/products/${productId}/stock`,
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

  // Get low stock products
  getLowStockProducts: async (threshold = 10, token) => {
    try {
      const response = await axios.get(`${API_URL}/products/low-stock`, {
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
  }
};

export default productAPI;