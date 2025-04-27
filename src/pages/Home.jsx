import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChevronRightIcon } from "@heroicons/react/solid";
import { 
  TrendingUpIcon, 
  CashIcon, 
  TagIcon,
  GiftIcon,
  CurrencyRupeeIcon
} from "@heroicons/react/outline";
import { useUser } from "../context/UserContext";

const Home = () => {
  const navigate = useNavigate();
  const { user, updateDateTime } = useUser();
  
  // Update current time
  React.useEffect(() => {
    updateDateTime("2025-04-27 20:10:03");
  }, [updateDateTime]);
  
  const upcomingSales = [
    {
      id: 1,
      title: "Diwali Festival Sale",
      description: "Boost your sales during the festival of lights. Register now!",
      date: "Starts Oct 15, 2025",
      image: "https://images.unsplash.com/photo-1593941707882-a56bbc8ba7dc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      color: "from-gray-600 to-gray-700",
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

  // Navigation handler
  const handleNavigation = (path, e) => {
    if (e) e.preventDefault();
    navigate(path);
  };
  
  return (
    <div>
      {/* Welcome Section */}
      <div className="mb-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center">
          <h1 className="text-xl font-bold text-gray-800 mb-1 sm:mb-0">
            Welcome back, {user.name}!
          </h1>
          <p className="text-sm text-gray-500">
            Today is {new Date(user.dateTime).toLocaleDateString('en-US', { 
              month: 'long', 
              day: 'numeric', 
              year: 'numeric' 
            })}
          </p>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          Here's what's happening with your store today
        </p>
      </div>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        {quickStats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm p-3 border border-gray-100"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-medium text-gray-500">{stat.title}</p>
                <p className="text-base font-bold mt-0.5 text-gray-800">{stat.value}</p>
                <div className="flex items-center mt-0.5">
                  <span className={`text-xs font-medium ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </span>
                  <span className="text-xs text-gray-500 ml-1">from yesterday</span>
                </div>
              </div>
              <div className="h-8 w-8 rounded-full bg-gray-50 flex items-center justify-center">
                {stat.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Hero Banner - Subscription Promo */}
      <div className="mb-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-gray-600 to-gray-700 rounded-xl shadow-lg overflow-hidden text-white"
        >
          <div className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-base font-bold">Sell on Global Marketplaces</h3>
                <p className="mt-1 text-white/80 text-xs">
                  Expand your reach by listing your products on Amazon, Flipkart, and more.
                </p>
                <button 
                  onClick={(e) => handleNavigation('/marketplace', e)}
                  className="mt-2 bg-white text-gray-700 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-white/90"
                >
                  Explore Marketplaces
                </button>
              </div>
              <div className="hidden md:block">
                <GiftIcon className="h-16 w-16 text-white/20" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Hero Carousel - Upcoming Sales */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold text-gray-800">Upcoming Sales Events</h2>
          <button className="text-xs text-gray-600 hover:text-gray-800 flex items-center">
            View All <ChevronRightIcon className="h-3 w-3 ml-1" />
          </button>
        </div>
        
        <div className="relative -mx-4">
          <div className="flex overflow-x-auto scrollbar-hide px-4 pb-1 pt-1 no-scrollbar">
            {upcomingSales.map((sale, index) => (
              <motion.div
                key={sale.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className="w-[200px] sm:w-[240px] flex-shrink-0 rounded-xl overflow-hidden shadow-md mr-3 last:mr-0"
              >
                <div className="relative h-28">
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 z-10"></div>
                  <img 
                    src={sale.image}
                    alt={sale.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 p-3 z-20 text-white">
                    <h3 className="text-base font-bold">{sale.title}</h3>
                    <p className="text-white/80 text-xs mt-0.5">{sale.date}</p>
                  </div>
                </div>
                <div className="p-3 bg-white">
                  <p className="text-gray-600 text-xs line-clamp-2 h-9">{sale.description}</p>
                  <button className={`mt-2 w-full py-1.5 rounded-lg text-white text-xs font-medium bg-gradient-to-r ${sale.color}`}>
                    Register Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Featured Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-gray-600 to-gray-800 rounded-xl overflow-hidden shadow-lg"
        >
          <div className="p-4 text-white">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div className="mb-4 md:mb-0 md:pr-6">
                <h2 className="text-lg font-bold mb-2">Upgrade to Premium</h2>
                <p className="text-white/80 mb-3 text-sm">
                  Get access to unlimited product listings, AI-powered pricing recommendations, 
                  and multi-channel selling capabilities.
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <button 
                    onClick={(e) => handleNavigation('/pricing', e)}
                    className="bg-white text-gray-700 px-3 py-1.5 rounded-lg font-medium hover:bg-white/90 shadow-md text-center text-sm"
                  >
                    View Pricing Plans
                  </button>
                  <button 
                    onClick={(e) => handleNavigation('/profile', e)}
                    className="bg-transparent border border-white text-white px-3 py-1.5 rounded-lg font-medium hover:bg-white/10 text-center text-sm"
                  >
                    Learn More
                  </button>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="h-20 w-20 rounded-full bg-white/20 flex items-center justify-center">
                  <CurrencyRupeeIcon className="h-10 w-10 text-white" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
        >
          <div className="p-4">
            <h3 className="text-base font-bold text-gray-800">Trending Products</h3>
            <p className="mt-1 text-gray-600 text-xs">
              These product categories are trending this week
            </p>
            
            <div className="mt-2 space-y-2">
              {[
                { name: "Home Decor", growth: "+42%" },
                { name: "Smartphone Accessories", growth: "+28%" },
                { name: "Eco-friendly Products", growth: "+16%" },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <span className="text-gray-700 font-medium text-xs">{item.name}</span>
                  <span className="text-green-500 text-xs font-medium">{item.growth}</span>
                </div>
              ))}
            </div>
            
            <button className="mt-2 text-gray-600 text-xs font-medium hover:text-gray-800">
              View All Trends
            </button>
          </div>
        </motion.div>
      </div>
      
      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-4">
        <div className="p-4">
          <h3 className="text-base font-bold text-gray-800 mb-3">Recent Activity</h3>
          
          <div className="space-y-2">
            {[
              { time: "10:15 AM", event: "New order received", value: "₹2,450", product: "Handcrafted Wall Hanging" },
              { time: "09:23 AM", event: "Product stock low", value: "2 left", product: "Wooden Tea Coaster Set" },
              { time: "Yesterday", event: "Price suggestion", value: "+₹150", product: "Embroidered Cushion Cover" },
              { time: "Yesterday", event: "New review", value: "★★★★★", product: "Ceramic Dinner Set" },
              { time: "2 days ago", event: "Payment received", value: "₹8,750", product: "Multiple products" },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div className="flex items-start max-w-[60%]">
                  <div className="h-2 w-2 mt-1.5 rounded-full bg-gray-500 mr-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-xs font-medium text-gray-800 truncate">{activity.event}</p>
                    <p className="text-[10px] text-gray-500 mt-0.5 truncate">{activity.product}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-medium text-gray-800">{activity.value}</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          
          <button className="mt-2 text-gray-600 text-xs font-medium hover:text-gray-800">
            View All Activity
          </button>
        </div>
      </div>
      
      {/* Subscription CTA - Bottom */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div className="p-4">
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="mb-3 md:mb-0 md:mr-6 flex-1">
              <h3 className="text-base font-bold text-gray-800 mb-1">Get Premium Access</h3>
              <p className="text-gray-600 text-xs mb-2">
                Unlock all features and grow your business with our premium plan. Get AI-powered insights, 
                unlimited listings and priority support.
              </p>
              <div className="flex flex-wrap gap-1.5">
                {["AI Analytics", "Priority Support", "Unlimited Products"].map((feature, i) => (
                  <span key={i} className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-[10px] font-medium">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <button
                onClick={(e) => handleNavigation('/pricing', e)}
                className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1.5 rounded-lg font-medium shadow-sm text-xs"
              >
                View Plans
              </button>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Footer timestamp */}
      <div className="mt-4 text-[10px] text-center text-gray-400">
        Last updated: {user.dateTime} • User: {user.name}
      </div>
    </div>
  );
};

export default Home;