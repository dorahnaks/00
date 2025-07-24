// src/pages/Contact.js
import '../styles/Contact.css';
import ContactForm from '../components/ContactForm';


const Contact = () => {
  return (
    <>
    
      <div className="contact">
        <h1 className="contact-heading">
          <span className="gradient-text">Get in Touch</span>
        </h1>

        <div className="contact-content">
          <div className="contact-info">
            <h2>Contact Information</h2>

            <div className="info-item">
              <div className="icon phone-icon" />
              <div>
                <strong>Phone</strong>
                <p>+256 760457639</p>
              </div>
            </div>

            <div className="info-item">
              <div className="icon email-icon" />
              <div>
                <strong>Email</strong>
                <p>fruitdesign@gmail.com</p>
              </div>
            </div>

            <div className="info-item">
              <div className="icon location-icon" />
              <div>
                <strong>Address</strong>
                <p>Kisungu – Namuwongo on Muwuliriza Road</p>
              </div>
            </div>

            <div className="info-item">
              <div className="icon clock-icon" />
              <div>
                <strong>Working Hours</strong>
                <p>Mon – Fri: 7AM – 8PM<br />Sat – Sun: 8AM – 6PM</p>
              </div>
            </div>
          </div>

          <div className="contact-form-container">
            <h2>Send us a Message</h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
