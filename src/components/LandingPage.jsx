import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRightIcon,
  ChartBarIcon,
  UserGroupIcon,
  ShoppingBagIcon,
  ChatAlt2Icon
} from '@heroicons/react/outline';
import LandingPageNavbar from './LandingPageNavbar';
import LandingPageFooter from './LandingPageFooter';

const LandingPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = [
    {
      title: "Empower Your Business",
      subtitle: "Reach millions of customers across multiple platforms",
      description: "Sell your products on Amazon, Flipkart, Meesho, and more with a single dashboard",
      image: "https://images.unsplash.com/photo-1556741533-6e6a62bd8b49?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      cta: "Start Selling",
      type: "seller"
    },
    {
      title: "Discover Unique Products",
      subtitle: "Shop from verified small-town sellers",
      description: "Find authentic products directly from local artisans and businesses",
      image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      cta: "Start Shopping",
      type: "buyer"
    }
  ];

  const testimonials = [
    {
      name: "John Doe",
      role: "Seller",
      content: "This platform has transformed my business. The tools and analytics are incredible!",
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      name: "Jane Smith",
      role: "Buyer",
      content: "I love the seamless shopping experience. Finding unique products has never been easier!",
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    }
  ];

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <LandingPageNavbar />
      
      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl text-white"
          >
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              {slides[currentSlide].title}
            </h1>
            <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-gray-100">
              {slides[currentSlide].subtitle}
            </h2>
            <p className="text-lg mb-8 text-gray-200">
              {slides[currentSlide].description}
            </p>
            <Link
              to={slides[currentSlide].type === "seller" ? "/register" : "/marketplace"}
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              {slides[currentSlide].cta}
            </Link>
          </motion.div>
        </div>

        {/* Carousel Controls */}
        <div className="absolute bottom-8 left-0 right-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentSlide(index);
                      setIsAutoPlaying(false);
                    }}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      currentSlide === index ? 'w-8 bg-blue-500' : 'w-4 bg-gray-400'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
              
              <div className="flex space-x-4">
                <button
                  onClick={prevSlide}
                  className="p-2 rounded-full bg-gray-800/50 hover:bg-gray-800/70 text-white transition-colors"
                  aria-label="Previous slide"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextSlide}
                  className="p-2 rounded-full bg-gray-800/50 hover:bg-gray-800/70 text-white transition-colors"
                  aria-label="Next slide"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Sumimaase?</h2>
            <p className="text-xl text-gray-600">Empowering small-town sellers with powerful tools and global reach</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-white p-8 rounded-xl shadow-lg"
            >
              <ChartBarIcon className="w-12 h-12 text-blue-600 mb-6" />
              <h3 className="text-xl font-semibold mb-4">Multi-Platform Integration</h3>
              <p className="text-gray-600">Manage your inventory and sales across multiple e-commerce platforms from a single dashboard.</p>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-white p-8 rounded-xl shadow-lg"
            >
              <UserGroupIcon className="w-12 h-12 text-blue-600 mb-6" />
              <h3 className="text-xl font-semibold mb-4">Verified Seller Network</h3>
              <p className="text-gray-600">Connect with trusted buyers and expand your customer base with our verified seller network.</p>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-white p-8 rounded-xl shadow-lg"
            >
              <ChatAlt2Icon className="w-12 h-12 text-blue-600 mb-6" />
              <h3 className="text-xl font-semibold mb-4">AI-Powered Support</h3>
              <p className="text-gray-600">Get instant assistance and insights with our AI-powered support system.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Simple steps to get started with Sumimaase</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Sign Up</h3>
              <p className="text-gray-600">Create your account in minutes</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Connect Platforms</h3>
              <p className="text-gray-600">Link your e-commerce accounts</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Upload Products</h3>
              <p className="text-gray-600">Add your products to multiple platforms</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">4</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Start Selling</h3>
              <p className="text-gray-600">Manage everything from one place</p>
            </div>
          </div>
        </div>
      </section>

      {/* Get in Touch Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Get in Touch</h2>
            <p className="text-xl text-gray-600">Have questions? We're here to help!</p>
          </div>
          
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-center">
                <ShoppingBagIcon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Ready to Start Selling?</h3>
                <p className="text-gray-600 mb-4">Join our platform and reach millions of customers</p>
                <Link
                  to="/register"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  Get Started
                </Link>
              </div>
              
              <div className="text-center">
                <ChatAlt2Icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Need Help?</h3>
                <p className="text-gray-600 mb-4">Our support team is ready to assist you</p>
                <Link
                  to="/contact"
                  className="inline-block bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <LandingPageFooter />
    </div>
  );
};

export default LandingPage; 