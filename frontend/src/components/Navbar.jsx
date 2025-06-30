import { useContext } from 'react';
import AppContext from '../context/AppContext';

const Navbar = () => {
  const { cartItems, isLoggedIn, handleLogout, setCurrentPage, toggleAuthModal, userName } = useContext(AppContext);
  const cartItemCount = cartItems.length;

  return (
    <nav className="bg-white p-4 shadow-md sticky top-0 z-50 rounded-b-lg">
      <div className="container mx-auto flex justify-between items-center flex-wrap">
        
        
        <div
          className="text-2xl font-bold text-gray-800 cursor-pointer hover:text-indigo-600 transition"
          onClick={() => setCurrentPage('dashboard')}
        >
          Online Shop
        </div>

        <div className="flex items-center space-x-4 mt-2 sm:mt-0 flex-wrap justify-center">
          
          {/* Home */}
          <button
            onClick={() => setCurrentPage('dashboard')}
            className="cursor-pointer text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition duration-150"
          >
            Home
          </button>

          {/* About Us */}
          <button
            onClick={() => setCurrentPage('about')}
            className="cursor-pointer text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition duration-150"
          >
            About Us
          </button>

          {/* Contact */}
          <button
            onClick={() => setCurrentPage('contact')}
            className="cursor-pointer text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition duration-150"
          >
            Contact
          </button>

          {/* Cart */}
          <button
            onClick={() => setCurrentPage('cart')}
            className="cursor-pointer relative px-3 py-2 text-gray-700 hover:text-indigo-600 rounded-md text-sm font-medium transition duration-150 flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 0a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                {cartItemCount}
              </span>
            )}
            <span className="ml-1 hidden sm:inline">Cart</span>
          </button>

          {/* User Auth */}
          {isLoggedIn ? (
            <>
              <span className="text-gray-700 px-3 py-2 text-sm font-medium">Welcome, {userName || 'User'}!</span>
              <button
                onClick={handleLogout}
                className="cursor-pointer px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => toggleAuthModal(true)}
              className="cursor-pointer px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 text-sm"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
