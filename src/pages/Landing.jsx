import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  FaMapMarkerAlt, FaShieldAlt, FaStar, FaCheckCircle,
  FaUserCheck, FaTruck, FaBroom, FaLaptop, FaShoppingBag,
  FaBullhorn, FaSearch, FaHandshake, FaMoneyBillWave,
  FaArrowRight, FaUsers, FaClock, FaThumbsUp, FaHeart,
  FaChevronLeft, FaChevronRight, FaUtensils, FaCar,
  FaTools, FaPen, FaSpa, FaDumbbell, FaWrench, FaBolt,
  FaPaintBrush, FaTruckMoving, FaTshirt, FaBaby, FaHome,
  FaCarSide, FaBicycle, FaShoppingCart, FaUser, FaTasks,
  FaWallet, FaSignOutAlt, FaHome as FaHomeIcon, FaBell,
  FaPlusCircle, FaChevronDown, FaQuestionCircle, FaCog,
  FaComments, FaBars, FaTimes
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import heroImage from '../assets/helping-others-800x533.jpg';
import deliveryImage from '../assets/download (1).jpg';
import cleaningImage from '../assets/download (2).jpg';
import onlineImage from '../assets/images.jpg';

// You can add more images for other categories
const defaultImage = "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";

export default function Landing() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [activeReview, setActiveReview] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(3); // Mock notification count

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProfileMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsProfileMenuOpen(false);
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/categories", label: "Categories" },
    { to: "/how-it-works", label: "How It Works" },
    { to: "/faqs", label: "FAQs" },
    { to: "/contact", label: "Contact" },
  ];

  const profileMenuItems = [
    { to: "/profile", label: "My Profile", icon: <FaUser /> },
    { to: "/my-tasks", label: "My Tasks", icon: <FaTasks /> },
    { to: "/wallet", label: "Wallet", icon: <FaWallet /> },
    { to: "/settings", label: "Settings", icon: <FaCog /> },
    { to: "/Contact", label: "Help & Support", icon: <FaQuestionCircle /> },
  ];

  const handleTaskLink = (path) => {
    if (!user) {
      navigate('/login');
    } else {
      navigate(path);
    }
  };

  const categories = [
    {
      icon: <FaTruck />,
      name: "Delivery",
      color: "from-blue-500 to-cyan-500",
      image: deliveryImage,
      tasks: 234,
      description: "Food, groceries & packages"
    },
    {
      icon: <FaBroom />,
      name: "Cleaning",
      color: "from-green-500 to-emerald-500",
      image: cleaningImage,
      tasks: 189,
      description: "Home & office cleaning"
    },
    {
      icon: <FaLaptop />,
      name: "Online Help",
      color: "from-purple-500 to-pink-500",
      image: onlineImage,
      tasks: 156,
      description: "Virtual assistance & tech support"
    },
    {
      icon: <FaShoppingBag />,
      name: "Errands",
      color: "from-orange-500 to-red-500",
      image: deliveryImage,
      tasks: 278,
      description: "Shopping & daily tasks"
    },
    {
      icon: <FaBullhorn />,
      name: "Promotion",
      color: "from-pink-500 to-rose-500",
      image: onlineImage,
      tasks: 98,
      description: "Marketing & promotion"
    },
    {
      icon: <FaHandshake />,
      name: "Handyman",
      color: "from-amber-500 to-yellow-500",
      image: cleaningImage,
      tasks: 312,
      description: "Repairs & maintenance"
    },
    {
      icon: <FaUsers />,
      name: "Tutoring",
      color: "from-indigo-500 to-purple-500",
      image: defaultImage,
      tasks: 145,
      description: "Teaching & coaching"
    },
    {
      icon: <FaHeart />,
      name: "Pet Care",
      color: "from-rose-500 to-pink-500",
      image: deliveryImage,
      tasks: 87,
      description: "Pet sitting & walking"
    },
  ];

  const steps = [
    {
      number: "1",
      title: "Post a Task",
      description: "Describe what you need help with. Set your budget and location.",
      icon: <FaBullhorn className="text-2xl" />,
      color: "from-blue-500 to-cyan-500"
    },
    {
      number: "2",
      title: "Find Helpers",
      description: "Browse offers from verified helpers nearby. Compare ratings and prices.",
      icon: <FaSearch className="text-2xl" />,
      color: "from-purple-500 to-pink-500"
    },
    {
      number: "3",
      title: "Get it Done",
      description: "Choose the best helper. Pay securely only when satisfied.",
      icon: <FaCheckCircle className="text-2xl" />,
      color: "from-green-500 to-emerald-500"
    }
  ];

  const trustFeatures = [
    {
      icon: <FaShieldAlt />,
      title: "Safe Payments",
      description: "Secure escrow system protects both parties",
      stats: "100% Secure"
    },
    {
      icon: <FaUserCheck />,
      title: "Verified Users",
      description: "Identity verified helpers and task posters",
      stats: "2K+ Verified"
    },
    {
      icon: <FaStar />,
      title: "Ratings & Reviews",
      description: "Trust through community feedback",
      stats: "4.8/5 Rating"
    }
  ];

  const reviews = [
    {
      name: "Priya Sharma",
      role: "Task Poster",
      review: "Found a helper within minutes! My groceries were delivered promptly.",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/women/32.jpg"
    },
    {
      name: "Rahul Verma",
      role: "Helper",
      review: "Earned ₹15,000 last month helping neighbors with deliveries.",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/men/75.jpg"
    },
    {
      name: "Anita Desai",
      role: "Task Poster",
      review: "The cleaning service was exceptional. Will definitely use again!",
      rating: 4,
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveReview((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white overflow-hidden">
      
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>



      {/* HERO SECTION */}
      <section className="relative pt-16 pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="People helping each other"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-linear-to-r from-blue-900/90 to-purple-900/80"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <FaMapMarkerAlt className="text-yellow-300" />
                <span className="text-white">Serving 50+ Cities Across India</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Get Help From <span className="text-yellow-300">People Nearby</span>
              </h1>
              
              <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                Need something done? Post a task. Want to earn? Help someone nearby. 
                Connect with trusted helpers in your community for everyday tasks and services.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <button
                    onClick={() => handleTaskLink('/post-task')}
                    className="group bg-white text-gray-900 hover:bg-gray-100 font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 shadow-2xl flex items-center gap-3"
                  >
                    <span>Post a Task</span>
                    <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
                  </button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <button
                    onClick={() => handleTaskLink('/tasks')}
                    className="bg-transparent border-2 border-white text-gray-900 hover:bg-white/10 font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 flex items-center gap-3"
                  >
                    <FaSearch />
                    <span>Find Tasks</span>
                  </button>
                </motion.div>
              </div>  
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: "500+", label: "Active Tasks", icon: <FaBullhorn /> },
                  { value: "2K+", label: "Helpers", icon: <FaUsers /> },
                  { value: "50+", label: "Cities", icon: <FaMapMarkerAlt /> }
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 + 0.3 }}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20"
                  >
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <div className="text-yellow-300">{stat.icon}</div>
                      <div className="text-2xl font-bold text-white">{stat.value}</div>
                    </div>
                    <div className="text-sm text-gray-300">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-linear-to-br from-blue-500/20 to-purple-500/20 rounded-3xl p-8 backdrop-blur-lg border border-white/20 shadow-2xl">
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center text-4xl">
                  🚀
                </div>
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-16 h-16 rounded-2xl bg-linear-to-br ${steps[activeStep].color} flex items-center justify-center text-white text-2xl font-bold`}>
                        {steps[activeStep].number}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">{steps[activeStep].title}</h3>
                        <p className="text-gray-200">{steps[activeStep].description}</p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
                
                <div className="flex justify-center gap-2 mt-8">
                  {steps.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveStep(idx)}
                      className={`w-3 h-3 rounded-full transition-all ${idx === activeStep ? 'bg-white w-8' : 'bg-white/40'}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-linear-to-r from-blue-100 to-purple-100 px-6 py-2 rounded-full mb-4">
              <FaClock className="text-blue-600" />
              <span className="font-semibold text-blue-600">Simple 3-Step Process</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How It <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Works</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From posting a task to getting it done - everything in minutes
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="relative group"
              >
                {/* Connecting Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 left-3/4 w-full h-1 bg-linear-to-r from-blue-200 to-purple-200 z-0 group-hover:from-blue-300 group-hover:to-purple-300 transition-all"></div>
                )}
                
                <div className="relative bg-linear-to-br from-white to-gray-50 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 z-10">
                  <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-2xl bg-linear-to-br ${step.color} flex items-center justify-center text-white text-3xl font-bold shadow-lg`}>
                    {step.number}
                  </div>
                  
                  <div className="mt-10 mb-6 flex justify-center">
                    <div className={`p-6 rounded-2xl bg-linear-to-br ${step.color} text-white text-4xl`}>
                      {step.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-center mb-6">
                    {step.description}
                  </p>
                  
                  <div className="text-center">
                    <div className="inline-flex items-center gap-2 text-blue-600 font-semibold">
                      Learn More
                      <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Earnings CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <div className="inline-flex items-center gap-4 bg-linear-to-r from-green-50 to-emerald-50 px-8 py-4 rounded-2xl border border-green-200">
              <FaMoneyBillWave className="text-3xl text-green-600" />
              <div>
                <div className="text-2xl font-bold text-gray-900">Earn up to <span className="text-green-600">₹5000/week</span></div>
                <p className="text-gray-600">Helping others in your spare time</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TASK CATEGORIES - UPDATED WITH IMAGES */}
      <section className="py-20 bg-linear-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-linear-to-r from-blue-100 to-purple-100 px-6 py-2 rounded-full mb-4">
              <FaThumbsUp className="text-blue-600" />
              <span className="font-semibold text-blue-600">Most Popular Categories</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Find Help For <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Anything</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Browse through thousands of tasks in popular categories
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <button
                  onClick={() => handleTaskLink(`/tasks?category=${category.name.toLowerCase()}`)}
                  className="group block w-full text-left"
                >
                  <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 h-full">

                    {/* Category Image */}
                    <div className="h-48 overflow-hidden p-1">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                      />
                    </div>

                    {/* Overlay linear */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Category Icon */}
                    <div className={`absolute top-4 right-4 z-10 w-12 h-12 rounded-xl bg-linear-to-br ${category.color} flex items-center justify-center text-white text-xl shadow-lg`}>
                      {category.icon}
                    </div>

                    {/* Task Count */}
                    <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-sm font-bold text-gray-900">{category.tasks} tasks</span>
                    </div>

                    {/* Category Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        {category.description}
                      </p>

                      {/* Bottom Info */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <span className="text-sm text-gray-500 group-hover:text-blue-600 transition-colors">
                          Browse tasks
                        </span>
                        <FaArrowRight className="text-gray-400 group-hover:text-blue-600 group-hover:translate-x-2 transition-all" />
                      </div>
                    </div>
                  </div>
                </button>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <Link
              to="/categories"
              className="inline-flex items-center gap-3 bg-linear-to-r from-blue-500 to-purple-500 text-white! hover:from-blue-600 hover:to-purple-600 font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <span>View All Categories</span>
              <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* TRUST SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-linear-to-r from-green-100 to-emerald-100 px-6 py-2 rounded-full mb-4">
              <FaHeart className="text-green-600" />
              <span className="font-semibold text-green-600">Trust & Safety</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Trust <span className="bg-linear-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">DoHelp</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your safety and satisfaction are our top priorities
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {trustFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="group"
              >
                <div className="bg-linear-to-b from-white to-gray-50 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100">
                  <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-blue-100 to-purple-100 flex items-center justify-center text-3xl text-blue-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {feature.description}
                  </p>
                  <div className="text-lg font-bold text-blue-600">
                    {feature.stats}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* User Reviews */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-linear-to-r from-blue-50 to-purple-50 rounded-3xl p-8 md:p-12">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">What Our Users Say</h3>
                <p className="text-gray-600">Join thousands of satisfied users</p>
              </div>
              
              <div className="relative h-64">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeReview}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="absolute inset-0 flex flex-col items-center justify-center"
                  >
                    <div className="text-center max-w-2xl">
                      <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg mx-auto mb-6">
                        <img 
                          src={reviews[activeReview].avatar} 
                          alt={reviews[activeReview].name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex justify-center gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className={`text-yellow-400 ${i < reviews[activeReview].rating ? 'fill-current' : 'text-gray-300'}`} />
                        ))}
                      </div>
                      <p className="text-xl text-gray-700 mb-4 italic">"{reviews[activeReview].review}"</p>
                      <div>
                        <div className="font-bold text-gray-900">{reviews[activeReview].name}</div>
                        <div className="text-gray-600">{reviews[activeReview].role}</div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
                
                <button
                  onClick={() => setActiveReview((prev) => (prev - 1 + reviews.length) % reviews.length)}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all"
                >
                  <FaChevronLeft />
                </button>
                <button
                  onClick={() => setActiveReview((prev) => (prev + 1) % reviews.length)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all"
                >
                  <FaChevronRight />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Community"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-r from-blue-900/90 to-purple-900/80"></div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-4xl mx-auto px-4 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-200 mb-8 opacity-90">
            Join thousands who are already helping and getting help in their community
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/register"
                className="bg-linear-to-r from-blue-500 to-purple-500 text-white! hover:from-blue-600 hover:to-purple-600 font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 shadow-2xl hover:shadow-3xl flex items-center gap-3"
              >
                <span>Sign Up Free</span>
                <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/how-it-works"
                className="bg-transparent border-2 border-white text-white! hover:bg-white/10 font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300"
              >
                Learn More
              </Link>
            </motion.div>
          </div>
          
          <p className="text-sm text-gray-300">
            No credit card required • Free to join • Cancel anytime
          </p>
        </motion.div>
      </section>



      {/* Animation Styles */}
      <style>{`
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
      `}</style>
    </div>
  );
}