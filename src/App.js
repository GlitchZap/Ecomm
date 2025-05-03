import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { UserProvider, useUser } from "./context/UserContext";
import AuthPage from "./pages/AuthPage";
import Home from "./pages/Home";
import Marketplace from "./pages/Marketplace";
import Dashboard from "./pages/Dashboard";
import AiSupport from "./pages/AiSupport";
import Profile from "./pages/Profile";
import Pricing from "./pages/Pricing";
import Layout from "./components/Layout";
import LandingPage from "./components/LandingPage";

// Protected Route wrapper
const ProtectedRoute = ({ children }) => {
  const { user } = useUser();
  const location = useLocation();

  if (!user?.isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return children;
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
    // If user is authenticated, redirect to home or the last visited page
    const from = location.state?.from?.pathname || '/home';
    return <Navigate to={from} replace />;
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

      {/* Protected routes - only accessible when authenticated */}
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/home" element={<Home />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ai-support" element={<AiSupport />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/pricing" element={<Pricing />} />
      </Route>

      {/* Catch all route - redirects to landing page */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

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