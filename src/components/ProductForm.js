import React from 'react';
import '../styles/ProductForm.css';

const ProductCard = ({ image, title, description }) => {
  return (
    <div className="product-card">
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p>{description}</p>
      <button>Order now</button>
    </div>
  );
};

export default ProductCard;
