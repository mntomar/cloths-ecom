import { useState, useEffect } from 'react';
import AppContext from './context/AppContext';
import DashboardPage from './pages/DashboardPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AuthModal from './components/AuthModal';
import Toast from './components/Toast';
import CheckoutPage from './pages/CheckoutPage';
import PaymentPage from './pages/PaymentPage';
import axiosInstance from './api/axiosInstance';
import Footer from './components/Footer';
function App() {
  const [toast, setToast] = useState({ message: '', type: '' });
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem('cartItems');
    return storedCart ? JSON.parse(storedCart) : [];
  });
  const [userName, setUserName] = useState(() => localStorage.getItem('userName') || '');
  const [isLoggedIn, setIsLoggedIn] = useState(!!userName);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Save cart to localStorage when cart changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  //  Toast popup
  const showMessage = (msg, type = 'success') => {
    setToast({ message: msg, type });
    setTimeout(() => setToast({ message: '', type: '' }), 3000);
  };

  //  Login success
  const handleLoginSuccess = (name) => {
    setUserName(name);
    localStorage.setItem('userName', name);
    setIsLoggedIn(true);
    setShowAuthModal(false);
    showMessage(`Welcome, ${name}!`, 'success');
  };

  //  Logout
  const handleLogout = () => {
    setUserName('');
    localStorage.removeItem('userName');
    setIsLoggedIn(false);
    setCartItems([]);  // Clear cart on logout
    showMessage('You have been logged out.', 'success');
    setCurrentPage('dashboard');
  };

  //  Add to Cart (backend + update cart)
  const handleAddToCart = async (product) => {
    try {
      const res = await axiosInstance.post('/cart/add', {
        productId: product._id,
        quantity: 1,
      });
      setCartItems(res.data.cart.items);
      showMessage(`${product.name} added to cart ✅`, 'success');
    } catch (error) {
      console.error('Add to cart failed:', error.response?.data || error.message);
      showMessage('Failed to add to cart ❌', 'error');
    }
  };

  //  Remove from Cart
  const handleRemoveFromCart = async (productId) => {
    try {
      await axiosInstance.delete(`/cart/remove/${productId}`);
      setCartItems((prev) => prev.filter((item) => item.productId._id !== productId));
      showMessage('Item removed from cart ❌', 'error');
    } catch (error) {
      console.error('Remove from cart failed:', error.response?.data || error.message);
    }
  };

  //  For Buy Now → go directly to Payment
  const handleBuyNow = (product) => {
    setSelectedProduct(product);
    setCurrentPage('payment');
  };

  //  Toggle Auth Modal
  const toggleAuthModal = (show) => setShowAuthModal(show);

  const contextValue = {
    currentPage,
    setCurrentPage,
    selectedProduct,
    setSelectedProduct,
    cartItems,
    setCartItems,
    handleAddToCart,
    handleRemoveFromCart,
    handleBuyNow,
    userName,
    setUserName,
    isLoggedIn,
    setIsLoggedIn,
    showMessage,
    handleLogout,
    toggleAuthModal,
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'productDetail':
        return <ProductDetailPage />;
      case 'cart':
        return <CartPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'payment':
        return selectedProduct ? (
          <PaymentPage
            product={selectedProduct}
            onBack={() => setCurrentPage('cart')}                 
            onPaymentSuccess={() => {
              showMessage('Payment Successful ✅', 'success');
              setCartItems([]);                                   
              setCurrentPage('dashboard');
            }}
            onPaymentCanceled={(product) => {
              setSelectedProduct(product);
            }}
          />
        ) : (
          <DashboardPage />
        );
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    
    <AppContext.Provider value={contextValue}>
      <div className="font-inter">
        {renderPage()}

        {showAuthModal && (
          <AuthModal
            onLoginSuccess={handleLoginSuccess}
            onClose={() => toggleAuthModal(false)}
          />
        )}

        {toast.message && <Toast message={toast.message} type={toast.type} />}
      </div>
      <Footer />
    </AppContext.Provider>
  );
}

export default App;
