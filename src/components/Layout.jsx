import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { useUser } from '../context/UserContext';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const { user } = useUser();
  const location = useLocation();

  // Check if the user is on a customer page
  const isCustomerPage = location.pathname.includes('/customer');
  const isLandingPage = location.pathname === '/';
  const isAuthPage = location.pathname.includes('/auth');
  
  // Close sidebar on route change (especially important on mobile)
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);
  
  // Automatically collapse sidebar on smaller screens (but not mobile)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1280 && window.innerWidth > 768) {
        setIsSidebarCollapsed(true);
      } else if (window.innerWidth >= 1280) {
        setIsSidebarCollapsed(false);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Don't render layout components for the landing page or auth pages
  if (isLandingPage || isAuthPage) {
    return <Outlet />;
  }

  return (
    <div className={`flex min-h-screen flex-col ${isCustomerPage ? 'bg-gray-50' : 'bg-gray-100'}`}>
      <Navbar 
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
        isSidebarOpen={isSidebarOpen} 
      />
      
      <div className="flex flex-1 overflow-hidden">
        {user && (
          <Sidebar 
            isOpen={isSidebarOpen} 
            setIsOpen={setIsSidebarOpen}
            collapsed={isSidebarCollapsed}
            setCollapsed={setIsSidebarCollapsed}
            isCustomerPage={isCustomerPage}
          />
        )}
        
        <main className={`flex-1 overflow-y-auto transition-all duration-300 ${
          isCustomerPage ? 'bg-gray-50' : 'bg-gray-100'
        } ${isSidebarCollapsed ? 'md:pl-16' : 'md:pl-64'}`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="min-h-[calc(100vh-4rem)]"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
          
          {/* Only show footer on certain pages */}
          {!location.pathname.includes('/auth') && <Footer />}
        </main>
      </div>
    </div>
  );
};

export default Layout;