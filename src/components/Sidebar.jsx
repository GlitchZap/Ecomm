import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  HomeIcon, 
  ShoppingBagIcon, 
  ChartBarIcon, 
  LightBulbIcon, 
  UserIcon, 
  CogIcon, 
  QuestionMarkCircleIcon,
  LogoutIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MoonIcon,
  CurrencyRupeeIcon
} from "@heroicons/react/outline";
import { useUser } from "../context/UserContext";

const Sidebar = ({ isOpen, setIsOpen, collapsed, setCollapsed }) => {
  const { user } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    alert("Logging out...");
    navigate("/");
  };
  
  const handleSettings = () => {
    alert("Settings page will be implemented in future updates!");
  };
  
  const handleHelp = () => {
    alert("Help center will be implemented in future updates!");
  };
  
  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };
  
  const toggleDarkMode = () => {
    alert("Dark mode will be implemented in future updates!");
  };
  
  const menuItems = [
    { name: "Home", icon: <HomeIcon className="h-5 w-5" />, path: "/home" },
    { name: "Marketplace", icon: <ShoppingBagIcon className="h-5 w-5" />, path: "/marketplace" },
    { name: "Dashboard", icon: <ChartBarIcon className="h-5 w-5" />, path: "/dashboard" },
    { name: "AI Support", icon: <LightBulbIcon className="h-5 w-5" />, path: "/ai-support" },
    { name: "Our Plans", icon: <CurrencyRupeeIcon className="h-5 w-5" />, path: "/pricing" },
    { name: "Profile", icon: <UserIcon className="h-5 w-5" />, path: "/profile" },
    { 
      name: "Settings", 
      icon: <CogIcon className="h-5 w-5" />, 
      path: "#settings",
      onClick: handleSettings
    },
    { 
      name: "Help", 
      icon: <QuestionMarkCircleIcon className="h-5 w-5" />, 
      path: "#help",
      onClick: handleHelp
    },
  ];

  return (
    <div 
      className={`fixed inset-y-0 left-0 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 transition-all duration-300 ease-in-out bg-white border-r border-gray-200 z-40 ${
        collapsed ? 'md:w-20' : 'w-64'
      } flex flex-col`}
      style={{ top: '64px', height: 'calc(100vh - 64px)' }}
    >
      {/* Collapse toggle button - visible only on desktop */}
      <button 
        onClick={toggleCollapse}
        className="hidden md:flex absolute -right-3 top-6 h-6 w-6 bg-white rounded-full border border-gray-200 items-center justify-center shadow-md"
      >
        {collapsed ? 
          <ChevronRightIcon className="h-3 w-3 text-gray-600" /> : 
          <ChevronLeftIcon className="h-3 w-3 text-gray-600" />
        }
      </button>
      
      {/* User profile section */}
      <div className={`px-4 py-4 ${collapsed ? 'flex justify-center' : ''} border-b border-gray-100`}>
        <div className={`flex items-center ${collapsed ? 'justify-center' : ''}`}>
          <img
            src={user.avatar}
            alt={user.name}
            className="h-10 w-10 rounded-full"
          />
          {!collapsed && (
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-800">{user.name}</p>
              <p className="text-xs text-gray-500">{user.role}</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Search */}
      {!collapsed && (
        <div className="px-4 py-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-gray-100 rounded-lg pl-8 pr-3 py-2 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      )}
      
      {/* Navigation - no scrollbar */}
      <div className="flex-1 py-2">
        <nav className={`${collapsed ? 'flex flex-col items-center' : 'space-y-1 px-2'}`}>
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={(e) => {
                if (item.onClick) {
                  e.preventDefault();
                  item.onClick();
                }
                if (window.innerWidth < 768) {
                  setIsOpen(false);
                }
              }}
              className={`${
                collapsed 
                  ? 'w-12 h-12 my-2 rounded-lg flex items-center justify-center' 
                  : 'flex items-center px-4 py-2 rounded-md text-sm font-medium'
              } ${
                location.pathname === item.path
                  ? collapsed 
                    ? "bg-orange-50 text-orange-500" 
                    : "bg-orange-50 text-orange-500"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
              title={collapsed ? item.name : ''}
            >
              <span className={collapsed ? '' : 'mr-3'}>{item.icon}</span>
              {!collapsed && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>
      </div>
      
      {/* Bottom section */}
      <div className={`mt-auto ${collapsed ? 'px-2 pb-4' : 'px-4 py-4'} border-t border-gray-100`}>
        {/* Logout button */}
        <button 
          onClick={handleLogout}
          className={`${
            collapsed 
              ? 'w-12 h-12 rounded-lg flex items-center justify-center mx-auto my-2' 
              : 'w-full flex items-center px-4 py-2 text-sm font-medium rounded-md'
          } text-red-600 hover:bg-red-50`}
          title={collapsed ? "Logout" : ''}
        >
          <LogoutIcon className={`h-5 w-5 ${collapsed ? '' : 'mr-3'}`} />
          {!collapsed && <span>Logout</span>}
        </button>
        
        {/* Dark mode toggle */}
        <div className={`mt-2 ${
          collapsed 
            ? 'flex flex-col items-center' 
            : 'flex items-center justify-between'
        }`}>
          {!collapsed && <span className="text-sm text-gray-600">Dark Mode</span>}
          <button 
            onClick={toggleDarkMode}
            className={`${
              collapsed 
                ? 'w-12 h-12 rounded-lg flex items-center justify-center mx-auto my-2' 
                : 'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none'
            } ${false ? 'bg-orange-500' : 'bg-gray-200'}`}
            title={collapsed ? "Dark Mode" : ''}
          >
            {collapsed ? (
              <MoonIcon className="h-5 w-5 text-gray-600" />
            ) : (
              <span
                aria-hidden="true"
                className="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out translate-x-0"
              ></span>
            )}
          </button>
        </div>
        
        {/* Current time - show only in expanded mode */}
        {!collapsed && (
          <div className="mt-4 text-xs text-center text-gray-500">
            {user.dateTime}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;