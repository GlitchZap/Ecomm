import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const AuthPage = () => {
  const [authMode, setAuthMode] = useState("login"); // login, adminLogin, register
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [storeName, setStoreName] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real implementation, this would verify credentials
    // For demo purposes, we'll just navigate to the home page
    navigate("/home");
  };

  return (
    <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 min-h-screen flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          {/* Logo and Header */}
          <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-4 text-center">
            <h1 className="text-2xl font-bold text-white">VendorHub</h1>
            <p className="text-white/80">Your Global Selling Platform</p>
          </div>
          
          {/* Tabs */}
          <div className="flex border-b">
            <button 
              className={`flex-1 py-4 text-sm font-medium ${authMode === 'login' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-600'}`}
              onClick={() => setAuthMode("login")}
            >
              Seller Login
            </button>
            <button 
              className={`flex-1 py-4 text-sm font-medium ${authMode === 'adminLogin' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-600'}`}
              onClick={() => setAuthMode("adminLogin")}
            >
              Admin Login
            </button>
            <button 
              className={`flex-1 py-4 text-sm font-medium ${authMode === 'register' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-600'}`}
              onClick={() => setAuthMode("register")}
            >
              Register
            </button>
          </div>
          
          {/* Form */}
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              {authMode === 'login' ? 'Sign in to your seller account' : 
               authMode === 'adminLogin' ? 'Sign in as administrator' : 
               'Create your seller account'}
            </h2>
            
            <form onSubmit={handleSubmit}>
              {/* Registration fields */}
              {authMode === 'register' && (
                <>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-2">Store Name</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      value={storeName}
                      onChange={(e) => setStoreName(e.target.value)}
                      placeholder="Your store name"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-2">Phone Number</label>
                    <input 
                      type="tel" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Your phone number"
                      required
                    />
                  </div>
                </>
              )}
              
              {/* Common fields */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">Email Address</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
                <input 
                  type="password" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
              
              {/* Submit button */}
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit" 
                className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg text-white font-medium shadow-lg"
              >
                {authMode === 'register' ? 'Create Account' : 'Sign In'}
              </motion.button>
              
              {/* Additional Links */}
              {authMode !== 'register' && (
                <p className="mt-4 text-sm text-center text-gray-600">
                  Don't have an account?{" "}
                  <button 
                    type="button"
                    className="text-orange-500 hover:underline" 
                    onClick={() => setAuthMode("register")}
                  >
                    Sign up
                  </button>
                </p>
              )}
              
              {authMode === 'register' && (
                <p className="mt-4 text-sm text-center text-gray-600">
                  Already have an account?{" "}
                  <button 
                    type="button"
                    className="text-orange-500 hover:underline" 
                    onClick={() => setAuthMode("login")}
                  >
                    Sign in
                  </button>
                </p>
              )}
            </form>
          </div>
        </div>
        
        <div className="mt-6 text-center text-white text-sm">
          <p>© 2025 VendorHub. All rights reserved.</p>
          <p className="mt-1">Current Time: 2025-04-27 09:25:35 UTC • User: GlitchZap</p>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;