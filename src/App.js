import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { UserProvider, useUser } from "./context/UserContext";
import AuthPage from "./pages/seller/AuthPage";
import Home from "./pages/seller/Home";
import Marketplace from "./pages/seller/Marketplace";
import Dashboard from "./pages/seller/Dashboard";
import AiSupport from "./pages/seller/AiSupport";
import Profile from "./pages/seller/Profile";
import Pricing from "./pages/seller/Pricing";
import Layout from "./components/Layout";
import LandingPage from "./components/LandingPage";

// Customer pages
import CustomerDashboard from "./pages/customer/Dashboard";
import CustomerProductDetail from "./pages/customer/ProductDetail";
import CustomerCart from "./pages/customer/Cart";

// Protected Route wrapper
const ProtectedRoute = ({ children }) => {
  const { user } = useUser();
  const location = useLocation();

  if (!user?.isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return children;
};

// Role-based route wrapper
const RoleRoute = ({ allowedRoles, children }) => {
  const { user } = useUser();
  const location = useLocation();

  if (!user?.isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // If no specific roles are required or user's role is allowed
  if (!allowedRoles || allowedRoles.includes(user.role)) {
    return children;
  }

  // Redirect based on user role
  if (user.role === 'Customer') {
    return <Navigate to="/customer/dashboard" replace />;
  } else {
    return <Navigate to="/home" replace />;
  }
};

// Public Route wrapper
const PublicRoute = ({ children }) => {
  const { user } = useUser();
  const location = useLocation();
  const path = location.pathname;

  // Always allow access to the landing page and auth page
  if (path === "/auth") {
    return children;
  }

  if (user?.isAuthenticated) {
    // If user is authenticated, redirect to appropriate homepage based on role
    if (user.role === 'Customer') {
      return <Navigate to="/customer/dashboard" replace />;
    } else {
      // For sellers and admins
      const from = location.state?.from?.pathname || '/home';
      return <Navigate to={from} replace />;
    }
  }

  return children;
};

function AppRoutes() {
  return (
    <Routes>
      {/* Root path shows landing page - always visible to everyone */}
      <Route 
        path="/" 
        element={<LandingPage />} 
      />

      {/* Auth route - only accessible when not authenticated */}
      <Route
        path="/auth"
        element={
          <PublicRoute>
            <AuthPage />
          </PublicRoute>
        }
      />

      {/* Protected routes for sellers - only accessible when authenticated as Seller */}
      <Route
        element={
          <RoleRoute allowedRoles={['Seller', 'Administrator']}>
            <Layout />
          </RoleRoute>
        }
      >
        <Route path="/home" element={<Home />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ai-support" element={<AiSupport />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/pricing" element={<Pricing />} />
      </Route>

      {/* Protected routes for customers - only accessible when authenticated as Customer */}
      <Route
        element={
          <RoleRoute allowedRoles={['Customer']}>
            <Layout />
          </RoleRoute>
        }
      >
        <Route path="/customer/dashboard" element={<CustomerDashboard />} />
        <Route path="/customer/product/:id" element={<CustomerProductDetail />} />
        <Route path="/customer/cart" element={<CustomerCart />} />
        {/* Placeholder routes that will direct to "Coming Soon" pages */}
        <Route path="/customer/products" element={<CustomerDashboard />} />
        <Route path="/customer/wishlist" element={<ComingSoon title="Wishlist" />} />
        <Route path="/customer/orders" element={<ComingSoon title="Orders" />} />
        <Route path="/customer/support" element={<ComingSoon title="Support" />} />
        <Route path="/customer/offers" element={<ComingSoon title="Offers" />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* Catch all route - redirects to landing page */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

// Simple "Coming Soon" component for pages that aren't fully implemented yet
const ComingSoon = ({ title }) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col items-center justify-center h-full py-16">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{title} Coming Soon</h2>
        <p className="text-gray-600 mb-6">
          We're working hard to bring you this feature. Please check back later!
        </p>
        <button 
          onClick={() => navigate('/customer/dashboard')}
          className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

function App() {
  return (
    <UserProvider>
      <Router>
        <AppRoutes />
      </Router>
    </UserProvider>
  );
}

export default App;