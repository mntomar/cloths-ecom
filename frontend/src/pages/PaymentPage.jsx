import { useState } from 'react';
import Navbar from '../components/Navbar';

const PaymentPage = ({ product, onBack, onPaymentSuccess, onPaymentCanceled }) => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVV, setCardCVV] = useState('');
  const [message, setMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = (e) => {
    e.preventDefault();

    if (!paymentMethod) {
      setMessage('Please select a payment method.');
      return;
    }

    if (!name.trim() || !address.trim()) {
      setMessage(' Please fill in your name and address.');
      return;
    }

    if (['UPI', 'PhonePe', 'Paytm'].includes(paymentMethod) && !upiId.trim()) {
      setMessage(` Please enter your ${paymentMethod} UPI ID.`);
      return;
    }

    if (paymentMethod === 'Card' && (!cardNumber || !cardExpiry || !cardCVV)) {
      setMessage(' Please fill in all card details.');
      return;
    }

    setMessage(`Processing payment for "${product?.name}" via ${paymentMethod}...`);
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setMessage('✅ Payment successful! Thank you for your purchase.');
      onPaymentSuccess();
    }, 2000);
  };

  const handleBackClick = () => {
    onPaymentCanceled(product);
    onBack();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-teal-200 flex flex-col">
      <Navbar />

      <div className="flex flex-1 items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-8 max-w-lg w-full">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Checkout for {product?.name || 'Selected Product'}
          </h1>

          <p className="text-2xl text-blue-600 font-bold text-center mb-6">
            Price: ₹{product?.price ? product.price.toFixed(2) : 'N/A'}
          </p>

          <form onSubmit={handlePayment}>
            {/* Payment Method Selection */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Select Payment Method:
              </label>
              <div className="flex flex-wrap gap-4">
                {['UPI', 'PhonePe', 'Paytm', 'Card'].map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => {
                      setPaymentMethod(method);
                      setMessage('');
                    }}
                    className={`flex-1 min-w-[100px] py-2 px-4 rounded-lg font-semibold transition duration-200 ${
                      paymentMethod === method
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>

            {/* UPI / PhonePe / Paytm UPI ID Input */}
            {['UPI', 'PhonePe', 'Paytm'].includes(paymentMethod) && (
              <div className="mb-6">
                <label htmlFor="upiId" className="block text-gray-700 text-sm font-semibold mb-2">
                  {paymentMethod} UPI ID
                </label>
                <input
                  type="text"
                  id="upiId"
                  placeholder="example@upi"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="shadow border rounded-lg w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
              </div>
            )}

            {/* Card Details */}
            {paymentMethod === 'Card' && (
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-1">Card Number</label>
                  <input
                    type="text"
                    placeholder="XXXX XXXX XXXX XXXX"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="shadow border rounded-lg w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  />
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-gray-700 text-sm font-semibold mb-1">Expiry Date</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="shadow border rounded-lg w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-gray-700 text-sm font-semibold mb-1">CVV</label>
                    <input
                      type="password"
                      placeholder="CVV"
                      value={cardCVV}
                      onChange={(e) => setCardCVV(e.target.value)}
                      className="shadow border rounded-lg w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Full Name */}
            <div className="mb-6">
              <label htmlFor="name" className="block text-gray-700 text-sm font-semibold mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="shadow border rounded-lg w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              />
            </div>

            {/* Address */}
            <div className="mb-8">
              <label htmlFor="address" className="block text-gray-700 text-sm font-semibold mb-2">
                Shipping Address
              </label>
              <textarea
                id="address"
                placeholder="Fill address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="shadow border rounded-lg w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition h-24 resize-none"
              ></textarea>
            </div>

            {/* Pay Now Button */}
            <button
              type="submit"
              disabled={isProcessing}
              className={`w-full py-3 px-6 rounded-lg font-bold transition duration-300 transform hover:scale-105 ${
                isProcessing
                  ? 'bg-gray-400 cursor-not-allowed text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isProcessing ? 'Processing...' : 'Pay Now'}
            </button>
          </form>

          {/* Status Message */}
          {message && (
            <p
              className={`mt-4 text-center text-sm ${
                message.includes('successful') ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {message}
            </p>
          )}

          {/* Back Button */}
          <div className="mt-8 text-center">
            <button
              onClick={handleBackClick}
              disabled={isProcessing}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition duration-200"
            >
              &larr; Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
