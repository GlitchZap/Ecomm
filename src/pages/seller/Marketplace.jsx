import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  ShoppingBagIcon, 
  GlobeIcon, 
  ChartBarIcon, 
  TagIcon,
  ShieldCheckIcon,
  ChevronRightIcon
} from "@heroicons/react/outline";
import { CURRENT_DATE_TIME, CURRENT_USER } from "../../utils/constants";

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
      icon: <ShoppingBagIcon className="h-6 w-6 text-blue-600" />,
    },
    {
      title: "Global Reach",
      description: "Expand your business to international customers easily",
      icon: <GlobeIcon className="h-6 w-6 text-blue-600" />,
    },
    {
      title: "Sales Analytics",
      description: "Track performance across all marketplaces in real-time",
      icon: <ChartBarIcon className="h-6 w-6 text-blue-600" />,
    },
    {
      title: "Automated Pricing",
      description: "Optimize your prices based on competitor analysis",
      icon: <TagIcon className="h-6 w-6 text-blue-600" />,
    },
    {
      title: "Secure Integration",
      description: "Your store and customer data are always protected",
      icon: <ShieldCheckIcon className="h-6 w-6 text-blue-600" />,
    },
  ];

  return (
    <div className="px-4 py-6 md:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl overflow-hidden mb-8 shadow-lg"
      >
        <div className="max-w-4xl mx-auto px-6 py-12 text-white">
          <h1 className="text-2xl md:text-3xl font-bold mb-4">Expand Your Reach with Global Marketplaces</h1>
          <p className="text-white/90 text-md md:text-lg mb-6">
            List your products on multiple platforms and reach millions of potential customers
            with just a few clicks. No technical setup required!
          </p>
          <div className="flex flex-wrap gap-4">
            <Link 
              to="/pricing" 
              className="bg-white text-blue-600 px-6 py-2.5 rounded-lg font-medium hover:bg-blue-50 transition-colors shadow-md"
            >
              Get Started
            </Link>
            <button 
              className="bg-transparent border border-white text-white px-6 py-2.5 rounded-lg font-medium hover:bg-white/10 transition-colors"
            >
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
          className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-full hover:shadow-md transition-shadow duration-300"
        >
          <div className="p-6">
            <div className="h-14 w-14 bg-blue-100 rounded-full flex items-center justify-center mb-5">
              <ShoppingBagIcon className="h-7 w-7 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Sell on Sumimaase</h3>
            <p className="text-gray-600 mb-5 text-sm">
              List your products directly on our marketplace and reach local customers with zero commission fees.
            </p>
            <ul className="space-y-3 mb-6">
              {[
                "No commission fees",
                "Instant setup",
                "Local customer base",
                "Easy inventory management",
                "Mobile-first approach",
              ].map((benefit, index) => (
                <li key={index} className="flex items-center text-sm text-gray-700">
                  <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {benefit}
                </li>
              ))}
            </ul>
            <Link 
              to="/pricing" 
              className="block w-full text-center py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm"
            >
              Start Selling on Sumimaase
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-full hover:shadow-md transition-shadow duration-300"
        >
          <div className="p-6">
            <div className="h-14 w-14 bg-blue-100 rounded-full flex items-center justify-center mb-5">
              <GlobeIcon className="h-7 w-7 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Sell Globally</h3>
            <p className="text-gray-600 mb-5 text-sm">
              Expand your business internationally by listing your products on major e-commerce platforms.
            </p>
            <ul className="space-y-3 mb-6">
              {[
                "Access to millions of customers",
                "Single dashboard for all platforms",
                "Automated order management",
                "Multi-currency support",
                "International shipping assistance",
              ].map((benefit, index) => (
                <li key={index} className="flex items-center text-sm text-gray-700">
                  <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {benefit}
                </li>
              ))}
            </ul>
            <Link 
              to="/pricing" 
              className="block w-full text-center py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm"
            >
              Explore Global Marketplaces
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Global Marketplaces */}
      <div className="mb-12">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Global Marketplace Integrations</h2>
          <p className="text-gray-600 text-md">
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
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              <div className={`h-3 bg-gradient-to-r ${platform.color}`}></div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <img src={platform.logo} alt={platform.name} className="h-12 w-12 mr-3 rounded-lg shadow-sm" />
                  <h3 className="text-xl font-bold text-gray-900">{platform.name}</h3>
                </div>
                
                <p className="text-gray-600 mb-5 text-sm">{platform.description}</p>
                
                <div className="mb-5">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Key Benefits:</h4>
                  <ul className="space-y-2">
                    {platform.benefits.map((benefit, i) => (
                      <li key={i} className="text-sm text-gray-700 flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex justify-between text-sm mb-5 bg-gray-50 p-3 rounded-lg">
                  <div>
                    <span className="font-medium text-gray-700">Commission:</span>
                    <span className="ml-2 text-gray-600">{platform.commission}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Setup Time:</span>
                    <span className="ml-2 text-gray-600">{platform.setupTime}</span>
                  </div>
                </div>
                
                <Link 
                  to="/pricing" 
                  className={`flex items-center justify-center w-full text-center py-2.5 rounded-lg text-white font-medium bg-gradient-to-r ${platform.color} hover:shadow-md transition-all`}
                >
                  Connect with {platform.name}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-blue-50 rounded-xl p-8 mb-10 shadow-sm">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Why Sell Through Our Platform?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-md">
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
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="h-14 w-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl overflow-hidden mb-8 shadow-lg"
      >
        <div className="max-w-4xl mx-auto px-6 py-12 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to expand your business?</h2>
          <p className="text-white/90 text-md md:text-lg mb-6 max-w-xl mx-auto">
            Join thousands of sellers who have grown their business by 3x in just 6 months
            with our marketplace integrations
          </p>
          <Link 
            to="/pricing" 
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors inline-flex items-center shadow-md group"
          >
            Get Started Now
            <ChevronRightIcon className="h-5 w-5 ml-2 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </motion.div>
      
      {/* Hidden timestamp for reference */}
      <div className="hidden">{CURRENT_DATE_TIME} - {CURRENT_USER}</div>
    </div>
  );
};

export default Marketplace;