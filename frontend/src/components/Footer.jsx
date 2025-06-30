import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Company Info */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Chlothzy Store</h2>
          <p className="text-sm">
            Your one-stop shop for quality products across fashion, electronics, and more.  
            Fast delivery. Secure payment. Great deals every day.
          </p>
        </div>

       
        <div>
          <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/products" className="hover:text-white">Products</a></li>
            <li><a href="/about" className="hover:text-white">About Us</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
            <li><a href="/cart" className="hover:text-white">Cart</a></li>
          </ul>
        </div>

        
        <div>
          <h2 className="text-xl font-semibold mb-4">Follow Us</h2>
          <div className="flex space-x-4 text-lg">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white"><FaFacebookF /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white"><FaTwitter /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white"><FaInstagram /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      
      <div className="mt-8 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} Chlothzy Store. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
