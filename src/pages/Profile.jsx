import React, { useState } from "react";
import { motion } from "framer-motion";
import { PencilIcon, SaveIcon } from "@heroicons/react/solid";
import { 
  UserIcon, 
  CreditCardIcon, 
  DocumentTextIcon, 
  ShieldCheckIcon,
  PhotographIcon,
  LocationMarkerIcon,
  MailIcon,
  PhoneIcon,
  TagIcon,
  CubeIcon,
  GlobeIcon
} from "@heroicons/react/outline";
import { useUser } from "../context/UserContext";

const Profile = () => {
  const { user, updateUser } = useUser();
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    name: user.name,
    email: user.email,
    phone: "+91 9876543210",
    storeName: "Crafty Creations",
    location: "Mumbai, Maharashtra",
    bio: "Passionate seller of handcrafted home decor items and traditional art pieces."
  });

  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes
      updateUser({
        name: editedProfile.name,
        email: editedProfile.email
      });
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const tabContent = {
    profile: (
      <div>
        <div className="bg-white rounded-xl shadow-sm mb-6">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">Personal Information</h3>
              <button 
                onClick={handleEditToggle}
                className="flex items-center text-sm font-medium text-orange-500 hover:text-orange-600"
              >
                {isEditing ? (
                  <>
                    <SaveIcon className="h-4 w-4 mr-1" />
                    Save Changes
                  </>
                ) : (
                  <>
                    <PencilIcon className="h-4 w-4 mr-1" />
                    Edit Profile
                  </>
                )}
              </button>
            </div>
            
            <div className="space-y-6">
              {isEditing ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={editedProfile.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={editedProfile.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="text"
                      name="phone"
                      value={editedProfile.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Store Name</label>
                    <input
                      type="text"
                      name="storeName"
                      value={editedProfile.storeName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={editedProfile.location}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                    <textarea
                      name="bio"
                      value={editedProfile.bio}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    ></textarea>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex flex-col sm:flex-row">
                    <div className="mb-4 sm:mb-0 sm:mr-6 flex-shrink-0">
                      <img 
                        src={user.avatar}
                        alt={user.name}
                        className="h-24 w-24 rounded-xl object-cover"
                      />
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{editedProfile.name}</h3>
                      <p className="text-gray-500 mb-2">{editedProfile.storeName} • {user.role}</p>
                      <p className="text-gray-600 text-sm">{editedProfile.bio}</p>
                      
                      <div className="mt-4 flex flex-wrap gap-2">
                        <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                          Premium Seller
                        </span>
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          Verified
                        </span>
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                          Top Rated
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
                    <div className="flex items-center">
                      <MailIcon className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="text-gray-800">{editedProfile.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <PhoneIcon className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="text-gray-800">{editedProfile.phone}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <LocationMarkerIcon className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="text-gray-800">{editedProfile.location}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <GlobeIcon className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Member Since</p>
                        <p className="text-gray-800">January 15, 2025</p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm mb-6">
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Account Statistics</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Products Listed", value: "42", icon: <CubeIcon className="h-6 w-6 text-blue-500" /> },
                { label: "Total Sales", value: "₹2,45,678", icon: <TagIcon className="h-6 w-6 text-green-500" /> },
                { label: "Average Rating", value: "4.8/5", icon: <TagIcon className="h-6 w-6 text-yellow-500" /> },
                { label: "Return Rate", value: "0.8%", icon: <TagIcon className="h-6 w-6 text-orange-500" /> },
              ].map((stat, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <div className="mr-3">
                      {stat.icon}
                    </div>
                    <span className="text-gray-700 text-sm font-medium">{stat.label}</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    
    payments: (
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Payment Information</h3>
          
          <div className="mb-6">
            <h4 className="text-lg font-medium text-gray-800 mb-4">Payment Methods</h4>
            
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4 flex items-center">
                <div className="h-12 w-16 bg-blue-100 rounded flex items-center justify-center mr-4">
                  <span className="text-blue-800 font-medium">VISA</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">•••• •••• •••• 4567</p>
                  <p className="text-sm text-gray-500">Expires 12/2026</p>
                </div>
                <div>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                    Primary
                  </span>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 flex items-center">
                <div className="h-12 w-16 bg-orange-100 rounded flex items-center justify-center mr-4">
                  <span className="text-orange-800 font-medium">MC</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">•••• •••• •••• 8901</p>
                  <p className="text-sm text-gray-500">Expires 08/2025</p>
                </div>
              </div>
              
              <button className="text-orange-500 font-medium text-sm hover:text-orange-600">
                + Add New Payment Method
              </button>
            </div>
          </div>
          
          <div className="mb-6">
            <h4 className="text-lg font-medium text-gray-800 mb-4">Billing Address</h4>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <p className="font-medium text-gray-800">{editedProfile.name}</p>
              <p className="text-gray-600">123 Commerce Street</p>
              <p className="text-gray-600">Mumbai, Maharashtra 400001</p>
              <p className="text-gray-600">India</p>
              
              <button className="text-orange-500 font-medium text-sm mt-3 hover:text-orange-600">
                Edit Billing Address
              </button>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-medium text-gray-800 mb-4">Payment History</h4>
            
            <div className="overflow-hidden border border-gray-200 rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[
                    { date: "Apr 25, 2025", description: "Premium Subscription", amount: "₹1,499", status: "Success" },
                    { date: "Apr 10, 2025", description: "Payment to Seller", amount: "₹12,450", status: "Success" },
                    { date: "Mar 25, 2025", description: "Premium Subscription", amount: "₹1,499", status: "Success" },
                    { date: "Mar 15, 2025", description: "Payment to Seller", amount: "₹8,920", status: "Success" },
                  ].map((payment, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {payment.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {payment.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {payment.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                          {payment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    ),
    
    documents: (
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Documents & Verification</h3>
          
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-medium text-gray-800">Identification Documents</h4>
              <button className="text-orange-500 text-sm font-medium hover:text-orange-600">
                Upload New
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <DocumentTextIcon className="h-6 w-6 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">Aadhaar Card</p>
                    <p className="text-sm text-gray-500">Uploaded on Jan 15, 2025</p>
                    <p className="text-xs mt-1 text-green-600">Verified</p>
                  </div>
                  <button className="text-gray-400 hover:text-gray-500">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <DocumentTextIcon className="h-6 w-6 text-green-500" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">PAN Card</p>
                    <p className="text-sm text-gray-500">Uploaded on Jan 15, 2025</p>
                    <p className="text-xs mt-1 text-green-600">Verified</p>
                  </div>
                  <button className="text-gray-400 hover:text-gray-500">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-medium text-gray-800">Business Documents</h4>
              <button className="text-orange-500 text-sm font-medium hover:text-orange-600">
                Upload New
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                    <DocumentTextIcon className="h-6 w-6 text-purple-500" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">GST Certificate</p>
                    <p className="text-sm text-gray-500">Uploaded on Feb 05, 2025</p>
                    <p className="text-xs mt-1 text-green-600">Verified</p>
                  </div>
                  <button className="text-gray-400 hover:text-gray-500">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
                    <DocumentTextIcon className="h-6 w-6 text-yellow-500" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">Shop License</p>
                    <p className="text-sm text-gray-500">Uploaded on Feb 05, 2025</p>
                    <p className="text-xs mt-1 text-yellow-600">Under Review</p>
                  </div>
                  <button className="text-gray-400 hover:text-gray-500">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-medium text-gray-800">Verification Status</h4>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">Identity verification complete</h3>
                  <div className="mt-2 text-sm text-green-700">
                    <p>Your identity has been verified successfully. Your seller account is active.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">Business verification in progress</h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>We're reviewing your shop license. This typically takes 1-2 business days.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    
    security: (
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Security Settings</h3>
          
          <div className="mb-8">
            <h4 className="text-lg font-medium text-gray-800 mb-4">Password</h4>
            
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800">Change Password</p>
                    <p className="text-sm text-gray-500">Last updated 30 days ago</p>
                  </div>
                  <button className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600">
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <h4 className="text-lg font-medium text-gray-800 mb-4">Two-Factor Authentication</h4>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">SMS Authentication</p>
                  <p className="text-sm text-gray-500">Receive a code via SMS when logging in</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer" checked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                </label>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">Authenticator App</p>
                  <p className="text-sm text-gray-500">Use an authenticator app to generate verification codes</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                </label>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-medium text-gray-800 mb-4">Login History</h4>
            
            <div className="overflow-hidden border border-gray-200 rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      IP Address
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Device
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[
                    { datetime: "Apr 27, 2025, 09:34 AM", ip: "192.168.1.1", location: "Mumbai, India", device: "Chrome on Windows" },
                    { datetime: "Apr 25, 2025, 02:45 PM", ip: "192.168.1.1", location: "Mumbai, India", device: "Chrome on Windows" },
                    { datetime: "Apr 22, 2025, 10:22 AM", ip: "192.168.1.1", location: "Mumbai, India", device: "Safari on iPhone" },
                    { datetime: "Apr 20, 2025, 08:17 AM", ip: "192.168.1.1", location: "Mumbai, India", device: "Chrome on Windows" },
                  ].map((login, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {login.datetime}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {login.ip}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {login.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {login.device}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
        <p className="text-gray-600">Manage your account information and settings</p>
      </div>
      
      {/* Profile Tabs */}
      <div className="mb-6 bg-white rounded-xl shadow-sm overflow-x-auto">
        <div className="flex p-1 min-w-max">
          {[
            { id: "profile", label: "Profile", icon: <UserIcon className="h-4 w-4 mr-1" /> },
            { id: "payments", label: "Payments", icon: <CreditCardIcon className="h-4 w-4 mr-1" /> },
            { id: "documents", label: "Documents", icon: <DocumentTextIcon className="h-4 w-4 mr-1" /> },
            { id: "security", label: "Security", icon: <ShieldCheckIcon className="h-4 w-4 mr-1" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg mx-1 ${
                activeTab === tab.id
                  ? "bg-orange-500 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {tabContent[activeTab]}
      </motion.div>
    </div>
  );
};

export default Profile;