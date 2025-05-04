import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MenuIcon, XIcon } from '@heroicons/react/outline';

const NavLink = ({ children, className = "", onClick, ...props }) => {
  return (
    <button
      onClick={onClick}
      className={`relative px-3 py-2 font-medium text-gray-700 transition-colors hover:text-gray-900 group ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full origin-left transform scale-x-0 transition-transform group-hover:scale-x-100 bg-gray-800 group-hover:opacity-100 opacity-0" />
    </button>
  );
};

const LandingPageNavbar = ({ scrollToMarketplace, scrollToPricing, scrollToAbout, scrollToHowItWorks }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Determine which section is currently in view for highlighting in navbar
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + 100;

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(section.getAttribute('id'));
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md py-3'
            : 'bg-transparent py-5'
        } transition-all duration-300`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center">
                <motion.span 
                  className="text-2xl font-bold bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 bg-clip-text text-transparent"
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.2 } 
                  }}
                >
                  Sumimaase
                </motion.span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              <NavLink 
                onClick={scrollToHowItWorks} 
                className={`group ${activeSection === 'how-it-works' ? 'text-gray-900 font-semibold' : ''}`}
              >
                How It Works
              </NavLink>
              <NavLink 
                onClick={scrollToMarketplace}
                className={`group ${activeSection === 'marketplace' ? 'text-gray-900 font-semibold' : ''}`}
              >
                Marketplace
              </NavLink>
              <NavLink 
                onClick={scrollToPricing}
                className={`group ${activeSection === 'pricing' ? 'text-gray-900 font-semibold' : ''}`}
              >
                Pricing
              </NavLink>
              <NavLink 
                onClick={scrollToAbout}
                className={`group ${activeSection === 'about-us' ? 'text-gray-900 font-semibold' : ''}`}
              >
                About Us
              </NavLink>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to="/auth"
                  className="ml-5 inline-flex items-center justify-center rounded-xl bg-white px-5 py-2 font-medium text-gray-700 shadow-sm ring-1 ring-gray-200 hover:bg-gray-50 transition-all duration-300"
                >
                  Log in
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to="/auth?signup=true"
                  className="ml-3 inline-flex h-10 items-center justify-center rounded-xl bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 px-6 font-medium text-white hover:shadow-lg hover:shadow-gray-600/20 transition-all duration-300"
                >
                  Sign up
                </Link>
              </motion.div>
            </nav>

            {/* Mobile menu button */}
            <motion.div 
              className="flex md:hidden"
              whileTap={{ scale: 0.9 }}
            >
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-md text-gray-600 focus:outline-none"
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? (
                  <XIcon className="h-6 w-6" />
                ) : (
                  <MenuIcon className="h-6 w-6" />
                )}
              </button>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu, toggle visibility */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-40 flex flex-col bg-white/95 backdrop-blur-md pt-16 overflow-hidden"
          >
            <motion.div 
              className="flex flex-col p-4 space-y-2 overflow-y-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              <motion.button
                onClick={() => {
                  scrollToHowItWorks();
                  setIsMobileMenuOpen(false);
                }}
                className="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                whileHover={{ backgroundColor: "#f3f4f6" }}
                whileTap={{ scale: 0.98 }}
              >
                How It Works
              </motion.button>
              <motion.button
                onClick={() => {
                  scrollToMarketplace();
                  setIsMobileMenuOpen(false);
                }}
                className="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                whileHover={{ backgroundColor: "#f3f4f6" }}
                whileTap={{ scale: 0.98 }}
              >
                Marketplace
              </motion.button>
              <motion.button
                onClick={() => {
                  scrollToPricing();
                  setIsMobileMenuOpen(false);
                }}
                className="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                whileHover={{ backgroundColor: "#f3f4f6" }}
                whileTap={{ scale: 0.98 }}
              >
                Pricing
              </motion.button>
              <motion.button
                onClick={() => {
                  scrollToAbout();
                  setIsMobileMenuOpen(false);
                }}
                className="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                whileHover={{ backgroundColor: "#f3f4f6" }}
                whileTap={{ scale: 0.98 }}
              >
                About Us
              </motion.button>
              <div className="border-t border-gray-200 pt-4 mt-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to="/auth"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full text-center px-4 py-3 text-base font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Log in
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-3"
                >
                  <Link
                    to="/auth?signup=true"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full text-center px-4 py-3 text-base font-medium text-white bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 rounded-lg hover:shadow-lg hover:shadow-gray-600/20 transition-all"
                  >
                    Sign up
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LandingPageNavbar;