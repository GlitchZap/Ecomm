import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  HomeIcon, 
  ShoppingBagIcon, 
  ChartBarIcon, 
  LightBulbIcon, 
  UserIcon, 
  CogIcon, 
  QuestionMarkCircleIcon,
  LogoutIcon,
  MoonIcon,
  SunIcon,
  CurrencyRupeeIcon,
  MenuIcon,
  XIcon,
  HeartIcon,
  ShoppingCartIcon,
  ClipboardListIcon,
  ChatAltIcon,
  TagIcon,
  SparklesIcon
} from '@heroicons/react/outline';
import { useUser } from '../context/UserContext';

const Sidebar = ({ isOpen, setIsOpen, collapsed, setCollapsed, isCustomerPage }) => {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState(null);

  const handleLogout = () => {
    logout();
    navigate('/auth', { replace: true });
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // In a real app, this would apply dark mode styles to the entire app
    // For now, we'll just show it's working with a simple alert
    alert('Dark mode toggle clicked: ' + (!darkMode ? 'Dark Mode Enabled' : 'Light Mode Enabled'));
  };

  // Define menu items for each user role
  const sellerMenuItems = [
    { name: 'Home', icon: <HomeIcon className="h-5 w-5" />, path: '/home' },
    { name: 'Marketplace', icon: <ShoppingBagIcon className="h-5 w-5" />, path: '/marketplace' },
    { name: 'Dashboard', icon: <ChartBarIcon className="h-5 w-5" />, path: '/dashboard' },
    { name: 'AI Support', icon: <LightBulbIcon className="h-5 w-5" />, path: '/ai-support' },
    { name: 'Pricing Plans', icon: <CurrencyRupeeIcon className="h-5 w-5" />, path: '/pricing' },
    { name: 'Profile', icon: <UserIcon className="h-5 w-5" />, path: '/profile' },
  ];

  // Customer menu items
  const customerMenuItems = [
    { name: 'Dashboard', icon: <HomeIcon className="h-5 w-5" />, path: '/customer/dashboard' },
    { name: 'Browse Products', icon: <ShoppingBagIcon className="h-5 w-5" />, path: '/customer/products' },
    { name: 'My Cart', icon: <ShoppingCartIcon className="h-5 w-5" />, path: '/customer/cart', badge: cartCount => cartCount > 0 ? cartCount : null },
    { name: 'Wishlist', icon: <HeartIcon className="h-5 w-5" />, path: '/customer/wishlist' },
    { name: 'My Orders', icon: <ClipboardListIcon className="h-5 w-5" />, path: '/customer/orders' },
    { name: 'New Arrivals', icon: <SparklesIcon className="h-5 w-5" />, path: '/customer/new-arrivals', highlight: true },
    { name: 'Offers', icon: <TagIcon className="h-5 w-5" />, path: '/customer/offers' },
    { name: 'Support', icon: <ChatAltIcon className="h-5 w-5" />, path: '/customer/support' },
  ];

  // Determine which menu items to show based on user role and current page
  const activeMenuItems = isCustomerPage ? customerMenuItems : sellerMenuItems;
  
  // Mock cart count for demonstration
  const cartCount = 2;

  // For Admin role, show a message that admin features are under construction
  if (user?.role === 'Administrator') {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-100 z-50">
        <div className="bg-white p-8 rounded-xl shadow-xl text-center max-w-md">
          <ShoppingBagIcon className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Admin Dashboard Under Construction</h2>
          <p className="text-gray-600 mb-6">Admin features will be added soon. Thank you for your patience.</p>
          <button
            onClick={handleLogout}
            className="bg-gray-800 text-white px-6 py-2 rounded-md font-medium hover:bg-gray-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Desktop toggle button - Moved to be positioned relative to the sidebar */}
      <div className={`hidden md:block fixed z-50 transition-all duration-300 ${collapsed ? "left-14" : "left-60"} top-20`}>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8 flex items-center justify-center rounded-full bg-white shadow-lg text-gray-600 hover:bg-gray-50 hover:scale-105 transition-all duration-200"
        >
          {collapsed ? (
            <MenuIcon className="h-4 w-4" />
          ) : (
            <XIcon className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Sidebar - Fixed the top position to be below navbar (h-16) */}
      <div 
        className={`fixed top-16 bottom-0 left-0 z-40 transform transition-all duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } ${collapsed ? "w-16" : "w-64"} md:translate-x-0`}
      >
        {/* Glass effect container */}
        <div className={`h-full flex flex-col ${
          isCustomerPage 
            ? 'bg-white/80 backdrop-blur-md border-r border-gray-100' 
            : 'bg-white/80 backdrop-blur-md border-r border-gray-100'
        } shadow-xl`}>
          {/* Logo and Header */}
          <div className={`p-4 ${collapsed ? 'flex justify-center' : ''}`}>
            <div 
              className="flex items-center cursor-pointer" 
              onClick={() => navigate(isCustomerPage ? '/customer/dashboard' : '/home')}
            >
              <div className={`bg-gradient-to-br from-blue-600 to-blue-400 p-2 rounded-md shadow-md`}>
                {isCustomerPage ? (
                  <ShoppingBagIcon className="h-5 w-5 text-white" />
                ) : (
                  <ChartBarIcon className="h-5 w-5 text-white" />
                )}
              </div>
              {!collapsed && (
                <span className="ml-2 text-lg font-extrabold tracking-tight text-gray-900">
                  SUMI<span className="bg-gradient-to-r from-blue-500 to-blue-400 bg-clip-text text-transparent">MAASE</span>
                </span>
              )}
            </div>
          </div>
          
          <div className="h-full flex flex-col justify-between">
            {/* Navigation */}
            <nav className="mt-2 px-2 space-y-1">
              <ul>
                {activeMenuItems.map((item) => (
                  <li key={item.name} className="relative">
                    <NavLink
                      to={item.path}
                      className={({ isActive }) => `
                        group rounded-xl flex items-center px-3 py-2.5 text-sm font-medium transition-all duration-200
                        ${isActive 
                          ? 'bg-blue-50 text-blue-600 shadow-sm' 
                          : 'text-gray-600 hover:bg-blue-50/30 hover:text-blue-600 shadow-sm'
                        }
                        ${item.highlight && !isActive ? 'border border-blue-200 shadow-sm' : ''}
                        ${collapsed ? 'justify-center' : ''}
                      `}
                      onMouseEnter={() => collapsed && setActiveTooltip(item.name)}
                      onMouseLeave={() => collapsed && setActiveTooltip(null)}
                    >
                      <span className={`${!collapsed ? 'mr-3' : ''} relative`}>
                        {item.icon}
                        {item.badge && item.badge(cartCount) && (
                          <span className="absolute -top-1 -right-1 h-4 w-4 bg-blue-500 text-white text-xs flex items-center justify-center rounded-full animate-pulse">
                            {item.badge(cartCount)}
                          </span>
                        )}
                      </span>
                      {!collapsed && (
                        <span className="flex-1">
                          {item.name}
                        </span>
                      )}
                      {!collapsed && item.highlight && (
                        <span className="ml-1.5 px-1.5 py-0.5 text-xs font-medium rounded bg-blue-100 text-blue-600">
                          New
                        </span>
                      )}
                    </NavLink>
                    
                    {/* Tooltip for collapsed mode */}
                    {collapsed && activeTooltip === item.name && (
                      <div className="absolute left-full ml-2 top-0 z-50 whitespace-nowrap px-2 py-1 text-xs font-medium text-white bg-gray-800 rounded-md shadow-lg">
                        {item.name}
                        {item.highlight && (
                          <span className="ml-1 px-1 py-0.5 text-[10px] font-medium rounded bg-blue-500 text-white">
                            New
                          </span>
                        )}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

          {/* Bottom section */}
          <div className="mt-auto px-4 py-4 border-t border-gray-100">
            {/* Profile Link */}
            <div className="relative">
              <NavLink
                to="/profile"
                className={({ isActive }) => `
                  ${
                    collapsed 
                      ? 'w-10 h-10 rounded-lg flex items-center justify-center mx-auto my-2' 
                      : 'w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg mb-2'
                  } ${isActive 
                    ? 'bg-blue-50 text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:bg-blue-50/30 hover:text-blue-600'
                  } transition-all duration-200 group`}
                onMouseEnter={() => collapsed && setActiveTooltip('profile')}
                onMouseLeave={() => collapsed && setActiveTooltip(null)}
              >
                {collapsed ? (
                  <div className="relative">
                    <UserIcon className="h-5 w-5" />
                  </div>
                ) : (
                  <>
                    <div className="flex-shrink-0 mr-3">
                      <img 
                        src={user?.avatar || "https://ui-avatars.com/api/?name=User&background=random&color=fff"} 
                        alt="User" 
                        className="h-6 w-6 rounded-full ring-2 ring-offset-1 ring-blue-500" 
                      />
                    </div>
                    <div className="flex-grow overflow-hidden">
                      <span className="block text-sm font-medium truncate">
                        {user?.name || 'User Profile'}
                      </span>
                    </div>
                  </>
                )}
              </NavLink>
              {collapsed && activeTooltip === 'profile' && (
                <div className="absolute left-full ml-2 top-0 z-50 px-2 py-1 text-xs font-medium text-white bg-gray-800 rounded-md shadow-lg">
                  Profile
                </div>
              )}
            </div>

            {/* Settings */}
            <div className="relative">
              <NavLink
                to="/settings"
                className={({ isActive }) => `
                  ${
                    collapsed 
                      ? 'w-10 h-10 rounded-lg flex items-center justify-center mx-auto my-2' 
                      : 'w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg'
                  } ${isActive 
                    ? 'bg-blue-50 text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:bg-blue-50/30 hover:text-blue-600'
                  } transition-all duration-200 group`}
                onMouseEnter={() => collapsed && setActiveTooltip('settings')}
                onMouseLeave={() => collapsed && setActiveTooltip(null)}
              >
                <CogIcon className={`h-5 w-5 ${collapsed ? '' : 'mr-3'} group-hover:rotate-45 transition-transform duration-300`} />
                {!collapsed && (
                  <span>
                    Settings
                  </span>
                )}
              </NavLink>
              {collapsed && activeTooltip === 'settings' && (
                <div className="absolute left-full ml-2 top-0 z-50 px-2 py-1 text-xs font-medium text-white bg-gray-800 rounded-md shadow-lg">
                  Settings
                </div>
              )}
            </div>

            {/* Help */}
            <div className="relative">
              <NavLink
                to="/help"
                className={({ isActive }) => `
                  ${
                    collapsed 
                      ? 'w-10 h-10 rounded-lg flex items-center justify-center mx-auto my-2' 
                      : 'w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg'
                  } ${isActive 
                    ? 'bg-blue-50 text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:bg-blue-50/30 hover:text-blue-600'
                  } transition-all duration-200 group`}
                onMouseEnter={() => collapsed && setActiveTooltip('help')}
                onMouseLeave={() => collapsed && setActiveTooltip(null)}
              >
                <QuestionMarkCircleIcon className={`h-5 w-5 ${collapsed ? '' : 'mr-3'} group-hover:scale-110 transition-transform duration-300`} />
                {!collapsed && (
                  <span>
                    Help
                  </span>
                )}
              </NavLink>
              {collapsed && activeTooltip === 'help' && (
                <div className="absolute left-full ml-2 top-0 z-50 px-2 py-1 text-xs font-medium text-white bg-gray-800 rounded-md shadow-lg">
                  Help
                </div>
              )}
            </div>

            {/* Logout button */}
            <div className="relative">
              <button 
                onClick={handleLogout}
                className={`${
                  collapsed 
                    ? 'w-10 h-10 rounded-lg flex items-center justify-center mx-auto my-2' 
                    : 'w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg'
                } text-red-500 hover:bg-red-50 hover:text-red-600 transition-all duration-200 group mt-2`}
                onMouseEnter={() => collapsed && setActiveTooltip('logout')}
                onMouseLeave={() => collapsed && setActiveTooltip(null)}
              >
                <LogoutIcon className={`h-5 w-5 ${collapsed ? '' : 'mr-3'} group-hover:translate-x-1 transition-transform duration-300`} />
                {!collapsed && (
                  <span>
                    Logout
                  </span>
                )}
              </button>
              {collapsed && activeTooltip === 'logout' && (
                <div className="absolute left-full ml-2 top-0 z-50 px-2 py-1 text-xs font-medium text-white bg-red-600 rounded-md shadow-lg">
                  Logout
                </div>
              )}
            </div>

            {/* Dark mode toggle */}
            <div className={`mt-4 ${
              collapsed 
                ? 'flex flex-col items-center' 
                : 'flex items-center justify-between'
            }`}>
              {!collapsed && <span className="text-sm text-gray-600">Dark Mode</span>}
              <button 
                onClick={toggleDarkMode}
                className={`${
                  collapsed 
                    ? 'w-10 h-10 rounded-lg flex items-center justify-center mx-auto' 
                    : 'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none'
                } ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}
                title={collapsed ? 'Dark Mode' : ''}
                onMouseEnter={() => collapsed && setActiveTooltip('darkmode')}
                onMouseLeave={() => collapsed && setActiveTooltip(null)}
              >
                {collapsed ? (
                  darkMode ? <SunIcon className="h-5 w-5 text-yellow-400" /> : <MoonIcon className="h-5 w-5 text-gray-300" />
                ) : (
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-300 ease-in-out ${darkMode ? 'translate-x-5' : 'translate-x-0'}`}
                  />
                )}
              </button>
              {collapsed && activeTooltip === 'darkmode' && (
                <div className="absolute left-full ml-2 bottom-4 z-50 px-2 py-1 text-xs font-medium text-white bg-gray-800 rounded-md shadow-lg">
                  {darkMode ? 'Light Mode' : 'Dark Mode'}
                </div>
              )}
            </div>
          </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
