import { createContext } from 'react';

const AppContext = createContext({
  currentPage: 'dashboard',
  setCurrentPage: () => {},
  selectedProduct: null,
  setSelectedProduct: () => {},
  cartItems: [],
  setCartItems: () => {},
  handleAddToCart: () => {},
  handleRemoveFromCart: () => {},
  userName: '',
  setUserName: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  showMessage: () => {},
  handleLogout: () => {},
  toggleAuthModal: () => {},
});

export default AppContext;
