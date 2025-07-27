import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../styles/Products.css';
import ProductCard from '../components/ProductForm';

// Import your product images
import appleImage from '../images/apple_order_page.jpg';
import bananaImage from '../images/b_order_pg.jpg';
import orangeImage from '../images/oranges_pdt_pg.jpg';
import orangeJuiceImage from '../images/orange_juice_home.png';
import pineappleJuiceImage from '../images/jui_order_pg.jpg';
import beetrootJuiceImage from '../images/beetroot juice_order_pg.jpg';
import mangoImage from '../images/order_page_background.jpg';
import watermelonImage from '../images/watermelon_order_pg.jpg';
import grapeImage from '../images/grape_jui_health_tips_pg.jpg';
import appleJuiceImage from '../images/juice-pre_order_pg.jpg';
import carrotJuiceImage from '../images/order_pg.jpg';
import strawberryImage from '../images/order_pg.jpg';
import kiwiImage from '../images/order_pg.jpg';
import blueberryImage from '../images/smoothie.png';
import pineappleImage from '../images/order_page_background.jpg';
import mixedFruitJuiceImage from '../images/pdt_pg.jpg';
import watermelonJuiceImage from '../images/watermelon_order_pg.jpg';

const Products = () => {
  const { cart, addToCart } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showMoreFruits, setShowMoreFruits] = useState(false);
  const [showMoreJuices, setShowMoreJuices] = useState(false);
  
  // Sample products data - only fruits and juices
  const products = [
    // Fruits
    {
      id: 1,
      title: "Crisp Apples",
      description: "Perfect for snacking",
      price: 5000,
      category: "Fruits",
      image: appleImage
    },
    {
      id: 2,
      title: "Sweet Bananas",
      description: "Great for juices",
      price: 3000,
      category: "Fruits",
      image: bananaImage
    },
    {
      id: 3,
      title: "Juicy Oranges",
      description: "A healthy treat",
      price: 4500,
      category: "Fruits",
      image: orangeImage
    },
    {
      id: 7,
      title: "Fresh Mangoes",
      description: "Sweet and tropical",
      price: 6000,
      category: "Fruits",
      image: mangoImage
    },
    {
      id: 8,
      title: "Watermelons",
      description: "Refreshing summer fruit",
      price: 8000,
      category: "Fruits",
      image: watermelonImage
    },
    {
      id: 9,
      title: "Green Grapes",
      description: "Sweet and juicy",
      price: 5500,
      category: "Fruits",
      image: grapeImage
    },
    {
      id: 16,
      title: "Strawberries",
      description: "Sweet and juicy berries",
      price: 7000,
      category: "Fruits",
      image: strawberryImage
    },
    {
      id: 17,
      title: "Kiwi Fruits",
      description: "Tangy and nutritious",
      price: 6500,
      category: "Fruits",
      image: kiwiImage
    },
    {
      id: 18,
      title: "Blueberries",
      description: "Antioxidant-rich berries",
      price: 7500,
      category: "Fruits",
      image: blueberryImage
    },
    {
      id: 19,
      title: "Pineapples",
      description: "Tropical and sweet",
      price: 6000,
      category: "Fruits",
      image: pineappleImage
    },
    
    // Juices
    {
      id: 4,
      title: "Orange Juice",
      description: "Freshly squeezed oranges",
      price: 7000,
      category: "Juices",
      image: orangeJuiceImage
    },
    {
      id: 5,
      title: "Pineapple Juice",
      description: "Made using the best",
      price: 8000,
      category: "Juices",
      image: pineappleJuiceImage
    },
    {
      id: 6,
      title: "Beetroot Juice",
      description: "Great for your health",
      price: 6500,
      category: "Juices",
      image: beetrootJuiceImage
    },
    {
      id: 10,
      title: "Apple Juice",
      description: "Pure apple goodness",
      price: 7500,
      category: "Juices",
      image: appleJuiceImage
    },
    {
      id: 11,
      title: "Carrot Juice",
      description: "Rich in vitamins",
      price: 6000,
      category: "Juices",
      image: carrotJuiceImage
    },
    {
      id: 20,
      title: "Mixed Fruit Juice",
      description: "Combination of seasonal fruits",
      price: 8500,
      category: "Juices",
      image: mixedFruitJuiceImage
    },
    {
      id: 21,
      title: "Watermelon Juice",
      description: "Refreshing and hydrating",
      price: 7000,
      category: "Juices",
      image: watermelonJuiceImage
    }
  ];

  // Filter products based on search term
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // Get fruits (show 3 initially, more when "More" is clicked)
  const fruits = filteredProducts.filter(product => product.category === "Fruits");
  const visibleFruits = showMoreFruits ? fruits : fruits.slice(0, 3);

  // Get juices (show 3 initially, more when "More" is clicked)
  const juices = filteredProducts.filter(product => product.category === "Juices");
  const visibleJuices = showMoreJuices ? juices : juices.slice(0, 3);

  return (
    <div className="products-container">
      <div className="products-header">
        <h1>Our Fresh Products</h1>
        <p>Browse our selection of fresh fruits and juices</p>
      </div>
      
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {/* Fruits Section */}
      <div className="category-section">
        <div className="category-header">
          <h2>Fresh Fruits</h2>
          <button 
            className="more-btn"
            onClick={() => setShowMoreFruits(!showMoreFruits)}
          >
            {showMoreFruits ? 'Show Less' : 'Show More'}
          </button>
        </div>
        
        <div className="products-grid">
          {visibleFruits.map(product => (
            <ProductCard 
              key={product.id}
              id={product.id}
              title={product.title}
              description={product.description}
              price={product.price}
              category={product.category}
              image={product.image}
            />
          ))}
        </div>
      </div>
      
      {/* Juices Section */}
      <div className="category-section">
        <div className="category-header">
          <h2>Fresh Juices</h2>
          <button 
            className="more-btn"
            onClick={() => setShowMoreJuices(!showMoreJuices)}
          >
            {showMoreJuices ? 'Show Less' : 'Show More'}
          </button>
        </div>
        
        <div className="products-grid">
          {visibleJuices.map(product => (
            <ProductCard 
              key={product.id}
              id={product.id}
              title={product.title}
              description={product.description}
              price={product.price}
              category={product.category}
              image={product.image}
            />
          ))}
        </div>
      </div>
      
      {cart.length > 0 && (
        <div className="cart-summary">
          <h2>Cart Summary</h2>
          <div className="cart-items">
            {cart.map(item => (
              <div key={item.id} className="summary-item">
                <span>{item.title} x {item.quantity}</span>
                <span>UGX {(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="total">
            <h3>Total: UGX {cart.reduce((total, item) => total + item.price * item.quantity, 0).toLocaleString()}</h3>
          </div>
          <Link to="/checkout" className="btn-primary">Proceed to Checkout</Link>
        </div>
      )}
    </div>
  );
};

export default Products;