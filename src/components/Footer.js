import React from 'react';
import '../styles/Footer.css';


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

        <p>© 2025 Fruit Design. All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;


// const Footer = () => {
//   return (
//     <footer className="footer">
//       <div className="footer-content">
//         <div className="footer-section">
//           <h3>Location</h3>
//           <p>Kisugu Namuwongo</p>
//           <p>Muwuliriza Road</p>
//         </div>
//         <div className="footer-section">
//           <h3>Contact</h3>
//           <p>+256760457639</p>
//         </div>
//         <div className="footer-section">
//           <h3>Legal</h3>
//           <ul>
//             <li><a href="#">Terms of service</a></li>
//             <li><a href="#">Privacy policy</a></li>
//           </ul>
//         </div>
//         <div className="footer-section">
//           <h3>Our categories</h3>
//           <ul>
//             <li><a href="#">Fruits</a></li>
//             <li><a href="#">Juices</a></li>
//           </ul>
//         </div>
//       </div>
//       <div className="footer-bottom">
//         <p>&copy; 2025 Fruit Design. All rights reserved</p>
//       </div>
//     </footer>
//   );
// };

// export default Footer;