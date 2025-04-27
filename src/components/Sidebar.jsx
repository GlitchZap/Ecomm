import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  
  const handleLogout = () => {
    alert("Logging out...");
    navigate("/", { replace: true });
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
  
  const handleNavigation = (path, onClick) => {
    if (onClick) {
      onClick();
    } else {
      navigate(path, { replace: true });
    }
  };
  
  const menuItems = [
    { name: "Home", icon: <HomeIcon className="h-5 w-5" />, path: "/home" },
    { name: "Marketplace", icon: <ShoppingBagIcon className="h-5 w-5" />, path: "/marketplace" },
    { name: "Dashboard", icon: <ChartBarIcon className="h-5 w-5" />, path: "/dashboard" },
    { name: "AI Support", icon: <LightBulbIcon className="h-5 w-5" />, path: "/ai-support" },
    { name: "Pricing Plans", icon: <CurrencyRupeeIcon className="h-5 w-5" />, path: "/pricing" },
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
      
      {/* Navigation menu */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                onClick={(e) => {
                  if (item.onClick) {
                    e.preventDefault();
                    handleNavigation(item.path, item.onClick);
                  }
                }}
                className={({ isActive }) => `
                  flex items-center px-4 py-2 text-sm font-medium
                  ${isActive 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-600 hover:bg-gray-50'
                  }
                  ${collapsed ? 'justify-center' : ''}
                `}
              >
                <span className={`${!collapsed ? 'mr-3' : ''}`}>
                  {item.icon}
                </span>
                {!collapsed && item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
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
            } ${false ? 'bg-gray-600' : 'bg-gray-200'}`}
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