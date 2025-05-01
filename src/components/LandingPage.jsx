import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ChartBarIcon,
  UserGroupIcon,
  ShoppingBagIcon,
  ChatAlt2Icon,
  CubeIcon,
  CurrencyDollarIcon,
  InformationCircleIcon
} from '@heroicons/react/outline';
import LandingPageNavbar from './LandingPageNavbar';
import LandingPageFooter from './LandingPageFooter';

const LandingPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  const marketplaceRef = useRef(null);
  const pricingRef = useRef(null);
  const aboutUsRef = useRef(null);
  const contactRef = useRef(null);

  const slides = [
    {
      title: "Empower Your Business",
      subtitle: "Reach millions of customers across multiple platforms",
      description: "Sell your products on Amazon, Flipkart, Meesho, and more with a single dashboard",
      image: "https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      cta: "Start Selling",
      type: "seller"
    },
    {
      title: "Discover Unique Products",
      subtitle: "Shop from verified small-town sellers",
      description: "Find authentic products directly from local artisans and businesses",
      image: "https://images.unsplash.com/photo-1542744173-05336fcc7ad4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
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

  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <LandingPageNavbar 
        scrollToMarketplace={() => scrollToSection(marketplaceRef)}
        scrollToPricing={() => scrollToSection(pricingRef)}
        scrollToAbout={() => scrollToSection(aboutUsRef)}
      />
      
      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ 
                backgroundImage: `url(${slides[currentSlide].image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-800/60" />
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
              className="inline-block bg-gray-700 hover:bg-gray-800 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
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
                      currentSlide === index ? 'w-8 bg-gray-300' : 'w-4 bg-gray-500'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
              
              <div className="flex space-x-4">
                <button
                  onClick={prevSlide}
                  className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 text-white transition-colors"
                  aria-label="Previous slide"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextSlide}
                  className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 text-white transition-colors"
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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Sumimaase?</h2>
            <p className="text-xl text-gray-600">Empowering small-town sellers with powerful tools and global reach</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              whileHover={{ scale: 1.03 }}
              className="bg-gray-50 p-8 rounded-xl shadow-md border border-gray-200"
            >
              <ChartBarIcon className="w-12 h-12 text-gray-700 mb-6" />
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Multi-Platform Integration</h3>
              <p className="text-gray-600">Manage your inventory and sales across multiple e-commerce platforms from a single dashboard.</p>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.03 }}
              className="bg-gray-50 p-8 rounded-xl shadow-md border border-gray-200"
            >
              <UserGroupIcon className="w-12 h-12 text-gray-700 mb-6" />
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Verified Seller Network</h3>
              <p className="text-gray-600">Connect with trusted buyers and expand your customer base with our verified seller network.</p>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.03 }}
              className="bg-gray-50 p-8 rounded-xl shadow-md border border-gray-200"
            >
              <ChatAlt2Icon className="w-12 h-12 text-gray-700 mb-6" />
              <h3 className="text-xl font-semibold mb-4 text-gray-800">AI-Powered Support</h3>
              <p className="text-gray-600">Get instant assistance and insights with our AI-powered support system.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Marketplace Section */}
      <section ref={marketplaceRef} id="marketplace" className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <CubeIcon className="h-10 w-10 text-gray-700 mr-3" />
              <h2 className="text-3xl font-bold text-gray-800">Marketplace</h2>
            </div>
            <p className="text-xl text-gray-600">Discover a wide range of unique products from verified sellers</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className="h-48 bg-gray-200 relative">
                <img 
                  src="https://images.unsplash.com/photo-1612423284934-2850a4ea6b0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
                  alt="Handcrafted Products" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-xl text-gray-800 mb-2">Handcrafted Goods</h3>
                <p className="text-gray-600 mb-4">Unique handmade products from local artisans across rural India.</p>
                <button onClick={() => scrollToSection(marketplaceRef)} className="text-gray-700 font-medium hover:text-gray-900">
                  Explore Collection →
                </button>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className="h-48 bg-gray-200 relative">
                <img 
                  src="https://images.unsplash.com/photo-1571204829887-3b8d69e763ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
                  alt="Traditional Food" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-xl text-gray-800 mb-2">Traditional Foods</h3>
                <p className="text-gray-600 mb-4">Authentic regional cuisines and foods prepared with traditional recipes.</p>
                <button onClick={() => scrollToSection(marketplaceRef)} className="text-gray-700 font-medium hover:text-gray-900">
                  Explore Collection →
                </button>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className="h-48 bg-gray-200 relative">
                <img 
                  src="https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
                  alt="Home Decor" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-xl text-gray-800 mb-2">Home Decor</h3>
                <p className="text-gray-600 mb-4">Beautiful home decorations crafted by skilled artisans from small towns.</p>
                <button onClick={() => scrollToSection(marketplaceRef)} className="text-gray-700 font-medium hover:text-gray-900">
                  Explore Collection →
                </button>
              </div>
            </motion.div>
          </div>

          <div className="mt-12 text-center">
            <button 
              onClick={() => scrollToSection(marketplaceRef)}
              className="inline-block px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition duration-300"
            >
              View All Products
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section ref={pricingRef} id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <CurrencyDollarIcon className="h-10 w-10 text-gray-700 mr-3" />
              <h2 className="text-3xl font-bold text-gray-800">Pricing Plans</h2>
            </div>
            <p className="text-xl text-gray-600">Choose the perfect plan for your business needs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-gray-50 border border-gray-200 rounded-xl shadow-md overflow-hidden h-full flex flex-col">
              <div className="p-8 border-b border-gray-200 flex-shrink-0">
                <h3 className="text-2xl font-bold text-gray-800">Basic</h3>
                <p className="mt-4 text-gray-600">Perfect for small sellers just starting out</p>
                <div className="mt-6 flex items-baseline">
                  <span className="text-4xl font-bold text-gray-800">₹599</span>
                  <span className="text-gray-500 ml-2 self-end">/month</span>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Yearly plan: ₹5,990 (Save 17%)
                </p>
              </div>
              <div className="p-8 flex flex-col flex-grow justify-between">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-600">Up to 50 product listings</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-600">Sumimaase store</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-600">Basic analytics dashboard</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-600">Single marketplace integration</span>
                  </li>
                </ul>
                <div className="mt-8">
                  <button 
                    onClick={() => scrollToSection(contactRef)} 
                    className="w-full py-3 px-4 bg-gray-700 hover:bg-gray-800 text-white rounded-lg transition duration-300"
                  >
                    Start Free Trial
                  </button>
                  <p className="mt-2 text-xs text-center text-gray-500">
                    No credit card required. 14-day free trial.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-300 rounded-xl shadow-lg overflow-hidden relative h-full flex flex-col">
              <div className="absolute top-0 w-full text-center py-2 bg-gray-700 text-white text-sm font-medium">
                Most Popular
              </div>
              <div className="p-8 border-b border-gray-200 mt-8 flex-shrink-0">
                <h3 className="text-2xl font-bold text-gray-800">Premium</h3>
                <p className="mt-4 text-gray-600">Full-featured plan for growing businesses</p>
                <div className="mt-6 flex items-baseline">
                  <span className="text-4xl font-bold text-gray-800">₹1,499</span>
                  <span className="text-gray-500 ml-2 self-end">/month</span>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Yearly plan: ₹14,990 (Save 17%)
                </p>
              </div>
              <div className="p-8 flex flex-col flex-grow justify-between">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-600">Unlimited product listings</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-600">Multiple marketplace integrations</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-600">Advanced analytics & reporting</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-600">AI pricing recommendations</span>
                  </li>
                </ul>
                <div className="mt-8">
                  <button 
                    onClick={() => scrollToSection(contactRef)} 
                    className="w-full py-3 px-4 bg-gray-800 hover:bg-gray-900 text-white rounded-lg transition duration-300"
                  >
                    Get Started Now
                  </button>
                  <p className="mt-2 text-xs text-center text-gray-500">
                    No credit card required. 14-day free trial.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section ref={aboutUsRef} id="about" className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <InformationCircleIcon className="h-10 w-10 text-gray-700 mr-3" />
              <h2 className="text-3xl font-bold text-gray-800">About Us</h2>
            </div>
            <p className="text-xl text-gray-600">Our mission and vision for empowering small-town sellers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1618044733300-9472054094ee?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="Our team" 
                className="rounded-xl shadow-lg w-full h-auto"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Our Story</h3>
              <p className="text-gray-600 mb-6">
                Founded in 2025, Sumimaase began with a simple vision: to bridge the gap between small-town sellers and the global marketplace. 
                We noticed that talented artisans and producers from rural areas often struggled to reach customers beyond their immediate communities.
              </p>
              <p className="text-gray-600 mb-6">
                Our platform connects these sellers with customers across multiple e-commerce platforms, providing them with tools, 
                technology and support to scale their businesses without the usual complexity and overhead.
              </p>
              <p className="text-gray-600 mb-6">
                Today, we're proud to support over 5,000 sellers across India, helping them reach millions of customers worldwide
                while preserving their unique crafts and traditions.
              </p>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-3xl font-bold text-gray-800">5,000+</p>
                  <p className="text-gray-600">Sellers Onboard</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-3xl font-bold text-gray-800">₹12Cr+</p>
                  <p className="text-gray-600">Monthly GMV</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Simple steps to get started with Sumimaase</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-gray-300">
                <span className="text-2xl font-bold text-gray-700">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Sign Up</h3>
              <p className="text-gray-600">Create your account in minutes</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-gray-300">
                <span className="text-2xl font-bold text-gray-700">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Connect Platforms</h3>
              <p className="text-gray-600">Link your e-commerce accounts</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-gray-300">
                <span className="text-2xl font-bold text-gray-700">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Upload Products</h3>
              <p className="text-gray-600">Add your products to multiple platforms</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-gray-300">
                <span className="text-2xl font-bold text-gray-700">4</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Start Selling</h3>
              <p className="text-gray-600">Manage everything from one place</p>
            </div>
          </div>
        </div>
      </section>

      {/* Get in Touch Section */}
      <section ref={contactRef} id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Get in Touch</h2>
            <p className="text-xl text-gray-600">Have questions? We're here to help!</p>
          </div>
          
          <div className="max-w-3xl mx-auto bg-gray-50 rounded-xl shadow-md p-8 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="text-center flex flex-col justify-between">
                <div>
                  <ShoppingBagIcon className="w-12 h-12 text-gray-700 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">Ready to Start Selling?</h3>
                  <p className="text-gray-600 mb-4">Join our platform and reach millions of customers</p>
                </div>
                <Link
                  to="/register"
                  className="inline-block bg-gray-700 hover:bg-gray-800 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Get Started
                </Link>
              </div>
              
              <div className="text-center flex flex-col justify-between">
                <div>
                  <ChatAlt2Icon className="w-12 h-12 text-gray-700 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">Need Help?</h3>
                  <p className="text-gray-600 mb-4">Our support team is ready to assist you</p>
                </div>
                <Link
                  to="/contact"
                  className="inline-block bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
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