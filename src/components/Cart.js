// src/components/Cart.js
import React from 'react';
import { useCart } from '../context/CartContext';
import '../styles/Cart.css';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, clearCart, removeFromCart } = useCart();
  
  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <h2>Your Cart</h2>
        <p>Your cart is empty. Add some products to get started!</p>
        <Link to="/products" className="btn btn-primary">Browse Products</Link>
      </div>
    );
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      
      <div className="cart-items">
        {cart.map(item => (
          <div key={item.id} className="cart-item">
            <div className="item-info">
              <h3>{item.title}</h3>
              <p>UGX {item.price.toLocaleString()} x {item.quantity}</p>
            </div>
            <div className="item-total">
              UGX {(item.price * item.quantity).toLocaleString()}
            </div>
            <button 
              className="remove-btn"
              onClick={() => removeFromCart(item.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      
      <div className="cart-summary">
        <h3>Total: UGX {total.toLocaleString()}</h3>
        <div className="cart-actions">
          <button className="clear-btn" onClick={clearCart}>Clear Cart</button>
          <button className="checkout-btn">Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;