// src/pages/Cart.js
import React from 'react';
import { Link } from 'react-router-dom'; // Add this import
import { useCart } from '../context/CartContext';
import '../styles/Cart.css';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

  return (
    <div className="cart-container">
      <h1>Your Shopping Cart</h1>
      
      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <Link to="/products" className="btn-primary">Continue Shopping</Link>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.title} />
                <div className="cart-item-details">
                  <h3>{item.title}</h3>
                  <p>UGX {item.price.toLocaleString()}</p>
                  <div className="quantity-controls">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                </div>
                <div className="cart-item-total">
                  <p>UGX {(item.price * item.quantity).toLocaleString()}</p>
                  <button 
                    className="remove-btn" 
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="cart-summary">
            <div className="cart-total">
              <h2>Total: UGX {cartTotal.toLocaleString()}</h2>
            </div>
            <div className="cart-actions">
              <button className="btn-secondary" onClick={clearCart}>Clear Cart</button>
              <Link to="/order" className="btn-primary">Proceed to Checkout</Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;