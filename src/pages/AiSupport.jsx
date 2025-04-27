import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  LightBulbIcon,
  TrendingUpIcon,
  SearchIcon,
  ChartBarIcon,
  CurrencyRupeeIcon,
  PhotographIcon,
  ShoppingCartIcon
} from "@heroicons/react/outline";

const AiSupport = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { 
      role: "ai", 
      content: "Hello! I'm your AI pricing assistant. I can help you optimize your product prices based on market trends and competitor analysis. What would you like to know today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  
  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    // Add user message to chat
    const userMessage = {
      role: "user",
      content: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setChatHistory(prev => [...prev, userMessage]);
    setMessage("");
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        "Based on current market trends, I recommend pricing your handcrafted wooden items between ₹899 and ₹1,299. This price range is competitive while still valuing your craftsmanship.",
        "I've analyzed similar products on major marketplaces. Your competitors are pricing their items at an average of ₹1,150 with a range from ₹899 to ₹1,599.",
        "The optimal price point for your embroidered cushion covers appears to be ₹749. This balances profit margins with market competitiveness.",
        "For festival season sales, consider a 15-20% discount strategy. Data shows this discount range maximizes both sales volume and profit margins.",
        "Your current prices are approximately 12% higher than similar products on Amazon and Flipkart. Consider adjusting to improve competitiveness."
      ];
      
      const aiMessage = {
        role: "ai",
        content: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setChatHistory(prev => [...prev, aiMessage]);
    }, 1000);
  };
  
  const trendingCategories = [
    { name: "Home Decor", growth: "+24%", recommendation: "Increase prices by 8-10%" },
    { name: "Kitchen Accessories", growth: "+18%", recommendation: "Maintain current pricing" },
    { name: "Handcrafted Jewelry", growth: "+15%", recommendation: "Bundle offers recommended" },
    { name: "Traditional Textiles", growth: "+12%", recommendation: "Focus on premium segment" },
    { name: "Eco-friendly Products", growth: "+32%", recommendation: "Increase inventory, maintain pricing" },
  ];
  
  const featureCards = [
    {
      title: "Price Optimization",
      description: "Get AI-powered recommendations for optimal pricing of your products",
      icon: <CurrencyRupeeIcon className="h-6 w-6 text-orange-500" />,
      color: "bg-orange-50",
    },
    {
      title: "Trend Analysis",
      description: "Identify trending products and categories to focus your inventory",
      icon: <TrendingUpIcon className="h-6 w-6 text-blue-500" />,
      color: "bg-blue-50",
    },
    {
      title: "Competitor Tracking",
      description: "Monitor competitor pricing across major marketplaces",
      icon: <SearchIcon className="h-6 w-6 text-green-500" />,
      color: "bg-green-50",
    },
    {
      title: "Seasonal Forecasting",
      description: "Prepare for seasonal demand with predictive insights",
      icon: <ChartBarIcon className="h-6 w-6 text-purple-500" />,
      color: "bg-purple-50",
    },
    {
      title: "Image Optimization",
      description: "Get tips to improve your product images for better conversion",
      icon: <PhotographIcon className="h-6 w-6 text-pink-500" />,
      color: "bg-pink-50",
    },
    {
      title: "Inventory Suggestions",
      description: "Receive smart recommendations for inventory management",
      icon: <ShoppingCartIcon className="h-6 w-6 text-teal-500" />,
      color: "bg-teal-50",
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">AI Support</h1>
        <p className="text-gray-600">Get intelligent insights and price recommendations</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI Chat Section */}
        <div className="lg:col-span-2">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm overflow-hidden h-full flex flex-col"
          >
            <div className="p-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
                  <LightBulbIcon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="font-bold">Price Intelligence Assistant</h2>
                  <p className="text-white/80 text-sm">Online and ready to help</p>
                </div>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ minHeight: "400px" }}>
              {chatHistory.map((msg, index) => (
                <div 
                  key={index} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-2xl p-4 ${
                      msg.role === 'user' 
                        ? 'bg-orange-500 text-white rounded-tr-none' 
                        : 'bg-gray-100 text-gray-800 rounded-tl-none'
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                    <p className={`text-xs mt-1 ${msg.role === 'user' ? 'text-white/70' : 'text-gray-500'}`}>
                      {msg.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t border-gray-200">
              <form onSubmit={handleSendMessage} className="flex items-center">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask about pricing recommendations..."
                  className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button
                  type="submit"
                  className="bg-orange-500 text-white px-4 py-2 rounded-r-lg hover:bg-orange-600"
                >
                  Send
                </button>
              </form>
              <div className="mt-2 flex flex-wrap gap-2">
                {["What's the optimal price for wooden crafts?", "Check competitor prices", "Pricing for festival season"].map((suggestion, i) => (
                  <button
                    key={i}
                    onClick={() => setMessage(suggestion)}
                    className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-full"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Trending Categories & Tools */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm overflow-hidden"
          >
            <div className="p-4 bg-blue-500 text-white">
              <h2 className="font-bold flex items-center">
                <TrendingUpIcon className="h-5 w-5 mr-2" />
                Trending Categories
              </h2>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                {trendingCategories.map((category, index) => (
                  <div key={index} className="flex justify-between pb-2 border-b border-gray-100 last:border-0">
                    <div>
                      <h3 className="text-sm font-medium text-gray-800">{category.name}</h3>
                      <p className="text-xs text-gray-500 mt-1">Recommended: {category.recommendation}</p>
                    </div>
                    <span className="text-sm text-green-500 font-medium">{category.growth}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm overflow-hidden"
          >
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-bold text-gray-800">Market Insights</h2>
            </div>
            <div className="p-4">
              <div className="space-y-2 text-sm">
                <p className="flex items-center text-gray-700">
                  <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
                  Handicraft market is growing at 18% annually
                </p>
                <p className="flex items-center text-gray-700">
                  <span className="h-2 w-2 bg-blue-500 rounded-full mr-2"></span>
                  Average order value increased by ₹240 this month
                </p>
                <p className="flex items-center text-gray-700">
                  <span className="h-2 w-2 bg-orange-500 rounded-full mr-2"></span>
                  Festival season expected to drive 32% higher sales
                </p>
                <p className="flex items-center text-gray-700">
                  <span className="h-2 w-2 bg-purple-500 rounded-full mr-2"></span>
                  Eco-friendly packaging can increase conversions by 12%
                </p>
              </div>
              <button className="mt-4 text-sm text-blue-500 hover:text-blue-600 font-medium">
                View Detailed Report
              </button>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* AI Feature Cards */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">AI-Powered Tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featureCards.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className={`h-12 w-12 rounded-full ${feature.color} flex items-center justify-center mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
                <button className="mt-4 text-sm text-orange-500 hover:text-orange-600 font-medium">
                  Try Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Market Analysis Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 bg-white rounded-xl shadow-sm overflow-hidden"
      >
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Price Comparison Analysis</h2>
          <p className="text-gray-600 mb-6">
            Compare your product prices with competitors across marketplaces
          </p>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Your Avg. Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Market Avg.
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Difference
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Recommendation
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  { category: "Handcrafted Ceramic Items", yourPrice: "₹1,299", marketAvg: "₹1,199", diff: "+8.3%", recommendation: "Consider slight price reduction" },
                  { category: "Wooden Home Decor", yourPrice: "₹899", marketAvg: "₹849", diff: "+5.9%", recommendation: "Price is competitive" },
                  { category: "Embroidered Textiles", yourPrice: "₹749", marketAvg: "₹799", diff: "-6.3%", recommendation: "Increase prices slightly" },
                  { category: "Jute Products", yourPrice: "₹649", marketAvg: "₹599", diff: "+8.3%", recommendation: "Focus on quality messaging" },
                  { category: "Brass Decoratives", yourPrice: "₹1,499", marketAvg: "₹1,699", diff: "-11.8%", recommendation: "Opportunity to increase prices" },
                ].map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{item.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.yourPrice}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.marketAvg}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-medium ${
                        item.diff.startsWith('+') ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {item.diff}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{item.recommendation}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 text-center">
            <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 font-medium">
              Generate Full Analysis Report
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AiSupport;