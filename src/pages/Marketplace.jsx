import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  ShoppingBagIcon, 
  GlobeIcon, 
  ChartBarIcon, 
  TagIcon,
  ShieldCheckIcon
} from "@heroicons/react/outline";
import { CURRENT_DATE_TIME, CURRENT_USER } from "../utils/constants";

const Marketplace = () => {
  const globalPlatforms = [
    {
      id: 1,
      name: "Amazon",
      logo: "https://i.imgur.com/yGJVKCp.png",
      description: "Reach millions of customers worldwide with the largest online marketplace",
      benefits: ["Access to 300M+ customers", "Reliable fulfillment network", "Prime member targeting"],
      commission: "8-15%",
      setupTime: "1-2 weeks",
      color: "from-amber-500 to-yellow-400",
    },
    {
      id: 2,
      name: "Flipkart",
      logo: "https://i.imgur.com/ISL95FM.png",
      description: "India's most popular e-commerce platform with nationwide reach",
      benefits: ["Strong presence in tier 2-3 cities", "Dedicated account manager", "Festival sale events"],
      commission: "5-12%",
      setupTime: "3-7 days",
      color: "from-blue-500 to-blue-400",
    },
    {
      id: 3,
      name: "Meesho",
      logo: "https://i.imgur.com/XC6Jm0U.png",
      description: "Connect with resellers and reach customers in every corner of India",
      benefits: ["Zero commission model", "Social commerce focus", "Small town penetration"],
      commission: "0%",
      setupTime: "1-3 days",
      color: "from-pink-500 to-fuchsia-400",
    },
    {
      id: 4,
      name: "Shopify",
      logo: "https://i.imgur.com/qOe4MjN.png",
      description: "Build your own branded online store with complete customization",
      benefits: ["Full brand control", "Custom domain", "Multiple payment options"],
      commission: "Flat monthly fee",
      setupTime: "1-2 weeks",
      color: "from-green-500 to-emerald-400",
    },
  ];

  const features = [
    {
      title: "Multi-Channel Management",
      description: "Manage all your marketplace listings from a single dashboard",
      icon: <ShoppingBagIcon className="h-6 w-6" />,
    },
    {
      title: "Global Reach",
      description: "Expand your business to international customers easily",
      icon: <GlobeIcon className="h-6 w-6" />,
    },
    {
      title: "Sales Analytics",
      description: "Track performance across all marketplaces in real-time",
      icon: <ChartBarIcon className="h-6 w-6" />,
    },
    {
      title: "Automated Pricing",
      description: "Optimize your prices based on competitor analysis",
      icon: <TagIcon className="h-6 w-6" />,
    },
    {
      title: "Secure Integration",
      description: "Your store and customer data are always protected",
      icon: <ShieldCheckIcon className="h-6 w-6" />,
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl overflow-hidden mb-8"
      >
        <div className="max-w-4xl mx-auto px-6 py-12 text-white">
          <h1 className="text-3xl font-bold mb-4">Expand Your Reach with Global Marketplaces</h1>
          <p className="text-white/80 text-lg mb-6">
            List your products on multiple platforms and reach millions of potential customers
            with just a few clicks. No technical setup required!
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/pricing" className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-blue-50">
              Get Started
            </Link>
            <button className="bg-transparent border border-white text-white px-6 py-2 rounded-lg font-medium hover:bg-white/10">
              Learn More
            </button>
          </div>
        </div>
      </motion.div>

      {/* Two Options Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-full"
        >
          <div className="p-6">
            <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <ShoppingBagIcon className="h-6 w-6 text-blue-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Sell on Sumimaase</h3>
            <p className="text-gray-600 mb-4">
              List your products directly on our marketplace and reach local customers with zero commission fees.
            </p>
            <ul className="space-y-2 mb-6">
              {[
                "No commission fees",
                "Instant setup",
                "Local customer base",
                "Easy inventory management",
                "Mobile-first approach",
              ].map((benefit, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {benefit}
                </li>
              ))}
            </ul>
            <Link to="/pricing" className="block w-full text-center py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
              Start Selling on Sumimaase
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-full"
        >
          <div className="p-6">
            <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <GlobeIcon className="h-6 w-6 text-blue-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Sell Globally</h3>
            <p className="text-gray-600 mb-4">
              Expand your business internationally by listing your products on major e-commerce platforms.
            </p>
            <ul className="space-y-2 mb-6">
              {[
                "Access to millions of customers",
                "Single dashboard for all platforms",
                "Automated order management",
                "Multi-currency support",
                "International shipping assistance",
              ].map((benefit, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {benefit}
                </li>
              ))}
            </ul>
            <Link to="/pricing" className="block w-full text-center py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
              Explore Global Marketplaces
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Global Marketplaces */}
      <div className="mb-10">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Global Marketplace Integrations</h2>
          <p className="text-gray-600">
            Connect your products to these popular marketplaces with our one-click integration
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {globalPlatforms.map((platform, index) => (
            <motion.div
              key={platform.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className={`h-3 bg-gradient-to-r ${platform.color}`}></div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <img src={platform.logo} alt={platform.name} className="h-10 w-10 mr-3" />
                  <h3 className="text-xl font-bold text-gray-800">{platform.name}</h3>
                </div>
                
                <p className="text-gray-600 mb-4">{platform.description}</p>
                
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Key Benefits:</h4>
                  <ul className="space-y-1">
                    {platform.benefits.map((benefit, i) => (
                      <li key={i} className="text-sm text-gray-600 flex items-start">
                        <svg className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex justify-between text-sm mb-4">
                  <div>
                    <span className="font-medium text-gray-700">Commission:</span>
                    <span className="ml-2 text-gray-600">{platform.commission}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Setup Time:</span>
                    <span className="ml-2 text-gray-600">{platform.setupTime}</span>
                  </div>
                </div>
                
                <Link to="/pricing" className={`block w-full text-center py-2 rounded-lg text-white font-medium bg-gradient-to-r ${platform.color}`}>
                  Connect with {platform.name}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 rounded-xl p-8 mb-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Why Sell Through Our Platform?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our marketplace integration offers powerful tools to help you grow your business
            and reach customers everywhere
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-sm"
            >
              <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-r from-blue-800 to-indigo-900 rounded-xl overflow-hidden mb-8"
      >
        <div className="max-w-4xl mx-auto px-6 py-12 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to expand your business?</h2>
          <p className="text-white/80 text-lg mb-6 max-w-xl mx-auto">
            Join thousands of sellers who have grown their business by 3x in just 6 months
            with our marketplace integrations
          </p>
          <Link to="/pricing" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-50">
            Get Started Now
          </Link>
        </div>
      </motion.div>
      
      {/* Hidden timestamp for reference */}
      <div className="hidden">{CURRENT_DATE_TIME} - {CURRENT_USER}</div>
    </div>
  );
};

export default Marketplace;