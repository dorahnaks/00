import React, { useState } from 'react';
import '../styles/Order.css';
import ProductCard from '../components/ProductForm';

const Order = () => {
  const [orderItems, setOrderItems] = useState([
    { id: 1, name: 'Orange Juice', quantity: 0, price: 5000 },
    { id: 2, name: 'Pineapple Juice', quantity: 0, price: 6000 },
    { id: 3, name: 'Berry Smoothie', quantity: 0, price: 7000 }
  ]);

  const [formData, setFormData] = useState({
    deliveryAddress: '',
    phone: '',
    paymentMethod: 'cash'
  });

  const handleQuantityChange = (id, change) => {
    setOrderItems(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, quantity: Math.max(0, item.quantity + change) } 
          : item
      )
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle order submission
  };

  const totalAmount = orderItems.reduce(
    (total, item) => total + item.quantity * item.price, 
    0
  );

  return (
    <div className="order">
      <h1>Fresh Fruits and Juices</h1>
      <p>Delivered to your doorstep</p>
      
      <div className="order-section">
        <div className="categories">
          <h2>Our Categories</h2>
          <div className="category">
            <h3>Fruits</h3>
            <div className="category-items">
              <ProductCard title="Crisp Apples" description="Perfect for snacking" />
              <ProductCard title="Sweet bananas" description="Great for juices" />
              <ProductCard title="Juicy oranges" description="A healthy treat" />
            </div>
          </div>
          
          <div className="category">
            <h3>Juices</h3>
            <div className="category-items">
              <ProductCard title="Orange Juice" description="Freshly squeezed oranges" />
              <ProductCard title="Pineapple Juice" description="Made using the best" />
              <ProductCard title="Beetroot juice" description="Great for your health" />
            </div>
          </div>
        </div>
        
        <div className="order-form-container">
          <h2>Place Your Order</h2>
          <div className="order-items">
            {orderItems.map(item => (
              <div key={item.id} className="order-item">
                <span>{item.name} - UGX {item.price}</span>
                <div className="quantity-controls">
                  <button onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                </div>
              </div>
            ))}
            <div className="order-total">
              <strong>Total: UGX {totalAmount}</strong>
            </div>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="delivery-info">
              <h3>Delivery Information</h3>
              <div className="form-group">
                <input 
                  type="text" 
                  name="deliveryAddress" 
                  placeholder="Delivery Address" 
                  value={formData.deliveryAddress}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <input 
                  type="tel" 
                  name="phone" 
                  placeholder="+256700000000" 
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <div className="payment-info">
              <h3>Payment Method</h3>
              <div className="payment-options">
                <label>
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="cash" 
                    checked={formData.paymentMethod === 'cash'}
                    onChange={handleInputChange}
                  />
                  Cash on Delivery
                </label>
                <label>
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="mobile" 
                    checked={formData.paymentMethod === 'mobile'}
                    onChange={handleInputChange}
                  />
                  Mobile Money
                </label>
              </div>
            </div>
            
            <button type="submit" className="btn btn-primary">Confirm Order</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Order;