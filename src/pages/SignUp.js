
import '../styles/SignUp.css';
import SignupForm from '../components/SignUpForm';

const Signup = () => {
  return (
    <div className="signup">
      <div className="signup-container">
        <h1>Create Your Account</h1>
        <SignupForm />
        <div className="signup-links">
          <p>Already have an account? <a href="/login">Login</a></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;