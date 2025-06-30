import { useState, useContext } from "react";
import axiosInstance from "../api/axiosInstance";
import AppContext from "../context/AppContext";

const AuthModal = ({ onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentForm, setCurrentForm] = useState('login');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const { setIsLoggedIn, setUserName } = useContext(AppContext);

  //  LOGIN Handler
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsLoading(true);

    try {
      const response = await axiosInstance.post('/auth/login', { email, password });
      console.log('Login success:', response.data);

      //  Save token to localStorage
      localStorage.setItem('token', response.data.token);

      setIsLoggedIn(true);
      setUserName(response.data.userName);
      if (onLoginSuccess) onLoginSuccess(response.data.userName);
      onClose();
    } catch (error) {
      console.error('Login Error:', error.response?.data);
      setMessage(error.response?.data?.message || 'Login failed.');
    } finally {
      setIsLoading(false);
    }
  };

  //  SIGNUP Handler
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsLoading(true);

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      setIsLoading(false);
      return;
    }

    try {
      await axiosInstance.post('/auth/register', {
        email,
        password,
        userName: email.split('@')[0], // Or get username input if you have one
      });

      setMessage('Account created! Please log in.');
      setCurrentForm('login');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Signup Error:', error.response?.data);
      setMessage(error.response?.data?.message || 'Signup failed.');
    } finally {
      setIsLoading(false);
    }
  };

  // FORGOT PASSWORD Handler 
  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsLoading(true);

    setTimeout(() => {
      setMessage('Password reset link sent (simulated).');
      setCurrentForm('login');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl font-bold"
        >
          &times;
        </button>

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {currentForm === 'login' && 'Login'}
          {currentForm === 'signup' && 'Create Account'}
          {currentForm === 'forgotPassword' && 'Forgot Password?'}
        </h2>

        {message && (
          <p className={`text-center mb-4 ${message.toLowerCase().includes('success') || message.toLowerCase().includes('created') ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}

        <form
          onSubmit={
            currentForm === 'login'
              ? handleLoginSubmit
              : currentForm === 'signup'
              ? handleSignupSubmit
              : handleForgotPasswordSubmit
          }
        >
          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded-lg w-full py-2 px-3"
              placeholder="your@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          {currentForm !== 'forgotPassword' && (
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="shadow appearance-none border rounded-lg w-full py-2 px-3"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          )}

          {/* Confirm Password */}
          {currentForm === 'signup' && (
            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-semibold mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="shadow appearance-none border rounded-lg w-full py-2 px-3"
                placeholder="********"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full transition duration-300"
            disabled={isLoading}
          >
            {isLoading
              ? 'Processing...'
              : currentForm === 'login'
              ? 'Login'
              : currentForm === 'signup'
              ? 'Sign Up'
              : 'Send Reset Link'}
          </button>
        </form>

        <div className="flex justify-between items-center mt-4 text-sm">
          {currentForm === 'login' && (
            <>
              <button onClick={() => setCurrentForm('signup')} className="text-blue-600 hover:underline">
                Create an account
              </button>
              <button onClick={() => setCurrentForm('forgotPassword')} className="text-blue-600 hover:underline">
                Forgot password?
              </button>
            </>
          )}
          {(currentForm === 'signup' || currentForm === 'forgotPassword') && (
            <button onClick={() => setCurrentForm('login')} className="text-blue-600 hover:underline w-full text-center">
              Back to Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
