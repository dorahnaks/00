
import '../styles/Contact.css';
import ContactForm from '../components/ContactForm';

const Contact = () => {
  return (
    <div className="contact">
      <h1>Get in Touch</h1>
      
      <div className="contact-info">
        <h2>Contact Information</h2>
        <p>Email: fruitdesign@gmail.com</p>
        <p>Phone: +256760457639</p>
        <p>Address: Kisugu - Namuwongo on Muwuliriza Road</p>
        <p>Working Hours: Mon - Fri: 7AM - 8PM, Sat - Sun: 8AM - 6PM</p>
      </div>
      
      <div className="contact-form-container">
        <h2>Send us a Message</h2>
        <ContactForm />
      </div>
    </div>
  );
};

export default Contact;