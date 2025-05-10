import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { motion } from "framer-motion";
import { ShoppingBagIcon } from "@heroicons/react/outline";

const Footer = ({ className = "" }) => {
  const { user } = useUser();
  const location = useLocation();
  
  // Check if the user is on a customer page
  const isCustomerPage = location.pathname.includes('/customer');
  
  return (
    <footer className={`${isCustomerPage ? 'bg-white' : 'bg-gray-900'} mt-12 ${className}`}>
      {/* Newsletter Section */}
      <div className={`border-t ${isCustomerPage ? 'border-gray-100' : 'border-gray-800'}`}>
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className={`rounded-2xl ${isCustomerPage ? 'bg-blue-600' : 'bg-gradient-to-br from-blue-600 to-purple-700'} p-6 sm:p-10 relative overflow-hidden`}>
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                <defs>
                  <pattern id="pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                    <circle cx="20" cy="20" r="2" fill="currentColor" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#pattern)" />
              </svg>
            </div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-md">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Stay up to date</h2>
                <p className="text-blue-100">
                  Get notified about new products, special offers, and marketplace updates.
                </p>
              </div>
              <div className="w-full max-w-md">
                <form className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-grow px-4 py-3 rounded-lg text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
                    required
                  />
                  <button type="submit" className="px-5 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition duration-150 whitespace-nowrap">
                    Subscribe
                  </button>
                </form>
                <p className="text-xs text-blue-200 mt-2">
                  By subscribing, you agree to our Privacy Policy. You can unsubscribe at any time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Footer */}
      <div className={`border-t ${isCustomerPage ? 'border-gray-100' : 'border-gray-800'}`}>
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-16">
            <div className="lg:col-span-2">
              <Link to="/" className="flex items-center mb-5">
                <div className="bg-gradient-to-br from-blue-600 to-blue-400 p-2 rounded-md shadow-md mr-2">
                  <ShoppingBagIcon className="h-5 w-5 text-white" />
                </div>
                <span className={`text-xl font-extrabold tracking-tight ${isCustomerPage ? 'text-gray-900' : 'text-white'}`}>
                  SUMI<span className="bg-gradient-to-r from-blue-500 to-blue-400 bg-clip-text text-transparent">MAASE</span>
                </span>
              </Link>
              <p className={`text-sm mb-6 ${isCustomerPage ? 'text-gray-600' : 'text-gray-400'}`}>
                Empowering small-town sellers to go online easily and reach customers globally.
                Our platform connects local businesses with a worldwide audience through simple,
                yet powerful tools.
              </p>
              <div className="flex space-x-4">
                <motion.a 
                  whileHover={{ y: -3 }}
                  href="#" 
                  className={`text-gray-400 hover:text-blue-500 transition-colors`}
                >
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </motion.a>
                <motion.a 
                  whileHover={{ y: -3 }}
                  href="#" 
                  className={`text-gray-400 hover:text-blue-500 transition-colors`}
                >
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 3.808-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-3.808-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </motion.a>
                <motion.a 
                  whileHover={{ y: -3 }}
                  href="#" 
                  className={`text-gray-400 hover:text-blue-500 transition-colors`}
                >
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </motion.a>
                <motion.a 
                  whileHover={{ y: -3 }}
                  href="#" 
                  className={`text-gray-400 hover:text-blue-500 transition-colors`}
                >
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </motion.a>
              </div>
            </div>
            
            <div>
              <h3 className={`text-base font-semibold mb-4 ${isCustomerPage ? 'text-gray-900' : 'text-white'}`}>For Customers</h3>
              <ul className="space-y-3 text-sm">
                {[
                  { text: "Browse Products", path: "/customer/dashboard" },
                  { text: "Shopping Cart", path: "/customer/cart" },
                  { text: "Wishlist", path: "/customer/wishlist" },
                  { text: "Orders", path: "/customer/orders" },
                  { text: "Customer Support", path: "/customer/support" },
                ].map((link, idx) => (
                  <li key={idx}>
                    <Link 
                      to={link.path} 
                      className={`${isCustomerPage ? 'text-gray-600 hover:text-blue-600' : 'text-gray-400 hover:text-white'}`}
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className={`text-base font-semibold mb-4 ${isCustomerPage ? 'text-gray-900' : 'text-white'}`}>For Sellers</h3>
              <ul className="space-y-3 text-sm">
                {[
                  { text: "Sell on Sumimaase", path: "/marketplace" },
                  { text: "Seller Dashboard", path: "/dashboard" },
                  { text: "Analytics", path: "/analytics" },
                  { text: "AI Support", path: "/ai-support" },
                  { text: "Pricing Plans", path: "/pricing" },
                ].map((link, idx) => (
                  <li key={idx}>
                    <Link 
                      to={link.path} 
                      className={`${isCustomerPage ? 'text-gray-600 hover:text-blue-600' : 'text-gray-400 hover:text-white'}`}
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className={`text-base font-semibold mb-4 ${isCustomerPage ? 'text-gray-900' : 'text-white'}`}>Company</h3>
              <ul className="space-y-3 text-sm">
                {[
                  { text: "About Us", path: "/about" },
                  { text: "Careers", path: "/careers" },
                  { text: "Press", path: "/press" },
                  { text: "Contact Us", path: "/contact" },
                  { text: "Blog", path: "/blog" },
                ].map((link, idx) => (
                  <li key={idx}>
                    <Link 
                      to={link.path} 
                      className={`${isCustomerPage ? 'text-gray-600 hover:text-blue-600' : 'text-gray-400 hover:text-white'}`}
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <h3 className={`text-base font-semibold mb-4 ${isCustomerPage ? 'text-gray-900' : 'text-white'}`}>Contact</h3>
                <p className={`text-sm ${isCustomerPage ? 'text-gray-600' : 'text-gray-400'}`}>
                  support@sumimaase.com
                </p>
                <p className={`text-sm ${isCustomerPage ? 'text-gray-600' : 'text-gray-400'}`}>
                  +91 9265380320
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom bar */}
      <div className={`border-t ${isCustomerPage ? 'border-gray-200' : 'border-gray-800'}`}>
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <p className={`text-sm ${isCustomerPage ? 'text-gray-500' : 'text-gray-400'}`}>
            © 2025 Sumimaase. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex flex-wrap justify-center gap-6 text-sm">
            <Link to="/privacy" className={`${isCustomerPage ? 'text-gray-600 hover:text-blue-600' : 'text-gray-400 hover:text-white'}`}>
              Privacy Policy
            </Link>
            <Link to="/terms" className={`${isCustomerPage ? 'text-gray-600 hover:text-blue-600' : 'text-gray-400 hover:text-white'}`}>
              Terms of Service
            </Link>
            <Link to="/cookies" className={`${isCustomerPage ? 'text-gray-600 hover:text-blue-600' : 'text-gray-400 hover:text-white'}`}>
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;