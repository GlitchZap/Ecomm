import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRightIcon } from "@heroicons/react/solid";
import { 
  TrendingUpIcon, 
  CashIcon, 
  TagIcon,
  GiftIcon,
  CurrencyRupeeIcon,
  LightningBoltIcon,
  ChartBarIcon
} from "@heroicons/react/outline";
import { useUser } from "../../context/UserContext";

const Home = () => {
  const { user } = useUser();
  
  const upcomingSales = [
    {
      id: 1,
      title: "Diwali Festival Sale",
      description: "Boost your sales during the festival of lights. Register now!",
      date: "Starts Oct 15, 2025",
      image: "https://images.unsplash.com/photo-1593941707882-a56bbc8ba7dc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      color: "from-indigo-600 to-blue-500",
    },
    {
      id: 2,
      title: "Summer Clearance",
      description: "Clear your inventory with special discounts",
      date: "Starts May 10, 2025",
      image: "https://images.unsplash.com/photo-1601924638867-3a6de6b7a500?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: 3,
      title: "Back to School",
      description: "Target students with special offers and bundles",
      date: "Starts July 1, 2025",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      color: "from-green-500 to-emerald-500",
    },
  ];
  
  const quickStats = [
    {
      title: "Sales Today",
      value: "₹12,458",
      change: "+24%",
      positive: true,
      icon: <TrendingUpIcon className="h-5 w-5 text-green-500" />,
    },
    {
      title: "Orders Pending",
      value: "8",
      change: "-2",
      positive: true,
      icon: <TagIcon className="h-5 w-5 text-blue-500" />,
    },
    {
      title: "Revenue This Month",
      value: "₹1,24,587",
      change: "+18%",
      positive: true,
      icon: <CashIcon className="h-5 w-5 text-yellow-500" />,
    },
  ];
  
  return (
    <div className="px-4 py-6 md:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Welcome Section */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-0">
            Welcome back, {user?.name || 'User'}!
          </h1>
        </div>
        <p className="text-gray-600 mt-1">
          Here's what's happening with your store today
        </p>
      </div>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {quickStats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition-shadow duration-300"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="text-xl font-bold mt-1 text-gray-900">{stat.value}</p>
                <div className="flex items-center mt-1">
                  <span className={`text-xs font-medium ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </span>
                  <span className="text-xs text-gray-500 ml-1">from yesterday</span>
                </div>
              </div>
              <div className="h-10 w-10 rounded-full bg-gray-50 flex items-center justify-center shadow-sm">
                {stat.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Hero Banner - Subscription Promo */}
      <div className="mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl shadow-lg overflow-hidden text-white"
        >
          <div className="p-6 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-xl font-bold">Sell on Global Marketplaces</h3>
              <p className="mt-2 text-white/90 text-sm max-w-lg">
                Expand your reach by listing your products on Amazon, Flipkart, and more. Connect with millions of customers worldwide.
              </p>
              <Link
                to="/marketplace"
                className="inline-block mt-3 bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors shadow-md"
                aria-label="Explore Marketplaces"
              >
                Explore Marketplaces
              </Link>
            </div>
            <div className="hidden md:flex items-center justify-center">
              <div className="bg-white/20 p-4 rounded-full">
                <GiftIcon className="h-16 w-16 text-white" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Hero Carousel - Upcoming Sales */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Upcoming Sales Events</h2>
          <Link to="/marketplace" className="text-sm text-blue-600 hover:text-blue-700 flex items-center group font-medium">
            View All <ChevronRightIcon className="h-4 w-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
        
        <div className="relative -mx-4">
          <div className="flex overflow-x-auto scrollbar-hide px-4 pb-1 pt-1 no-scrollbar">
            {upcomingSales.map((sale, index) => (
              <motion.div
                key={sale.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className="w-[280px] sm:w-[320px] flex-shrink-0 rounded-xl overflow-hidden shadow-md mr-4 last:mr-0 border border-gray-100"
              >
                <div className="relative h-36">
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 z-10"></div>
                  <img 
                    src={sale.image}
                    alt={sale.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 p-4 z-20 text-white">
                    <h3 className="text-lg font-bold">{sale.title}</h3>
                    <p className="text-white/90 text-sm mt-1">{sale.date}</p>
                  </div>
                </div>
                <div className="p-4 bg-white">
                  <p className="text-gray-600 text-sm line-clamp-2 h-10">{sale.description}</p>
                  <Link 
                    to="/marketplace" 
                    className={`mt-3 w-full py-2 rounded-lg text-white text-sm font-medium bg-gradient-to-r ${sale.color} block text-center shadow-sm hover:shadow transition-all duration-200`}
                  >
                    Register Now
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Featured Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl overflow-hidden shadow-lg"
        >
          <div className="p-6 text-white">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div className="mb-6 md:mb-0 md:pr-6">
                <div className="flex items-center mb-3">
                  <div className="bg-white/20 p-2 rounded-lg mr-3">
                    <LightningBoltIcon className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-xl font-bold">Upgrade to Premium</h2>
                </div>
                <p className="text-white/90 mb-4 text-sm">
                  Get access to unlimited product listings, AI-powered pricing recommendations, 
                  and multi-channel selling capabilities.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/pricing"
                    className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 shadow-md text-center text-sm transition-colors"
                  >
                    View Pricing Plans
                  </Link>
                  <Link
                    to="/profile"
                    className="bg-transparent border border-white text-white px-4 py-2 rounded-lg font-medium hover:bg-white/10 text-center text-sm transition-colors"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="h-24 w-24 rounded-full bg-white/20 flex items-center justify-center">
                  <CurrencyRupeeIcon className="h-12 w-12 text-white" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300"
        >
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-2 rounded-lg mr-3">
                <ChartBarIcon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Trending Products</h3>
            </div>
            <p className="mb-4 text-gray-600 text-sm">
              These product categories are trending this week. Consider expanding your inventory in these areas.
            </p>
            
            <div className="space-y-3">
              {[
                { name: "Home Decor", growth: "+42%" },
                { name: "Smartphone Accessories", growth: "+28%" },
                { name: "Eco-friendly Products", growth: "+16%" },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 hover:bg-blue-50/30 rounded-lg transition-colors">
                  <span className="text-gray-700 font-medium text-sm">{item.name}</span>
                  <span className="text-green-600 text-sm font-medium">{item.growth}</span>
                </div>
              ))}
            </div>
            
            <Link 
              to="/marketplace" 
              className="mt-4 text-blue-600 text-sm font-medium hover:text-blue-700 flex items-center group pt-2 inline-block"
            >
              View All Trends
              <ChevronRightIcon className="h-4 w-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
      
      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6 hover:shadow-md transition-shadow duration-300">
        <div className="p-6">
          <div className="flex items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
            <span className="ml-2 bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded-full font-medium">Live Updates</span>
          </div>
          
          <div className="space-y-3">
            {[
              { time: "10:15 AM", event: "New order received", value: "₹2,450", product: "Handcrafted Wall Hanging" },
              { time: "09:23 AM", event: "Product stock low", value: "2 left", product: "Wooden Tea Coaster Set" },
              { time: "Yesterday", event: "Price suggestion", value: "+₹150", product: "Embroidered Cushion Cover" },
              { time: "Yesterday", event: "New review", value: "★★★★★", product: "Ceramic Dinner Set" },
              { time: "2 days ago", event: "Payment received", value: "₹8,750", product: "Multiple products" },
            ].map((activity, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0 hover:bg-blue-50/30 px-3 rounded-lg transition-colors"
              >
                <div className="flex items-start max-w-[60%]">
                  <div className="h-2 w-2 mt-1.5 rounded-full bg-blue-500 mr-3 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 truncate">{activity.event}</p>
                    <p className="text-xs text-gray-500 mt-0.5 truncate">{activity.product}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{activity.value}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          
          <Link 
            to="/dashboard" 
            className="mt-4 text-blue-600 text-sm font-medium hover:text-blue-700 flex items-center group pt-2 inline-block"
          >
            View All Activity
            <ChevronRightIcon className="h-4 w-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
      
      {/* Subscription CTA - Bottom */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300"
      >
        <div className="p-6 flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-4 md:mb-0 md:mr-6 flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Get Premium Access</h3>
            <p className="text-gray-600 text-sm mb-3">
              Unlock all features and grow your business with our premium plan. Get AI-powered insights, 
              unlimited listings and priority support.
            </p>
            <div className="flex flex-wrap gap-2">
              {["AI Analytics", "Priority Support", "Unlimited Products"].map((feature, i) => (
                <span key={i} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                  {feature}
                </span>
              ))}
            </div>
          </div>
          <div className="flex-shrink-0">
            <Link
              to="/pricing"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow-md text-sm transition-colors"
            >
              View Plans
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;