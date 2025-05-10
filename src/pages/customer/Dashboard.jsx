import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    ShoppingBagIcon,
    ChevronRightIcon,
    SearchIcon,
    HeartIcon,
    StarIcon,
    ShoppingCartIcon,
    ClockIcon,
    ArrowRightIcon,
    SparklesIcon,
    RefreshIcon,
    ViewGridIcon,
    ViewListIcon,
    TrendingUpIcon,
    LightningBoltIcon,
    FireIcon,
    XIcon
} from '@heroicons/react/outline';
import { useUser } from '../../context/UserContext';

// Simplified Card component with minimal animations
const HoverCard = ({ children, className = "" }) => {
    return (
        <div
            className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200 ${className}`}
        >
            {children}
        </div>
    );
};

// Simplified Product Card component
const ProductCard = ({ product, onAddToCart, onAddToWishlist }) => {
    return (
        <HoverCard className="h-full flex flex-col relative">
            <div className="relative overflow-hidden" style={{ paddingBottom: "60%" }}>
                <img 
                    src={product.image} 
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                
                {product.discount && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-lg font-medium">
                        {product.discount}% OFF
                    </div>
                )}
                
                {product.isNew && !product.discount && (
                    <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-lg font-medium flex items-center">
                        <SparklesIcon className="h-3 w-3 mr-1" />
                        NEW
                    </div>
                )}
            </div>
            
            <div className="p-4 flex-grow flex flex-col">
                <div className="flex items-center text-amber-400 mb-2">
                    {[...Array(5)].map((_, i) => (
                        <StarIcon 
                            key={i} 
                            className={`h-4 w-4 ${i < product.rating ? 'fill-current' : 'text-gray-300'}`} 
                        />
                    ))}
                    <span className="ml-1 text-xs text-gray-500">({product.reviews})</span>
                </div>
                <h3 className="text-sm font-medium text-gray-800 mb-1 line-clamp-2">{product.name}</h3>
                <p className="text-xs text-gray-500 flex-grow line-clamp-2">{product.description}</p>
                
                <div className="flex items-center justify-between mt-3">
                    <div className="flex items-baseline">
                        <span className="text-lg font-bold text-gray-800">₹{product.price.toFixed(2)}</span>
                        {product.originalPrice && (
                            <span className="ml-1 text-xs text-gray-400 line-through">
                                ₹{product.originalPrice.toFixed(2)}
                            </span>
                        )}
                    </div>
                    
                    <div className="flex space-x-2">
                        <button
                            className="p-2 rounded-full bg-gray-100 hover:bg-red-500 hover:text-white text-gray-600 transition-colors"
                            onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                onAddToWishlist(product);
                            }}
                            aria-label="Add to wishlist"
                        >
                            <HeartIcon className="h-4 w-4" />
                        </button>
                        <button
                            className="p-2 rounded-full bg-gray-100 hover:bg-gray-800 hover:text-white text-gray-600 transition-colors"
                            onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                onAddToCart(product);
                            }}
                            aria-label="Add to cart"
                        >
                            <ShoppingCartIcon className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
            
            {/* Bottom accent bar with color based on category */}
            <div className={`h-1 w-full absolute bottom-0 left-0 right-0
                ${product.category === 'Electronics' ? 'bg-blue-500' : 
                  product.category === 'Fashion' ? 'bg-pink-500' :
                  product.category === 'Home' ? 'bg-amber-500' :
                  product.category === 'Beauty' ? 'bg-purple-500' :
                  product.category === 'Sports' ? 'bg-green-500' :
                  'bg-gray-500'}`}
            />
        </HoverCard>
    );
};

// Simple category card
const CategoryCard = ({ category }) => {
    return (
        <Link to={`/customer/products?category=${category.name.toLowerCase()}`} className="block">
            <div className="flex flex-col items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
                <div className="w-16 h-16 p-3 rounded-full bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center mb-3 shadow-sm">
                    <img src={category.icon} alt={category.name} className="w-10 h-10 object-contain" />
                </div>
                <h3 className="text-sm font-medium text-gray-800 text-center">{category.name}</h3>
            </div>
        </Link>
    );
};

// Simplified promo card component
const PromoCard = ({ title, description, bgColor, textColor, bgImage, actionText, actionLink }) => {
    return (
        <Link to={actionLink} className="block h-48 relative rounded-xl overflow-hidden shadow-md">
            <div className={`absolute inset-0 ${bgColor} opacity-90 z-10`}></div>
            <img 
                src={bgImage}
                alt={title} 
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 z-20 p-6 flex flex-col justify-center">
                <span className={`text-xs font-medium ${textColor} mb-2`}>SPECIAL OFFER</span>
                <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
                <p className="text-sm mb-4 text-white opacity-90">{description}</p>
                <div className="mt-2 px-4 py-2 bg-white text-gray-800 rounded-lg hover:bg-opacity-90 transition-colors w-fit flex items-center">
                    {actionText}
                    <ChevronRightIcon className="h-4 w-4 ml-1" />
                </div>
            </div>
        </Link>
    );
};

const CustomerDashboard = () => {
    const navigate = useNavigate();
    const { user } = useUser();
    const [activeTab, setActiveTab] = useState('recommended');
    const [productView, setProductView] = useState('grid');
    const [loading, setLoading] = useState(true);
    const [cartCount, setCartCount] = useState(0);
    const [wishlistCount, setWishlistCount] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [showNotification, setShowNotification] = useState(false);
    const [notification, setNotification] = useState({ title: '', message: '' });

    // Mock categories with improved icons
    const categories = [
        { id: 1, name: 'Electronics', icon: 'https://cdn-icons-png.flaticon.com/512/3659/3659898.png' },
        { id: 2, name: 'Fashion', icon: 'https://cdn-icons-png.flaticon.com/512/2331/2331966.png' },
        { id: 3, name: 'Home', icon: 'https://cdn-icons-png.flaticon.com/512/1046/1046857.png' },
        { id: 4, name: 'Beauty', icon: 'https://cdn-icons-png.flaticon.com/512/1005/1005751.png' },
        { id: 5, name: 'Grocery', icon: 'https://cdn-icons-png.flaticon.com/512/3724/3724788.png' },
        { id: 6, name: 'Books', icon: 'https://cdn-icons-png.flaticon.com/512/2231/2231605.png' },
        { id: 7, name: 'Toys', icon: 'https://cdn-icons-png.flaticon.com/512/3081/3081559.png' },
        { id: 8, name: 'Sports', icon: 'https://cdn-icons-png.flaticon.com/512/857/857455.png' },
    ];

    // Mock products with enhanced data
    const productsData = [
        {
            id: 1,
            name: 'Premium Wireless Earbuds',
            description: 'High quality sound with active noise cancellation and 24 hour battery life.',
            image: 'https://images.unsplash.com/photo-1606741965234-7adff9ee2ea9?auto=format&q=75&fit=crop&w=600',
            price: 1999.00,
            originalPrice: 3499.00,
            rating: 4.5,
            reviews: 128,
            discount: 43,
            category: 'Electronics',
            isNew: true,
            trending: true
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
            isNew: false,
            exclusive: true
        },
        {
            id: 3,
            name: 'Premium Cotton T-Shirt',
            description: 'Comfortable, breathable cotton with modern slim fit design.',
            image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&q=75&fit=crop&w=600',
            price: 599.00,
            originalPrice: 999.00,
            rating: 4,
            reviews: 45,
            discount: 40,
            category: 'Fashion',
            isNew: false
        },
        {
            id: 4,
            name: 'Ergonomic Office Chair',
            description: 'Full back support with adjustable height and recline for maximum comfort.',
            image: 'https://images.unsplash.com/photo-1505843513577-22bb7d21e455?auto=format&q=75&fit=crop&w=600',
            price: 8999.00,
            originalPrice: 12999.00,
            rating: 5,
            reviews: 36,
            discount: 30,
            category: 'Home',
            isNew: true,
            featured: true
        },
        {
            id: 5,
            name: 'Organic Face Serum',
            description: 'Vitamin C enriched serum for glowing, youthful skin. 100% organic ingredients.',
            image: 'https://images.unsplash.com/photo-1570194065650-d99fb4ee7694?auto=format&q=75&fit=crop&w=600',
            price: 899.00,
            originalPrice: 1299.00,
            rating: 4.5,
            reviews: 73,
            discount: 30,
            category: 'Beauty',
            isNew: false,
            bestseller: true
        },
        {
            id: 6,
            name: 'Stainless Steel Water Bottle',
            description: 'Double-walled insulation keeps drinks cold for 24 hours or hot for 12 hours.',
            image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&q=75&fit=crop&w=600',
            price: 799.00,
            originalPrice: 1199.00,
            rating: 4,
            reviews: 52,
            discount: 33,
            category: 'Home',
            isNew: false
        },
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
            isNew: true,
            exclusive: true
        },
        {
            id: 8,
            name: 'Yoga Mat',
            description: 'Non-slip, eco-friendly exercise mat with perfect cushioning for all workouts.',
            image: 'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?auto=format&q=75&fit=crop&w=600',
            price: 999.00,
            originalPrice: 1499.00,
            rating: 5,
            reviews: 28,
            discount: 33,
            category: 'Sports',
            isNew: false
        }
    ];

    // Simulate loading delay
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
            // Mock cart count
            setCartCount(2);
            setWishlistCount(3);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    const handleAddToCart = (product) => {
        setCartCount(prev => prev + 1);
        setNotification({
            title: 'Added to Cart',
            message: `${product.name} has been added to your cart.`
        });
        setShowNotification(true);

        // Hide notification after 3 seconds
        setTimeout(() => {
            setShowNotification(false);
        }, 3000);
    };

    const handleAddToWishlist = (product) => {
        setWishlistCount(prev => prev + 1);
        setNotification({
            title: 'Added to Wishlist',
            message: `${product.name} has been added to your wishlist.`
        });
        setShowNotification(true);

        // Hide notification after 3 seconds
        setTimeout(() => {
            setShowNotification(false);
        }, 3000);
    };

    const filteredProducts = productsData.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getFilteredProducts = () => {
        if (searchQuery) return filteredProducts;
        
        switch (activeTab) {
            case 'new':
                return productsData.filter(p => p.isNew);
            case 'trending':
                return productsData.filter(p => p.trending);
            case 'deals':
                return productsData.filter(p => p.discount && p.discount >= 30);
            case 'popular':
                return productsData.filter(p => p.reviews > 50);
            case 'recommended':
            default:
                return productsData;
        }
    };

    const displayProducts = getFilteredProducts();

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Header with welcome message and search */}
            <div className="bg-white shadow-sm border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800 flex items-center">
                                Welcome back
                                <span className="ml-2 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                                    {user?.name || 'Customer'}
                                </span>
                            </h1>
                            <p className="text-gray-600">Find amazing products from top sellers</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="relative flex-grow max-w-md">
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-150"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <SearchIcon className="h-5 w-5 text-gray-400" />
                                </div>
                            </div>
                            <Link to="/customer/wishlist" className="relative p-2 text-gray-600 hover:text-red-500 transition-colors">
                                <HeartIcon className="h-6 w-6" />
                                {wishlistCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                                        {wishlistCount}
                                    </span>
                                )}
                            </Link>
                            <Link to="/customer/cart" className="relative p-2 text-gray-600 hover:text-blue-500 transition-colors">
                                <ShoppingCartIcon className="h-6 w-6" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                {/* Hero banner */}
                <div className="mb-10">
                    <div className="relative rounded-2xl overflow-hidden shadow-lg">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-800/80 to-transparent z-10"></div>
                        <img
                            src="https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&q=75&fit=crop&w=2000"
                            alt="Special offers"
                            className="w-full h-64 sm:h-80 object-cover"
                        />
                        <div className="absolute inset-0 z-20 flex items-center">
                            <div className="px-6 sm:px-12 max-w-xl">
                                <div>
                                    <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider text-white uppercase bg-gradient-to-r from-blue-600 to-purple-600 rounded-md mb-4">Limited Time Offer</span>
                                    <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4 drop-shadow-md">Summer Sale 2025!</h2>
                                    <p className="text-sm sm:text-base text-blue-100 mb-6 max-w-md drop-shadow-md">
                                        Get up to 50% off on our top-rated products. Limited time offer - don't miss out!
                                    </p>
                                    <Link to="/customer/offers" className="px-6 py-3 bg-white text-blue-800 font-medium rounded-lg hover:bg-blue-50 transition shadow-lg inline-flex items-center group">
                                        Shop Now
                                        <ChevronRightIcon className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Categories with grid layout */}
                <section className="mb-12">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-800">Browse Categories</h2>
                        <Link to="/customer/categories" className="text-sm text-blue-600 hover:text-blue-800 flex items-center transition-colors">
                            View All
                            <ArrowRightIcon className="ml-1 h-4 w-4" />
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4">
                        {categories.map((category) => (
                            <CategoryCard key={category.id} category={category} />
                        ))}
                    </div>
                </section>

                {/* Products */}
                <section>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                        <div className="flex items-center space-x-4 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
                            <button
                                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${activeTab === 'recommended'
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'bg-white text-gray-700 hover:bg-gray-100'
                                    }`}
                                onClick={() => setActiveTab('recommended')}
                            >
                                <span className="hidden sm:inline">Recommended</span>
                                <span className="sm:hidden">For You</span>
                            </button>
                            <button
                                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap flex items-center gap-1.5 transition-all duration-200 ${activeTab === 'new'
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'bg-white text-gray-700 hover:bg-gray-100'
                                    }`}
                                onClick={() => setActiveTab('new')}
                            >
                                <SparklesIcon className="h-4 w-4" />
                                <span>New Arrivals</span>
                            </button>
                            <button
                                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap flex items-center gap-1.5 transition-all duration-200 ${activeTab === 'trending'
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'bg-white text-gray-700 hover:bg-gray-100'
                                    }`}
                                onClick={() => setActiveTab('trending')}
                            >
                                <TrendingUpIcon className="h-4 w-4" />
                                <span>Trending</span>
                            </button>
                            <button
                                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap flex items-center gap-1.5 transition-all duration-200 ${activeTab === 'deals'
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'bg-white text-gray-700 hover:bg-gray-100'
                                    }`}
                                onClick={() => setActiveTab('deals')}
                            >
                                <LightningBoltIcon className="h-4 w-4" />
                                <span>Flash Deals</span>
                            </button>
                            <button
                                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap flex items-center gap-1.5 transition-all duration-200 ${activeTab === 'popular'
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'bg-white text-gray-700 hover:bg-gray-100'
                                    }`}
                                onClick={() => setActiveTab('popular')}
                            >
                                <FireIcon className="h-4 w-4" />
                                <span>Popular</span>
                            </button>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => setProductView('grid')}
                                className={`p-2 rounded-lg ${productView === 'grid' ? 'bg-blue-100 text-blue-700' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                            >
                                <ViewGridIcon className="h-5 w-5" />
                            </button>
                            <button
                                onClick={() => setProductView('list')}
                                className={`p-2 rounded-lg ${productView === 'list' ? 'bg-blue-100 text-blue-700' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                            >
                                <ViewListIcon className="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                            {[...Array(8)].map((_, index) => (
                                <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 p-4 h-80">
                                    <div className="animate-pulse flex flex-col h-full">
                                        <div className="rounded bg-gray-200 h-40 mb-4"></div>
                                        <div className="flex-1 space-y-4 py-1">
                                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                            <div className="space-y-2">
                                                <div className="h-4 bg-gray-200 rounded"></div>
                                                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                                            </div>
                                            <div className="flex items-center justify-between pt-4">
                                                <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                                                <div className="h-6 bg-gray-200 rounded-full w-8"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div>
                            {displayProducts.length > 0 ? (
                                <div className={`
                                    ${productView === 'grid'
                                        ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6'
                                        : 'flex flex-col space-y-5'}
                                `}>
                                    {displayProducts.map((product) => (
                                        <div
                                            key={product.id}
                                            className="cursor-pointer"
                                            onClick={() => navigate(`/customer/product/${product.id}`)}
                                        >
                                            {productView === 'grid' ? (
                                                <ProductCard 
                                                    product={product} 
                                                    onAddToCart={handleAddToCart}
                                                    onAddToWishlist={handleAddToWishlist} 
                                                />
                                            ) : (
                                                <div className="bg-white rounded-xl overflow-hidden border border-gray-100 flex hover:shadow-md transition-shadow duration-200">
                                                    <div className="w-32 sm:w-48 overflow-hidden">
                                                        <img
                                                            src={product.image}
                                                            alt={product.name}
                                                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                                        />
                                                    </div>
                                                    <div className="p-4 flex-grow flex flex-col">
                                                        <div className="flex items-center justify-between mb-2">
                                                            <div className="flex items-center text-amber-400">
                                                                {[...Array(5)].map((_, i) => (
                                                                    <StarIcon
                                                                        key={i}
                                                                        className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'}`}
                                                                    />
                                                                ))}
                                                                <span className="ml-1 text-xs text-gray-500">({product.reviews})</span>
                                                            </div>
                                                            <div className="flex items-center space-x-2">
                                                                {product.trending && (
                                                                    <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded font-medium inline-flex items-center">
                                                                        <TrendingUpIcon className="h-3 w-3 mr-1" />
                                                                        Trending
                                                                    </span>
                                                                )}
                                                                {product.isNew && (
                                                                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded font-medium inline-flex items-center">
                                                                        <SparklesIcon className="h-3 w-3 mr-1" />
                                                                        NEW
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <h3 className="text-sm font-medium text-gray-800 mb-1">{product.name}</h3>
                                                        <p className="text-xs text-gray-500 flex-grow">{product.description}</p>

                                                        <div className="flex items-center justify-between mt-4">
                                                            <div className="flex items-baseline">
                                                                <span className="text-lg font-bold text-gray-800">₹{product.price.toFixed(2)}</span>
                                                                {product.originalPrice && (
                                                                    <span className="ml-2 text-xs text-gray-400 line-through">
                                                                        ₹{product.originalPrice.toFixed(2)}
                                                                    </span>
                                                                )}
                                                                {product.discount && (
                                                                    <span className="ml-2 text-xs font-medium text-green-600">
                                                                        {product.discount}% OFF
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <div className="flex items-center space-x-2">
                                                                <button
                                                                    className="p-2 rounded-full bg-gray-100 hover:bg-red-500 hover:text-white text-gray-600 transition-colors"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        e.preventDefault();
                                                                        handleAddToWishlist(product);
                                                                    }}
                                                                    aria-label="Add to wishlist"
                                                                >
                                                                    <HeartIcon className="h-5 w-5" />
                                                                </button>
                                                                <button
                                                                    className="p-2 rounded-full bg-gray-100 hover:bg-blue-600 hover:text-white text-gray-600 transition-colors"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        e.preventDefault();
                                                                        handleAddToCart(product);
                                                                    }}
                                                                    aria-label="Add to cart"
                                                                >
                                                                    <ShoppingCartIcon className="h-5 w-5" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-12 text-center">
                                    <SearchIcon className="h-16 w-16 text-gray-300 mb-4" />
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                                    <p className="text-gray-500 max-w-md mb-6">
                                        We couldn't find any products matching your search. Try different keywords or browse categories.
                                    </p>
                                    <button 
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center shadow-md"
                                        onClick={() => setSearchQuery('')}
                                    >
                                        <RefreshIcon className="h-4 w-4 mr-2" />
                                        Reset Search
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </section>

                {/* Recently viewed section */}
                <section className="mt-12">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-800 flex items-center">
                            <ClockIcon className="h-5 w-5 mr-2 text-gray-600" />
                            Recently Viewed
                        </h2>
                        <Link to="/customer/history" className="text-sm text-blue-600 hover:text-blue-800 flex items-center group transition-colors">
                            View All
                            <ArrowRightIcon className="ml-1 h-4 w-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {productsData.slice(0, 6).map((product) => (
                            <Link 
                                key={product.id} 
                                to={`/customer/product/${product.id}`}
                                className="block"
                            >
                                <div className="bg-white rounded-xl overflow-hidden border border-gray-100 p-2 hover:shadow-md transition-shadow duration-200">
                                    <div className="relative" style={{ paddingBottom: '100%' }}>
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                        />
                                    </div>
                                    <div className="pt-2">
                                        <p className="text-xs line-clamp-1 text-gray-800 font-medium">{product.name}</p>
                                        <p className="text-xs font-semibold text-gray-900">₹{product.price.toFixed(2)}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Featured promotions */}
                <section className="mt-12 mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-800 flex items-center">
                            <SparklesIcon className="h-5 w-5 mr-2 text-amber-500" />
                            Featured Collections
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <PromoCard 
                            title="Up to 40% Off Electronics"
                            description="Limited time special on premium gadgets"
                            bgColor="bg-gradient-to-r from-purple-900 to-purple-700"
                            textColor="text-purple-200"
                            bgImage="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&q=75&fit=crop&w=1000"
                            actionText="Explore Offers"
                            actionLink="/customer/products?category=electronics"
                        />
                        
                        <PromoCard 
                            title="Flash Sale: 50% Off Fashion"
                            description="24 hours only - refresh your wardrobe now"
                            bgColor="bg-gradient-to-r from-blue-900 to-blue-700"
                            textColor="text-blue-200"
                            bgImage="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&q=75&fit=crop&w=1000"
                            actionText="Shop Now"
                            actionLink="/customer/products?category=fashion"
                        />
                    </div>
                </section>
            </div>

            {/* Toast notification */}
            {showNotification && (
                <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg border border-gray-100 p-4 max-w-xs w-full z-50">
                    <div className="flex items-start">
                        <div className="flex-1">
                            <h3 className="font-medium text-gray-900">{notification.title}</h3>
                            <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                        </div>
                        <button
                            className="ml-4 text-gray-400 hover:text-gray-600"
                            onClick={() => setShowNotification(false)}
                        >
                            <XIcon className="h-5 w-5" />
                        </button>
                    </div>
                    <div className="h-1 w-full bg-gray-100 absolute left-0 bottom-0 rounded-b-lg overflow-hidden">
                        <div className="h-full bg-blue-500 animate-[shrink_3s_linear_forwards]" style={{width: "100%"}} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomerDashboard;