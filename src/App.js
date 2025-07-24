// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Contact from './pages/Contact';
import HealthTips from './pages/HealthTips';
import Order from './pages/Order';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import CartModal from './components/CartModal';
import CartNotification from './components/CartNotification'; // Add this import
import './App.css';
import Cart from './components/Cart'

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="app">
          <Header />
          <CartModal />
          <CartNotification /> {/* Add this component */}
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/products" element={<Products />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/health-tips" element={<HealthTips />} />
              <Route path="/order" element={<Order />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}
export default App;