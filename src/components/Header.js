import React from 'react';
import '../styles/Header.css';
import logo from '../images/logo.jpg';

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <img src={logo} alt="Fruit Logo" style={{ height: '40px', marginRight: '8px' }} />
      </div>
      <nav>
        <a href="/">Home</a>
        <a href="/about">About Us</a>
        <a href="/products">Products</a>
        <a href="/contact">Contact Us</a>
        <a href="/login">Login</a>
      </nav>
    </header>
  );
};

export default Header;


