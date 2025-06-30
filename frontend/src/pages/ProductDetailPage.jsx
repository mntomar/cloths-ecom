import { useContext, useEffect, useState } from 'react';
import AppContext from '../context/AppContext';
import Navbar from '../components/Navbar';
import ProductSwiper from '../components/ProductSwiper';
import axiosInstance from '../api/axiosInstance';

const ProductDetailPage = () => {
  const {
    selectedProduct,
    setSelectedProduct,
    cartItems,
    setCartItems,
    setCurrentPage,
    showMessage,
    isLoggedIn,
    toggleAuthModal,
  } = useContext(AppContext);

  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    const found = cartItems.some(
      (item) => item.productId._id === selectedProduct?._id
    );
    setIsInCart(found);
  }, [cartItems, selectedProduct]);

  const handleAddRemoveClick = async () => {
    if (!isLoggedIn) {
      toggleAuthModal(true);
      return;
    }

    try {
      if (isInCart) {
        await axiosInstance.delete(`/cart/remove/${selectedProduct._id}`);
        setCartItems((prev) =>
          prev.filter((item) => item.productId._id !== selectedProduct._id)
        );
        showMessage(`${selectedProduct.name} removed from cart ❌`, 'error');
      } else {
        const res = await axiosInstance.post('/cart/add', {
          productId: selectedProduct._id,
          quantity: 1,
        });
        setCartItems(res.data.cart.items);
        showMessage(`${selectedProduct.name} added to cart ✅`, 'success');
      }
    } catch (error) {
      console.error('Cart update failed:', error);
      showMessage('Failed to update cart ❌', 'error');
    }
  };

  const handleBuyNow = async () => {
    if (!isLoggedIn) {
      toggleAuthModal(true);
      return;
    }

    try {
      if (!isInCart) {
        const res = await axiosInstance.post('/cart/add', {
          productId: selectedProduct._id,
          quantity: 1,
        });
        setCartItems(res.data.cart.items);
      }
      setCurrentPage('payment');
    } catch (error) {
      console.error('Buy Now failed:', error);
      showMessage('Buy Now failed ❌', 'error');
    }
  };

  if (!selectedProduct) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 font-inter">
        <p className="text-gray-600 text-lg">
          Product not found or not selected.{' '}
          <button
            onClick={() => setCurrentPage('dashboard')}
            className="text-indigo-600 hover:underline cursor-pointer"
          >
            Go to Home
          </button>
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 font-inter">
      <Navbar />

      <div className="container mx-auto py-8">
        {/* Back Button */}
        <button
          onClick={() => {
            setSelectedProduct(null);
            setCurrentPage('dashboard');
          }}
          className="flex items-center text-indigo-600 hover:text-indigo-800 transition duration-200 mb-6 text-lg font-medium cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Products
        </button>

        {/* Product Details */}
        <div className="bg-white rounded-lg shadow-xl p-6 lg:p-8 flex flex-col lg:flex-row gap-8">
          {/* Product Images */}
          <div className="lg:w-1/2">
            <ProductSwiper images={selectedProduct.images} />
          </div>

          {/* Product Info */}
          <div className="lg:w-1/2 flex flex-col">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
              {selectedProduct.name}
            </h1>
            <p className="text-gray-700 text-lg mb-6 leading-relaxed">
              {selectedProduct.description}
            </p>

            <div className="flex items-baseline mb-6">
              <span className="text-5xl font-bold text-indigo-700">
                ₹{selectedProduct.price.toFixed(2)}
              </span>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-auto pt-6 border-t border-gray-100">
              <button
                onClick={handleAddRemoveClick}
                className={`cursor-pointer w-full sm:w-auto px-6 py-3 rounded-lg text-lg font-semibold shadow-md transition duration-300 ${
                  isInCart
                    ? 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500'
                } focus:outline-none focus:ring-2 focus:ring-offset-2`}
              >
                {isInCart ? 'Remove from Cart' : 'Add to Cart'}
              </button>

              <button
                onClick={handleBuyNow}
                className="cursor-pointer w-full sm:w-auto px-6 py-3 rounded-lg text-lg font-semibold shadow-md transition duration-300 bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
