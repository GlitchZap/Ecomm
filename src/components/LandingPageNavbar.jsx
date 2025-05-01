import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBagIcon } from '@heroicons/react/outline';

const LandingPageNavbar = ({ scrollToMarketplace, scrollToPricing, scrollToAbout }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-gray-50/80 backdrop-blur-md shadow-lg border-b border-gray-200/50' 
          : 'bg-gray-50 shadow-md border-b border-gray-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <ShoppingBagIcon className="h-8 w-8 text-gray-700" />
              <span className="ml-2 text-xl font-bold text-gray-800">Sumimaase</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={scrollToMarketplace}
              className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium cursor-pointer"
            >
              Marketplace
            </button>
            <button 
              onClick={scrollToPricing}
              className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium cursor-pointer"
            >
              Pricing
            </button>
            <button 
              onClick={scrollToAbout}
              className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium cursor-pointer"
            >
              About Us
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link 
              to="/auth" 
              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Login
            </Link>
            <Link 
              to="/auth" 
              className={`${
                scrolled 
                  ? 'bg-gray-700/90 hover:bg-gray-800/90' 
                  : 'bg-gray-700 hover:bg-gray-800'
              } text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 shadow-sm`}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default LandingPageNavbar;