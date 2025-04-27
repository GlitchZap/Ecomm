import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
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
  const { user, updateUser, updateDateTime } = useUser();
  
  // Update current time if needed (in a real app, this would be done with a timer)
  React.useEffect(() => {
    // This is just a placeholder to demonstrate updating the time
    if (user.dateTime !== "2025-04-27 11:39:56") {
      updateDateTime("2025-04-27 11:39:56");
    }
  }, []);
  
  const upcomingSales = [
    {
      id: 1,
      title: "Diwali Festival Sale",
      description: "Boost your sales during the festival of lights. Register now!",
      date: "Starts Oct 15, 2025",
      image: "https://images.unsplash.com/photo-1593941707882-a56bbc8ba7dc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      color: "from-orange-500 to-amber-500",
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
      icon: <TrendingUpIcon className="h-6 w-6 text-green-500" />,
    },
    {
      title: "Orders Pending",
      value: "8",
      change: "-2",
      positive: true,
      icon: <TagIcon className="h-6 w-6 text-blue-500" />,
    },
    {
      title: "Revenue This Month",
      value: "₹1,24,587",
      change: "+18%",
      positive: true,
      icon: <CashIcon className="h-6 w-6 text-yellow-500" />,
    },
  ];
  
  return (
    <div>
      {/* Welcome Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">
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
        <p className="text-gray-600 mt-1">
          Here's what's happening with your store today
        </p>
      </div>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {quickStats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
          >
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold mt-1 text-gray-800">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <span className={`text-xs font-medium ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </span>
                  <span className="text-xs text-gray-500 ml-1">from yesterday</span>
                </div>
              </div>
              <div className="h-12 w-12 rounded-full bg-gray-50 flex items-center justify-center">
                {stat.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Hero Banner - Subscription Promo */}
      <div className="mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl overflow-hidden shadow-lg"
        >
          <div className="p-6 md:p-8 text-white">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-3">Upgrade to Premium</h2>
                <p className="text-white/80 mb-6 max-w-xl">
                  Get access to unlimited product listings, AI-powered pricing recommendations, 
                  and multi-channel selling capabilities.
                </p>
                <div className="flex items-center space-x-3">
                  <Link 
                    to="/pricing" 
                    className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-white/90 shadow-md"
                  >
                    View Pricing Plans
                  </Link>
                  <Link 
                    to="/profile" 
                    className="text-white border border-white px-6 py-2 rounded-lg font-medium hover:bg-white/10"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="h-32 w-32 rounded-full bg-white/20 flex items-center justify-center">
                  <CurrencyRupeeIcon className="h-16 w-16 text-white" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Hero Carousel - Upcoming Sales */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Upcoming Sales Events</h2>
          <button className="text-sm text-orange-500 hover:text-orange-600 flex items-center">
            View All <ChevronRightIcon className="h-4 w-4 ml-1" />
          </button>
        </div>
        
        <div className="flex overflow-x-auto space-x-4 pb-4 -mx-4 px-4 scrollbar-hide">
          {upcomingSales.map((sale, index) => (
            <motion.div
              key={sale.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="min-w-[280px] md:min-w-[320px] flex-shrink-0 rounded-xl overflow-hidden shadow-md relative"
            >
              <div className="relative h-40">
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 z-10"></div>
                <img 
                  src={sale.image}
                  alt={sale.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 p-4 z-20 text-white">
                  <h3 className="text-xl font-bold">{sale.title}</h3>
                  <p className="text-white/80 text-sm mt-1">{sale.date}</p>
                </div>
              </div>
              <div className="p-4 bg-white">
                <p className="text-gray-600 text-sm">{sale.description}</p>
                <button className={`mt-3 w-full py-2 rounded-lg text-white text-sm font-medium bg-gradient-to-r ${sale.color}`}>
                  Register Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Featured Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl shadow-lg overflow-hidden text-white"
        >
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">Sell on Global Marketplaces</h3>
                <p className="mt-2 text-white/80">
                  Expand your reach by listing your products on Amazon, Flipkart, and more.
                </p>
                <button 
                  onClick={() => navigate('/marketplace')}
                  className="mt-4 bg-white text-orange-500 px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/90"
                >
                  Explore Marketplaces
                </button>
              </div>
              <div className="hidden md:block">
                <GiftIcon className="h-20 w-20 text-white/20" />
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
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-800">Trending Products</h3>
            <p className="mt-1 text-gray-600">
              These product categories are trending this week
            </p>
            
            <div className="mt-4 space-y-3">
              {[
                { name: "Home Decor", growth: "+42%" },
                { name: "Smartphone Accessories", growth: "+28%" },
                { name: "Eco-friendly Products", growth: "+16%" },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700 font-medium">{item.name}</span>
                  <span className="text-green-500 text-sm font-medium">{item.growth}</span>
                </div>
              ))}
            </div>
            
            <button className="mt-4 text-orange-500 text-sm font-medium hover:text-orange-600">
              View All Trends
            </button>
          </div>
        </motion.div>
      </div>
      
      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h3>
          
          <div className="space-y-4">
            {[
              { time: "10:15 AM", event: "New order received", value: "₹2,450", product: "Handcrafted Wall Hanging" },
              { time: "09:23 AM", event: "Product stock low", value: "2 left", product: "Wooden Tea Coaster Set" },
              { time: "Yesterday", event: "Price suggestion", value: "+₹150", product: "Embroidered Cushion Cover" },
              { time: "Yesterday", event: "New review", value: "★★★★★", product: "Ceramic Dinner Set" },
              { time: "2 days ago", event: "Payment received", value: "₹8,750", product: "Multiple products" },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <div className="flex items-start">
                  <div className="h-2 w-2 mt-2 rounded-full bg-orange-500 mr-3"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{activity.event}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.product}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-800">{activity.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          
          <button className="mt-4 text-orange-500 text-sm font-medium hover:text-orange-600">
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
        <div className="p-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="mb-4 md:mb-0 md:mr-8 flex-1">
              <h3 className="text-lg font-bold text-gray-800 mb-2">Get Premium Access</h3>
              <p className="text-gray-600 text-sm mb-4">
                Unlock all features and grow your business with our premium plan. Get AI-powered insights, 
                unlimited listings and priority support.
              </p>
              <div className="flex flex-wrap gap-3">
                {["AI Analytics", "Priority Support", "Unlimited Products"].map((feature, i) => (
                  <span key={i} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Link 
                to="/pricing" 
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium shadow-sm"
              >
                View Plans
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Footer timestamp */}
      <div className="mt-8 text-xs text-center text-gray-400">
        Last updated: {user.dateTime} • User: {user.name}
      </div>
    </div>
  );
};

export default Home;