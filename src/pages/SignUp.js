import React from 'react';
import SignupForm from '../components/SignUpForm';
import '../styles/SignUp.css';

const Signup = () => {
  const handleSignupSuccess = () => {
    console.log('Signup successful!');
    // Redirect to login page after successful signup
    window.location.href = '/login';
  };
  
  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-header">
          <h1>Create Your Account</h1>
          <p>Fill in the form below to get started</p>
        </div>
        
        <SignupForm onSignupSuccess={handleSignupSuccess} />
        
        <div className="signup-links">
          <p>Already have an account? <a href="/login">Login</a></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;