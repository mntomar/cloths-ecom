import { useContext, useState } from 'react';
import Navbar from '../components/Navbar';
import AppContext from '../context/AppContext';  // ✅ Correct AppContext import

const CheckoutPage = () => {
  const { selectedProduct, setCurrentPage, handleRemoveFromCart } = useContext(AppContext);

  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [upiId, setUpiId] = useState('');
  const [phonePeNumber, setPhonePeNumber] = useState('');
  const [paytmNumber, setPaytmNumber] = useState('');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const productToBuy = selectedProduct;

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!productToBuy) {
      alert('No product selected for checkout. Please go back to products.');
      setIsLoading(false);
      return;
    }

    let paymentDetailsValid = true;

    switch (paymentMethod) {
      case 'upi':
        if (!upiId.match(/^[a-zA-Z0-9.\-]+@[a-zA-Z0-9.\-]+$/)) {
          alert('Please enter a valid UPI ID (e.g., example@bank).');
          paymentDetailsValid = false;
        }
        break;
      case 'phonepe':
        if (!phonePeNumber.match(/^\d{10}$/)) {
          alert('Please enter a valid 10-digit PhonePe number.');
          paymentDetailsValid = false;
        }
        break;
      case 'paytm':
        if (!paytmNumber.match(/^\d{10}$/)) {
          alert('Please enter a valid 10-digit Paytm number.');
          paymentDetailsValid = false;
        }
        break;
      case 'card':
        if (
          !cardDetails.cardNumber.match(/^\d{16}$/) ||
          !cardDetails.cardName.trim() ||
          !cardDetails.expiryDate.match(/^(0[1-9]|1[0-2])\/([0-9]{2})$/) ||
          !cardDetails.cvv.match(/^\d{3,4}$/)
        ) {
          alert('Please fill all valid card details.');
          paymentDetailsValid = false;
        }
        break;
      default:
        alert('Please select a payment method.');
        paymentDetailsValid = false;
    }

    if (!paymentDetailsValid) {
      setIsLoading(false);
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate payment processing delay

    alert(`Order for ${productToBuy.name} placed successfully via ${paymentMethod.toUpperCase()}!`);

    handleRemoveFromCart(productToBuy.id || productToBuy._id);  // ✅ Handles both id/_id cases
    setIsLoading(false);
    setCurrentPage('dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 font-inter">
      <Navbar />

      <div className="container mx-auto py-8">
        <button
          onClick={() => {
            if (productToBuy?.id === 'cart_total') {
              setCurrentPage('cart');
            } else {
              setCurrentPage('dashboard');
            }
          }}
          className="flex items-center text-indigo-600 hover:text-indigo-800 transition duration-200 mb-6 text-lg font-medium"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </button>

        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">Checkout</h1>

        {productToBuy ? (
          <div className="bg-white rounded-lg shadow-xl p-6 lg:p-8">
            {/* Order Summary */}
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Summary</h2>
            <div className="flex items-center gap-4 border-b pb-4 mb-4">
              <img
                src={productToBuy.images?.[0] || 'https://placehold.co/80x80/cccccc/333333?text=Product'}
                alt={productToBuy.name}
                className="w-20 h-20 object-cover rounded-md"
              />
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{productToBuy.name}</h3>
                <p className="text-gray-600 text-lg">${productToBuy.price.toFixed(2)}</p>
              </div>
            </div>

            {/* Payment Form */}
            <form onSubmit={handlePlaceOrder} className="space-y-6">
              {/* Payment Method */}
              <div className="flex flex-col gap-3">
                {['upi', 'phonepe', 'paytm', 'card'].map((method) => (
                  <label key={method} className="inline-flex items-center text-lg text-gray-700">
                    <input
                      type="radio"
                      className="form-radio h-5 w-5 text-indigo-600"
                      name="paymentMethod"
                      value={method}
                      checked={paymentMethod === method}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span className="ml-2">{method.toUpperCase()}</span>
                  </label>
                ))}
              </div>

              {/* Payment Fields */}
              {paymentMethod === 'upi' && (
                <input
                  type="text"
                  placeholder="yourname@bank"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="w-full px-4 py-2 border rounded"
                />
              )}
              {paymentMethod === 'phonepe' && (
                <input
                  type="tel"
                  placeholder="10-digit PhonePe Number"
                  maxLength="10"
                  value={phonePeNumber}
                  onChange={(e) => setPhonePeNumber(e.target.value)}
                  className="w-full px-4 py-2 border rounded"
                />
              )}
              {paymentMethod === 'paytm' && (
                <input
                  type="tel"
                  placeholder="10-digit Paytm Number"
                  maxLength="10"
                  value={paytmNumber}
                  onChange={(e) => setPaytmNumber(e.target.value)}
                  className="w-full px-4 py-2 border rounded"
                />
              )}
              {paymentMethod === 'card' && (
                <>
                  <input
                    type="text"
                    placeholder="Card Number (16 digits)"
                    maxLength="16"
                    value={cardDetails.cardNumber}
                    onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
                    className="w-full px-4 py-2 border rounded"
                  />
                  <input
                    type="text"
                    placeholder="Name on Card"
                    value={cardDetails.cardName}
                    onChange={(e) => setCardDetails({ ...cardDetails, cardName: e.target.value })}
                    className="w-full px-4 py-2 border rounded"
                  />
                  <input
                    type="text"
                    placeholder="Expiry MM/YY"
                    value={cardDetails.expiryDate}
                    onChange={(e) => setCardDetails({ ...cardDetails, expiryDate: e.target.value })}
                    className="w-full px-4 py-2 border rounded"
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    maxLength="4"
                    value={cardDetails.cvv}
                    onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                    className="w-full px-4 py-2 border rounded"
                  />
                </>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="px-8 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                {isLoading ? 'Placing Order...' : 'Place Order'}
              </button>
            </form>
          </div>
        ) : (
          <p className="text-center text-gray-600">No product selected for checkout.</p>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
