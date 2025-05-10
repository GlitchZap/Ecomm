import React, { useState, useEffect, useRef, useMemo } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MenuIcon, 
  SearchIcon, 
  BellIcon, 
  InboxIcon,
  ShoppingCartIcon,
  XIcon,
  HeartIcon,
  SparklesIcon,
  ShoppingBagIcon,
  ChartBarIcon,
  UserCircleIcon
} from "@heroicons/react/outline";
import NotificationsDropdown from "./NotificationsDropdown";
import InboxDropdown from "./InboxDropdown";
import { useUser } from "../context/UserContext";

const Navbar = ({ toggleSidebar, isSidebarOpen }) => {
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showInbox, setShowInbox] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(2); // Mock data
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const profileDropdownRef = useRef(null);
  
  // Check if the user is on a customer page
  const isCustomerPage = location.pathname.includes('/customer');
  const isSeller = user?.role === 'seller';
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close other dropdowns when one is opened
  const handleToggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (showInbox) setShowInbox(false);
    if (showProfileDropdown) setShowProfileDropdown(false);
  };
  
  const handleToggleInbox = () => {
    setShowInbox(!showInbox);
    if (showNotifications) setShowNotifications(false);
    if (showProfileDropdown) setShowProfileDropdown(false);
  };
  
  const handleToggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
    if (showNotifications) setShowNotifications(false);
    if (showInbox) setShowInbox(false);
  };
  
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSearchModal(false);
      // For customer pages, navigate to search results
      if (isCustomerPage) {
        navigate(`/customer/search?q=${encodeURIComponent(searchQuery)}`);
      } else {
        navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      }
    }
  };

  // Memoize user initial to track changes
  const userInitial = useMemo(() => {
    return user?.name ? user.name.charAt(0).toUpperCase() : 'U';
  }, [user?.name]); // Re-compute when name changes
  
  // Get user's initials for the avatar
  const getUserInitial = () => userInitial;
  
  // Function to get background color based on scroll and user role
  const getNavbarClasses = () => {
    let baseClasses = "fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full";
    
    // Transparent to solid effect when scrolling
    if (isScrolled) {
      return `${baseClasses} ${isCustomerPage ? 'bg-white shadow-md' : 'bg-gray-900 shadow-lg'}`;
    } else {
      return `${baseClasses} ${isCustomerPage ? 'bg-white/95 backdrop-blur-sm' : 'bg-gray-900/95 backdrop-blur-sm'}`;
    }
  };
  
  return (
    <>
      <header className={getNavbarClasses()}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Left section */}
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="md:hidden p-2 rounded-md focus:outline-none hover:bg-opacity-10 hover:bg-gray-200"
              aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
            >
              <MenuIcon className={`h-6 w-6 ${isCustomerPage ? 'text-gray-800' : 'text-white'}`} />
            </button>
            
            {/* Logo - different styling for customer pages */}
            <NavLink 
              to={isCustomerPage ? "/customer/dashboard" : "/home"} 
              className="flex items-center ml-1 md:ml-0"
            >
              <div className="flex items-center gap-2">
                <div className="bg-gradient-to-br from-blue-600 to-blue-400 p-1.5 rounded-md shadow-md">
                  {isCustomerPage || !isSeller ? (
                    <ShoppingBagIcon className="h-5 w-5 text-white" />
                  ) : (
                    <ChartBarIcon className="h-5 w-5 text-white" />
                  )}
                </div>
                <span className={`text-lg font-extrabold tracking-tight ${isCustomerPage ? 'text-gray-900' : 'text-white'}`}>
                  SUMI<span className="bg-gradient-to-r from-blue-500 to-blue-400 bg-clip-text text-transparent">MAASE</span>
                </span>
                {isCustomerPage && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }}
                    className="hidden sm:flex items-center gap-2 border-l border-gray-300 ml-2 pl-2"
                  >
                    <SparklesIcon className="h-4 w-4 text-amber-500" />
                    <span className="text-xs font-medium text-gray-600">Marketplace</span>
                  </motion.div>
                )}
              </div>
            </NavLink>
          </div>
          
          {/* Center section - Navigation for customer pages */}
          {isCustomerPage && (
            <nav className="hidden md:flex items-center space-x-1">
              {[
                { name: 'Home', path: '/customer/dashboard' },
                { name: 'Categories', path: '/customer/categories' },
                { name: 'Deals', path: '/customer/offers' },
                { name: 'New Arrivals', path: '/customer/products?filter=new' }
              ].map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) => `
                    px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150
                    ${isActive 
                      ? 'text-blue-600'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                    }
                  `}
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>
          )}
          
          {/* Right section */}
          <div className="flex items-center space-x-1 sm:space-x-3">
            {/* Search button (opens modal) */}
            <button
              onClick={() => setShowSearchModal(true)}
              className={`p-2 rounded-full flex items-center justify-center
                ${isCustomerPage 
                  ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              aria-label="Search"
            >
              <SearchIcon className="h-5 w-5" />
            </button>
            
            {/* Notifications */}
            <button 
              className={`p-2 rounded-full relative flex items-center justify-center
                ${isCustomerPage 
                  ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              onClick={handleToggleNotifications}
              aria-label="Notifications"
            >
              <BellIcon className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">3</span>
            </button>
            
            {/* Messages */}
            <button 
              className={`p-2 rounded-full relative flex items-center justify-center
                ${isCustomerPage 
                  ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              onClick={handleToggleInbox}
              aria-label="Messages"
            >
              <InboxIcon className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">5</span>
            </button>
            
            {/* Additional customer navigation */}
            {isCustomerPage && (
              <>
                <NavLink 
                  to="/customer/wishlist" 
                  className={({ isActive }) => `
                    p-2 rounded-full relative flex items-center justify-center
                    ${isActive 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }
                  `}
                >
                  <HeartIcon className="h-5 w-5" />
                </NavLink>
                
                <NavLink 
                  to="/customer/cart" 
                  className={({ isActive }) => `
                    p-2 rounded-full relative flex items-center justify-center
                    ${isActive 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }
                  `}
                >
                  <ShoppingCartIcon className="h-5 w-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-blue-500 text-white text-xs flex items-center justify-center rounded-full">
                      {cartCount}
                    </span>
                  )}
                </NavLink>
              </>
            )}
            
            {/* User Profile */}
            <div 
              className="relative"
              ref={profileDropdownRef}
            >
              <button
                onClick={handleToggleProfileDropdown}
                className="flex items-center focus:outline-none"
                aria-label="User menu"
              >
                {user?.avatar ? (
                  <img
                    className={`h-8 w-8 rounded-full border-2 ${isCustomerPage ? 'border-blue-500' : 'border-blue-500'}`}
                    src={user.avatar}
                    alt="User avatar"
                  />
                ) : (
                  <div 
                    key={userInitial} // Key forces re-render when initial changes
                    className={`h-8 w-8 rounded-full border-2 flex items-center justify-center ${isCustomerPage ? 'bg-blue-100 border-blue-500 text-blue-600' : 'bg-blue-900 border-blue-500 text-blue-200'}`}
                  >
                    <span className="font-medium text-sm">{userInitial}</span>
                  </div>
                )}
              </button>
              
              {/* Profile Dropdown */}
              <AnimatePresence>
                {showProfileDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className={`absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20`}
                  >
                    <div className="px-4 py-3 text-sm border-b border-gray-200">
                      <p className="font-medium text-gray-900">{user?.name || 'User'}</p>
                      <p className="text-gray-500 truncate">{user?.email || 'user@example.com'}</p>
                    </div>
                    <div className="py-1">
                      <NavLink 
                        to="/profile" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowProfileDropdown(false)}
                      >
                        Profile
                      </NavLink>
                      <NavLink 
                        to="/settings" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowProfileDropdown(false)}
                      >
                        Settings
                      </NavLink>
                      <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                        Sign out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </header>
      
      {/* Extra padding to prevent content from hiding under the fixed navbar */}
      <div className="h-16"></div>
      
      {/* Dropdowns */}
      <AnimatePresence>
        {showNotifications && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
              onClick={() => setShowNotifications(false)}
            ></motion.div>
            <NotificationsDropdown onClose={() => setShowNotifications(false)} />
          </>
        )}
        
        {showInbox && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
              onClick={() => setShowInbox(false)}
            ></motion.div>
            <InboxDropdown onClose={() => setShowInbox(false)} />
          </>
        )}
      </AnimatePresence>
      
      {/* Full-screen search modal */}
      <AnimatePresence>
        {showSearchModal && (
          <div className="fixed inset-0 z-50 flex items-start pt-16 sm:pt-24 justify-center bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-2xl mx-4"
            >
              <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
                <div className="relative">
                  <form onSubmit={handleSearchSubmit} className="flex">
                    <input
                      type="text"
                      placeholder="Search for products, categories, or brands..."
                      className="w-full px-4 py-4 pl-12 text-lg focus:outline-none"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => setShowSearchModal(false)}
                      className="p-4 text-gray-500 hover:text-gray-700"
                    >
                      <XIcon className="h-6 w-6" />
                    </button>
                  </form>
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <SearchIcon className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
                
                {searchQuery && (
                  <div className="border-t border-gray-200 py-4 px-6 max-h-96 overflow-y-auto">
                    <p className="text-sm text-gray-500 mb-2">Press Enter to search for "{searchQuery}"</p>
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-gray-400 uppercase mt-4">Popular Searches</p>
                      <div className="flex flex-wrap gap-2">
                        <button 
                          className="px-3 py-1.5 bg-gray-100 rounded-full text-sm text-gray-800 hover:bg-gray-200"
                          onClick={() => setSearchQuery("wireless earbuds")}
                        >
                          wireless earbuds
                        </button>
                        <button 
                          className="px-3 py-1.5 bg-gray-100 rounded-full text-sm text-gray-800 hover:bg-gray-200"
                          onClick={() => setSearchQuery("smart watch")}
                        >
                          smart watch
                        </button>
                        <button 
                          className="px-3 py-1.5 bg-gray-100 rounded-full text-sm text-gray-800 hover:bg-gray-200"
                          onClick={() => setSearchQuery("bluetooth speaker")}
                        >
                          bluetooth speaker
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;