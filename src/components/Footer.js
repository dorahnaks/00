import React from 'react';
import '../styles/Footer.css';
import facebookIcon from '../images/fb_icon.png';
import twitterIcon from '../images/twitter.png';
import instagramIcon from '../images/insta_icon.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-columns">
        <div>
          <h4>Our categories</h4>
          <p>Fruits<br/>Juices</p>
        </div>
        <div>
          <h4>Legal</h4>
          <p>Terms of service<br/>Privacy policy</p>
        </div>
        <div>
          <h4>Contact</h4>
          <p>+256 760457639</p>
        </div>
        <div>
          <h4>Location</h4>
          <p>Kisugu Namuwongo<br/>Muwuliriza Road</p>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-social">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <img src={instagramIcon} alt="Instagram" className="social-icon" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <img src={facebookIcon} alt="Facebook" className="social-icon" />
          </a>
          <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X">
            <img src={twitterIcon} alt="X" className="social-icon x-icon" />
          </a>
        </div>
        <p>© 2025 Fruit Design. All rights reserved</p>
      </div>
    </footer>
  );
};
export default Footer;