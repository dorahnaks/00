// src/pages/Products.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { productAPI } from '../api/ProductAPI';
import '../styles/Products.css';
import ProductCard from '../components/ProductForm';

const Products = () => {
  const { cart } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [showMoreFruits, setShowMoreFruits] = useState(false);
  const [showMoreJuices, setShowMoreJuices] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const productsData = await productAPI.getAllProducts();
        setProducts(productsData);
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on search term
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });
  
  // Get fruits (show 4 initially, more when "More" is clicked)
  const fruits = filteredProducts.filter(product => product.category === "Fruits");
  const visibleFruits = showMoreFruits ? fruits : fruits.slice(0, 3);
  
  // Get juices (show 4 initially, more when "More" is clicked)
  const juices = filteredProducts.filter(product => product.category === "Juices");
  const visibleJuices = showMoreJuices ? juices : juices.slice(0, 3);
  
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
            onClick={() => window.location.reload()}
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
        <p>Browse our selection of fresh fruits and juices</p>
      </div>
      
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {/* Fruits Section */}
      <div className="category-section">
        <div className="category-header">
          <h2>Fresh Fruits</h2>
          {fruits.length > 3 && (
            <button 
              className="more-btn"
              onClick={() => setShowMoreFruits(!showMoreFruits)}
            >
              {showMoreFruits ? 'Show Less' : 'Show More'}
            </button>
          )}
        </div>
        
        <div className="products-grid">
          {visibleFruits.map(product => (
            <ProductCard 
              key={product.id}
              id={product.id}
              title={product.name}
              description={product.description}
              price={product.price}
              category={product.category}
              image={product.image}
            />
          ))}
        </div>
      </div>
      
      {/* Juices Section */}
      <div className="category-section">
        <div className="category-header">
          <h2>Fresh Juices</h2>
          {juices.length > 3 && (
            <button 
              className="more-btn"
              onClick={() => setShowMoreJuices(!showMoreJuices)}
            >
              {showMoreJuices ? 'Show Less' : 'Show More'}
            </button>
          )}
        </div>
        
        <div className="products-grid">
          {visibleJuices.map(product => (
            <ProductCard 
              key={product.id}
              id={product.id}
              title={product.name}
              description={product.description}
              price={product.price}
              category={product.category}
              image={product.image}
            />
          ))}
        </div>
      </div>
      
      {cart.length > 0 && (
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
            <h3>Total: UGX {cart.reduce((total, item) => total + item.price * item.quantity, 0).toLocaleString()}</h3>
          </div>
          <Link to="/checkout" className="btn-primary-n">Proceed to Checkout</Link>
        </div>
      )}
    </div>
  );
};

export default Products;