// src/components/Header.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../styles/Header.css';
import logo from '../images/logo.jpg';

const Header = () => {
  const { cart, isCartOpen, setIsCartOpen } = useCart();
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <header className="header">
      <div className="logo-container">
        <img src={logo} alt="Fruit Logo" style={{ height: '40px', marginRight: '8px' }} />
      </div>
      <nav className={showMobileMenu ? 'mobile-menu' : ''}>
        <Link to="/">Home</Link>
        <Link to="/about">About Us</Link>
        <Link to="/products">Products</Link>
        <Link to="/contact">Contact Us</Link>
      </nav>
      <div className="header-actions">
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
        <button className="mobile-menu-btn" onClick={() => setShowMobileMenu(!showMobileMenu)}>
          ☰
        </button>
      </div>
    </header>
  );
};

export default Header;