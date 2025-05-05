import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
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
  CurrencyRupeeIcon,
  MenuIcon,
  XIcon,
  UserGroupIcon
} from '@heroicons/react/outline';
import { useUser } from '../context/UserContext';

const Sidebar = ({ isOpen, setIsOpen, collapsed, setCollapsed }) => {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth', { replace: true });
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

  // Customer menu items will be defined later
  const customerMenuItems = [
    // Will be defined later as per the requirement
  ];

  // Determine which menu items to show based on user role
  let menuItems = [];
  
  if (user?.role === 'Administrator') {
    // For admin user, we'll show a message that admin dashboard is under construction
    menuItems = [];
  } else if (user?.role === 'Customer') {
    menuItems = customerMenuItems;
  } else {
    // Default to seller menu items
    menuItems = sellerMenuItems;
  }

  const bottomItems = [
    { 
      name: 'Settings', 
      icon: <CogIcon className="h-5 w-5" />,
      onClick: () => alert('Settings will be implemented in future updates!')
    },
    { 
      name: 'Help', 
      icon: <QuestionMarkCircleIcon className="h-5 w-5" />,
      onClick: () => alert('Help center will be implemented in future updates!')
    },
  ];

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

  // For Customer role, show a message that customer pages are in development
  if (user?.role === 'Customer') {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-100 z-50">
        <div className="bg-white p-8 rounded-xl shadow-xl text-center max-w-md">
          <UserGroupIcon className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome, Customer!</h2>
          <p className="text-gray-600 mb-6">Customer features are being developed and will be available soon.</p>
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
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Desktop toggle button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="hidden md:flex fixed left-4 top-4 z-50 h-10 w-10 items-center justify-center text-gray-600 group"
      >
        <div className="absolute inset-0 rounded-full bg-gray-100/0 group-hover:bg-gray-100/30 transition-all duration-300" />
        {collapsed ? (
          <MenuIcon className="h-6 w-6 relative" />
        ) : (
          <XIcon className="h-6 w-6 relative" />
        )}
      </button>

      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-all duration-300 ease-in-out bg-white/95 backdrop-blur-sm shadow-lg z-40 ${
          collapsed ? 'md:w-20' : 'w-64'
        } flex flex-col`}
      >
        {/* Collapse toggle button */}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:flex absolute -right-3 top-6 h-6 w-6 bg-white rounded-full shadow-lg items-center justify-center hover:bg-gray-50 transition-all duration-300"
        >
          {collapsed ? 
            <ChevronRightIcon className="h-3 w-3 text-gray-600" /> : 
            <ChevronLeftIcon className="h-3 w-3 text-gray-600" />
          }
        </button>

        {/* User profile */}
        <div className={`px-4 py-4 ${collapsed ? 'flex justify-center' : ''} border-b border-gray-100`}>
          <div className={`flex items-center ${collapsed ? 'justify-center' : ''}`}>
            <img
              src={user?.avatar}
              alt={user?.name}
              className="h-10 w-10 rounded-full ring-2 ring-gray-100"
            />
            {!collapsed && (
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.role}</p>
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
                  className={({ isActive }) => `
                    flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200
                    ${isActive 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }
                    ${collapsed ? 'justify-center' : ''}
                  `}
                >
                  <span className={`${!collapsed ? 'mr-3' : ''}`}>
                    {item.icon}
                  </span>
                  {!collapsed && (
                    <span className="transition-opacity duration-200">
                      {item.name}
                    </span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom section */}
        <div className={`mt-auto ${collapsed ? 'px-2 pb-4' : 'px-4 py-4'} border-t border-gray-100`}>
          {/* Action buttons */}
          {bottomItems.map((item) => (
            <button
              key={item.name}
              onClick={item.onClick}
              className={`${
                collapsed 
                  ? 'w-12 h-12 rounded-lg flex items-center justify-center mx-auto my-2' 
                  : 'w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-md'
              } text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200`}
              title={collapsed ? item.name : ''}
            >
              <span className={`${!collapsed ? 'mr-3' : ''}`}>
                {item.icon}
              </span>
              {!collapsed && (
                <span className="transition-opacity duration-200">
                  {item.name}
                </span>
              )}
            </button>
          ))}

          {/* Logout button */}
          <button 
            onClick={handleLogout}
            className={`${
              collapsed 
                ? 'w-12 h-12 rounded-lg flex items-center justify-center mx-auto my-2' 
                : 'w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-md'
            } text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200`}
            title={collapsed ? 'Logout' : ''}
          >
            <LogoutIcon className={`h-5 w-5 ${collapsed ? '' : 'mr-3'}`} />
            {!collapsed && (
              <span className="transition-opacity duration-200">
                Logout
              </span>
            )}
          </button>

          {/* Dark mode toggle */}
          <div className={`mt-2 ${
            collapsed 
              ? 'flex flex-col items-center' 
              : 'flex items-center justify-between'
          }`}>
            {!collapsed && <span className="text-sm text-gray-600">Dark Mode</span>}
            <button 
              onClick={() => alert('Dark mode will be implemented in future updates!')}
              className={`${
                collapsed 
                  ? 'w-12 h-12 rounded-lg flex items-center justify-center mx-auto my-2' 
                  : 'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none'
              } bg-gray-200 hover:bg-gray-300`}
              title={collapsed ? 'Dark Mode' : ''}
            >
              {collapsed ? (
                <MoonIcon className="h-5 w-5 text-gray-600" />
              ) : (
                <span
                  aria-hidden="true"
                  className="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out translate-x-0"
                />
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;