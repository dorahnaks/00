import React from 'react';
import '../styles/Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">FRUIT</div>
      <nav>
        <a href="/">Home</a>
        <a href="/about">About Us</a>
        <a href="/products">Products</a>
        <a href="/contact">Contact Us</a>
      </nav>
    </header>
  );
};

export default Header;