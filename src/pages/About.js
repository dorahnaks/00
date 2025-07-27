import React from 'react';
import '../styles/About.css';

// Import your images
import manager from '../images/manager.jpg';
import ceo from '../images/nutri.jpg';
import nutri from '../images/nutttt.jpg';
import appleImage from '../images/apple_order_page.jpg';
import orangeJuiceImage from '../images/orange_juice_home.png';


const AboutMe = () => {
  return (
    <div className="about-me-container">
      <div className="about-header">
        <h1>About Our Fruit Business</h1>
        <p>Quality fruits and juices since 2010</p>
      </div>
      
      <div className="about-content">
        <div className="about-text">
          <h2>Our Story</h2>
          <p>Founded in 2010, we started as a small family business delivering fresh fruits to local markets. Today, we've grown into a trusted source for premium fruits and natural juices across the region.</p>
          
          <h2>Our Mission</h2>
          <p>To provide the freshest, highest-quality fruits and juices while maintaining sustainable farming practices and exceptional customer service.</p>
          
          <h2>Our Values</h2>
          <ul>
            <li><strong>Quality</strong> - Only the best fruits make the cut</li>
            <li><strong>Freshness</strong> - From farm to table in the shortest time possible</li>
            <li><strong>Sustainability</strong> - Eco-friendly practices and packaging</li>
            <li><strong>Customer Satisfaction</strong> - Your happiness is our priority</li>
          </ul>
        </div>
        
        <div className="about-images">
          <div className="image-card">
            <img 
              src={appleImage} 
              alt="Fruit orchard" 
              className="about-image"
            />
            <div className="image-caption">Our fruit orchards</div>
          </div>
          
          <div className="image-card">
            <img 
              src={orangeJuiceImage} 
              alt="Juice production" 
              className="about-image"
            />
            <div className="image-caption">Fresh juice production</div>
          
        
          </div>
        </div>
      </div>
      
      <div className="team-section">
        <h2>Meet Our Team</h2>
        <div className="team-grid">
          <div className="team-member">
            <img 
              src={ceo} 
              alt="CEO" 
              className="team-photo"
            />
            <h3>Sarah Johnson</h3>
            <p>Founder & CEO</p>
          </div>
          
          <div className="team-member">
            <img 
              src={manager} 
              alt="Operations Manager" 
              className="team-photo"
            />
            <h3>Michael Chen</h3>
            <p>Head of Operations</p>
          </div>
          
          <div className="team-member">
            <img 
              src={nutri} 
              alt="Nutritionist" 
              className="team-photo"
            />
            <h3>Emily Rodriguez</h3>
            <p>Quality Control Manager</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;