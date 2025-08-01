import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import '../styles/Header.css';
import logo from '../images/logo.jpg';

const Header = () => {
  const { cart, isCartOpen, setIsCartOpen } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);
  
  // Calculate total cart value
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (!isAuthenticated) {
      // Redirect to login page with checkout as return path
      window.location.href = '/login?checkout=true';
    } else {
      // User is authenticated, proceed to checkout
      window.location.href = '/checkout';
    }
  };

  const handleProfileClick = () => {
    if (!isAuthenticated) {
      // Redirect to login page
      window.location.href = '/login';
    }
    // If authenticated, the dropdown will show automatically
  };

  return (
    <header className="header">
      <div className="logo-container">
        <img src={logo} alt="Fruit Logo" />
        <span className="brand-name">FreshFruits</span>
      </div>
      
      <nav className={isCartOpen ? 'mobile-menu active' : ''}>
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/about" className="nav-link">About Us</Link>
        <Link to="/products" className="nav-link">Products</Link>
        <Link to="/contact" className="nav-link">Contact Us</Link>
      </nav>
      
      <div className="header-actions">
        <div className="cart-section">
          <div className="cart-icon" onClick={() => setIsCartOpen(!isCartOpen)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            {cartItemCount > 0 && (
              <span className="cart-count">{cartItemCount}</span>
            )}
          </div>
          
          {cartItemCount > 0 && (
            <div className="checkout-button-container">
              <button 
                className="checkout-btn" 
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          )}
        </div>
        
        <div className="user-section">
          {isAuthenticated ? (
            <div className="user-profile">
              <div className="profile-icon" onClick={() => document.querySelector('.user-menu').classList.toggle('active')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <div className="user-menu">
                <span>Welcome, {user?.email.split('@')[0]}</span>
                <Link to="/account" className="account-link">My Account</Link>
                <button onClick={logout} className="logout-btn">Logout</button>
              </div>
            </div>
          ) : (
            <div className="profile-icon" onClick={handleProfileClick}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
          )}
        </div>
        
      </div>
    </header>
  );
};

export default Header;