import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeftIcon,
  HeartIcon,
  ShoppingCartIcon,
  StarIcon,
  CheckIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  ShieldCheckIcon,
  TruckIcon,
  RefreshIcon,
  PlusIcon,
  MinusIcon,
  ShareIcon,
  ChatAltIcon,
  ChevronDownIcon,
  SparklesIcon
} from '@heroicons/react/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/solid';
import { useUser } from '../../context/UserContext';

// Related products component with SUMIMAASE styling
const RelatedProductCard = ({ product, onAddToCart }) => {
  return (
    <motion.div 
      className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 h-full flex flex-col"
      whileHover={{ 
        y: -5,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
      }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative overflow-hidden" style={{ paddingBottom: "75%" }}>
        <motion.img 
          src={product.image} 
          alt={product.name} 
          className="absolute inset-0 h-full w-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        />
        {product.discount && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded font-medium">
            {product.discount}% OFF
          </div>
        )}
        {product.isNew && (
          <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded font-medium flex items-center">
            <SparklesIcon className="h-3 w-3 mr-1" />
            NEW
          </div>
        )}
      </div>
      <div className="p-3 flex-grow flex flex-col">
        <div className="flex items-center text-amber-400 mb-1">
          {[...Array(5)].map((_, i) => (
            <StarIcon 
              key={i} 
              className={`h-3 w-3 ${i < product.rating ? 'fill-current' : 'text-gray-300'}`} 
            />
          ))}
          <span className="ml-1 text-xs text-gray-500">({product.reviews})</span>
        </div>
        <h3 className="text-sm font-medium text-gray-800 mb-1 line-clamp-2">{product.name}</h3>
        <div className="flex items-center mt-auto">
          <div className="flex items-baseline">
            <span className="text-sm font-bold text-gray-800">₹{product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="ml-1 text-xs text-gray-400 line-through">
                ₹{product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <motion.button
            className="ml-auto p-1.5 rounded-full bg-gray-100 hover:bg-blue-600 text-gray-800 hover:text-white transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onAddToCart(product);
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ShoppingCartIcon className="h-3.5 w-3.5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

// Image gallery with zoom capability
const ImageGallery = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (isZoomed) {
      const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      setMousePosition({ x, y });
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="relative">
      {/* Main image */}
      <motion.div 
        className="relative w-full rounded-lg overflow-hidden bg-gray-100 cursor-zoom-in shadow-md"
        style={{ height: "400px" }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onClick={() => setIsZoomed(!isZoomed)}
        whileHover={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
      >
        <motion.img 
          src={images[currentImageIndex].src} 
          alt={images[currentImageIndex].alt}
          className="absolute w-full h-full object-contain"
          animate={{
            scale: isZoomed ? 1.5 : 1
          }}
          transition={{ duration: 0.2 }}
          style={{
            transformOrigin: isZoomed ? `${mousePosition.x * 100}% ${mousePosition.y * 100}%` : 'center center'
          }}
        />
        
        {/* Navigation arrows */}
        <motion.button 
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1.5 shadow hover:bg-white transition-colors z-10"
          onClick={(e) => { 
            e.stopPropagation();
            prevImage();
          }}
          whileHover={{ scale: 1.1, backgroundColor: "#FFFFFF" }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeftIcon className="h-5 w-5 text-gray-800" />
        </motion.button>
        <motion.button 
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1.5 shadow hover:bg-white transition-colors z-10"
          onClick={(e) => { 
            e.stopPropagation();
            nextImage();
          }}
          whileHover={{ scale: 1.1, backgroundColor: "#FFFFFF" }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRightIcon className="h-5 w-5 text-gray-800" />
        </motion.button>
        
        {/* Image counter */}
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded z-10">
          {currentImageIndex + 1} / {images.length}
        </div>
      </motion.div>
      
      {/* Thumbnails */}
      <div className="mt-4 grid grid-cols-6 gap-2">
        {images.map((image, index) => (
          <motion.div 
            key={index} 
            className={`cursor-pointer rounded-md overflow-hidden border-2 ${
              index === currentImageIndex ? 'border-blue-500' : 'border-transparent'
            }`}
            onClick={() => setCurrentImageIndex(index)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img 
              src={image.src} 
              alt={`${image.alt} thumbnail`}
              className="h-16 w-full object-cover"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Reviews section
const Reviews = ({ reviews, productName }) => {
  const [showAllReviews, setShowAllReviews] = useState(false);
  
  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 2);
  
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800">
          Customer Reviews ({reviews.length})
        </h3>
        <button 
          onClick={() => setShowAllReviews(!showAllReviews)}
          className="text-sm text-gray-600 hover:text-gray-900 flex items-center"
        >
          {showAllReviews ? 'Show Less' : 'Show All'}
          <ChevronDownIcon className={`h-4 w-4 ml-1 transition-transform ${showAllReviews ? 'rotate-180' : ''}`} />
        </button>
      </div>
      
      <div className="space-y-4">
        {displayedReviews.map((review, index) => (
          <div key={index} className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center overflow-hidden">
                  {review.avatar ? (
                    <img src={review.avatar} alt={review.name} className="h-full w-full object-cover" />
                  ) : (
                    <span className="text-sm font-medium text-gray-600">{review.name.charAt(0)}</span>
                  )}
                </div>
                <div>
                  <div className="font-medium text-sm text-gray-800">{review.name}</div>
                  <div className="text-xs text-gray-500">{review.date}</div>
                </div>
              </div>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  i < review.rating ?
                    <StarIconSolid key={i} className="h-4 w-4 text-amber-400" /> :
                    <StarIcon key={i} className="h-4 w-4 text-gray-300" />
                ))}
              </div>
            </div>
            
            <h4 className="font-medium text-gray-900 mt-3 mb-1">{review.title}</h4>
            <p className="text-gray-600 text-sm mb-3">{review.comment}</p>
            
            {review.images && review.images.length > 0 && (
              <div className="flex space-x-2 mt-3">
                {review.images.map((img, idx) => (
                  <div key={idx} className="h-16 w-16 rounded overflow-hidden">
                    <img src={img} alt={`Review photo ${idx}`} className="h-full w-full object-cover" />
                  </div>
                ))}
              </div>
            )}
            
            {review.verified && (
              <div className="flex items-center mt-3 text-green-600 text-xs">
                <CheckIcon className="h-4 w-4 mr-1" />
                Verified Purchase
              </div>
            )}
          </div>
        ))}
      </div>
      
      {!showAllReviews && reviews.length > 2 && (
        <button
          onClick={() => setShowAllReviews(true)}
          className="mt-4 w-full py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Load More Reviews
        </button>
      )}
    </div>
  );
};

// Collapsible FAQs
const ProductFAQ = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState(null);
  
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  return (
    <div>
      <h3 className="text-lg font-bold text-gray-800 mb-4">
        Frequently Asked Questions
      </h3>
      
      <div className="space-y-2">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <div 
              className="flex items-center justify-between p-4 cursor-pointer bg-white hover:bg-gray-50"
              onClick={() => toggleFAQ(index)}
            >
              <h4 className="font-medium text-gray-800">{faq.question}</h4>
              <ChevronDownIcon className={`h-5 w-5 text-gray-500 transition-transform ${
                openIndex === index ? 'rotate-180' : ''
              }`} />
            </div>
            
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 pt-0 border-t border-gray-100 bg-gray-50 text-gray-600 text-sm">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('description');
  const [addedToCart, setAddedToCart] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  
  useEffect(() => {
    // This would be an API call in a real application
    const fetchProduct = async () => {
      setLoading(true);
      // Simulating API delay
      setTimeout(() => {
        setProduct({
          id: 1,
          name: 'Premium Wireless Earbuds with Active Noise Cancellation',
          description: 'Experience crystal clear audio with our premium wireless earbuds featuring advanced active noise cancellation technology. Perfect for music, calls, and an immersive listening experience.',
          price: 1999.00,
          originalPrice: 3499.00,
          discount: 43,
          rating: 4.5,
          reviews: 128,
          stock: 15,
          sku: 'WE-ANC-2025',
          brand: 'AudioTech',
          category: 'Electronics',
          tags: ['Wireless', 'Earbuds', 'Noise Cancellation', 'Bluetooth'],
          colors: [
            { name: 'Black', hex: '#000000' },
            { name: 'White', hex: '#FFFFFF' },
            { name: 'Navy Blue', hex: '#0A2342' }
          ],
          sizes: ['One Size'],
          features: [
            'Active Noise Cancellation',
            'Bluetooth 5.2 Connectivity',
            '24 Hour Battery Life',
            'Water and Sweat Resistant (IPX4)',
            'Touch Controls',
            'Voice Assistant Compatible',
            'Premium Sound Quality'
          ],
          images: [
            { src: 'https://images.unsplash.com/photo-1606741965234-7adff9ee2ea9?auto=format&q=75&fit=crop&w=1000', alt: 'Black wireless earbuds front view' },
            { src: 'https://images.unsplash.com/photo-1578319439584-104c94d37305?auto=format&q=75&fit=crop&w=1000', alt: 'Earbuds in charging case' },
            { src: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&q=75&fit=crop&w=1000', alt: 'Earbuds on dark background' },
            { src: 'https://images.unsplash.com/photo-1612444530582-fc66183b16f3?auto=format&q=75&fit=crop&w=1000', alt: 'Person wearing earbuds' },
            { src: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&q=75&fit=crop&w=1000', alt: 'Earbuds with accessories' },
            { src: 'https://images.unsplash.com/photo-1589003077984-895e704f510c?auto=format&q=75&fit=crop&w=1000', alt: 'Earbuds close-up view' }
          ],
          specifications: [
            { name: 'Model Number', value: 'AT-WE-2025' },
            { name: 'Connectivity', value: 'Bluetooth 5.2' },
            { name: 'Battery Life', value: '8 hours (24 with case)' },
            { name: 'Charging Time', value: '1.5 hours' },
            { name: 'Driver Size', value: '10mm' },
            { name: 'Frequency Response', value: '20Hz - 20kHz' },
            { name: 'Water Resistance', value: 'IPX4' },
            { name: 'Weight', value: '5.2g per earbud, 45g case' }
          ],
          reviews_data: [
            {
              name: 'Rahul Sharma',
              avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
              date: '20 Apr, 2025',
              rating: 5,
              title: 'Best earbuds I have ever owned!',
              comment: 'The sound quality is amazing and the noise cancellation works perfectly. Battery life is excellent - I only need to charge them once a week with my usage. Highly recommend!',
              verified: true
            },
            {
              name: 'Priya Patel',
              avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
              date: '15 Apr, 2025',
              rating: 4,
              title: 'Great sound, minor comfort issues',
              comment: 'Sound quality is excellent and the ANC works well. My only complaint is they start to hurt my ears after about 2 hours of use. Battery life is as advertised.',
              verified: true
            },
            {
              name: 'Vikram Singh',
              avatar: null,
              date: '5 Apr, 2025',
              rating: 5,
              title: 'Perfect for workouts!',
              comment: 'These stay in place even during intense workouts. Sweat resistance is great and the sound quality motivates me during training. Touch controls are responsive too.',
              images: [
                'https://images.unsplash.com/photo-1564424224827-cd24b8915874?auto=format&q=75&fit=crop&w=200',
                'https://images.unsplash.com/photo-1511688878353-3a2f5be94cd7?auto=format&q=75&fit=crop&w=200'
              ],
              verified: true
            },
            {
              name: 'Neha Gupta',
              avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
              date: '28 Mar, 2025',
              rating: 3,
              title: 'Good but expected better noise cancellation',
              comment: 'The earbuds sound good and are comfortable, but the noise cancellation isn\'t as effective as I hoped. It reduces ambient noise but doesn\'t completely block it out.',
              verified: true
            }
          ],
          faqs: [
            {
              question: 'How long does the battery last?',
              answer: 'The earbuds provide up to 8 hours of continuous playback with ANC off, and 6 hours with ANC on. The charging case provides an additional 16-18 hours, giving you a total of 24 hours of usage before needing to recharge the case.'
            },
            {
              question: 'Are these earbuds compatible with both Android and iOS devices?',
              answer: 'Yes, these wireless earbuds are compatible with any Bluetooth-enabled device including Android, iOS, and Windows devices.'
            },
            {
              question: 'Is the microphone quality good for calls?',
              answer: 'Yes, the earbuds feature dual microphones with noise reduction technology that provides clear call quality even in noisy environments. The voice pickup is enhanced by AI algorithms to filter out background noise.'
            },
            {
              question: 'Can I use just one earbud at a time?',
              answer: 'Yes, each earbud can be used independently. This is useful when you want to maintain awareness of your surroundings or extend battery life by using them one at a time.'
            },
            {
              question: 'How do I control volume and track changes?',
              answer: 'Volume can be controlled by swiping up or down on the touch-sensitive surface of either earbud. For track changes, double tap the right earbud to skip forward and triple tap to go back to the previous track.'
            }
          ],
          warranty: '1 year manufacturer warranty',
          returnPolicy: '30-day free return policy'
        });

        setRelatedProducts([
          {
            id: 7, 
            name: 'Bluetooth Speaker',
            description: 'Portable speaker with 360° sound and 20 hour battery life. Water resistant.',
            image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&q=75&fit=crop&w=600',
            price: 2499.00,
            originalPrice: 3999.00,
            rating: 4,
            reviews: 67,
            discount: 37,
            category: 'Electronics',
            isNew: true
          },
          {
            id: 2, 
            name: 'Smart Watch Series 5',
            description: 'Track fitness, heart rate, and notifications on a beautiful OLED display.',
            image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&q=75&fit=crop&w=600',
            price: 2799.00,
            originalPrice: 3299.00,
            rating: 4,
            reviews: 89,
            discount: 15, 
            category: 'Electronics',
            isNew: false
          },
          {
            id: 9, 
            name: 'Noise Cancelling Headphones',
            description: 'Over-ear design with premium sound quality and 30 hour battery life.',
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&q=75&fit=crop&w=600',
            price: 3999.00,
            originalPrice: 4999.00,
            rating: 4.5,
            reviews: 42,
            discount: 20,
            category: 'Electronics',
            isNew: false
          },
          {
            id: 10, 
            name: 'Portable Power Bank',
            description: '20,000mAh capacity with fast charging for multiple devices simultaneously.',
            image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&q=75&fit=crop&w=600',
            price: 1499.00,
            originalPrice: 1999.00,
            rating: 4.5,
            reviews: 56,
            discount: 25,
            category: 'Electronics',
            isNew: true
          }
        ]);
        
        setLoading(false);

        // Set default color and size
        setTimeout(() => {
          setSelectedColor({ name: 'Black', hex: '#000000' });
          setSelectedSize('One Size');
        }, 0);
      }, 800);
    };

    fetchProduct();
    
    // Reset state when id changes
    return () => {
      setProduct(null);
      setQuantity(1);
      setSelectedColor(null);
      setSelectedSize(null);
      setAddedToCart(false);
    };
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      alert('Please select a color and size');
      return;
    }
    
    setAddedToCart(true);
    // Here you would add the actual cart functionality
    
    // Reset after animation
    setTimeout(() => {
      setAddedToCart(false);
    }, 2000);
  };

  const handleBuyNow = () => {
    if (!selectedColor || !selectedSize) {
      alert('Please select a color and size');
      return;
    }
    
    // Here you would add the actual checkout functionality
    navigate('/customer/checkout');
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 10)) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCartRelated = (product) => {
    // Here you would add the actual cart functionality
    alert(`Added ${product.name} to cart`);
  };

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2 h-[400px] bg-gray-100 rounded-lg animate-pulse"></div>
            <div className="md:w-1/2 space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/3"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
              <div className="h-10 bg-gray-200 rounded w-1/3"></div>
              <div className="h-10 bg-gray-200 rounded w-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Product not found</h2>
          <p className="text-gray-600 mt-2">The product you are looking for does not exist or has been removed.</p>
          <button 
            onClick={() => navigate('/customer/dashboard')}
            className="mt-6 px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <button 
            onClick={() => navigate('/customer/dashboard')}
            className="hover:text-gray-800"
          >
            Home
          </button>
          <ChevronRightIcon className="h-4 w-4 mx-2" />
          <button 
            onClick={() => navigate('/customer/category/electronics')}
            className="hover:text-gray-800"
          >
            {product.category}
          </button>
          <ChevronRightIcon className="h-4 w-4 mx-2" />
          <span className="text-gray-800 font-medium truncate max-w-xs">{product.name}</span>
        </div>
        
        {/* Back button */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-sm text-gray-600 mb-6 hover:text-gray-800"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          Back
        </button>

        {/* Product details */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left column - Product images */}
          <div className="md:w-1/2">
            <ImageGallery images={product.images} />
          </div>
          
          {/* Right column - Product info */}
          <div className="md:w-1/2">
            {/* Brand */}
            <div className="mb-1">
              <span className="text-sm font-medium text-gray-600">{product.brand}</span>
            </div>
            
            {/* Product name */}
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center mb-4">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <StarIconSolid 
                    key={i} 
                    className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-amber-400' : 'text-gray-300'}`} 
                  />
                ))}
                {product.rating % 1 !== 0 && (
                  <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                    <defs>
                      <linearGradient id="half" x1="0" x2="1" y1="0" y2="0">
                        <stop offset="50%" stopColor="currentColor" />
                        <stop offset="50%" stopColor="#D1D5DB" />
                      </linearGradient>
                    </defs>
                    <path
                      fillRule="evenodd"
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.37 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      fill="url(#half)"
                    />
                  </svg>
                )}
                <span className="ml-2 text-sm text-gray-600">{product.rating} ({product.reviews} reviews)</span>
              </div>

              <button 
                className="ml-4 flex items-center text-sm text-gray-600 hover:text-gray-800"
                onClick={() => setActiveTab('reviews')}
              >
                <ChatAltIcon className="h-4 w-4 mr-1" />
                Read reviews
              </button>
            </div>
            
            {/* Price */}
            <div className="flex items-center mb-4">
              <div className="text-3xl font-bold text-gray-800">₹{product.price.toFixed(2)}</div>
              {product.originalPrice && (
                <>
                  <div className="ml-3 text-lg text-gray-500 line-through">₹{product.originalPrice.toFixed(2)}</div>
                  <div className="ml-2 text-sm font-medium text-green-600">{product.discount}% OFF</div>
                </>
              )}
            </div>
            
            {/* Availability */}
            <div className="flex items-center mb-6">
              <div className={`w-3 h-3 rounded-full mr-2 ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-sm text-gray-600">
                {product.stock > 0 
                  ? `In stock (${product.stock} available)` 
                  : 'Out of stock'
                }
              </span>
              {product.sku && (
                <span className="ml-4 text-sm text-gray-500">SKU: {product.sku}</span>
              )}
            </div>
            
            {/* Short description */}
            <p className="text-gray-600 mb-6">{product.description}</p>
            
            {/* Color selector */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-800 mb-2">Color: {selectedColor?.name}</h3>
                <div className="flex items-center space-x-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      type="button"
                      className={`relative h-9 w-9 rounded-full border ${
                        selectedColor?.name === color.name 
                          ? 'border-gray-800 ring-2 ring-gray-800 ring-offset-2' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      onClick={() => setSelectedColor(color)}
                      aria-label={`Color: ${color.name}`}
                      title={color.name}
                    >
                      <span className="sr-only">{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Size selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-800">Size</h3>
                  <button 
                    className="text-xs text-blue-600 hover:text-blue-800"
                    onClick={() => alert('Size guide would show here')}
                  >
                    Size guide
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      className={`flex items-center justify-center py-2 px-3 border rounded text-sm font-medium ${
                        selectedSize === size 
                          ? 'bg-gray-800 text-white border-gray-800' 
                          : 'bg-white text-gray-800 border-gray-300 hover:border-gray-700'
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Quantity selector */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-800 mb-2">Quantity</h3>
              <div className="flex items-center">
                <button 
                  type="button"
                  className="p-2 text-gray-700 border border-gray-300 rounded-l-lg hover:bg-gray-100"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                >
                  <MinusIcon className="h-4 w-4" />
                </button>
                <input
                  type="number"
                  min="1"
                  max={product.stock}
                  value={quantity}
                  onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                  className="p-2 w-12 text-center border-y border-gray-300 focus:outline-none"
                />
                <button 
                  type="button"
                  className="p-2 text-gray-700 border border-gray-300 rounded-r-lg hover:bg-gray-100"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= product.stock}
                >
                  <PlusIcon className="h-4 w-4" />
                </button>
                
                <span className="ml-4 text-sm text-gray-500">
                  {product.stock < 10 && `Only ${product.stock} left!`}
                </span>
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <button 
                onClick={handleAddToCart}
                className={`relative flex-1 py-3 px-6 flex items-center justify-center rounded-lg font-medium 
                  ${addedToCart 
                    ? 'bg-green-600 text-white' 
                    : 'bg-white text-gray-800 border border-gray-300 hover:border-gray-800'
                  } transition-all duration-200`}
                disabled={addedToCart}
              >
                {addedToCart ? (
                  <>
                    <CheckIcon className="h-5 w-5 mr-2" />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCartIcon className="h-5 w-5 mr-2" />
                    Add to Cart
                  </>
                )}
              </button>
              <button 
                onClick={handleBuyNow}
                className="flex-1 py-3 px-6 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-700 flex items-center justify-center"
              >
                Buy Now
              </button>
              <button 
                className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                onClick={() => alert('Added to wishlist')}
              >
                <HeartIcon className="h-5 w-5 text-gray-600" />
              </button>
            </div>
            
            {/* Delivery, returns, warranty */}
            <div className="space-y-3 border-t border-gray-200 pt-6">
              <div className="flex items-start">
                <TruckIcon className="h-5 w-5 text-gray-500 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-gray-800">Free Delivery</h4>
                  <p className="text-xs text-gray-500">Estimated delivery: 3-5 business days</p>
                </div>
              </div>
              <div className="flex items-start">
                <RefreshIcon className="h-5 w-5 text-gray-500 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-gray-800">{product.returnPolicy}</h4>
                  <p className="text-xs text-gray-500">Easy returns with our hassle-free process</p>
                </div>
              </div>
              <div className="flex items-start">
                <ShieldCheckIcon className="h-5 w-5 text-gray-500 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-gray-800">{product.warranty}</h4>
                  <p className="text-xs text-gray-500">Against manufacturing defects</p>
                </div>
              </div>
            </div>
            
            {/* Share */}
            <div className="flex items-center mt-6 border-t border-gray-200 pt-6">
              <span className="text-sm text-gray-600 mr-3">Share:</span>
              <div className="flex space-x-2">
                <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                  <ShareIcon className="h-4 w-4 text-gray-600" />
                </button>
                {/* Additional social share buttons would go here */}
              </div>
            </div>
          </div>
        </div>
        
        {/* Product tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              <button
                className={`pb-4 px-1 ${
                  activeTab === 'description'
                    ? 'border-b-2 border-gray-800 text-gray-800 font-medium'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('description')}
              >
                Description
              </button>
              <button
                className={`pb-4 px-1 ${
                  activeTab === 'specifications'
                    ? 'border-b-2 border-gray-800 text-gray-800 font-medium'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('specifications')}
              >
                Specifications
              </button>
              <button
                className={`pb-4 px-1 ${
                  activeTab === 'reviews'
                    ? 'border-b-2 border-gray-800 text-gray-800 font-medium'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews ({product.reviews})
              </button>
              <button
                className={`pb-4 px-1 ${
                  activeTab === 'faqs'
                    ? 'border-b-2 border-gray-800 text-gray-800 font-medium'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('faqs')}
              >
                FAQs
              </button>
            </nav>
          </div>
          
          <div className="py-8">
            {activeTab === 'description' && (
              <div className="space-y-6">
                <p className="text-gray-600">{product.description}</p>
                
                <h3 className="text-lg font-bold text-gray-800">
                  Features
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <div className="rounded-lg overflow-hidden mt-8">
                  <img 
                    src="https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&q=75&fit=crop&w=1500"
                    alt="Product features" 
                    className="w-full h-auto"
                  />
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 mt-8">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">
                    What's in the Box
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-gray-800 rounded-full mr-2"></span>
                      Wireless Earbuds
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-gray-800 rounded-full mr-2"></span>
                      Charging Case
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-gray-800 rounded-full mr-2"></span>
                      USB-C Charging Cable
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-gray-800 rounded-full mr-2"></span>
                      3 Sizes of Ear Tips (S/M/L)
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-gray-800 rounded-full mr-2"></span>
                      User Manual & Quick Start Guide
                    </li>
                  </ul>
                </div>
              </div>
            )}
            
            {activeTab === 'specifications' && (
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <tbody className="divide-y divide-gray-200">
                    {product.specifications.map((spec, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{spec.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            
            {activeTab === 'reviews' && (
              <Reviews reviews={product.reviews_data} productName={product.name} />
            )}
            
            {activeTab === 'faqs' && (
              <ProductFAQ faqs={product.faqs} />
            )}
          </div>
        </div>
        
        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-xl font-bold text-gray-800 mb-6">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map(product => (
              <div 
                key={product.id}
                className="cursor-pointer"
                onClick={() => navigate(`/customer/product/${product.id}`)}
              >
                <RelatedProductCard 
                  product={product} 
                  onAddToCart={handleAddToCartRelated} 
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;