import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckIcon, XIcon } from "@heroicons/react/solid";
import { LightningBoltIcon, ShieldCheckIcon, ChartBarIcon } from "@heroicons/react/outline";

const Pricing = () => {
  const [billingPeriod, setBillingPeriod] = useState("yearly"); // yearly or monthly
  
  const pricingPlans = [
    {
      name: "Basic",
      description: "Perfect for small sellers just starting out",
      monthlyPrice: 599,
      yearlyPrice: 5990,
      savePercent: 17,
      color: "bg-blue-500",
      gradient: "from-blue-500 to-blue-600",
      popular: false,
      features: [
        { name: "Up to 50 product listings", included: true },
        { name: "VendorHub store", included: true },
        { name: "Basic analytics dashboard", included: true },
        { name: "Email support", included: true },
        { name: "Single marketplace integration", included: true },
        { name: "Basic pricing recommendations", included: true },
        { name: "Multi-channel selling", included: false },
        { name: "AI trend analysis", included: false },
        { name: "Dedicated account manager", included: false },
        { name: "White-label storefront", included: false },
      ],
    },
    {
      name: "Premium",
      description: "Full-featured plan for growing businesses",
      monthlyPrice: 1499,
      yearlyPrice: 14990,
      savePercent: 17,
      color: "bg-orange-500",
      gradient: "from-orange-500 to-amber-500",
      popular: true,
      features: [
        { name: "Unlimited product listings", included: true },
        { name: "VendorHub store", included: true },
        { name: "Advanced analytics dashboard", included: true },
        { name: "Priority email & chat support", included: true },
        { name: "Multiple marketplace integrations", included: true },
        { name: "AI pricing recommendations", included: true },
        { name: "Multi-channel selling", included: true },
        { name: "AI trend analysis", included: true },
        { name: "Dedicated account manager", included: true },
        { name: "White-label storefront", included: true },
      ],
    },
  ];
  
  const features = [
    {
      name: "Global Marketplace Access",
      description: "Sell your products on international platforms like Amazon, Flipkart, and more with seamless integration.",
      icon: <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    },
    {
      name: "Advanced Analytics",
      description: "Get deep insights into your sales, customer behavior, and product performance with our powerful analytics tools.",
      icon: <ChartBarIcon className="h-6 w-6 text-orange-500" />
    },
    {
      name: "AI-Powered Recommendations",
      description: "Our AI engine analyzes market trends and competitor pricing to suggest optimal pricing strategies for maximum profit.",
      icon: <LightningBoltIcon className="h-6 w-6 text-purple-500" />
    },
    {
      name: "Secure Payments",
      description: "Industry-leading security measures protect your transactions and customer data with end-to-end encryption.",
      icon: <ShieldCheckIcon className="h-6 w-6 text-green-500" />
    }
  ];
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Our Plans</h1>
        <p className="text-gray-600">Choose the perfect plan for your business needs</p>
      </div>
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-orange-500 via-amber-500 to-orange-400 rounded-xl overflow-hidden mb-12">
        <div className="max-w-4xl mx-auto px-6 py-12 text-white text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Start Selling Worldwide Today
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto"
          >
            Unlock the power of global marketplaces with VendorHub's seller platform. Simple pricing, powerful features.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <a 
              href="#pricing-plans" 
              className="bg-white text-orange-500 px-8 py-3 rounded-lg font-medium hover:bg-white/90 shadow-md"
            >
              View Plans
            </a>
          </motion.div>
        </div>
      </div>
      
      {/* Billing Toggle */}
      <div id="pricing-plans" className="flex justify-center mb-8">
        <div className="bg-white p-1 rounded-lg shadow-sm inline-flex">
          <button
            onClick={() => setBillingPeriod("monthly")}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              billingPeriod === "monthly"
                ? "bg-orange-500 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setBillingPeriod("yearly")}
            className={`px-4 py-2 text-sm font-medium rounded-md flex items-center ${
              billingPeriod === "yearly"
                ? "bg-orange-500 text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Yearly Billing
            <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
              Save 17%
            </span>
          </button>
        </div>
      </div>
      
      {/* Pricing Cards */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {pricingPlans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-white rounded-xl shadow-lg overflow-hidden ${
              plan.popular ? 'ring-4 ring-orange-500/30' : ''
            }`}
          >
            {/* Plan header */}
            <div className={`bg-gradient-to-r ${plan.gradient} p-6 text-white relative overflow-hidden`}>
              {plan.popular && (
                <div className="absolute top-0 right-0">
                  <div className="bg-white text-orange-500 text-xs font-bold px-3 py-1 rounded-bl-lg shadow-md">
                    MOST POPULAR
                  </div>
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="opacity-80 mb-4">{plan.description}</p>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold">₹</span>
                <span className="text-5xl font-bold tracking-tight">
                  {billingPeriod === "monthly" ? plan.monthlyPrice : Math.round(plan.yearlyPrice / 12)}
                </span>
                <span className="ml-2 text-base opacity-80">/month</span>
              </div>
              {billingPeriod === "yearly" && (
                <p className="mt-2 text-sm opacity-80">
                  Billed as ₹{plan.yearlyPrice} per year
                </p>
              )}
            </div>
            
            {/* Plan features */}
            <div className="p-6">
              <h4 className="font-medium text-gray-800 mb-4">What's included:</h4>
              <ul className="space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    {feature.included ? (
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    ) : (
                      <XIcon className="h-5 w-5 text-gray-300 mr-2 flex-shrink-0 mt-0.5" />
                    )}
                    <span className={feature.included ? 'text-gray-700' : 'text-gray-400'}>
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>
              
              <button className={`w-full mt-8 py-3 rounded-lg font-medium text-white bg-gradient-to-r ${plan.gradient} hover:opacity-90 shadow-md`}>
                {plan.popular ? 'Get Started Now' : 'Start Free Trial'}
              </button>
              
              <p className="mt-3 text-xs text-center text-gray-500">
                No credit card required. 14-day free trial.
              </p>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Features Section */}
      <div className="bg-white rounded-xl shadow-sm p-8 mb-12">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Everything You Need to Succeed Online</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our platform provides all the tools and features you need to start and grow your online business, from marketplace integrations to AI-powered analytics.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start"
            >
              <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mr-4 flex-shrink-0">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.name}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* FAQ */}
      <div className="bg-white rounded-xl shadow-sm p-8 mb-12">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Frequently Asked Questions</h2>
          <p className="text-gray-600">Everything you need to know about our platform</p>
        </div>
        
        <div className="max-w-3xl mx-auto space-y-6">
          {[
            {
              question: "Can I upgrade or downgrade my plan later?",
              answer: "Yes, you can upgrade or downgrade your plan at any time. When upgrading, you'll be prorated for the remainder of your billing cycle. When downgrading, the changes will take effect at the start of your next billing cycle."
            },
            {
              question: "How does the 14-day free trial work?",
              answer: "You can try any plan for 14 days without providing a credit card. At the end of the trial, you can choose to subscribe or your account will be automatically downgraded to a limited free version."
            },
            {
              question: "Which marketplaces can I integrate with?",
              answer: "Our Premium plan supports integrations with Amazon, Flipkart, Meesho, Shopify, WooCommerce, Magento, and more. The Basic plan allows integration with one marketplace of your choice."
            },
            {
              question: "Do you offer custom enterprise solutions?",
              answer: "Yes, for businesses with specific needs or higher volume requirements, we offer custom enterprise solutions. Please contact our sales team for more information."
            },
          ].map((item, index) => (
            <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
              <h3 className="text-lg font-medium text-gray-900 mb-2">{item.question}</h3>
              <p className="text-gray-600">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl overflow-hidden"
      >
        <div className="max-w-4xl mx-auto px-6 py-16 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to grow your business?</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of sellers who have transformed their business with our platform. Start your free trial today!
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-white/90 shadow-lg">
              Start Free Trial
            </button>
            <button className="bg-transparent border border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white/10">
              Contact Sales
            </button>
          </div>
          <p className="mt-6 text-sm text-white/70">
            No credit card required • Cancel anytime • 24/7 customer support
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Pricing;