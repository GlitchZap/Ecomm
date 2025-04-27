import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { 
  MenuIcon, 
  SearchIcon, 
  BellIcon, 
  InboxIcon,
  ShoppingCartIcon 
} from "@heroicons/react/outline";
import NotificationsDropdown from "./NotificationsDropdown";
import InboxDropdown from "./InboxDropdown";
import { useUser } from "../context/UserContext";

const Navbar = ({ toggleSidebar, isSidebarOpen }) => {
  const { user } = useUser();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showInbox, setShowInbox] = useState(false);
  
  // Close other dropdowns when one is opened
  const handleToggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (showInbox) setShowInbox(false);
  };
  
  const handleToggleInbox = () => {
    setShowInbox(!showInbox);
    if (showNotifications) setShowNotifications(false);
  };
  
  return (
    <header className="bg-gradient-to-r from-gray-600 to-gray-700 shadow-md fixed top-0 left-0 right-0 z-50 h-16">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Left section */}
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="md:hidden p-2 rounded-md text-white focus:outline-none hover:bg-white/10"
              aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
            >
              <MenuIcon className="h-6 w-6" />
            </button>
            <NavLink to="/home" className="flex items-center ml-1 md:ml-0">
              <img 
                src="https://ui-avatars.com/api/?name=V+H&background=random&color=fff"
                className="h-8 w-8 rounded-md mr-1 sm:mr-2" 
                alt="VendorHub"
              />
              <span className="text-white font-bold text-lg sm:text-xl">VendorHub</span>
            </NavLink>
          </div>
          
          {/* Search bar */}
          <div className="flex-1 max-w-lg mx-4 hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products, orders, or help..."
                className="w-full py-2 pl-10 pr-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-white/70" />
              </div>
            </div>
          </div>
          
          {/* Right section */}
          <div className="flex items-center space-x-1 sm:space-x-4">
            <button 
              className="p-1 sm:p-2 rounded-full text-white hover:bg-white/10 relative flex items-center justify-center"
              onClick={handleToggleNotifications}
              aria-label="Notifications"
            >
              <BellIcon className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs flex items-center justify-center">3</span>
            </button>
            
            <button 
              className="p-1 sm:p-2 rounded-full text-white hover:bg-white/10 relative flex items-center justify-center"
              onClick={handleToggleInbox}
              aria-label="Messages"
            >
              <InboxIcon className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs flex items-center justify-center">5</span>
            </button>
            
            <button 
              className="p-1 sm:p-2 rounded-full text-white hover:bg-white/10 flex items-center justify-center"
              onClick={() => alert("Shopping cart will be implemented in future updates!")}
            >
              <ShoppingCartIcon className="h-5 w-5" />
            </button>
            
            <NavLink to="/profile" className="flex items-center ml-1 sm:ml-0">
              <div className="flex items-center">
                <img
                  className="h-8 w-8 rounded-full border-2 border-white"
                  src={user.avatar}
                  alt="User avatar"
                />
                <span className="ml-2 text-white text-sm font-medium hidden md:block">{user.name}</span>
              </div>
            </NavLink>
          </div>
        </div>
      </div>
      
      {/* Notifications dropdown */}
      {showNotifications && (
        <div className="relative">
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setShowNotifications(false)}
          ></div>
          <NotificationsDropdown onClose={() => setShowNotifications(false)} />
        </div>
      )}
      
      {/* Inbox dropdown */}
      {showInbox && (
        <div className="relative">
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setShowInbox(false)}
          ></div>
          <InboxDropdown onClose={() => setShowInbox(false)} />
        </div>
      )}
    </header>
  );
};

export default Navbar;