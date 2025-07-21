import React from 'react';
import '../styles/Home.css';
import ProductCard from '../components/ProductForm';
import orangeJuiceImg from '../images/orange_juice_home.png';
import appleHomeImg from '../images/apple_home.png';
import berrySmoothieImg from '../images/smoothie.png';
import tropicalSellersImg from '../images/salad.png';
import { FaLeaf, FaHeartbeat, FaBolt } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="home">

      {/* Hero Section */}
      <section className="hero">
        <h1>Taste the Freshness</h1>
        <p>Discover a wide selection of fresh fruits and delicious juices, crafted with care and bursting with flavour</p>
        <button className="order-btn">Order now</button>
      </section>

      {/* Best Sellers */}
      <section className="best-sellers">
        <h2>Best Sellers</h2>
        <div className="products-grid">
          <ProductCard 
            image={orangeJuiceImg}
            title="Orange Juice" 
            description="Made with 100% fresh oranges" 
          />
          <ProductCard 
            image={appleHomeImg}
            title="Crisp Apples" 
            description="Grown locally, full of flavour" 
          />
          <ProductCard 
            image={berrySmoothieImg}
            title="Berry Smoothie" 
            description="Blend of berries and yoghurt" 
          />
          <ProductCard 
            image={tropicalSellersImg}
            title="Tropical Sellers" 
            description="A refreshing mix of tropical fruits" 
          />
        </div>
      </section>

      {/* Health Benefits */}
      <section className="health-benefits">
        <h2>Why Choose Fruit Design?</h2>
        <p>Our commitment to quality ensures that you receive fresh and nutritious products straight from the farm to your table.</p>

        <div className="benefits-grid">
          <div className="benefit-card">
            <FaHeartbeat className="benefit-icon" />
            <div className="benefit-text">
              <h3>Boost Your Immunity</h3>
              <p>Our fruits and juices are packed with vitamins and antioxidants to support your immune system.</p>
            </div>
          </div>

          <div className="benefit-card">
            <FaLeaf className="benefit-icon" />
            <div className="benefit-text">
              <h3>Natural Goodness</h3>
              <p>Enjoy natural flavours and nutrients without any artificial additives or preservatives.</p>
            </div>
          </div>

          <div className="benefit-card">
            <FaBolt className="benefit-icon" />
            <div className="benefit-text">
              <h3>Energy Boost</h3>
              <p>Get a natural energy boost with our refreshing fruits and juices, perfect for any time of the day.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Offerings */}
      <section className="explore-offerings">
        <h2>Explore Our Offerings</h2>
        <p>Discover a wide range of fruits and juices we offer, each with its unique taste and health benefit.</p>
        <button className="learn-more-btn">Learn More</button>
      </section>

    </div>
  );
};

export default Home;
