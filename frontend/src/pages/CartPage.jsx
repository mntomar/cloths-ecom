import { useContext, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import AppContext from '../context/AppContext';
import axiosInstance from '../api/axiosInstance';

const CartPage = () => {
  const { setCurrentPage, setCartItems, cartItems, showMessage } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchCart = async () => {
    try {
      const res = await axiosInstance.get('/cart');
      const items = res.data.cart && res.data.cart.items ? res.data.cart.items : [];
      setCartItems(items.filter((item) => item && item.productId));  //  Filter out null items
    } catch (err) {
      console.error('Error fetching cart:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Failed to load cart.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleRemoveItem = async (productId) => {
    try {
      await axiosInstance.delete(`/cart/remove/${productId}`);
      setCartItems((prev) => prev.filter((item) => item.productId?._id !== productId));
      showMessage('Item removed from cart ', 'error');
    } catch (err) {
      console.error('Error removing item:', err.response?.data || err.message);
      showMessage('Failed to remove item ', 'error');
    }
  };

  const handleProceedToCheckout = () => {
    if (cartItems.length === 0) {
      showMessage('Cart is empty ', 'error');
      return;
    }
    setCurrentPage('checkout'); //  Navigate to Checkout Page
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => {
        const price = item.productId?.price || 0;
        return total + price * item.quantity;
      }, 0)
      .toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <Navbar />

      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

        {loading ? (
          <p>Loading cart...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <ul className="space-y-4">
              {cartItems.map((item) => (
                item && item.productId && (
                  <li
                    key={item.productId._id}
                    className="flex gap-4 bg-white p-4 rounded shadow"
                  >
                    <img
                      src={item.productId.images?.[0] || 'https://placehold.co/100x100'}
                      alt={item.productId.name}
                      className="w-24 h-24 object-cover rounded"
                    />
                    <div className="flex-grow">
                      <h3 className="font-bold">{item.productId.name}</h3>
                      <p>Qty: {item.quantity}</p>
                      <p>Price: ₹{item.productId.price}</p>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item.productId._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Remove
                    </button>
                  </li>
                )
              ))}
            </ul>

            <div className="mt-6 text-xl">
              Total: ₹{calculateTotal()}
            </div>

            <button
              onClick={handleProceedToCheckout}
              className="mt-4 px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              Proceed to Checkout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
