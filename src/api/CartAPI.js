const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_URL}${endpoint}`;
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
  };
  const config = { ...defaultOptions, ...options };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || data.message || 'Something went wrong');
    }

    return { data };
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

export const cartAPI = {
  getCart: () => apiRequest('/api/v1/cart'),
  addToCart: (productId, quantity) => apiRequest('/api/v1/cart', {
    method: 'POST',
    body: JSON.stringify({ product_id: productId, quantity }),
  }),
  updateCartItem: (itemId, quantity) => apiRequest(`/api/v1/cart/${itemId}`, {
    method: 'PUT',
    body: JSON.stringify({ quantity }),
  }),
  removeCartItem: (itemId) => apiRequest(`/api/v1/cart/${itemId}`, {
    method: 'DELETE',
  }),
  clearCart: () => apiRequest('/api/v1/cart', {
    method: 'DELETE',
  }),
};