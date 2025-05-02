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
  InformationCircleIcon,
  SparklesIcon,
  LightningBoltIcon,
  GlobeAltIcon
} from '@heroicons/react/outline';
import LandingPageNavbar from './LandingPageNavbar';
import LandingPageFooter from './LandingPageFooter';

// Utility function for gradient text styling
const GradientText = ({ children, className = "" }) => {
  return (
    <span className={`bg-clip-text text-transparent bg-gradient-to-r from-gray-700 via-gray-600 to-gray-800 ${className}`}>
      {children}
    </span>
  );
};

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
    <div className="min-h-screen bg-white">
      <LandingPageNavbar 
        scrollToMarketplace={() => scrollToSection(marketplaceRef)}
        scrollToPricing={() => scrollToSection(pricingRef)}
        scrollToAbout={() => scrollToSection(aboutUsRef)}
      />
      
      {/* Hero Section - Aceternity UI Inspired */}
      <section className="relative h-[700px] overflow-hidden bg-gray-50">
        {/* Animated Background Elements - Inspired by Aceternity UI */}
        <div className="absolute inset-0 w-full h-full bg-grid-gray-200/25 bg-center [mask-image:linear-gradient(to_bottom,transparent,black)]" />
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
          <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
        </div>
        
        <AnimatePresence initial={false}>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0 z-0"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ 
                backgroundImage: `url(${slides[currentSlide].image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-800/70 to-gray-800/60 backdrop-blur-sm" />
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-white max-w-xl"
            >
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="inline-block"
              >
                <span className="px-4 py-1 text-sm font-semibold tracking-wider text-white uppercase bg-gradient-to-r from-gray-700 to-gray-900 rounded-full">
                  {slides[currentSlide].type === "seller" ? "For Businesses" : "For Shoppers"}
                </span>
              </motion.div>
              
              <motion.h1 
                className="mt-6 text-5xl sm:text-6xl font-bold tracking-tight mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <span className="block">{slides[currentSlide].title.split(' ')[0]}</span>
                <GradientText className="block text-white">
                  {slides[currentSlide].title.split(' ').slice(1).join(' ')}
                </GradientText>
              </motion.h1>
              
              <motion.h2 
                className="text-xl sm:text-2xl font-semibold mb-6 text-gray-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                {slides[currentSlide].subtitle}
              </motion.h2>
              
              <motion.p 
                className="text-lg mb-8 text-gray-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                {slides[currentSlide].description}
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.1 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link
                  to={slides[currentSlide].type === "seller" ? "/register" : "/marketplace"}
                  className="inline-flex items-center justify-center bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 hover:from-gray-800 hover:to-gray-900 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  {slides[currentSlide].cta}
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <button
                  onClick={() => scrollToSection(marketplaceRef)} 
                  className="inline-flex items-center justify-center bg-transparent border border-gray-300 text-white font-semibold py-4 px-8 rounded-xl hover:bg-white/10 transition-all duration-300"
                >
                  Learn More
                </button>
              </motion.div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="hidden lg:block relative"
            >
              <div className="relative w-full h-[450px] bg-gradient-to-br from-gray-800/10 to-gray-900/30 backdrop-blur-lg rounded-2xl p-1">
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center">
                  <SparklesIcon className="w-12 h-12 text-yellow-400" />
                </div>
                <div className="h-full w-full overflow-hidden rounded-xl">
                  <img 
                    src={slides[currentSlide].image} 
                    alt={slides[currentSlide].title}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Carousel Controls */}
        <div className="absolute bottom-8 left-0 right-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex space-x-3">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentSlide(index);
                      setIsAutoPlaying(false);
                    }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentSlide === index ? 'w-10 bg-white' : 'w-6 bg-gray-400'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
              
              <div className="flex space-x-4">
                <button
                  onClick={prevSlide}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white transition-colors"
                  aria-label="Previous slide"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextSlide}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white transition-colors"
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
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gray-50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              Why Choose <GradientText>Sumimaase</GradientText>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Empowering small-town sellers with powerful tools and global reach</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 relative z-10"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center mb-6">
                <ChartBarIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Multi-Platform Integration</h3>
              <p className="text-gray-600">Manage your inventory and sales across multiple e-commerce platforms from a single dashboard.</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 relative z-10"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center mb-6">
                <UserGroupIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Verified Seller Network</h3>
              <p className="text-gray-600">Connect with trusted buyers and expand your customer base with our verified seller network.</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 relative z-10"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center mb-6">
                <ChatAlt2Icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">AI-Powered Support</h3>
              <p className="text-gray-600">Get instant assistance and insights with our AI-powered support system.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Marketplace Section */}
      <section ref={marketplaceRef} id="marketplace" className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gray-100 via-gray-50 to-white opacity-80"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center mb-4"
            >
              <CubeIcon className="h-10 w-10 text-gray-700 mr-3" />
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
                <GradientText>Marketplace</GradientText>
              </h2>
            </motion.div>
            <p className="text-xl text-gray-600">Discover a wide range of unique products from verified sellers</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 group"
            >
              <div className="h-60 bg-gray-200 relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1612423284934-2850a4ea6b0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
                  alt="Handcrafted Products" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-8">
                <h3 className="font-semibold text-xl text-gray-800 mb-3">Handcrafted Goods</h3>
                <p className="text-gray-600 mb-5">Unique handmade products from local artisans across rural India.</p>
                <button 
                  onClick={() => scrollToSection(marketplaceRef)} 
                  className="inline-flex items-center text-gray-700 font-medium hover:text-gray-900 transition-colors"
                >
                  Explore Collection 
                  <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -8 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 group"
            >
              <div className="h-60 bg-gray-200 relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1571204829887-3b8d69e763ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
                  alt="Traditional Food" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-8">
                <h3 className="font-semibold text-xl text-gray-800 mb-3">Traditional Foods</h3>
                <p className="text-gray-600 mb-5">Authentic regional cuisines and foods prepared with traditional recipes.</p>
                <button 
                  onClick={() => scrollToSection(marketplaceRef)} 
                  className="inline-flex items-center text-gray-700 font-medium hover:text-gray-900 transition-colors"
                >
                  Explore Collection 
                  <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -8 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 group"
            >
              <div className="h-60 bg-gray-200 relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
                  alt="Home Decor" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-8">
                <h3 className="font-semibold text-xl text-gray-800 mb-3">Home Decor</h3>
                <p className="text-gray-600 mb-5">Beautiful home decorations crafted by skilled artisans from small towns.</p>
                <button 
                  onClick={() => scrollToSection(marketplaceRef)} 
                  className="inline-flex items-center text-gray-700 font-medium hover:text-gray-900 transition-colors"
                >
                  Explore Collection 
                  <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </motion.div>
          </div>

          <div className="mt-16 text-center">
            <motion.button 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => scrollToSection(marketplaceRef)}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-xl hover:from-gray-800 hover:to-gray-900 shadow-lg hover:shadow-xl transition duration-300 transform"
            >
              <ShoppingBagIcon className="w-5 h-5 mr-2" />
              View All Products
            </motion.button>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section ref={pricingRef} id="pricing" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center mb-4"
            >
              <CurrencyDollarIcon className="h-10 w-10 text-gray-700 mr-3" />
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
                Pricing <GradientText>Plans</GradientText>
              </h2>
            </motion.div>
            <p className="text-xl text-gray-600">Choose the perfect plan for your business needs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden h-full flex flex-col border border-gray-100"
            >
              <div className="p-8 border-b border-gray-200 flex-shrink-0 bg-gradient-to-br from-gray-50 to-gray-100">
                <h3 className="text-2xl font-bold text-gray-800">Basic</h3>
                <p className="mt-4 text-gray-600">Perfect for small sellers just starting out</p>
                <div className="mt-6 flex items-baseline">
                  <span className="text-5xl font-bold text-gray-800">₹599</span>
                  <span className="text-gray-500 ml-2 self-end">/month</span>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Yearly plan: ₹5,990 (Save 17%)
                </p>
              </div>
              <div className="p-8 flex flex-col flex-grow justify-between">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-600">Up to 50 product listings</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-600">Sumimaase store</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-600">Basic analytics dashboard</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-600">Single marketplace integration</span>
                  </li>
                </ul>
                <div className="mt-8">
                  <motion.button 
                    whileHover={{ scale: 1.03 }}
                    onClick={() => scrollToSection(contactRef)} 
                    className="w-full py-4 px-6 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white rounded-xl transition duration-300 shadow-md hover:shadow-lg"
                  >
                    Start Free Trial
                  </motion.button>
                  <p className="mt-2 text-xs text-center text-gray-500">
                    No credit card required. 14-day free trial.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden relative h-full flex flex-col border border-gray-200"
            >
              <div className="absolute top-0 left-0 w-full text-center py-2 bg-gradient-to-r from-gray-700 to-gray-900 text-white text-sm font-medium">
                Most Popular
              </div>
              <div className="p-8 border-b border-gray-200 mt-8 flex-shrink-0 bg-gradient-to-br from-gray-50 to-gray-100">
                <h3 className="text-2xl font-bold text-gray-800">Premium</h3>
                <p className="mt-4 text-gray-600">Full-featured plan for growing businesses</p>
                <div className="mt-6 flex items-baseline">
                  <span className="text-5xl font-bold text-gray-800">₹1,499</span>
                  <span className="text-gray-500 ml-2 self-end">/month</span>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Yearly plan: ₹14,990 (Save 17%)
                </p>
              </div>
              <div className="p-8 flex flex-col flex-grow justify-between">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-600">Unlimited product listings</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-600">Multiple marketplace integrations</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-600">Advanced analytics & reporting</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-600">AI pricing recommendations</span>
                  </li>
                </ul>
                <div className="mt-8">
                  <motion.button 
                    whileHover={{ scale: 1.03 }}
                    onClick={() => scrollToSection(contactRef)} 
                    className="w-full py-4 px-6 bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-gray-900 text-white rounded-xl transition duration-300 shadow-lg hover:shadow-xl"
                  >
                    Get Started Now
                  </motion.button>
                  <p className="mt-2 text-xs text-center text-gray-500">
                    No credit card required. 14-day free trial.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section ref={aboutUsRef} id="about" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center mb-4"
            >
              <InformationCircleIcon className="h-10 w-10 text-gray-700 mr-3" />
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
                About <GradientText>Us</GradientText>
              </h2>
            </motion.div>
            <p className="text-xl text-gray-600">Our mission and vision for empowering small-town sellers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-64 h-64 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <img 
                  src="https://images.unsplash.com/photo-1618044733300-9472054094ee?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                  alt="Our team" 
                  className="rounded-2xl shadow-lg w-full h-auto relative z-10"
                />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Our Story</h3>
              <p className="text-gray-600 mb-6">
                Founded in 2025, Sumimaase began with a simple vision: to bridge the gap between small-town sellers and the global marketplace. 
                We noticed that talented artisans and producers from rural areas often struggled to reach customers beyond their immediate communities.
              </p>
              <p className="text-gray-600 mb-6">
                Our platform connects these sellers with customers across multiple e-commerce platforms, providing them with tools, 
                technology and support to scale their businesses without the usual complexity and overhead.
              </p>
              <p className="text-gray-600 mb-8">
                Today, we're proud to support over 5,000 sellers across India, helping them reach millions of customers worldwide
                while preserving their unique crafts and traditions.
              </p>
              <div className="grid grid-cols-2 gap-6 text-center">
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                  <motion.p 
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl font-bold text-gray-800"
                  >
                    5,000+
                  </motion.p>
                  <p className="text-gray-600 mt-2">Sellers Onboard</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                  <motion.p 
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-4xl font-bold text-gray-800"
                  >
                    ₹12Cr+
                  </motion.p>
                  <p className="text-gray-600 mt-2">Monthly GMV</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              How It <GradientText>Works</GradientText>
            </h2>
            <p className="text-xl text-gray-600">Simple steps to get started with Sumimaase</p>
          </div>
          
          <div className="flex flex-col md:flex-row items-start justify-center gap-8">
            {[
              {
                step: 1,
                title: "Sign Up",
                description: "Create your account in minutes",
                icon: <UserGroupIcon className="w-8 h-8 text-white" />,
                delay: 0.1
              },
              {
                step: 2,
                title: "Connect Platforms",
                description: "Link your e-commerce accounts",
                icon: <GlobeAltIcon className="w-8 h-8 text-white" />,
                delay: 0.2
              },
              {
                step: 3,
                title: "Upload Products",
                description: "Add your products to multiple platforms",
                icon: <CubeIcon className="w-8 h-8 text-white" />,
                delay: 0.3
              },
              {
                step: 4,
                title: "Start Selling",
                description: "Manage everything from one place",
                icon: <LightningBoltIcon className="w-8 h-8 text-white" />,
                delay: 0.4
              }
            ].map((item) => (
              <motion.div 
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: item.delay }}
                className="flex-1 text-center"
              >
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-gray-700 to-gray-900 flex items-center justify-center mx-auto mb-6">
                    {item.icon}
                  </div>
                  {item.step < 4 && (
                    <div className="absolute top-10 left-full w-16 h-0.5 bg-gray-300 hidden md:block -translate-x-4">
                      <div className="absolute right-0 w-2 h-2 rounded-full bg-gray-700 -top-0.5"></div>
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-100 via-gray-50 to-white opacity-80"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              What Our <GradientText>Users Say</GradientText>
            </h2>
            <p className="text-xl text-gray-600">Hear from our community of sellers and buyers</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 relative"
              >
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-16 h-16 bg-gradient-to-r from-gray-700 to-gray-900 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div className="flex items-center mb-6">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-gray-200"
                  />
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">{testimonial.name}</h4>
                    <p className="text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 text-lg italic">"{testimonial.content}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Get in Touch Section */}
      <section ref={contactRef} id="contact" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              Get in <GradientText>Touch</GradientText>
            </h2>
            <p className="text-xl text-gray-600">Have questions? We're here to help!</p>
          </div>
          
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-xl p-8 border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center flex flex-col justify-between"
              >
                <div>
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-gray-700 to-gray-900 flex items-center justify-center mx-auto mb-6">
                    <ShoppingBagIcon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">Ready to Start Selling?</h3>
                  <p className="text-gray-600 mb-8">Join our platform and reach millions of customers</p>
                </div>
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-gray-900 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Get Started
                </Link>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-center flex flex-col justify-between"
              >
                <div>
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-gray-600 to-gray-800 flex items-center justify-center mx-auto mb-6">
                    <ChatAlt2Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">Need Help?</h3>
                  <p className="text-gray-600 mb-8">Our support team is ready to assist you</p>
                </div>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 px-8 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                >
                  Contact Us
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <LandingPageFooter />
    </div>
  );
};

export default LandingPage;