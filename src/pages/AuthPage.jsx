import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  UserIcon, 
  LockClosedIcon, 
  MailIcon, 
  EyeIcon, 
  EyeOffIcon,
  SwitchHorizontalIcon,
  ShoppingBagIcon,
  ShieldCheckIcon
} from "@heroicons/react/outline";
import { useUser } from '../context/UserContext';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState("seller"); // "seller" or "admin"
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    businessName: "",
    businessType: "",
    sellerCategory: "",
    adminCode: ""
  });
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useUser();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // For demo purposes, we'll consider any login successful
      login({
        name: formData.name || 'Demo User',
        email: formData.email,
        role: 'Seller',
        avatar: `https://ui-avatars.com/api/?name=${(formData.name || 'Demo User').replace(/\s/g, '+')}&background=random`
      });

      // Redirect to the intended destination or home
      const from = location.state?.from?.pathname || '/home';
      navigate(from, { replace: true });
    } catch (err) {
      setError('Invalid credentials. Please try again.');
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
  
  const toggleUserType = () => {
    setUserType(userType === "seller" ? "admin" : "seller");
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
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden max-w-md w-full"
      >
        {/* Logo and header */}
        <div className="bg-gradient-to-r from-gray-600 to-gray-700 text-white p-6 text-center">
          <div className="flex items-center justify-center mb-3">
            <img 
              src="https://ui-avatars.com/api/?name=S+M&background=random&color=fff"
              className="h-12 w-12 rounded-md mr-2" 
              alt="Sumimaase"
            />
          </div>
          <h1 className="text-2xl font-bold mb-1">Sumimaase</h1>
          <p className="text-white/80 text-sm">The Ultimate Seller Platform</p>
        </div>
        
        {/* User type toggle */}
        <div className="mt-4 px-6">
          <div className="bg-gray-100 p-1 rounded-lg flex">
            <button
              type="button"
              onClick={() => setUserType("seller")}
              className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md text-sm font-medium ${
                userType === "seller" 
                  ? "bg-gray-600 text-white shadow-sm" 
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              <ShoppingBagIcon className="h-4 w-4 mr-1" />
              Seller
            </button>
            <button
              type="button"
              onClick={() => setUserType("admin")}
              className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md text-sm font-medium ${
                userType === "admin" 
                  ? "bg-gray-600 text-white shadow-sm" 
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              <ShieldCheckIcon className="h-4 w-4 mr-1" />
              Admin
            </button>
          </div>
        </div>
        
        {/* Auth form */}
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
            {isLogin ? `${userType === "seller" ? "Seller" : "Admin"} Sign In` : `Register as a ${userType === "seller" ? "Seller" : "Admin"}`}
          </h2>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            {/* Name field - only in register mode */}
            {!isLogin && userType === "seller" && (
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
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
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
                  <input
                    type="text"
                    id="businessName"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                    placeholder="Enter your business name"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="businessType" className="block text-sm font-medium text-gray-700 mb-1">Business Type</label>
                  <select
                    id="businessType"
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                    required
                  >
                    <option value="">Select Business Type</option>
                    {businessTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="sellerCategory" className="block text-sm font-medium text-gray-700 mb-1">Primary Product Category</label>
                  <select
                    id="sellerCategory"
                    name="sellerCategory"
                    value={formData.sellerCategory}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                    required
                  >
                    <option value="">Select Product Category</option>
                    {sellerCategories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </>
            )}
            
            {/* Admin code - only for admin registration */}
            {!isLogin && userType === "admin" && (
              <div className="mb-4">
                <label htmlFor="adminCode" className="block text-sm font-medium text-gray-700 mb-1">Admin Authorization Code</label>
                <input
                  type="text"
                  id="adminCode"
                  name="adminCode"
                  value={formData.adminCode}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                  placeholder="Enter admin authorization code"
                  required
                />
                <p className="mt-1 text-xs text-gray-500">
                  This code is provided by the Sumimaase system administrator.
                </p>
              </div>
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
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
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
                  className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
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
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
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
                    className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-800">
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
                    className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
                    required
                  />
                </div>
                <div className="ml-2">
                  <label htmlFor="terms" className="text-sm text-gray-700">
                    I agree to the <a href="#" className="text-gray-600 font-medium hover:text-gray-800">Terms of Service</a> and <a href="#" className="text-gray-600 font-medium hover:text-gray-800">Privacy Policy</a>
                  </label>
                  {userType === "seller" && (
                    <p className="text-xs text-gray-500 mt-1">
                      By registering, you agree to comply with marketplace regulations and maintain quality standards for your products.
                    </p>
                  )}
                </div>
              </div>
            )}
            
            {/* Submit button */}
            <button 
              type="submit" 
              className={`w-full py-2 px-4 rounded-md font-medium shadow-md ${
                userType === "admin" 
                  ? "bg-gray-700 hover:bg-gray-800 text-white" 
                  : "bg-gray-600 hover:bg-gray-700 text-white"
              }`}
            >
              {isLogin ? `Sign In as ${userType === "seller" ? "Seller" : "Admin"}` : `Register as ${userType === "seller" ? "Seller" : "Admin"}`}
            </button>
            
            {/* Switch mode */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  type="button"
                  className="font-medium text-gray-600 hover:text-gray-800"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {isLogin ? "Sign up" : "Sign in"}
                </button>
              </p>
            </div>
          </form>
          
          {/* Divider */}
          <div className="mt-6 flex items-center justify-center">
            <div className="border-t border-gray-300 flex-grow mr-3"></div>
            <div className="text-sm text-gray-500">OR</div>
            <div className="border-t border-gray-300 flex-grow ml-3"></div>
          </div>
          
          {/* Social login options - only for sellers */}
          {userType === "seller" && (
            <div className="mt-6 space-y-3">
              <button className="w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md font-medium shadow-sm hover:bg-gray-50 flex items-center justify-center">
                <span className="text-gray-400 mr-2">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
                  </svg>
                </span>
                Continue with Google
              </button>
              <button className="w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md font-medium shadow-sm hover:bg-gray-50 flex items-center justify-center">
                <span className="text-gray-400 mr-2">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0014.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"/>
                  </svg>
                </span>
                Continue with Facebook
              </button>
            </div>
          )}
          
          {/* Switch between seller/admin */}
          <button 
            type="button"
            onClick={toggleUserType}
            className="w-full mt-4 flex items-center justify-center text-sm text-gray-600 hover:text-gray-800"
          >
            <SwitchHorizontalIcon className="h-4 w-4 mr-1" />
            {userType === "seller" ? "Switch to Admin Login" : "Switch to Seller Login"}
          </button>
          
          {/* Footer */}
          <div className="mt-6 text-center text-xs text-gray-500">
            <p>© 2025 Sumimaase. All rights reserved.</p>
            <p className="mt-1">
              Current Date and Time (UTC): 2025-04-27 19:21:55 • Current User's Login: GlitchZap
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;