import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation, useInView } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  ChartBarIcon,
  UserGroupIcon,
  ShoppingBagIcon,
  ChatAlt2Icon,
  CubeIcon,
  CurrencyDollarIcon,
  InformationCircleIcon,
  SparklesIcon,
  LightningBoltIcon,
  GlobeAltIcon,
  QrcodeIcon,
  XIcon,
  ArrowsExpandIcon,
  ChevronUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CheckCircleIcon
} from '@heroicons/react/outline';
import LandingPageNavbar from './LandingPageNavbar';
import LandingPageFooter from './LandingPageFooter';

// Utility function for gradient text styling
const GradientText = ({ children, className = "" }) => {
  return (
    <span className={`bg-clip-text text-transparent bg-gradient-to-r from-gray-700 via-gray-600 to-gray-800 ${className}`}>
      {children}
    </span>
  );
};

// Shimmer button component
const ShimmerButton = ({ children, className = "", onClick, ...props }) => {
  return (
    <button
      onClick={onClick}
      {...props}
      className={`relative inline-flex h-12 items-center justify-center rounded-lg bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 px-6 font-medium text-white transition-all duration-300 hover:shadow-lg hover:shadow-gray-700/20 focus:outline-none ${className}`}
    >
      <div className="absolute inset-0 overflow-hidden rounded-lg">
        <div className="absolute -inset-[100%] animate-[shimmer_2s_linear_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>
      <span className="z-10 flex items-center gap-2">{children}</span>
    </button>
  );
};

// Spotlight component
const Spotlight = ({ className = "", fill = "white" }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0.5] }}
      transition={{ repeat: Infinity, duration: 5, repeatType: "reverse" }}
      className={`absolute -top-40 -left-40 h-[40rem] w-[40rem] bg-[${fill}] opacity-[0.15] blur-[100px] ${className}`}
    />
  );
};

// Aceternity-inspired card component with hover effect
const HoverCard = ({ icon, title, description, className = "" }) => {
  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={`relative group overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 shadow-lg ${className}`}
    >
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-gray-100 to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative z-10">
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-gray-700 to-gray-900">
          {icon}
        </div>
        <h3 className="mb-3 text-xl font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </motion.div>
  );
};

// Animation wrapper component for scroll-based animations
const MotionWrapper = ({ children, delayOrder = 0 }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            delay: delayOrder * 0.1
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
};

// New Card Flip component inspired by ui.aceternity.com
const CardFlip = ({ frontContent, backContent }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="relative w-full h-96 perspective-1000"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div
        className={`relative w-full h-full transition-all duration-500 transform-style-preserve-3d ${isFlipped ? "rotate-y-180" : ""
          }`}
      >
        <div className="absolute inset-0 backface-hidden">
          {frontContent}
        </div>
        <div className="absolute inset-0 backface-hidden rotate-y-180">
          {backContent}
        </div>
      </div>
    </div>
  );
};

// New 3D Tilt Card inspired by uiverse.io
const TiltCard = ({ children, className = "" }) => {
  const cardRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (cardRef.current) {
      const card = cardRef.current;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 25;
      const rotateY = (centerX - x) / 25;

      setRotation({ x: rotateX, y: rotateY });
    }
  };

  return (
    <div
      ref={cardRef}
      className={`transform transition-all duration-200 ${className} ${isHovered ? "z-10 shadow-2xl" : ""
        }`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setRotation({ x: 0, y: 0 });
      }}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(1.05, 1.05, 1.05)`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
      }}
    >
      {children}
    </div>
  );
};

const LandingPage = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [showQrPopup, setShowQrPopup] = useState(true); // Always show in minimized or expanded state
  const [isQrExpanded, setIsQrExpanded] = useState(false);
  const [qrPosition, setQrPosition] = useState({ x: 0, y: 0 });
  const popupRef = useRef(null);

  const marketplaceRef = useRef(null);
  const pricingRef = useRef(null);
  const aboutUsRef = useRef(null);
  const contactRef = useRef(null);
  const howItWorksRef = useRef(null);

  const slides = [
    {
      title: "Empower Your Business",
      subtitle: "Reach millions of customers across multiple platforms",
      description: "Sell your products on Amazon, Flipkart, Meesho, and more with a single dashboard",
      image: "https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      cta: "Start Selling",
      type: "seller"
    },
    {
      title: "Discover Unique Products",
      subtitle: "Shop from verified small-town sellers",
      description: "Find authentic products directly from local artisans and businesses",
      image: "https://images.unsplash.com/photo-1542744173-05336fcc7ad4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      cta: "Start Shopping",
      type: "buyer"
    },
    {
      title: "Unified E-commerce",
      subtitle: "One platform for all your selling needs",
      description: "Manage inventory, orders, and analytics across all marketplaces in one place",
      image: "https://images.unsplash.com/photo-1661956602868-6ae368943878?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      cta: "Get Started",
      type: "seller"
    }
  ];

  const testimonials = [
    {
      name: "John Doe",
      role: "Seller",
      content: "This platform has transformed my business. The tools and analytics are incredible!",
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      name: "Jane Smith",
      role: "Buyer",
      content: "I love the seamless shopping experience. Finding unique products has never been easier!",
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      name: "David Wilson",
      role: "Seller",
      content: "The multi-platform integration saved me countless hours. My sales have increased by 45% since joining.",
      image: "https://randomuser.me/api/portraits/men/62.jpg"
    },
    {
      name: "Sarah Johnson",
      role: "Buyer",
      content: "I can easily find authentic artisanal products that aren't available anywhere else. The quality is outstanding!",
      image: "https://randomuser.me/api/portraits/women/54.jpg"
    }
  ];

  // How It Works steps
  const howItWorksSteps = [
    {
      title: "Sign Up",
      description: "Create your account and set up your profile with your business details and preferences.",
      icon: <UserGroupIcon className="w-8 h-8 text-white" />,
      color: "from-emerald-500 to-emerald-700"
    },
    {
      title: "Connect Platforms",
      description: "Link your existing marketplace accounts to centralize your inventory and orders.",
      icon: <GlobeAltIcon className="w-8 h-8 text-white" />,
      color: "from-blue-500 to-blue-700"
    },
    {
      title: "Upload Products",
      description: "Add your products once and publish them across multiple platforms simultaneously.",
      icon: <CubeIcon className="w-8 h-8 text-white" />,
      color: "from-purple-500 to-purple-700"
    },
    {
      title: "Manage Orders",
      description: "Process orders, track shipments, and manage customer communications in one place.",
      icon: <ShoppingBagIcon className="w-8 h-8 text-white" />,
      color: "from-amber-500 to-amber-700"
    }
  ];

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  // Show QR popup after a small delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowQrPopup(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Drag functionality for the QR popup
  const onDragEnd = (event, info) => {
    const newPosition = {
      x: qrPosition.x + info.offset.x,
      y: qrPosition.y + info.offset.y
    };
    setQrPosition(newPosition);
  };

  // Toggle QR popup expansion
  const toggleQrExpanded = () => {
    setIsQrExpanded(!isQrExpanded);
  };

  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  // Handle Get Started button click
  const handleGetStarted = () => {
    navigate('/auth'); // Redirects to the authentication page
  };

  return (
    <div className="min-h-screen bg-white">
      <LandingPageNavbar
        scrollToMarketplace={() => scrollToSection(marketplaceRef)}
        scrollToPricing={() => scrollToSection(pricingRef)}
        scrollToAbout={() => scrollToSection(aboutUsRef)}
        scrollToHowItWorks={() => scrollToSection(howItWorksRef)}
      />

      {/* Hero Section with Carousel - Cosmos/Aceternity UI Inspired */}
      <section className="relative h-[700px] md:h-[700px] overflow-hidden bg-white">
        {/* Animated Background Elements - Inspired by Aceternity UI */}
        <div className="absolute inset-0 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#f3f4f6_100%)]" />
        <Spotlight />

        <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-gray-200 opacity-20 blur-[100px]" />

        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-32 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />

        {/* Carousel Navigation */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 z-10 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-lg hover:bg-white transition-colors text-gray-700"
          aria-label="Previous slide"
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 z-10 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-lg hover:bg-white transition-colors text-gray-700"
          aria-label="Next slide"
        >
          <ChevronRightIcon className="h-6 w-6" />
        </button>

        {/* Carousel Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex space-x-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentSlide(idx);
                setIsAutoPlaying(false);
              }}
              className={`h-2 rounded-full transition-all ${idx === currentSlide ? "w-8 bg-gray-800" : "w-2 bg-gray-400"
                }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center pt-16 md:pt-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full"
            >
              <div className="relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <span className="inline-block px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-gray-700 bg-gray-100 rounded-full border border-gray-200 shadow-sm">
                    {slides[currentSlide].type === "seller" ? "For Sellers" : "For Buyers"}
                  </span>
                </motion.div>
                <motion.h1
                  className="mt-6 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  {slides[currentSlide].title}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="text-lg md:text-xl text-gray-600 mb-10 max-w-lg"
                >
                  {slides[currentSlide].description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <ShimmerButton
                    className="h-12 sm:h-14 px-6 sm:px-10 rounded-xl text-base sm:text-lg font-medium"
                    onClick={handleGetStarted}
                  >
                    {slides[currentSlide].cta}
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </ShimmerButton>
                  <button
                    onClick={() => scrollToSection(howItWorksRef)}
                    className="inline-flex h-12 sm:h-14 items-center justify-center rounded-xl border border-gray-300 bg-white px-6 sm:px-10 font-medium text-gray-700 transition-colors hover:bg-gray-100 focus:outline-none"
                  >
                    Learn More
                  </button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.0 }}
                  className="mt-10 flex items-center gap-3"
                >
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="inline-block h-8 w-8 rounded-full border-2 border-white overflow-hidden">
                        <img
                          src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${20 + i}.jpg`}
                          alt={`User ${i}`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="text-sm text-gray-500">
                    <span className="font-medium text-gray-700">5,000+</span> sellers trust our platform
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="hidden lg:block relative"
              >
                <TiltCard className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
                  <div className="absolute inset-0 bg-gradient-to-tr from-gray-100 to-white opacity-50" />
                  <img
                    src={slides[currentSlide].image}
                    alt={slides[currentSlide].title}
                    className="w-full h-auto rounded-2xl relative z-10"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                  {/* Floating elements */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.0 }}
                    className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-100"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-gray-800">Monthly Revenue</div>
                        <div className="text-2xl font-bold text-gray-900">₹1.85L</div>
                        <div className="flex items-center text-emerald-600 text-xs">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                          </svg>
                          <span>23% from last month</span>
                        </div>
                      </div>
                      <div className="h-16 w-24 bg-gradient-to-r from-emerald-500 to-emerald-700 rounded-lg overflow-hidden relative">
                        {/* Simple bar chart */}
                        <div className="absolute bottom-0 left-0 w-3 h-7 bg-white/50 mx-0.5 rounded-t"></div>
                        <div className="absolute bottom-0 left-4 w-3 h-9 bg-white/50 mx-0.5 rounded-t"></div>
                        <div className="absolute bottom-0 left-8 w-3 h-5 bg-white/50 mx-0.5 rounded-t"></div>
                        <div className="absolute bottom-0 left-12 w-3 h-12 bg-white/50 mx-0.5 rounded-t"></div>
                        <div className="absolute bottom-0 left-16 w-3 h-8 bg-white/50 mx-0.5 rounded-t"></div>
                        <div className="absolute bottom-0 left-20 w-3 h-10 bg-white/50 mx-0.5 rounded-t"></div>
                      </div>
                    </div>
                  </motion.div>
                </TiltCard>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* How It Works Section - ENHANCED */}
      <section ref={howItWorksRef} id="how-it-works" className="py-24 bg-gray-50 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Section header */}
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <MotionWrapper delayOrder={0}>
              <motion.span
                className="inline-block px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-gray-700 bg-gray-100 rounded-full"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                Our Process
              </motion.span>
            </MotionWrapper>
            <MotionWrapper delayOrder={1}>
              <h2 className="mt-6 text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                How <GradientText className="bg-gradient-to-r from-gray-700 to-gray-900">It Works</GradientText>
              </h2>
            </MotionWrapper>
            <MotionWrapper delayOrder={2}>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                Get started with our platform in just four simple steps and transform how you manage
                your e-commerce business across multiple marketplaces.
              </p>
            </MotionWrapper>
          </div>

          {/* Visual journey illustration */}
          <div className="hidden md:flex justify-center mb-16">
            <motion.div
              className="relative h-12 w-4/5"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-gray-700 to-gray-900 transform -translate-y-1/2 rounded-full"></div>
              {[0, 1, 2, 3].map((step) => (
                <motion.div
                  key={step}
                  className="absolute top-1/2 transform -translate-y-1/2"
                  style={{ left: `${step * 33.3}%` }}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: step * 0.2, type: "spring", stiffness: 300, damping: 15 }}
                >
                  <div className="flex flex-col items-center">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white bg-gradient-to-br ${howItWorksSteps[step].color
                      } shadow-lg`}>
                      {step + 1}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Detailed steps with enhanced visuals */}
          <div className="space-y-24 md:space-y-32">
            {howItWorksSteps.map((step, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className={`grid md:grid-cols-2 gap-8 md:gap-16 items-center ${index % 2 === 1 ? 'md:grid-flow-dense' : ''
                  }`}>
                  {/* Visual side */}
                  <div className={`${index % 2 === 1 ? 'md:col-start-2' : ''}`}>
                    <div className="relative">
                      {/* Background shape */}
                      <div className="absolute -inset-4 bg-gradient-to-r from-gray-100 to-gray-50 rounded-3xl transform rotate-3 shadow-inner"></div>

                      {/* Main content card */}
                      <TiltCard className="relative bg-white rounded-2xl shadow-xl border border-gray-100 p-6 overflow-hidden">
                        <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br from-gray-50 to-gray-100"></div>

                        {/* Step number */}
                        <div className="relative flex justify-end mb-6">
                          <motion.div
                            className={`h-14 w-14 rounded-full flex items-center justify-center text-xl font-bold text-white bg-gradient-to-br ${step.color} shadow-lg`}
                            whileHover={{ scale: 1.1, rotate: 10 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          >
                            {index + 1}
                          </motion.div>
                        </div>

                        {/* Step illustration */}
                        <div className="relative h-64 mb-6 rounded-xl overflow-hidden border border-gray-100">
                          <div className="absolute inset-0 bg-gradient-to-br from-gray-100/50 to-white"></div>

                          <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div
                              className={`h-24 w-24 rounded-full flex items-center justify-center bg-gradient-to-br ${step.color} bg-opacity-10`}
                              animate={{ scale: [1, 1.05, 1] }}
                              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                            >
                              <div className={`h-16 w-16 rounded-full flex items-center justify-center bg-gradient-to-br ${step.color}`}>
                                {step.icon}
                              </div>
                            </motion.div>
                          </div>

                          {/* Additional visual elements specific to each step */}
                          {index === 0 && (
                            <>
                              <motion.div
                                className="absolute top-8 left-8 w-14 h-8 bg-white rounded-lg shadow-md flex items-center justify-center"
                                animate={{ y: [0, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 3, delay: 1 }}
                              >
                                <span className="text-xs font-medium text-gray-600">Sign Up</span>
                              </motion.div>
                              <motion.div
                                className="absolute bottom-8 right-8 w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center"
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ repeat: Infinity, duration: 3 }}
                              >
                                <CheckCircleIcon className="h-6 w-6 text-emerald-500" />
                              </motion.div>
                            </>
                          )}

                          {index === 1 && (
                            <>
                              <motion.div
                                className="absolute top-6 right-8 h-10 w-10 rounded-md bg-white shadow-md flex items-center justify-center"
                                animate={{ x: [0, 10, 0] }}
                                transition={{ repeat: Infinity, duration: 4, delay: 0.5 }}
                              >
                                <svg className="h-6 w-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                </svg>
                              </motion.div>
                              <motion.div
                                className="absolute top-20 left-6 h-8 w-16 rounded-md bg-white shadow-md flex items-center justify-center"
                                animate={{ rotate: [0, 5, 0, -5, 0] }}
                                transition={{ repeat: Infinity, duration: 5 }}
                              >
                                <span className="text-xs font-medium text-blue-600">Connect</span>
                              </motion.div>
                              <motion.div
                                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 h-8 w-32 rounded-md bg-white shadow-md flex items-center justify-center"
                                animate={{ y: [0, -5, 0] }}
                                transition={{ repeat: Infinity, duration: 2.5 }}
                              >
                                <span className="text-xs font-medium text-gray-600">Marketplaces</span>
                              </motion.div>
                            </>
                          )}

                          {index === 2 && (
                            <>
                              <motion.div
                                className="absolute top-6 left-6 h-10 w-10 rounded-md bg-white shadow-md flex items-center justify-center"
                                animate={{ y: [0, -8, 0] }}
                                transition={{ repeat: Infinity, duration: 3, delay: 0.2 }}
                              >
                                <svg className="h-6 w-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                                </svg>
                              </motion.div>
                              <motion.div
                                className="absolute bottom-6 right-6 h-10 w-10 rounded-md bg-white shadow-md flex items-center justify-center"
                                animate={{ scale: [1, 0.9, 1] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                              >
                                <svg className="h-6 w-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                              </motion.div>
                              <motion.div
                                className="absolute bottom-16 left-1/3 transform -translate-x-1/2 h-8 w-20 rounded-md bg-white shadow-md flex items-center justify-center"
                                animate={{ opacity: [1, 0.7, 1] }}
                                transition={{ repeat: Infinity, duration: 3 }}
                              >
                                <span className="text-xs font-medium text-gray-600">Products</span>
                              </motion.div>
                            </>
                          )}

                          {index === 3 && (
                            <>
                              <motion.div
                                className="absolute top-6 right-6 h-10 w-10 rounded-md bg-white shadow-md flex items-center justify-center"
                                animate={{ rotate: [0, 10, 0, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 4 }}
                              >
                                <svg className="h-6 w-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                              </motion.div>
                              <motion.div
                                className="absolute bottom-6 left-6 h-12 w-24 rounded-md bg-white shadow-md flex items-center justify-center"
                                animate={{ scale: [1, 0.95, 1] }}
                                transition={{ repeat: Infinity, duration: 3 }}
                              >
                                <span className="text-xs font-medium text-gray-700">Track Orders</span>
                              </motion.div>
                              <motion.div
                                className="absolute top-20 left-10 h-8 w-8 rounded-full bg-white shadow-md flex items-center justify-center"
                                animate={{ x: [0, 20, 0] }}
                                transition={{ repeat: Infinity, duration: 5 }}
                              >
                                <svg className="h-4 w-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              </motion.div>
                            </>
                          )}
                        </div>
                      </TiltCard>
                    </div>
                  </div>

                  {/* Content side */}
                  <div className={`${index % 2 === 1 ? 'md:col-start-1 md:text-right' : ''}`}>
                    <motion.div
                      className={`inline-flex h-12 w-12 mb-6 items-center justify-center rounded-xl bg-gradient-to-br ${step.color}`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      {step.icon}
                    </motion.div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                      {step.title}
                    </h3>
                    <p className="text-lg text-gray-600 mb-6">
                      {step.description}
                    </p>
                    <div className="mt-6 space-y-4">
                      {index === 0 && (
                        <>
                          <div className="flex items-center gap-3">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                              <svg className="h-4 w-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                              </svg>
                            </div>
                            <p className="text-gray-600">Quick registration with email or social accounts</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                              <svg className="h-4 w-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                              </svg>
                            </div>
                            <p className="text-gray-600">Complete your business profile with key details</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                              <svg className="h-4 w-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                              </svg>
                            </div>
                            <p className="text-gray-600">Secure authentication with two-factor options</p>
                          </div>
                        </>
                      )}
                      {index === 1 && (
                        <>
                          <div className="flex items-center gap-3">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                              <svg className="h-4 w-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                              </svg>
                            </div>
                            <p className="text-gray-600">Seamless API integrations with major marketplaces</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                              <svg className="h-4 w-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                              </svg>
                            </div>
                            <p className="text-gray-600">Authorize access with secure OAuth protocols</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                              <svg className="h-4 w-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                              </svg>
                            </div>
                            <p className="text-gray-600">Real-time synchronization across all platforms</p>
                          </div>
                        </>
                      )}
                      {index === 2 && (
                        <>
                          <div className="flex items-center gap-3">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center">
                              <svg className="h-4 w-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                              </svg>
                            </div>
                            <p className="text-gray-600">Bulk upload products with our CSV/Excel templates</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center">
                              <svg className="h-4 w-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                              </svg>
                            </div>
                            <p className="text-gray-600">AI-powered description and title optimization</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center">
                              <svg className="h-4 w-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                              </svg>
                            </div>
                            <p className="text-gray-600">Automatic pricing strategies across marketplaces</p>
                          </div>
                        </>
                      )}
                      {index === 3 && (
                        <>
                          <div className="flex items-center gap-3">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center">
                              <svg className="h-4 w-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                              </svg>
                            </div>
                            <p className="text-gray-600">Centralized order management dashboard</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center">
                              <svg className="h-4 w-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                              </svg>
                            </div>
                            <p className="text-gray-600">Automated shipping label generation</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center">
                              <svg className="h-4 w-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                              </svg>
                            </div>
                            <p className="text-gray-600">Customer communication management tools</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Connector line between steps (only for non-last items) */}
                {index < howItWorksSteps.length - 1 && (
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 -bottom-16 w-0.5 h-32">
                    <motion.div
                      className="h-full bg-gradient-to-b from-gray-300 to-gray-200"
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 }}
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* CTA Button - with enhanced animation */}
          <div className="mt-28 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="inline-block"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <ShimmerButton
                  onClick={handleGetStarted}
                  className="px-12 py-4 text-lg h-auto"
                >
                  <span className="mr-2">Start Your Journey Now</span>
                  <motion.svg
                    className="w-5 h-5 inline-block"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </motion.svg>
                </ShimmerButton>
              </motion.div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="text-sm text-gray-500 mt-4"
            >
              Join 5,000+ sellers already using our platform
            </motion.p>
          </div>
        </div>
      </section>

      {/* Marketplace Section - NEW */}
      <section ref={marketplaceRef} id="marketplace" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <MotionWrapper delayOrder={0}>
              <span className="inline-block px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-gray-700 bg-gray-100 rounded-full">
                Marketplace
              </span>
            </MotionWrapper>
            <MotionWrapper delayOrder={1}>
              <h2 className="mt-6 text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Connect with <GradientText className="bg-gradient-to-r from-gray-700 to-gray-900">multiple marketplaces</GradientText>
              </h2>
            </MotionWrapper>
            <MotionWrapper delayOrder={2}>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                Integrate your business with India's leading e-commerce platforms
              </p>
            </MotionWrapper>
          </div>

          {/* Marketplace Platforms */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 mb-20">
            {[
              { name: "Amazon", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFIFYXy2EhtsgvdqD316wQ0Q8Q63efvYVM7ZBpPjaN0ovdVsRd4zzHRONqb1GvIDKTrrc&usqp=CAU", color: "from-yellow-400 to-yellow-500" },
              { name: "Flipkart", logo: "https://1000logos.net/wp-content/uploads/2021/02/Flipkart-logo.png", color: "from-blue-400 to-blue-500" },
              { name: "Meesho", logo: "https://cdn.iconscout.com/icon/free/png-256/free-meesho-icon-download-in-svg-png-gif-file-formats--company-logo-industry-brand-pack-logos-icons-10673438.png", color: "from-pink-400 to-pink-500" },
              { name: "Myntra", logo: "https://logos-world.net/wp-content/uploads/2022/12/Myntra-Logo.png", color: "from-red-400 to-red-500" },
              { name: "Shopify", logo: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopify_logo_2018.svg", color: "from-green-400 to-green-500" },
            ].map((platform, index) => (
              <MotionWrapper key={index} delayOrder={index}>
                <TiltCard className="overflow-visible">
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-6 h-36 flex flex-col items-center justify-center relative">
                    <div className={`absolute inset-0 bg-gradient-to-br ${platform.color} opacity-5 rounded-2xl`}></div>
                    <div className="w-full h-16 flex items-center justify-center mb-4">
                      <img
                        src={platform.logo}
                        alt={`${platform.name} logo`}
                        className="max-h-12 max-w-full object-contain"
                      />
                    </div>
                    <p className="text-gray-800 font-medium">{platform.name}</p>
                  </div>
                </TiltCard>
              </MotionWrapper>
            ))}
          </div>

          {/* Marketplace Features */}
          <div className="grid md:grid-cols-2 gap-12 items-center mt-16">
            <MotionWrapper>
              <motion.div
                className="rounded-2xl overflow-hidden border border-gray-100 shadow-xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                    alt="Marketplace dashboard"
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">Unified Dashboard</h3>
                    <p className="text-white/90">Manage all your marketplace accounts in one place</p>
                  </div>
                </div>
              </motion.div>
            </MotionWrapper>

            <div className="space-y-6">
              {[
                {
                  icon: <GlobeAltIcon className="w-6 h-6 text-white" />,
                  title: "Seamless Integration",
                  description: "Connect your existing marketplace accounts with just a few clicks."
                },
                {
                  icon: <CubeIcon className="w-6 h-6 text-white" />,
                  title: "Centralized Inventory",
                  description: "Update product listings across all platforms from a single source of truth."
                },
                {
                  icon: <ChartBarIcon className="w-6 h-6 text-white" />,
                  title: "Consolidated Analytics",
                  description: "Track performance across marketplaces with unified reporting and insights."
                }
              ].map((feature, idx) => (
                <MotionWrapper key={idx} delayOrder={idx + 1}>
                  <motion.div
                    className="bg-white rounded-xl p-6 border border-gray-100 shadow-md"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-gray-700 to-gray-900">
                          {feature.icon}
                        </div>
                      </div>
                      <div className="ml-5">
                        <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                        <p className="mt-1 text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  </motion.div>
                </MotionWrapper>
              ))}
              <MotionWrapper delayOrder={4}>
                <ShimmerButton
                  onClick={handleGetStarted}
                  className="w-full mt-6"
                >
                  Connect Your Marketplaces
                </ShimmerButton>
              </MotionWrapper>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Cosmos inspired with grid layout */}
      <section className="py-20 sm:py-28 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <MotionWrapper delayOrder={0}>
              <span className="inline-block px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-gray-700 bg-gray-100 rounded-full">
                Features
              </span>
            </MotionWrapper>
            <MotionWrapper delayOrder={1}>
              <h2 className="mt-6 text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Everything you need to <GradientText className="bg-gradient-to-r from-gray-700 to-gray-900">scale your business</GradientText>
              </h2>
            </MotionWrapper>
            <MotionWrapper delayOrder={2}>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                Our platform provides all the tools and integrations sellers need to thrive in today's competitive market.
              </p>
            </MotionWrapper>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <ChartBarIcon className="w-6 h-6 text-white" />,
                title: "Analytics Dashboard",
                description: "Track sales, inventory, and customer behavior with real-time analytics and detailed reports."
              },
              {
                icon: <GlobeAltIcon className="w-6 h-6 text-white" />,
                title: "Multi-Platform Integration",
                description: "Connect and manage Amazon, Flipkart, Meesho, and more from one centralized dashboard."
              },
              {
                icon: <CubeIcon className="w-6 h-6 text-white" />,
                title: "Inventory Management",
                description: "Automatically sync inventory across all your sales channels to prevent overselling."
              },
              {
                icon: <SparklesIcon className="w-6 h-6 text-white" />,
                title: "AI-Powered Optimization",
                description: "Get smart recommendations for pricing, listing improvements, and market opportunities."
              },
              {
                icon: <LightningBoltIcon className="w-6 h-6 text-white" />,
                title: "Automated Fulfillment",
                description: "Streamline order processing, shipping, and returns management across platforms."
              },
              {
                icon: <ChatAlt2Icon className="w-6 h-6 text-white" />,
                title: "24/7 Customer Support",
                description: "Connect with our dedicated support team whenever you need assistance or guidance."
              }
            ].map((feature, index) => (
              <MotionWrapper key={index} delayOrder={index + 1}>
                <div className="h-full">
                  <HoverCard
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                    className="h-full"
                  />
                </div>
              </MotionWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section - Cosmos style */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-gray-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
        <div className="absolute bottom-0 -right-4 w-72 h-72 bg-gray-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <MotionWrapper delayOrder={0}>
              <span className="inline-block px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-gray-700 bg-gray-100 rounded-full">
                Testimonials
              </span>
            </MotionWrapper>
            <MotionWrapper delayOrder={1}>
              <h2 className="mt-6 text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Stories from our <GradientText className="bg-gradient-to-r from-gray-700 to-gray-900">amazing customers</GradientText>
              </h2>
            </MotionWrapper>
            <MotionWrapper delayOrder={2}>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                See what our community has to say about their experience with our platform.
              </p>
            </MotionWrapper>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {testimonials.map((testimonial, index) => (
              <MotionWrapper key={index} delayOrder={index + 1}>
                <motion.div
                  whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)" }}
                  className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
                >
                  <div className="flex items-center mb-6">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full object-cover mr-4 border-2 border-gray-200"
                    />
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800">{testimonial.name}</h4>
                      <p className="text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400">★</span>
                    ))}
                  </div>
                  <p className="text-gray-700 text-lg italic">{testimonial.content}</p>
                </motion.div>
              </MotionWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section - Cosmos-inspired */}
      <section ref={pricingRef} id="pricing" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <MotionWrapper delayOrder={0}>
              <span className="inline-block px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-gray-700 bg-gray-100 rounded-full">
                Pricing
              </span>
            </MotionWrapper>
            <MotionWrapper delayOrder={1}>
              <h2 className="mt-6 text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Simple, transparent <GradientText className="bg-gradient-to-r from-gray-700 to-gray-900">pricing</GradientText>
              </h2>
            </MotionWrapper>
            <MotionWrapper delayOrder={2}>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                Choose the perfect plan for your business needs. No hidden fees or surprises.
              </p>
            </MotionWrapper>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <MotionWrapper delayOrder={1}>
              <div className="relative overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-lg h-full flex flex-col">
                <div className="px-8 pt-8 pb-6 bg-gradient-to-br from-gray-50 to-gray-100 border-b border-gray-100">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900">Basic</h3>
                    <p className="mt-2 text-gray-600">Perfect for small sellers just starting out</p>
                    <div className="mt-6">
                      <span className="text-5xl font-bold text-gray-900">₹599</span>
                      <span className="text-gray-600 ml-2">/month</span>
                    </div>
                  </div>
                </div>
                <div className="p-8 flex-grow">
                  <ul className="space-y-4">
                    {[
                      "Up to 50 product listings",
                      "Single marketplace integration",
                      "Basic analytics dashboard",
                      "Email support",
                      "Mobile app access"
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <svg className="h-5 w-5 text-emerald-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="px-8 pb-8">
                  <ShimmerButton className="w-full" onClick={handleGetStarted}>
                    Start Free Trial
                  </ShimmerButton>
                  <p className="mt-3 text-center text-sm text-gray-500">
                    No credit card required
                  </p>
                </div>
              </div>
            </MotionWrapper>

            <MotionWrapper delayOrder={2}>
              <div className="relative overflow-hidden rounded-2xl bg-white border-2 border-gray-700 shadow-xl h-full flex flex-col">
                <div className="absolute top-0 right-0 bg-gradient-to-r from-gray-700 to-gray-900 text-white text-sm font-medium px-4 py-1">
                  Popular
                </div>
                <div className="px-8 pt-8 pb-6 bg-gradient-to-br from-gray-50 to-gray-100 border-b border-gray-100">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900">Premium</h3>
                    <p className="mt-2 text-gray-600">Full-featured plan for growing businesses</p>
                    <div className="mt-6">
                      <span className="text-5xl font-bold text-gray-900">₹1,499</span>
                      <span className="text-gray-600 ml-2">/month</span>
                    </div>
                  </div>
                </div>
                <div className="p-8 flex-grow">
                  <ul className="space-y-4">
                    {[
                      "Unlimited product listings",
                      "Multiple marketplace integrations",
                      "Advanced analytics & reporting",
                      "Priority 24/7 support",
                      "AI pricing recommendations",
                      "Bulk listing & order management",
                      "Custom branding options"
                    ].map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <svg className="h-5 w-5 text-emerald-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="px-8 pb-8">
                  <ShimmerButton className="w-full" onClick={handleGetStarted}>
                    Get Started Now
                  </ShimmerButton>
                  <p className="mt-3 text-center text-sm text-gray-500">
                    14-day free trial included
                  </p>
                </div>
              </div>
            </MotionWrapper>
          </div>
        </div>
      </section>

      {/* About Us Section - NEW */}
      <section ref={aboutUsRef} id="about-us" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <MotionWrapper delayOrder={0}>
              <span className="inline-block px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-gray-700 bg-gray-100 rounded-full">
                Our Story
              </span>
            </MotionWrapper>
            <MotionWrapper delayOrder={1}>
              <h2 className="mt-6 text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                About <GradientText className="bg-gradient-to-r from-gray-700 to-gray-900">Sumimaase</GradientText>
              </h2>
            </MotionWrapper>
            <MotionWrapper delayOrder={2}>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                We're on a mission to empower small and medium businesses across India
              </p>
            </MotionWrapper>
          </div>

          {/* Company Story */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <MotionWrapper>
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-700 to-gray-900 rounded-2xl blur opacity-20"></div>
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="overflow-hidden rounded-2xl shadow-xl">
                    <img
                      src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                      alt="Our team"
                      className="w-full h-auto"
                    />
                  </div>
                </motion.div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl opacity-20 blur-2xl"></div>
              </div>
            </MotionWrapper>

            <MotionWrapper>
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                  <p className="text-gray-600">
                    Sumimaase was founded in 2022 with a simple vision: to make e-commerce accessible to every business in India, regardless of its size or technical expertise.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                  <p className="text-gray-600">
                    We're building the most comprehensive multi-channel commerce platform that helps sellers manage their business across all major marketplaces and their own stores—all from one dashboard.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Values</h3>
                  <ul className="space-y-3">
                    {[
                      "Empowering small businesses",
                      "Technological innovation",
                      "Customer-first approach",
                      "Data-driven decision making",
                      "Transparency and trust"
                    ].map((value, idx) => (
                      <motion.li
                        key={idx}
                        className="flex items-center"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1, duration: 0.2 }}
                        viewport={{ once: true }}
                      >
                        <span className="inline-block w-2 h-2 bg-gradient-to-r from-gray-700 to-gray-900 rounded-full mr-3"></span>
                        <span className="text-gray-700">{value}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </MotionWrapper>
          </div>

          {/* Team - Fixed to be centered properly */}
          <div className="mt-24">
            <div className="text-center mb-16">
              <MotionWrapper>
                <h3 className="text-3xl font-bold text-gray-900">Meet Our Team</h3>
                <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                  We're a diverse team of experts passionate about e-commerce and technology
                </p>
              </MotionWrapper>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 max-w-2xl mx-auto">
              {[
                {
                  name: "Piyush Singh",
                  role: "Founder & CEO",
                  image: require("../assets/images/Piyush.png"),
                  bio: "Stay Cool, Stay Hungry, Stay Foolish. Passionate about technology and entrepreneurship."
                },
                {
                  name: "Aayush Kumar",
                  role: "Co-Founder & Developer",
                  image: require("../assets/images/aayush.png"),
                  bio: "UI /UX Designer with a passion for creating user-friendly interfaces. Always learning and growing."
                }
              ].map((member, idx) => (
                <MotionWrapper key={idx} delayOrder={idx}>
                  <motion.div 
                    className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-md h-full"
                    whileHover={{ y: -10, transition: { duration: 0.2 } }}
                  >
                    <div className="relative h-60">
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/30 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 p-4 text-white">
                        <h4 className="text-lg font-semibold">{member.name}</h4>
                        <p className="text-white/80 text-sm">{member.role}</p>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-gray-600 text-sm">{member.bio}</p>
                    </div>
                  </motion.div>
                </MotionWrapper>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <MotionWrapper>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-gray-800 to-gray-900 py-16 sm:py-20 px-8 sm:px-12 shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gray-700/30 blur-3xl"></div>
                <div className="absolute top-40 -left-40 h-80 w-80 rounded-full bg-gray-700/30 blur-3xl"></div>
              </div>

              <div className="relative z-10">
                <div className="max-w-3xl mx-auto text-center">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
                    Ready to transform your business?
                  </h2>
                  <p className="text-lg sm:text-xl text-gray-300 mb-10">
                    Join thousands of sellers who are already streamlining their multi-platform sales with our powerful tools.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <ShimmerButton
                      className="bg-white text-gray-900 hover:text-gray-900 hover:bg-gray-100"
                      onClick={handleGetStarted}
                    >
                      Get Started For Free
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </ShimmerButton>
                    <button
                      onClick={() => scrollToSection(contactRef)}
                      className="inline-flex h-12 items-center justify-center rounded-xl border border-gray-700 bg-transparent px-8 font-medium text-white transition-colors hover:bg-gray-700/30 focus:outline-none"
                    >
                      Contact Sales
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </MotionWrapper>
        </div>
      </section>

      {/* Footer */}
      <LandingPageFooter />

      {/* Enhanced QR Code Popup - Minimizable & Expandable with animation */}
      <AnimatePresence>
        {showQrPopup && (
          <motion.div
            ref={popupRef}
            drag
            dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
            dragElastic={0.1}
            dragMomentum={false}
            onDragEnd={onDragEnd}
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: qrPosition.x,
              y: qrPosition.y
            }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className={`fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 cursor-move ${isQrExpanded ? 'w-80 sm:w-96' : 'w-auto'
              }`}
          >
            {isQrExpanded ? (
              <motion.div
                className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden w-full"
                initial={{ borderRadius: "100%" }}
                animate={{ borderRadius: "1rem" }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 p-4 flex items-center justify-between relative overflow-hidden">
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -inset-1 bg-gradient-to-r from-gray-800 to-gray-700 opacity-50 blur-xl"></div>
                    <div className="absolute -right-20 -top-20 w-40 h-40 rounded-full bg-gray-600/20 blur-xl"></div>
                  </div>
                  <div className="flex items-center relative z-10">
                    <QrcodeIcon className="h-5 w-5 text-white mr-2" />
                    <h3 className="text-white font-semibold text-sm">Get Sumimaase Mobile</h3>
                  </div>
                  <div className="flex items-center relative z-10">
                    <motion.button
                      onClick={toggleQrExpanded}
                      className="text-white hover:text-gray-200 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      title="Minimize"
                    >
                      <ChevronUpIcon className="h-5 w-5" />
                    </motion.button>
                  </div>
                </div>

                <div className="p-5 bg-gradient-to-br from-white to-gray-50">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        className="w-20 h-20 rounded-full border-2 border-dashed border-gray-400/50"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      />
                    </div>
                    <motion.div
                      className="bg-white p-3 rounded-lg shadow-lg border border-gray-100 mx-auto w-60 h-60 flex items-center justify-center mb-4 relative z-10"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <img
                        src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://sumimaase.com/app&color=333333"
                        alt="QR Code for Sumimaase mobile app"
                        className="max-w-full max-h-full"
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-gray-700/5 to-gray-700/0 rounded-lg" />
                      <motion.div
                        className="absolute -bottom-3 -right-3 bg-gradient-to-r from-gray-700 to-gray-900 text-white text-xs font-medium px-2 py-1 rounded-md"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5 }}
                      >
                        Scan me!
                      </motion.div>
                    </motion.div>
                  </div>
                  <p className="text-gray-700 text-center font-medium mt-6">Scan to download our mobile app</p>
                  <div className="mt-4">
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                      <ShimmerButton className="text-sm py-2 px-4 h-auto w-full">
                        Get App Now
                      </ShimmerButton>
                    </motion.div>
                  </div>
                  <div className="mt-3 text-center">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                    >
                      <p className="text-xs text-gray-500 italic flex items-center justify-center">
                        <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                        </svg>
                        Drag to move • Click arrow to minimize
                      </p>
                    </motion.div>
                  </div>

                  <motion.div
                    className="mt-4 pt-4 border-t border-gray-200"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 text-green-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-xs text-gray-600">Available on iOS & Android</span>
                      </div>
                      <div className="flex space-x-1">
                        <span className="block h-2 w-2 rounded-full bg-blue-500"></span>
                        <span className="block h-2 w-2 rounded-full bg-gray-300"></span>
                        <span className="block h-2 w-2 rounded-full bg-gray-300"></span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ) : (
              <motion.button
                onClick={toggleQrExpanded}
                className="flex items-center justify-center p-4 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.1, rotate: [0, -5, 5, -5, 5, 0] }}
                whileTap={{ scale: 0.9 }}
                title="Get Mobile App"
              >
                <QrcodeIcon className="h-6 w-6" />
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LandingPage;