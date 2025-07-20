
import '../styles/Login.css';
import LoginForm from '../components/LoginForm';

const Login = () => {
  return (
    <div className="login">
      <div className="login-container">
        <h1>Login to Your Account</h1>
        <LoginForm />
        <div className="login-links">
          <p>Don't have an account? <a href="/signup">Sign up</a></p>
          <p><a href="/forgot-password">Forgot password?</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;