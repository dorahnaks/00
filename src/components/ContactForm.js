import React, { useState } from 'react';
import '../styles/ContactForm.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input 
          type="text" 
          name="firstName" 
          placeholder="Enter first name" 
          value={formData.firstName}
          onChange={handleChange}
        />
        <input 
          type="text" 
          name="lastName" 
          placeholder="Enter last name" 
          value={formData.lastName}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <input 
          type="tel" 
          name="phone" 
          placeholder="+256700000000" 
          value={formData.phone}
          onChange={handleChange}
        />
        <input 
          type="email" 
          name="email" 
          placeholder="fruitdesign@gmail.com" 
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <textarea 
          name="message" 
          placeholder="Tell us how we can help you" 
          value={formData.message}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn btn-primary">Send Message</button>
    </form>
  );
};

export default ContactForm;