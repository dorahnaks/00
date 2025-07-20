import React from 'react';
import '../styles/About.css';

const About = () => {
  return (
    <div className="about">
      <h1>About FruitDesign</h1>
      <p>Fruit Design Limited is a Kampala-based juice company dedicated to bringing fresh, organic fruit juices directly to consumers. We are located in Kisungu Namuwongo on Muwuliriza Road.</p>
      
      <div className="team">
        <h2>Meet Our Team</h2>
        <div className="team-members">
          <div className="member">
            <h3>Our CEO</h3>
          </div>
          <div className="member">
            <h3>Nutritionist</h3>
          </div>
          <div className="member">
            <h3>Marketing Lead</h3>
          </div>
        </div>
      </div>
      
      <div className="location">
        <h2>Location</h2>
        <p>Kisugu Namuwongo, Muwuliriza Road</p>
      </div>
    </div>
  );
};

export default About;