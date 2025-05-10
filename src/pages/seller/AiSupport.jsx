import React, { useState, useRef, useEffect } from 'react';
import { motion } from "framer-motion";
import { useUser } from "../../context/UserContext";
import { 
  PaperAirplaneIcon,
  MicrophoneIcon,
  PhotographIcon,
  DocumentTextIcon,
  LightBulbIcon,
  ChatIcon,
  ChartBarIcon,
  CogIcon,
  SparklesIcon
} from "@heroicons/react/outline";

const AiSupport = () => {
  const { user } = useUser();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { 
      type: 'assistant', 
      content: 'Hello! I\'m your AI assistant. How can I help you with your business today?',
      timestamp: '11:30 AM'
    }
  ]);
  const [activeCategory, setActiveCategory] = useState('all');
  const messagesEndRef = useRef(null);
  
  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (input.trim() === '') return;
    
    // Add user message
    const newMessages = [...messages, { type: 'user', content: input, timestamp: getCurrentTime() }];
    setMessages(newMessages);
    setInput('');
    
    // Simulate AI response
    setTimeout(() => {
      setMessages([
        ...newMessages,
        { 
          type: 'assistant', 
          content: getAIResponse(input),
          timestamp: getCurrentTime()
        }
      ]);
    }, 1000);
  };

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  };

  const getAIResponse = (question) => {
    const responses = [
      "Based on your store's data, I recommend focusing on home decor items as they're showing 42% higher conversion rates than other categories.",
      "I've analyzed your pricing strategy and noticed your competitors are pricing similar items 15-20% higher. You might have room to increase prices while remaining competitive.",
      "Your inventory shows 5 products below the restock threshold. Would you like me to prepare a purchase order for these items?",
      "I've detected that your store's load time has increased by 30% in the last week. This might be affecting your conversion rate. Let me help you optimize your images.",
      "Looking at your recent reviews, customers frequently mention product quality and fast shipping as positives, but several have noted issues with packaging. Would you like some suggestions to improve this?"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const categories = [
    { id: 'all', name: 'All Topics', icon: <ChatIcon className="h-5 w-5" /> },
    { id: 'sales', name: 'Sales', icon: <ChartBarIcon className="h-5 w-5" /> },
    { id: 'market', name: 'Market Insights', icon: <LightBulbIcon className="h-5 w-5" /> },
    { id: 'settings', name: 'Settings', icon: <CogIcon className="h-5 w-5" /> }
  ];

  const quickQuestions = [
    "How can I improve my product descriptions?",
    "What are the trending products in my category?",
    "How do I optimize my store for mobile users?",
    "What pricing strategy would work best for my products?",
    "Can you analyze my recent sales performance?"
  ];

  return (
    <div className="px-4 py-6 md:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">AI Support Assistant</h1>
        <p className="text-gray-600">Get AI-powered insights and answers for your business</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar - Categories & Quick Questions */}
        <div className="lg:col-span-1 space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition-shadow duration-300"
          >
            <h2 className="text-base font-semibold text-gray-900 mb-4">Categories</h2>
            <div className="space-y-1.5">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`w-full flex items-center px-3 py-2.5 rounded-lg text-sm ${
                    activeCategory === category.id
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-blue-50/50 hover:text-blue-600'
                  } transition-colors duration-200`}
                >
                  <span className={`mr-2.5 ${activeCategory === category.id ? 'text-blue-600' : 'text-gray-500'}`}>
                    {category.icon}
                  </span>
                  {category.name}
                </button>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition-shadow duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-gray-900">Quick Questions</h2>
              <SparklesIcon className="h-5 w-5 text-blue-500" />
            </div>
            <div className="space-y-2">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setInput(question);
                  }}
                  className="w-full text-left p-2.5 rounded-lg text-xs sm:text-sm text-gray-700 hover:bg-blue-50/50 hover:text-blue-600 transition-colors duration-200"
                >
                  {question}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* Chat Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-3 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col h-[600px] hover:shadow-md transition-shadow duration-300"
        >
          {/* Chat Header */}
          <div className="border-b border-gray-100 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <LightBulbIcon className="h-5 w-5 text-blue-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-semibold text-gray-900">Sumimaase AI Assistant</p>
                <p className="text-xs text-green-600">Online</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full font-medium">AI Powered</span>
              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.type === 'assistant' && (
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                    <LightBulbIcon className="h-4 w-4 text-blue-600" />
                  </div>
                )}
                <div 
                  className={`max-w-[80%] sm:max-w-[70%] rounded-2xl px-4 py-3 ${
                    message.type === 'user' 
                      ? 'bg-blue-600 text-white rounded-br-none shadow-sm' 
                      : 'bg-gray-100 text-gray-800 rounded-bl-none shadow-sm'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-right text-xs mt-1 ${
                    message.type === 'user' ? 'text-blue-200' : 'text-gray-500'
                  }`}>
                    {message.timestamp}
                  </p>
                </div>
                {message.type === 'user' && (
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center ml-3 flex-shrink-0">
                    <svg className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input Area */}
          <div className="border-t border-gray-100 p-4">
            <div className="flex items-center bg-gray-50 rounded-full px-4 py-1 shadow-sm border border-gray-200">
              <div className="flex space-x-2 mr-2">
                <button className="text-gray-400 hover:text-blue-600 p-2 rounded-full hover:bg-blue-50 transition-colors">
                  <MicrophoneIcon className="h-5 w-5" />
                </button>
                <button className="text-gray-400 hover:text-blue-600 p-2 rounded-full hover:bg-blue-50 transition-colors">
                  <PhotographIcon className="h-5 w-5" />
                </button>
                <button className="text-gray-400 hover:text-blue-600 p-2 rounded-full hover:bg-blue-50 transition-colors">
                  <DocumentTextIcon className="h-5 w-5" />
                </button>
              </div>
              
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className="flex-1 bg-transparent border-none py-2 text-sm focus:outline-none focus:ring-0 text-gray-700 placeholder-gray-500"
              />
              
              <button
                onClick={handleSend}
                disabled={input.trim() === ''}
                className={`ml-2 h-10 w-10 rounded-full flex items-center justify-center transition-colors ${
                  input.trim() === '' 
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                <PaperAirplaneIcon className="h-5 w-5 transform rotate-90" />
              </button>
            </div>
            <div className="text-center mt-3">
              <p className="text-xs text-gray-500">
                AI responses are generated based on your business data and market trends
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AiSupport;