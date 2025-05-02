import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  UserIcon, 
  LockClosedIcon, 
  MailIcon, 
  EyeIcon, 
  EyeOffIcon,
  SwitchHorizontalIcon,
  ShoppingBagIcon,
  ShieldCheckIcon,
  ChevronRightIcon,
  LightningBoltIcon,
  UserGroupIcon,
  PhoneIcon,
  LocationMarkerIcon,
  HomeIcon
} from "@heroicons/react/outline";
import { useUser } from '../context/UserContext';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState("customer"); // "seller", "admin", or "customer"
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    businessName: "",
    businessType: "",
    sellerCategory: "",
    adminCode: "",
    phone: "",
    address: "",
    city: "",
    zipCode: ""
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useUser();
  
  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // For demo purposes, we'll consider any login successful
      login({
        name: formData.name || 'Demo User',
        email: formData.email,
        role: userType === 'seller' ? 'Seller' : userType === 'admin' ? 'Administrator' : 'Customer',
        avatar: `https://ui-avatars.com/api/?name=${(formData.name || 'Demo User').replace(/\s/g, '+')}&background=random`
      });

      // Redirect to the intended destination or home
      const from = location.state?.from?.pathname || '/home';
      navigate(from, { replace: true });
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const switchToSeller = () => {
    setUserType("seller");
  };
  
  const switchToAdmin = () => {
    setUserType("admin");
  };
  
  const switchToCustomer = () => {
    setUserType("customer");
  };
  
  const sellerCategories = [
    "Handcrafted & Artisanal",
    "Fashion & Accessories",
    "Home Decor & Furniture",
    "Food & Beverages",
    "Electronics & Gadgets",
    "Beauty & Personal Care",
    "Books & Stationery"
  ];
  
  const businessTypes = [
    "Individual/Sole Proprietor",
    "Partnership",
    "Limited Liability Company (LLC)",
    "Corporation",
    "Non-Profit Organization"
  ];

  const testimonials = [
    {
      quote: "Sumimaase transformed my small handcraft business into a thriving online store with customers worldwide.",
      name: "Anita Sharma",
      title: "Artisan Seller",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg"
    },
    {
      quote: "The multi-platform integration saved me hours of work and doubled my sales in just two months.",
      name: "Rajesh Kumar",
      title: "Fashion Retailer",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg"
    },
    {
      quote: "As a rural craftsman, Sumimaase gave me access to markets I never knew existed before.",
      name: "Priya Patel",
      title: "Home Decor Seller",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg"
    }
  ];
  
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Left Panel - Platform Information */}
      <div className="w-full md:w-1/2 bg-gradient-to-br from-gray-700 to-gray-900 p-8 md:p-12 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-40 left-40 w-80 h-80 bg-white rounded-full mix-blend-overlay filter blur-3xl"></div>
          <div className="absolute bottom-40 right-20 w-80 h-80 bg-white rounded-full mix-blend-overlay filter blur-3xl"></div>
        </div>
        
        <div className="h-full flex flex-col justify-center">
          <div className="absolute top-8 left-8">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <img 
                  src="https://ui-avatars.com/api/?name=S+M&background=random&color=fff"
                  className="h-10 w-10 rounded-md" 
                  alt="Sumimaase"
                />
              </div>
              <span className="text-white text-xl font-bold">Sumimaase</span>
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-lg mx-auto"
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              {userType === "seller" ? 
                "Empower your business with our multi-platform selling solution" :
                userType === "admin" ? 
                "Streamline operations with powerful admin tools" : 
                "Discover unique products from talented artisans"}
            </h2>
            <p className="text-gray-300 mb-8 text-lg">
              {userType === "seller" ? 
                "Join thousands of sellers who have transformed their business and reached customers worldwide." :
                userType === "admin" ? 
                "Manage marketplace operations efficiently and make data-driven decisions." : 
                "Support local artisans and find handcrafted products with our curated marketplace."}
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-12">
              {userType === "seller" && (
                <>
                  <div className="bg-white/10 backdrop-blur-lg p-4 rounded-xl">
                    <div className="text-white text-4xl font-bold">5000+</div>
                    <div className="text-gray-300 mt-1">Active Sellers</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-lg p-4 rounded-xl">
                    <div className="text-white text-4xl font-bold">₹12Cr+</div>
                    <div className="text-gray-300 mt-1">Monthly GMV</div>
                  </div>
                </>
              )}
              
              {userType === "admin" && (
                <>
                  <div className="bg-white/10 backdrop-blur-lg p-4 rounded-xl">
                    <div className="text-white text-4xl font-bold">99.9%</div>
                    <div className="text-gray-300 mt-1">Uptime</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-lg p-4 rounded-xl">
                    <div className="text-white text-4xl font-bold">250K+</div>
                    <div className="text-gray-300 mt-1">Daily Transactions</div>
                  </div>
                </>
              )}
              
              {userType === "customer" && (
                <>
                  <div className="bg-white/10 backdrop-blur-lg p-4 rounded-xl">
                    <div className="text-white text-4xl font-bold">10K+</div>
                    <div className="text-gray-300 mt-1">Unique Products</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-lg p-4 rounded-xl">
                    <div className="text-white text-4xl font-bold">4.9</div>
                    <div className="text-gray-300 mt-1">Customer Rating</div>
                  </div>
                </>
              )}
            </div>
            
            {/* User Type Switch */}
            <div className="mb-8 bg-white/5 backdrop-blur-sm rounded-xl p-4">
              <p className="text-white text-sm mb-3">I want to login as:</p>
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={switchToCustomer}
                  className={`px-4 py-2 rounded-lg flex items-center text-sm ${
                    userType === "customer" 
                      ? "bg-white text-gray-900 font-medium" 
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  <UserGroupIcon className="h-4 w-4 mr-2" />
                  Customer
                </button>
                <button 
                  onClick={switchToSeller}
                  className={`px-4 py-2 rounded-lg flex items-center text-sm ${
                    userType === "seller" 
                      ? "bg-white text-gray-900 font-medium" 
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  <ShoppingBagIcon className="h-4 w-4 mr-2" />
                  Seller
                </button>
                <button 
                  onClick={switchToAdmin}
                  className={`px-4 py-2 rounded-lg flex items-center text-sm ${
                    userType === "admin" 
                      ? "bg-white text-gray-900 font-medium" 
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  <ShieldCheckIcon className="h-4 w-4 mr-2" />
                  Admin
                </button>
              </div>
            </div>
            
            {/* Testimonial Carousel */}
            <div className="relative bg-white/10 backdrop-blur-lg p-6 rounded-xl">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeSlide}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                  className="mb-4"
                >
                  <div className="text-gray-100 italic text-lg mb-4">
                    "{testimonials[activeSlide].quote}"
                  </div>
                  <div className="flex items-center">
                    <img 
                      src={testimonials[activeSlide].avatar} 
                      alt={testimonials[activeSlide].name} 
                      className="h-10 w-10 rounded-full object-cover" 
                    />
                    <div className="ml-3">
                      <div className="text-white font-medium">{testimonials[activeSlide].name}</div>
                      <div className="text-gray-300 text-sm">{testimonials[activeSlide].title}</div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
              
              <div className="flex mt-4 justify-center">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveSlide(index)}
                    className={`h-2 mx-1 rounded-full transition-all ${
                      activeSlide === index ? 'w-8 bg-white' : 'w-4 bg-white/40'
                    }`}
                    aria-label={`View testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Right Panel - Login Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-12 relative">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="max-w-md w-full mx-auto">
          {/* Logo - only visible on mobile */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center mb-6 md:hidden"
          >
            <div className="bg-gradient-to-r from-gray-700 to-gray-900 p-3 rounded-xl shadow-lg">
              <img 
                src="https://ui-avatars.com/api/?name=S+M&background=random&color=fff"
                className="h-10 w-10" 
                alt="Sumimaase"
              />
            </div>
            <span className="ml-3 text-xl font-bold text-gray-800">Sumimaase</span>
          </motion.div>
          
          {/* Header Text */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {isLogin ? "Welcome back" : "Join our community"}
            </h1>
            <p className="text-gray-600">
              {isLogin 
                ? `Sign in to access your ${userType === "seller" ? "seller" : userType === "admin" ? "admin" : "customer"} account`
                : `Create a ${userType === "seller" ? "seller" : userType === "admin" ? "admin" : "customer"} account to get started`}
            </p>
          </motion.div>
          
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border-l-4 border-red-400 text-red-700 p-4 rounded-lg mb-6 shadow-sm"
            >
              <div className="flex items-center">
                <svg className="h-5 w-5 text-red-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            </motion.div>
          )}
          
          {/* Auth form */}
          <motion.form 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            onSubmit={handleSubmit}
            className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center">
              {isLogin 
                ? userType === "seller" 
                  ? <ShoppingBagIcon className="h-5 w-5 mr-2 text-gray-700" /> 
                  : userType === "admin" 
                  ? <ShieldCheckIcon className="h-5 w-5 mr-2 text-gray-700" />
                  : <UserGroupIcon className="h-5 w-5 mr-2 text-gray-700" />
                : null
              }
              {isLogin ? `${userType === "seller" ? "Seller" : userType === "admin" ? "Admin" : "Customer"} Sign In` : `Register as a ${userType === "seller" ? "Seller" : userType === "admin" ? "Admin" : "Customer"}`}
            </h2>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={`${isLogin}-${userType}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Name field - only in register mode */}
                {!isLogin && (
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <UserIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 bg-gray-50"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                  </div>
                )}
                
                {/* Business details - only for seller registration */}
                {!isLogin && userType === "seller" && (
                  <>
                    <div className="mb-4">
                      <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                        <input
                          type="text"
                          id="businessName"
                          name="businessName"
                          value={formData.businessName}
                          onChange={handleChange}
                          className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 bg-gray-50"
                          placeholder="Enter your business name"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="businessType" className="block text-sm font-medium text-gray-700 mb-1">Business Type</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                        <select
                          id="businessType"
                          name="businessType"
                          value={formData.businessType}
                          onChange={handleChange}
                          className="block w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 bg-gray-50 appearance-none"
                          required
                        >
                          <option value="">Select Business Type</option>
                          {businessTypes.map((type) => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="sellerCategory" className="block text-sm font-medium text-gray-700 mb-1">Primary Product Category</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <ShoppingBagIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <select
                          id="sellerCategory"
                          name="sellerCategory"
                          value={formData.sellerCategory}
                          onChange={handleChange}
                          className="block w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 bg-gray-50 appearance-none"
                          required
                        >
                          <option value="">Select Product Category</option>
                          {sellerCategories.map((category) => (
                            <option key={category} value={category}>{category}</option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                
                {/* Admin code - only for admin registration */}
                {!isLogin && userType === "admin" && (
                  <div className="mb-4">
                    <label htmlFor="adminCode" className="block text-sm font-medium text-gray-700 mb-1">Admin Authorization Code</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <ShieldCheckIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="adminCode"
                        name="adminCode"
                        value={formData.adminCode}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 bg-gray-50"
                        placeholder="Enter admin authorization code"
                        required
                      />
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      This code is provided by the Sumimaase system administrator.
                    </p>
                  </div>
                )}

                {/* Customer details - only for customer registration */}
                {!isLogin && userType === "customer" && (
                  <>
                    <div className="mb-4">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <PhoneIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 bg-gray-50"
                          placeholder="Enter your phone number"
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <HomeIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 bg-gray-50"
                          placeholder="Enter your address"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="mb-4">
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <LocationMarkerIcon className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 bg-gray-50"
                            placeholder="City"
                            required
                          />
                        </div>
                      </div>

                      <div className="mb-4">
                        <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7h18M3 12h18M3 17h18" />
                            </svg>
                          </div>
                          <input
                            type="text"
                            id="zipCode"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleChange}
                            className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 bg-gray-50"
                            placeholder="Zip Code"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}
                
                {/* Email field */}
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MailIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 bg-gray-50"
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                </div>
                
                {/* Password field */}
                <div className="mb-4">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <LockClosedIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 bg-gray-50"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <EyeOffIcon className="h-5 w-5 text-gray-400" />
                      ) : (
                        <EyeIcon className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>
                
                {/* Confirm Password field - only in register mode */}
                {!isLogin && (
                  <div className="mb-4">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <LockClosedIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 bg-gray-50"
                        placeholder="Confirm your password"
                        required
                      />
                    </div>
                  </div>
                )}
                
                {/* Remember me & Forgot password - only in login mode */}
                {isLogin && (
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-gray-700 focus:ring-gray-500 border-gray-300 rounded"
                      />
                      <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                        Remember me
                      </label>
                    </div>
                    <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                      Forgot password?
                    </a>
                  </div>
                )}
                
                {/* Terms & Conditions - only in register mode */}
                {!isLogin && (
                  <div className="flex items-start mb-6">
                    <div className="flex items-center h-5 mt-1">
                      <input
                        id="terms"
                        name="terms"
                        type="checkbox"
                        className="h-4 w-4 text-gray-700 focus:ring-gray-500 border-gray-300 rounded"
                        required
                      />
                    </div>
                    <div className="ml-2">
                      <label htmlFor="terms" className="text-sm text-gray-700">
                        I agree to the <a href="#" className="text-gray-600 font-medium hover:text-gray-900 underline">Terms of Service</a> and <a href="#" className="text-gray-600 font-medium hover:text-gray-900 underline">Privacy Policy</a>
                      </label>
                      {userType === "seller" && (
                        <p className="text-xs text-gray-500 mt-1">
                          By registering, you agree to comply with marketplace regulations and maintain quality standards for your products.
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
            
            {/* Submit button */}
            <button 
              type="submit" 
              className={`w-full py-3 px-4 rounded-xl font-medium shadow-lg flex items-center justify-center space-x-2 transition-all transform hover:-translate-y-0.5 duration-200 ${
                userType === "admin" 
                  ? "bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-gray-900 text-white" 
                  : userType === "seller"
                  ? "bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 text-white"
                  : "bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 text-white"
              }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  {isLogin ? (
                    <>
                      <span>Sign In {userType === "seller" ? "as Seller" : userType === "admin" ? "as Admin" : "as Customer"}</span>
                      <ChevronRightIcon className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      <LightningBoltIcon className="h-4 w-4" />
                      <span>Create {userType === "seller" ? "Seller" : userType === "admin" ? "Admin" : "Customer"} Account</span>
                    </>
                  )}
                </>
              )}
            </button>
            
            {/* Switch mode */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  type="button"
                  className="font-medium text-gray-700 hover:text-gray-900 underline"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {isLogin ? "Sign up" : "Sign in"}
                </button>
              </p>
            </div>
            
            {/* Social login */}
            {isLogin && (
              <>
                {/* Divider */}
                <div className="mt-6 relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>
                
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button 
                    type="button" 
                    className="w-full flex items-center justify-center py-2.5 px-4 rounded-lg border border-gray-300 shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
                    </svg>
                    Google
                  </button>
                  <button 
                    type="button" 
                    className="w-full flex items-center justify-center py-2.5 px-4 rounded-lg border border-gray-300 shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0014.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"/>
                    </svg>
                    Facebook
                  </button>
                </div>
              </>
            )}
          </motion.form>
          
          {/* Footer */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-6 text-center text-xs text-gray-500"
          >
            <p>© 2025 Sumimaase. All rights reserved.</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;