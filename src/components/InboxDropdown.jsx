import React from "react";
import { MailIcon } from "@heroicons/react/outline";

const InboxDropdown = ({ onClose }) => {
  const messages = [
    {
      id: 1,
      sender: "Amazon Support",
      message: "Your seller account has been approved for the upcoming festive sale.",
      time: "12 minutes ago",
      read: false,
      avatar: "https://ui-avatars.com/api/?name=Amazon&background=F79B34&color=fff"
    },
    {
      id: 2,
      sender: "Flipkart Team",
      message: "Congratulations! Your store has achieved a 4.8 star rating this month.",
      time: "2 hours ago",
      read: false,
      avatar: "https://ui-avatars.com/api/?name=Flipkart&background=3483F7&color=fff"
    },
    {
      id: 3,
      sender: "Support Team",
      message: "We've processed your request for additional product categories.",
      time: "Yesterday",
      read: false,
      avatar: "https://ui-avatars.com/api/?name=Support&background=34C759&color=fff"
    },
    {
      id: 4,
      sender: "Meesho Partner",
      message: "Your application for the Meesho preferred seller program is under review.",
      time: "2 days ago",
      read: true,
      avatar: "https://ui-avatars.com/api/?name=Meesho&background=F73467&color=fff"
    },
    {
      id: 5,
      sender: "Payment Gateway",
      message: "Your settlement of ₹18,450 has been initiated and will be credited in 24 hours.",
      time: "3 days ago",
      read: true,
      avatar: "https://ui-avatars.com/api/?name=Payments&background=8E34F7&color=fff"
    }
  ];

  const markAllAsRead = () => {
    // This would update message status in a real app
    onClose();
  };

  return (
    <div className="absolute right-4 sm:right-6 lg:right-8 top-16 w-80 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50">
      <div className="p-4 border-b border-gray-100 bg-gray-50">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-700">
            Messages
          </h3>
          <span className="bg-blue-100 text-blue-600 text-xs font-medium px-2 py-0.5 rounded-full">
            {messages.filter(m => !m.read).length} Unread
          </span>
        </div>
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            <MailIcon className="h-10 w-10 mx-auto text-gray-300" />
            <p className="mt-2">No messages yet</p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`p-4 border-b border-gray-100 hover:bg-gray-50 ${
                !message.read ? "bg-blue-50" : ""
              }`}
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-3">
                  <img 
                    src={message.avatar} 
                    alt={message.sender}
                    className="h-10 w-10 rounded-full"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 flex items-center">
                    {message.sender}
                    {!message.read && (
                      <span className="h-2 w-2 bg-blue-500 rounded-full ml-2"></span>
                    )}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {message.message}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {message.time}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      <div className="p-3 border-t border-gray-100 bg-gray-50 flex justify-between">
        <button 
          onClick={markAllAsRead}
          className="text-xs text-blue-500 hover:text-blue-600"
        >
          Mark all as read
        </button>
        <button 
          onClick={() => alert("Messages center will be implemented in future updates!")}
          className="text-xs text-gray-500 hover:text-gray-600"
        >
          View all messages
        </button>
      </div>
    </div>
  );
};

export default InboxDropdown;