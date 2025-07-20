import React from 'react';
import '../styles/ProductForm.css';

const ProductCard = ({ title, description }) => {
  return (
    <div className="product-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <button>Learn More</button>
    </div>
  );
};

export default ProductCard;