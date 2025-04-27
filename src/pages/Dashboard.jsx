import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  ChartBarIcon,
  TrendingUpIcon, 
  CashIcon, 
  ShoppingBagIcon,
  UserIcon,
  ViewListIcon,
  EyeIcon
} from "@heroicons/react/outline";

// Mock data for charts
const generateSalesData = (days) => {
  const data = [];
  const today = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      amount: Math.floor(Math.random() * 15000) + 5000,
      orders: Math.floor(Math.random() * 20) + 5,
    });
  }
  
  return data;
};

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState("7days");
  const [chartData, setChartData] = useState(() => generateSalesData(7));
  
  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
    
    const days = range === "24hr" ? 1 : 
                 range === "7days" ? 7 : 
                 range === "30days" ? 30 :
                 range === "6months" ? 180 : 365;
                 
    setChartData(generateSalesData(days));
  };
  
  const topSellingProducts = [
    { id: 1, name: "Handmade Ceramic Mug", sold: 128, revenue: "₹25,600", growth: "+24%" },
    { id: 2, name: "Wooden Tea Coaster Set", sold: 96, revenue: "₹19,200", growth: "+18%" },
    { id: 3, name: "Embroidered Cushion Cover", sold: 84, revenue: "₹12,600", growth: "+12%" },
    { id: 4, name: "Jute Table Runner", sold: 72, revenue: "₹10,800", growth: "+8%" },
    { id: 5, name: "Brass Decorative Item", sold: 65, revenue: "₹32,500", growth: "+5%" },
  ];
  
  const performanceMetrics = [
    { name: "Total Sales", value: "₹1,24,580", change: "+18%", positive: true, icon: <CashIcon className="h-6 w-6 text-green-500" /> },
    { name: "Total Orders", value: "642", change: "+12%", positive: true, icon: <ShoppingBagIcon className="h-6 w-6 text-blue-500" /> },
    { name: "Active Customers", value: "384", change: "+24%", positive: true, icon: <UserIcon className="h-6 w-6 text-purple-500" /> },
    { name: "Average Order Value", value: "₹1,940", change: "+5%", positive: true, icon: <TrendingUpIcon className="h-6 w-6 text-orange-500" /> },
    { name: "Product Views", value: "12,458", change: "+32%", positive: true, icon: <EyeIcon className="h-6 w-6 text-teal-500" /> },
    { name: "Conversion Rate", value: "5.2%", change: "+0.8%", positive: true, icon: <ChartBarIcon className="h-6 w-6 text-amber-500" /> },
  ];
  
  // Calculate max value for chart scaling
  const maxSales = Math.max(...chartData.map(item => item.amount));
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">Track your performance and sales metrics</p>
      </div>
      
      {/* Time Range Filter */}
      <div className="bg-white p-4 rounded-xl shadow-sm mb-6 flex flex-wrap items-center justify-between">
        <div className="flex items-center mb-2 md:mb-0">
          <span className="text-gray-700 font-medium mr-3">Time Range:</span>
          <div className="flex space-x-2">
            {[
              { id: "24hr", label: "24 Hours" },
              { id: "7days", label: "7 Days" },
              { id: "30days", label: "30 Days" },
              { id: "6months", label: "6 Months" },
              { id: "all", label: "All Time" },
            ].map((range) => (
              <button
                key={range.id}
                onClick={() => handleTimeRangeChange(range.id)}
                className={`px-3 py-1 text-sm rounded-md ${
                  timeRange === range.id
                    ? "bg-orange-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center">
          <span className="text-sm text-gray-500">Last updated: April 27, 2025, 09:30:30 UTC</span>
        </div>
      </div>
      
      {/* Sales Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-xl shadow-sm mb-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-gray-800">Sales Overview</h2>
          <div className="text-sm font-medium text-green-500">+18% from previous period</div>
        </div>
        
        {/* Chart representation */}
        <div className="h-80">
          <div className="h-full flex items-end space-x-2">
            {chartData.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-gradient-to-t from-orange-500 to-amber-400 rounded-t-md relative group"
                  style={{ height: `${(item.amount / maxSales) * 100}%` }}
                >
                  {/* Tooltip */}
                  <div className="absolute inset-x-0 -top-16 hidden group-hover:block">
                    <div className="bg-gray-800 text-white text-xs py-1 px-2 rounded shadow-lg mx-auto w-max">
                      <div className="font-medium">₹{item.amount.toLocaleString()}</div>
                      <div className="text-white/80">{item.orders} orders</div>
                    </div>
                    <div className="w-2 h-2 bg-gray-800 transform rotate-45 mx-auto -mt-1"></div>
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-2">{item.date}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
      
      {/* Performance Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {performanceMetrics.map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-xl p-6 shadow-sm"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-gray-500 text-sm font-medium">{metric.name}</h3>
                <p className="text-2xl font-bold text-gray-800 mt-1">{metric.value}</p>
                <div className="flex items-center mt-2">
                  <span className={`text-xs font-medium ${metric.positive ? 'text-green-600' : 'text-red-600'}`}>
                    {metric.change}
                  </span>
                  <span className="text-xs text-gray-500 ml-1">from previous period</span>
                </div>
              </div>
              <div className="h-10 w-10 rounded-full bg-gray-50 flex items-center justify-center">
                {metric.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Top Selling Products */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm overflow-hidden mb-6"
      >
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-800">Top Selling Products</h2>
          <p className="text-gray-600 text-sm mt-1">Your best performing products in this period</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Units Sold
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Growth
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {topSellingProducts.map((product, index) => (
                <tr key={product.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{product.sold}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{product.revenue}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {product.growth}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-gray-100 bg-gray-50">
          <a href="#" className="text-sm text-orange-500 hover:text-orange-600 font-medium">
            View All Products
          </a>
        </div>
      </motion.div>
      
      {/* Orders and Revenue by Platform */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm p-6 mb-6"
      >
        <h2 className="text-lg font-bold text-gray-800 mb-6">Revenue by Platform</h2>
        
        <div className="space-y-4">
          {[
            { name: "VendorHub", percentage: 40, amount: "₹49,832", color: "bg-orange-500" },
            { name: "Amazon", percentage: 30, amount: "₹37,374", color: "bg-amber-500" },
            { name: "Flipkart", percentage: 20, amount: "₹24,916", color: "bg-blue-500" },
            { name: "Meesho", percentage: 10, amount: "₹12,458", color: "bg-pink-500" },
          ].map((platform) => (
            <div key={platform.name}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">{platform.name}</span>
                <span className="text-sm text-gray-600">{platform.amount} ({platform.percentage}%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${platform.color}`}
                  style={{ width: `${platform.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
      
      {/* Recent Orders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm mb-6 overflow-hidden"
      >
        <div className="p-6 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold text-gray-800">Recent Orders</h2>
              <p className="text-gray-600 text-sm mt-1">Latest transactions from all channels</p>
            </div>
            <a href="#" className="text-sm text-orange-500 hover:text-orange-600 font-medium">
              View All
            </a>
          </div>
        </div>
        
        <div className="divide-y divide-gray-100">
          {[
            { id: "#ORD-8294", date: "Apr 27, 9:15 AM", customer: "Rahul Sharma", amount: "₹2,450", status: "Processing", platform: "Amazon" },
            { id: "#ORD-8293", date: "Apr 27, 8:42 AM", customer: "Priya Patel", amount: "₹1,870", status: "Shipped", platform: "VendorHub" },
            { id: "#ORD-8292", date: "Apr 26, 7:30 PM", customer: "Amit Kumar", amount: "₹3,640", status: "Delivered", platform: "Flipkart" },
            { id: "#ORD-8291", date: "Apr 26, 3:15 PM", customer: "Sneha Verma", amount: "₹990", status: "Processing", platform: "Meesho" },
            { id: "#ORD-8290", date: "Apr 26, 11:20 AM", customer: "Vikram Singh", amount: "₹4,250", status: "Delivered", platform: "VendorHub" },
          ].map((order, index) => (
            <div key={order.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                      <ViewListIcon className="h-5 w-5" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{order.id}</p>
                    <p className="text-xs text-gray-500">{order.date}</p>
                  </div>
                </div>
                
                <div className="hidden md:block">
                  <p className="text-sm text-gray-600">{order.customer}</p>
                </div>
                
                <div className="hidden md:block">
                  <p className="text-sm text-gray-600">{order.platform}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-900">{order.amount}</p>
                </div>
                
                <div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                    order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                    'bg-amber-100 text-amber-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;