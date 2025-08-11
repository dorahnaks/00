// src/context/CartContext.js
import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState(null);
  const [stockError, setStockError] = useState(null);

  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      
      // Check if adding this quantity would exceed available stock
      const currentQuantity = existingItem ? existingItem.quantity : 0;
      const newQuantity = currentQuantity + quantity;
      
      if (newQuantity > product.stock_quantity) {
        setStockError({
          productId: product.id,
          message: `Only ${product.stock_quantity} items available in stock. You currently have ${currentQuantity} in your cart.`
        });
        return prevCart; // Return unchanged cart
      }
      
      // Clear any previous stock error for this product
      if (stockError && stockError.productId === product.id) {
        setStockError(null);
      }
      
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id 
            ? { ...item, quantity: newQuantity } 
            : item
        );
      }
      
      setLastAddedItem(product);
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity, stockQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    
    if (newQuantity > stockQuantity) {
      setStockError({
        productId,
        message: `Only ${stockQuantity} items available in stock.`
      });
      return;
    }
    
    // Clear any previous stock error for this product
    if (stockError && stockError.productId === productId) {
      setStockError(null);
    }
    
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const clearCart = () => {
    setCart([]);
  };

  const clearStockError = () => {
    setStockError(null);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartTotal,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        lastAddedItem,
        stockError,
        clearStockError
      }}
    >
      {children}
    </CartContext.Provider>
  );
};