import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBagIcon, MenuIcon, XIcon } from '@heroicons/react/outline';

const LandingPageNavbar = ({ scrollToMarketplace, scrollToPricing, scrollToAbout }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

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
          
          <div className="hidden md:flex items-center space-x-4">
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

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <XIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <MenuIcon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'} bg-white shadow-lg border-t border-gray-200`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <button
            onClick={() => {
              scrollToMarketplace();
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
          >
            Marketplace
          </button>
          <button
            onClick={() => {
              scrollToPricing();
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
          >
            Pricing
          </button>
          <button
            onClick={() => {
              scrollToAbout();
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
          >
            About Us
          </button>
          <div className="pt-2 flex flex-col space-y-2">
            <Link
              to="/auth"
              className="block w-full text-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/auth"
              className="block w-full text-center px-3 py-2 rounded-md text-base font-medium bg-gray-700 text-white hover:bg-gray-800"
              onClick={() => setMobileMenuOpen(false)}
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