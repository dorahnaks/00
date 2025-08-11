// App.js
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
import CustomerProfile from './pages/CustomerProfile';

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

// Create a Layout component for customer pages
const CustomerLayout = ({ children }) => (
  <>
    <Header />
    <CartModal />
    <CartNotification />
    <main className="main-content">
      {children}
    </main>
    <Footer />
  </>
);

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="app">
            <Routes>
              {/* Admin Routes */}
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
                      {/* Superadmin only routes */}
                      <Route path="admins" element={
                        <AuthRoute superAdminOnly>
                          <AdminManagement />
                        </AuthRoute>
                      } />
                      <Route path="contact" element={<ContactSettings />} />
                      <Route path="profile" element={<AdminProfile />} />
                      <Route path="*" element={<Dashboard />} />
                    </Routes>
                  </AdminLayout>
                </AuthRoute>
              } />
              
              {/* Customer Routes */}
              <Route path="/" element={
                <CustomerLayout>
                  <Home />
                </CustomerLayout>
              } />
              <Route path="/about" element={
                <CustomerLayout>
                  <About />
                </CustomerLayout>
              } />
              <Route path="/products" element={
                <CustomerLayout>
                  <Products />
                </CustomerLayout>
              } />
              <Route path="/contact" element={
                <CustomerLayout>
                  <Contact />
                </CustomerLayout>
              } />
              <Route path="/health-tips" element={
                <CustomerLayout>
                  <HealthTips />
                </CustomerLayout>
              } />
              <Route path="/login" element={
                <CustomerLayout>
                  <Login />
                </CustomerLayout>
              } />
              <Route path="/signup" element={
                <CustomerLayout>
                  <Signup />
                </CustomerLayout>
              } />
              <Route path="/cart" element={
                <CustomerLayout>
                  <Cart />
                </CustomerLayout>
              } />
              <Route path="/checkout" element={
                <AuthRoute>
                  <CustomerLayout>
                    <CheckoutForm />
                  </CustomerLayout>
                </AuthRoute>
              } />
              <Route path="/order-confirmation" element={
                <AuthRoute>
                  <CustomerLayout>
                    <OrderConfirmation />
                  </CustomerLayout>
                </AuthRoute>
              } />
              <Route path="/account" element={
                <AuthRoute>
                  <CustomerLayout>
                    <CustomerProfile />
                  </CustomerLayout>
                </AuthRoute>
              } />
              
              {/* Catch-all route */}
              <Route path="*" element={
                <CustomerLayout>
                  <Home />
                </CustomerLayout>
              } />
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;