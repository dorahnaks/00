import React from 'react';
import '../styles/ProductForm.css';
import { useCart } from '../context/CartContext';

const ProductCard = ({ id, title, description, price, category, image }) => {
  const { addToCart } = useCart();
  
  // Ensure price is a valid number
  const safePrice = parseFloat(price) || 0;
  
  const handleAddToCart = (e) => {
    e.preventDefault();
    
    const productToAdd = {
      id,
      title,
      description,
      price: safePrice,
      image,
      category
    };
    
    addToCart(productToAdd);
    console.log(`Added ${title} to cart`);
  };
  
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={image} alt={title} />
        <div className="product-category">{category}</div>
      </div>
      <div className="product-details">
        <h3 className="product-title">{title}</h3>
        <p className="product-description">{description}</p>
        <div className="product-footer">
          <span className="product-price">UGX {safePrice.toLocaleString()}</span>
          <button 
            className="add-to-cart-btn" 
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;