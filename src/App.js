import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Contact from './pages/Contact';
import HealthTips from './pages/HealthTips';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import CartModal from './components/CartModal';
import CartNotification from './components/CartNotification';
import './App.css';
import Cart from './components/Cart';
import CheckoutForm from './pages/CheckoutForm';
import OrderConfirmation from './components/OrderConfirmation';
// import DebugInfo from './components/DebugInfo';
// Admin Components
import AdminLayout from './components/admin/AdminLayout';
import AuthRoute from './components/AuthRoute';
import CustomerManagement from './components/admin/CustomerManagement';
import ProductManagement from './components/admin/ProductManagement';
import OrderManagement from './components/admin/OrderManagement';
import FeedbackManagement from './components/admin/FeedbackManagement';
import AdminManagement from './components/admin/AdminManagement';
import ContactSettings from './components/admin/ContactSettings';
import Dashboard from './components/admin/Dashboard'; 
import AdminProfile from './components/admin/AdminProfile';
import PromotionsManagement from './components/admin/PromotionsManagement';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="app">
            <Routes>
              {/* Admin Routes - Check these first */}
              <Route path="/admin/*" element={
                <AuthRoute adminOnly>
                  <AdminLayout>
                    <Routes>
                      <Route path="dashboard" element={<Dashboard />} />
                      <Route path="customers" element={<CustomerManagement />} />
                      <Route path="products" element={<ProductManagement />} />
                      <Route path="orders" element={<OrderManagement />} />
                      <Route path="promotions" element={<PromotionsManagement />} />
                      <Route path="feedback" element={<FeedbackManagement />} />
                      <Route path="admins" element={<AdminManagement />} />
                      <Route path="contact" element={<ContactSettings />} />
                      <Route path="profile" element={<AdminProfile />} />
                      <Route path="*" element={<Dashboard />} />
                    </Routes>
                  </AdminLayout>
                </AuthRoute>
              } />
              
              {/* Customer Routes */}
              <Route path="/*" element={
                <>
                  <Header />
                  <CartModal />
                  <CartNotification />
                  <main className="main-content">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/products" element={<Products />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/health-tips" element={<HealthTips />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/signup" element={<Signup />} />
                      <Route path="/cart" element={<Cart />} />
                      <Route path="/checkout" element={
                        <AuthRoute>
                          <CheckoutForm />
                        </AuthRoute>
                      } />
                      <Route path="/order-confirmation" element={
                        <AuthRoute>
                          <OrderConfirmation />
                        </AuthRoute>
                      } />
                    </Routes>
                  </main>
                  <Footer />
                </>
              } />
            </Routes>
            
            {/* Temporary Debug Info */}
            {/* <DebugInfo /> */}
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;