import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  TrashIcon,
  PlusIcon,
  MinusIcon,
  ArrowLeftIcon,
  ShoppingBagIcon,
  ShieldCheckIcon,
  TruckIcon,
  CreditCardIcon,
  LockClosedIcon,
  ExclamationCircleIcon,
  CheckCircleIcon
} from '@heroicons/react/outline';
import { useUser } from '../../context/UserContext';

const CartItem = ({ item, onRemove, onUpdateQuantity }) => {
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= item.stock) {
      onUpdateQuantity(item.id, newQuantity);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 border-b border-gray-200">
      <div className="flex flex-row items-center">
        <div className="relative w-20 h-20 rounded-md overflow-hidden">
          <img 
            src={item.image} 
            alt={item.name} 
            className="w-full h-full object-cover"
          />
          {item.discount > 0 && (
            <div className="absolute top-0 left-0 bg-red-500 text-white text-[10px] px-1 py-0.5">
              {item.discount}% OFF
            </div>
          )}
        </div>
        
        <div className="ml-4">
          <h3 className="text-sm font-medium text-gray-800 mb-1">{item.name}</h3>
          <div className="flex items-center text-xs text-gray-500 mb-2">
            {item.color && (
              <div className="flex items-center mr-3">
                <span className="mr-1">Color:</span>
                <div 
                  className="w-3 h-3 rounded-full border border-gray-300"
                  style={{ backgroundColor: item.color.hex }}
                  title={item.color.name}
                ></div>
              </div>
            )}
            {item.size && <div>Size: {item.size}</div>}
          </div>
          <div className="flex items-center">
            <span className="text-sm font-bold text-gray-800">₹{(item.price * item.quantity).toFixed(2)}</span>
            {item.originalPrice && (
              <span className="ml-2 text-xs text-gray-400 line-through">
                ₹{(item.originalPrice * item.quantity).toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* Quantity selector */}
        <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
          <button 
            className="px-2 py-1 text-gray-600 hover:bg-gray-100"
            onClick={() => handleQuantityChange(item.quantity - 1)}
            disabled={item.quantity <= 1}
          >
            <MinusIcon className="h-3 w-3" />
          </button>
          <span className="px-2 min-w-[32px] text-center text-sm">{item.quantity}</span>
          <button 
            className="px-2 py-1 text-gray-600 hover:bg-gray-100"
            onClick={() => handleQuantityChange(item.quantity + 1)}
            disabled={item.quantity >= item.stock}
          >
            <PlusIcon className="h-3 w-3" />
          </button>
        </div>

        {/* Remove button */}
        <button 
          onClick={() => onRemove(item.id)}
          className="text-gray-400 hover:text-red-500 transition-colors"
          aria-label="Remove item"
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

const EmptyCart = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="rounded-full bg-gray-100 p-6 mb-6">
        <ShoppingBagIcon className="h-12 w-12 text-gray-400" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        Looks like you haven't added any products to your cart yet.
        Browse our products and find something you like!
      </p>
      <Link to="/customer/dashboard" 
        className="px-6 py-2.5 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors">
        Continue Shopping
      </Link>
    </div>
  );
};

const OrderSummary = ({ subtotal, discount, shipping, total, onCheckout }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <h3 className="font-semibold text-gray-800">Order Summary</h3>
      </div>
      <div className="p-4 space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">₹{subtotal.toFixed(2)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span>-₹{discount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span>{shipping > 0 ? `₹${shipping.toFixed(2)}` : 'Free'}</span>
        </div>
        <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
          <span className="font-semibold text-gray-800">Total</span>
          <span className="font-bold text-xl text-gray-900">₹{total.toFixed(2)}</span>
        </div>
      </div>
      
      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <button
          className="w-full bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center transition-colors"
          onClick={onCheckout}
        >
          <LockClosedIcon className="h-4 w-4 mr-2" />
          Proceed to Checkout
        </button>
        
        <div className="flex items-center justify-center mt-4 gap-2 text-xs text-gray-500">
          <CreditCardIcon className="h-4 w-4" />
          <span>Secure payment</span>
        </div>
      </div>
    </div>
  );
};

const Cart = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState(null);

  useEffect(() => {
    // This would be an API call in a real application
    const fetchCart = async () => {
      setLoading(true);
      // Simulate API delay
      setTimeout(() => {
        const mockCart = [
          {
            id: 1,
            name: 'Premium Wireless Earbuds',
            description: 'High quality sound with active noise cancellation and 24 hour battery life.',
            image: 'https://images.unsplash.com/photo-1606741965234-7adff9ee2ea9?auto=format&q=75&fit=crop&w=600',
            price: 1999.00,
            originalPrice: 3499.00,
            quantity: 1,
            stock: 15,
            discount: 43,
            color: { name: 'Black', hex: '#000000' },
            size: 'One Size'
          },
          {
            id: 2,
            name: 'Smart Watch Series 5',
            description: 'Track fitness, heart rate, and notifications on a beautiful OLED display.',
            image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&q=75&fit=crop&w=600',
            price: 2799.00,
            originalPrice: 3299.00,
            quantity: 1,
            stock: 10,
            discount: 15,
            color: { name: 'Silver', hex: '#C0C0C0' },
            size: 'Medium'
          }
        ];
        setCartItems(mockCart);
        setLoading(false);
      }, 800);
    };

    fetchCart();
  }, []);

  const handleRemoveItem = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    setCartItems(cartItems.map(item => 
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const handleApplyCoupon = () => {
    if (!couponCode) {
      setCouponError('Please enter a coupon code');
      return;
    }
    
    // Mock coupon validation
    if (couponCode.toUpperCase() === 'DISCOUNT20') {
      setCouponApplied(true);
      setCouponError(null);
    } else {
      setCouponError('Invalid or expired coupon code');
      setCouponApplied(false);
    }
  };

  const handleCheckout = () => {
    navigate('/customer/checkout');
  };

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = couponApplied ? subtotal * 0.2 : 0; // 20% discount if coupon applied
  const shipping = 0; // Free shipping
  const total = subtotal - discount + shipping;

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="max-w-5xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            {[1, 2].map(i => (
              <div key={i} className="bg-white rounded-xl mb-4 p-6">
                <div className="flex justify-between">
                  <div className="flex">
                    <div className="w-20 h-20 bg-gray-200 rounded"></div>
                    <div className="ml-4 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-40"></div>
                      <div className="h-3 bg-gray-200 rounded w-20"></div>
                      <div className="h-4 bg-gray-200 rounded w-24"></div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-24 h-8 bg-gray-200 rounded"></div>
                    <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="max-w-5xl mx-auto px-4">
          <EmptyCart />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Your Shopping Cart</h1>
          <button 
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-800"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-1" />
            Continue Shopping
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Cart items section */}
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <h2 className="font-semibold text-gray-800">
                  {cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'}
                </h2>
              </div>
              
              <div className="divide-y divide-gray-100">
                {cartItems.map(item => (
                  <div key={item.id}>
                    <CartItem 
                      item={item} 
                      onRemove={handleRemoveItem} 
                      onUpdateQuantity={handleUpdateQuantity}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Coupon section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      couponError 
                        ? 'border-red-300 focus:ring-red-200' 
                        : couponApplied 
                          ? 'border-green-300 focus:ring-green-200' 
                          : 'border-gray-300 focus:ring-gray-200'
                    }`}
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    disabled={couponApplied}
                  />
                  {couponApplied && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <CheckCircleIcon className="h-5 w-5 text-green-500" />
                    </div>
                  )}
                </div>
                <button 
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    couponApplied
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-800 hover:bg-gray-700 text-white'
                  }`}
                  onClick={handleApplyCoupon}
                  disabled={couponApplied}
                >
                  {couponApplied ? 'Applied' : 'Apply Coupon'}
                </button>
              </div>
              {couponError && (
                <div className="flex items-center mt-2 text-sm text-red-600">
                  <ExclamationCircleIcon className="h-4 w-4 mr-1" />
                  {couponError}
                </div>
              )}
              {couponApplied && (
                <div className="flex items-center mt-2 text-sm text-green-600">
                  <CheckCircleIcon className="h-4 w-4 mr-1" />
                  Coupon applied! You saved ₹{(subtotal * 0.2).toFixed(2)}
                </div>
              )}
              <div className="text-xs text-gray-500 mt-2">
                * Try "DISCOUNT20" for a 20% discount on your order
              </div>
            </div>

            {/* Trust badges */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center justify-center sm:justify-start">
                  <ShieldCheckIcon className="h-6 w-6 text-gray-500 mr-2" />
                  <span className="text-sm text-gray-600">Secure Checkout</span>
                </div>
                <div className="flex items-center justify-center sm:justify-start">
                  <TruckIcon className="h-6 w-6 text-gray-500 mr-2" />
                  <span className="text-sm text-gray-600">Free Shipping</span>
                </div>
                <div className="flex items-center justify-center sm:justify-start">
                  <CreditCardIcon className="h-6 w-6 text-gray-500 mr-2" />
                  <span className="text-sm text-gray-600">Multiple Payment Options</span>
                </div>
              </div>
            </div>
          </div>

          {/* Order summary section */}
          <div className="w-full lg:w-96">
            <OrderSummary 
              subtotal={subtotal}
              discount={discount}
              shipping={shipping}
              total={total}
              onCheckout={handleCheckout}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;