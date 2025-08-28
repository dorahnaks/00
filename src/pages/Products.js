// src/pages/Products.js

import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import productAPI from '../api/ProductAPI';
import '../styles/Products.css';
import ProductCard from '../components/ProductCard';

const Products = () => {
  const { cart = [] } = useAuth(); // Only need cart, remove auth dependencies
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [showMore, setShowMore] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Available categories
  const categories = [
    "Fresh Fruits",
    "Natural Juices", 
    "Dried Fruits",
    "Detox Juice Packages"
  ];

  // Fetch products from API (no auth required)
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      console.log('Fetching products...');
      // Remove token dependency - API call doesn't require authentication
      const productsData = await productAPI.getAllProducts();
      console.log('Products fetched:', productsData);
      setProducts(productsData);
      setError(null);
    } catch (err) {
      console.error('Error fetching products:', err);
      if (err.response) {
        console.error('Response status:', err.response.status);
        console.error('Response data:', err.response.data);
      } else if (err.request) {
        console.error('No response received:', err.request);
      } else {
        console.error('Error message:', err.message);
      }
      setError('Failed to load products. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Filter products based on search term and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter ? product.category === categoryFilter : true;
    return matchesSearch && matchesCategory;
  });
  
  // Get products for the selected category (or all if none selected)
  const getProductsForCategory = (category) => {
    return filteredProducts.filter(product => product.category === category);
  };
  
  // Loading state
  if (loading) {
    return (
      <div className="products-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading products...</p>
        </div>
      </div>
    );
  }
  
  // Error state
  if (error) {
    return (
      <div className="products-container">
        <div className="error-container">
          <p>{error}</p>
          <button 
            className="btn-primary-n"
            onClick={fetchProducts}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="products-container">
      <div className="products-header">
        <h1>Our Fresh Products</h1>
        <p>Browse our selection of fresh fruits, juices, and health packages</p>
      </div>
      
      <div className="search-filter-container">
        <div className="search-bar-container">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="category-filter-container">
          <select
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setShowMore(false);
            }}
            className="category-filter"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Conditionally render categories based on filter */}
      {categoryFilter === "" ? (
        // Show all categories when no filter is selected
        <>
          {renderCategorySection("Fresh Fruits")}
          {renderCategorySection("Natural Juices")}
          {renderCategorySection("Dried Fruits")}
          {renderCategorySection("Detox Juice Packages")}
        </>
      ) : (
        // Show only the selected category
        renderCategorySection(categoryFilter)
      )}
      
      {cart && cart.length > 0 && (
        <div className="cart-summary">
          <h2>Cart Summary</h2>
          <div className="cart-items">
            {cart.map(item => (
              <div key={item.id} className="summary-item">
                <span>{item.title} x {item.quantity}</span>
                <span>UGX {(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="total">
            <h3>Total: <span>UGX {cart.reduce((total, item) => total + item.price * item.quantity, 0).toLocaleString()}</span></h3>
          </div>
          <Link to="/checkout" className="btn-primary-n">Proceed to Checkout</Link>
        </div>
      )}
    </div>
  );
  
  // Helper function to render a category section
  function renderCategorySection(categoryName) {
    const categoryProducts = getProductsForCategory(categoryName);
    const visibleProducts = showMore ? categoryProducts : categoryProducts.slice(0, 3);
    
    if (!categoryProducts || categoryProducts.length === 0) {
      return null; // Don't render empty categories
    }
    
    return (
      <div className="category-section">
        <div className="category-header">
          <h2>{categoryName}</h2>
          {categoryProducts.length > 3 && (
            <button 
              className="more-btn"
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? 'Show Less' : 'Show More'}
            </button>
          )}
        </div>
        
        <div className="products-grid">
          {visibleProducts.map(product => (
            <ProductCard 
              key={product.id}
              id={product.id}
              title={product.name}
              description={product.description}
              price={product.price}
              category={product.category}
              image={`http://localhost:5000${product.image_url}`}
              stock_quantity={product.stock_quantity}
            />
          ))}
        </div>
      </div>
    );
  }
};

export default Products;