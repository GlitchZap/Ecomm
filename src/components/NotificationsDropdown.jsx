import React from "react";
import { BellIcon, TagIcon, TrendingUpIcon, CashIcon } from "@heroicons/react/outline";

const NotificationsDropdown = ({ onClose }) => {
  const notifications = [
    {
      id: 1,
      title: "Festival Sale is Live!",
      description: "Increase your product visibility by registering for the festival sale now.",
      time: "10 minutes ago",
      icon: <TagIcon className="h-5 w-5 text-orange-500" />,
      unread: true,
    },
    {
      id: 2,
      title: "Your sales have increased!",
      description: "Your sales are up 24% from last week. Great job!",
      time: "2 hours ago",
      icon: <TrendingUpIcon className="h-5 w-5 text-green-500" />,
      unread: true,
    },
    {
      id: 3,
      title: "Payment processed",
      description: "Your payment of ₹42,580 has been processed and will be credited to your account.",
      time: "Yesterday",
      icon: <CashIcon className="h-5 w-5 text-blue-500" />,
      unread: true,
    },
  ];

  const markAllAsRead = () => {
    // This would update notification status in a real app
    onClose();
  };

  return (
    <div className="absolute right-4 sm:right-6 lg:right-8 top-16 w-80 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50">
      <div className="p-4 border-b border-gray-100 bg-gray-50">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-700">
            Notifications
          </h3>
          <span className="bg-orange-100 text-orange-600 text-xs font-medium px-2 py-0.5 rounded-full">
            {notifications.filter(n => n.unread).length} New
          </span>
        </div>
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 border-b border-gray-100 hover:bg-gray-50 ${
              notification.unread ? "bg-orange-50" : ""
            }`}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-3 mt-1">
                <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                  {notification.icon}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900">
                  {notification.title}
                </h4>
                <p className="text-xs text-gray-500 mt-1">
                  {notification.description}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {notification.time}
                </p>
              </div>
              {notification.unread && (
                <div className="h-2 w-2 bg-orange-500 rounded-full"></div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-3 border-t border-gray-100 bg-gray-50">
        <button 
          onClick={markAllAsRead}
          className="w-full text-xs text-center text-gray-500 hover:text-orange-500"
        >
          Mark all as read
        </button>
      </div>
    </div>
  );
};

export default NotificationsDropdown;