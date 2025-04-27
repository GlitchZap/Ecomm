import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  ChartBarIcon, 
  TrendingUpIcon, 
  CubeIcon, 
  CashIcon,
  ShoppingBagIcon,
  UsersIcon,
  ClockIcon
} from "@heroicons/react/outline";
import { useUser } from "../context/UserContext";

const Dashboard = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  // Sample data
  const salesData = [
    { month: "Jan", value: 4500 },
    { month: "Feb", value: 5800 },
    { month: "Mar", value: 6800 },
    { month: "Apr", value: 8200 },
    { month: "May", value: 7800 },
    { month: "Jun", value: 8500 },
  ];

  const ordersByPlatform = [
    { name: "Amazon", orders: 48, color: "bg-amber-500" },
    { name: "Flipkart", orders: 32, color: "bg-blue-500" },
    { name: "Meesho", orders: 27, color: "bg-pink-500" },
    { name: "Direct", orders: 12, color: "bg-green-500" },
  ];

  const totalOrders = ordersByPlatform.reduce((acc, curr) => acc + curr.orders, 0);

  const stats = [
    { 
      title: "Total Revenue", 
      value: "₹85,458", 
      change: "+21%",
      icon: <CashIcon className="h-5 w-5 text-green-500" />,
      positive: true
    },
    { 
      title: "Sales Count", 
      value: "119", 
      change: "+15%",
      icon: <ShoppingBagIcon className="h-5 w-5 text-blue-500" />,
      positive: true
    },
    { 
      title: "Products Listed", 
      value: "42", 
      change: "+5",
      icon: <CubeIcon className="h-5 w-5 text-orange-500" />,
      positive: true
    },
    { 
      title: "Average Order", 
      value: "₹718", 
      change: "+2%",
      icon: <TrendingUpIcon className="h-5 w-5 text-purple-500" />,
      positive: true
    },
  ];

  const recentOrders = [
    { 
      id: "#ORD-8765", 
      date: "27 Apr 2025", 
      customer: "Rajesh Sharma", 
      amount: "₹1,450",
      status: "Delivered",
      statusColor: "bg-green-100 text-green-800"
    },
    { 
      id: "#ORD-8764", 
      date: "26 Apr 2025", 
      customer: "Priya Patel", 
      amount: "₹2,150",
      status: "Processing",
      statusColor: "bg-blue-100 text-blue-800"
    },
    { 
      id: "#ORD-8763", 
      date: "26 Apr 2025", 
      customer: "Amar Singh", 
      amount: "₹3,240",
      status: "Processing",
      statusColor: "bg-blue-100 text-blue-800"
    },
    { 
      id: "#ORD-8762", 
      date: "25 Apr 2025", 
      customer: "Leela Desai", 
      amount: "₹850",
      status: "Delivered",
      statusColor: "bg-green-100 text-green-800"
    },
    { 
      id: "#ORD-8761", 
      date: "25 Apr 2025", 
      customer: "Vikram Mehta", 
      amount: "₹1,640",
      status: "Delivered",
      statusColor: "bg-green-100 text-green-800"
    },
  ];

  const topProducts = [
    { name: "Handcrafted Wall Hanging", sales: 28, amount: "₹14,000" },
    { name: "Ceramic Dinner Set", sales: 24, amount: "₹12,000" },
    { name: "Wooden Tea Coasters", sales: 18, amount: "₹7,200" },
    { name: "Embroidered Cushion Cover", sales: 16, amount: "₹8,000" },
    { name: "Brass Decor Items", sales: 14, amount: "₹7,000" },
  ];

  // Calculate max value for sales chart
  const maxSales = Math.max(...salesData.map(item => item.value));

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 text-sm">Your business performance at a glance</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm p-4 border border-gray-100"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="text-lg sm:text-xl font-bold mt-1 text-gray-800">{stat.value}</p>
                <div className="flex items-center mt-1">
                  <span className={`text-xs font-medium ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </span>
                  <span className="text-xs text-gray-500 ml-1">vs. last month</span>
                </div>
              </div>
              <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-gray-50 flex items-center justify-center">
                {stat.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* Sales Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 lg:col-span-2"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base sm:text-lg font-medium text-gray-800">Revenue Trend</h2>
            <div className="flex space-x-2">
              <select className="text-xs bg-gray-50 border border-gray-200 rounded px-2 py-1">
                <option>Last 6 Months</option>
                <option>Last 12 Months</option>
                <option>This Year</option>
              </select>
            </div>
          </div>
          
          <div className="h-48 sm:h-64 flex items-end space-x-2">
            {salesData.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-gradient-to-t from-orange-500 to-amber-400 rounded-t"
                  style={{ height: `${(item.value / maxSales) * 100}%` }}
                ></div>
                <div className="mt-2">
                  <span className="text-xs text-gray-500">{item.month}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Orders by Platform */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm p-4 border border-gray-100"
        >
          <h2 className="text-base sm:text-lg font-medium text-gray-800 mb-4">Orders by Platform</h2>
          
          <div className="space-y-3">
            {ordersByPlatform.map((platform, index) => {
              const percentage = (platform.orders / totalOrders) * 100;
              
              return (
                <div key={index}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-700">{platform.name}</span>
                    <span className="text-gray-700 font-medium">{platform.orders} orders ({percentage.toFixed(1)}%)</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${platform.color}`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Total Orders</p>
              <p className="text-lg font-bold text-gray-800">{totalOrders}</p>
            </div>
            <button className="text-xs text-orange-500 font-medium hover:text-orange-600">
              View Details
            </button>
          </div>
        </motion.div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 lg:col-span-2"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base sm:text-lg font-medium text-gray-800">Recent Orders</h2>
            <button className="text-xs text-orange-500 font-medium hover:text-orange-600">
              View All
            </button>
          </div>
          
          <div className="overflow-x-auto -mx-4 px-4">
            <table className="min-w-full">
              <thead>
                <tr className="text-xs text-gray-500 border-b border-gray-100">
                  <th className="py-2 px-2 text-left font-medium">Order</th>
                  <th className="py-2 px-2 text-left font-medium">Date</th>
                  <th className="py-2 px-2 text-left font-medium">Customer</th>
                  <th className="py-2 px-2 text-left font-medium">Amount</th>
                  <th className="py-2 px-2 text-left font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, index) => (
                  <tr key={index} className="text-xs border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-3 px-2 font-medium text-gray-800">{order.id}</td>
                    <td className="py-3 px-2 text-gray-600">{order.date}</td>
                    <td className="py-3 px-2 text-gray-600">{order.customer}</td>
                    <td className="py-3 px-2 font-medium text-gray-800">{order.amount}</td>
                    <td className="py-3 px-2">
                      <span className={`${order.statusColor} text-xxs px-2 py-1 rounded-full`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Top Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm p-4 border border-gray-100"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base sm:text-lg font-medium text-gray-800">Top Selling Products</h2>
            <button className="text-xs text-orange-500 font-medium hover:text-orange-600">
              View All
            </button>
          </div>
          
          <div className="space-y-3">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-md bg-gray-100 flex items-center justify-center mr-3">
                    <span className="text-xs font-medium text-gray-600">#{index + 1}</span>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-800">{product.name}</p>
                    <p className="text-xxs text-gray-500">{product.sales} sold</p>
                  </div>
                </div>
                <span className="text-xs font-medium text-gray-800">{product.amount}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Footer timestamp */}
      <div className="mt-8 text-xs text-center text-gray-400">
        Last updated: {user.dateTime} • User: {user.name}
      </div>
    </div>
  );
};

export default Dashboard;