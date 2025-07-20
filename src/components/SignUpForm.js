import React, { useState } from 'react';
import '../styles/SignUp.css';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <div className="form-group">
        <input 
          type="text" 
          name="firstName" 
          placeholder="First name" 
          value={formData.firstName}
          onChange={handleChange}
        />
        <input 
          type="text" 
          name="lastName" 
          placeholder="Last name" 
          value={formData.lastName}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <input 
          type="email" 
          name="email" 
          placeholder="youremail@example.com" 
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          value={formData.password}
          onChange={handleChange}
        />
        <input 
          type="password" 
          name="confirmPassword" 
          placeholder="Confirm Password" 
          value={formData.confirmPassword}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn btn-primary">Sign Up</button>
    </form>
  );
};

export default SignupForm;