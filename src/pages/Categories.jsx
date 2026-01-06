import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  FaPlus, FaSearch, FaFilter, FaArrowRight, FaCheckCircle,
  FaTruck, FaBroom, FaLaptop, FaShoppingBag, FaBullhorn,
  FaHandshake, FaUsers, FaHeart, FaUtensils, FaCar, FaTools,
  FaPen, FaSpa, FaDumbbell, FaWrench, FaBolt, FaPaintBrush,
  FaTruckMoving, FaTshirt, FaBaby, FaHome, FaCarSide, FaBicycle,
  FaShoppingCart, FaMapMarkerAlt, FaStar, FaClock, FaMoneyBillWave
} from "react-icons/fa";

export default function Categories() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    icon: "FaStar"
  });

  // All available categories
  const categories = [
    {
      icon: <FaTruck />,
      name: "Delivery",
      color: "from-blue-500 to-cyan-500",
      description: "Food, groceries & packages",
      tasks: 234,
      trending: true,
      image: "/api/placeholder/300/200"
    },
    {
      icon: <FaBroom />,
      name: "Cleaning",
      color: "from-green-500 to-emerald-500",
      description: "Home & office cleaning",
      tasks: 189,
      trending: true,
      image: "/api/placeholder/300/200"
    },
    {
      icon: <FaLaptop />,
      name: "Online Help",
      color: "from-purple-500 to-pink-500",
      description: "Virtual assistance & tech support",
      tasks: 156,
      trending: false,
      image: "/api/placeholder/300/200"
    },
    {
      icon: <FaShoppingBag />,
      name: "Errands",
      color: "from-orange-500 to-red-500",
      description: "Shopping & daily tasks",
      tasks: 278,
      trending: true,
      image: "/api/placeholder/300/200"
    },
    {
      icon: <FaBullhorn />,
      name: "Promotion",
      color: "from-pink-500 to-rose-500",
      description: "Marketing & promotion",
      tasks: 98,
      trending: false,
      image: "/api/placeholder/300/200"
    },
    {
      icon: <FaHandshake />,
      name: "Handyman",
      color: "from-amber-500 to-yellow-500",
      description: "Repairs & maintenance",
      tasks: 312,
      trending: true,
      image: "/api/placeholder/300/200"
    },
    {
      icon: <FaUsers />,
      name: "Tutoring",
      color: "from-indigo-500 to-purple-500",
      description: "Teaching & coaching",
      tasks: 145,
      trending: false,
      image: "/api/placeholder/300/200"
    },
    {
      icon: <FaHeart />,
      name: "Pet Care",
      color: "from-rose-500 to-pink-500",
      description: "Pet sitting & walking",
      tasks: 87,
      trending: false,
      image: "/api/placeholder/300/200"
    },
    {
      icon: <FaUtensils />,
      name: "Cooking",
      color: "from-red-500 to-pink-500",
      description: "Meal preparation & cooking",
      tasks: 167,
      trending: true,
      image: "/api/placeholder/300/200"
    },
    {
      icon: <FaCar />,
      name: "Transportation",
      color: "from-gray-500 to-slate-500",
      description: "Rides & vehicle assistance",
      tasks: 203,
      trending: false,
      image: "/api/placeholder/300/200"
    },
    {
      icon: <FaTools />,
      name: "Assembly",
      color: "from-yellow-500 to-orange-500",
      description: "Furniture & equipment assembly",
      tasks: 134,
      trending: false,
      image: "/api/placeholder/300/200"
    },
    {
      icon: <FaPen />,
      name: "Writing",
      color: "from-purple-500 to-indigo-500",
      description: "Content creation & writing",
      tasks: 89,
      trending: false,
      image: "/api/placeholder/300/200"
    },
    {
      icon: <FaSpa />,
      name: "Beauty",
      color: "from-pink-500 to-purple-500",
      description: "Salon & beauty services",
      tasks: 156,
      trending: true,
      image: "/api/placeholder/300/200"
    },
    {
      icon: <FaDumbbell />,
      name: "Fitness",
      color: "from-green-500 to-teal-500",
      description: "Personal training & fitness",
      tasks: 78,
      trending: false,
      image: "/api/placeholder/300/200"
    },
    {
      icon: <FaWrench />,
      name: "Plumbing",
      color: "from-blue-600 to-indigo-600",
      description: "Plumbing repairs & installation",
      tasks: 92,
      trending: false,
      image: "/api/placeholder/300/200"
    },
    {
      icon: <FaBolt />,
      name: "Electrical",
      color: "from-yellow-400 to-orange-400",
      description: "Electrical work & repairs",
      tasks: 67,
      trending: false,
      image: "/api/placeholder/300/200"
    }
  ];

  // Available icons for new categories
  const availableIcons = [
    { name: "FaStar", icon: <FaStar />, label: "Star" },
    { name: "FaHeart", icon: <FaHeart />, label: "Heart" },
    { name: "FaCheckCircle", icon: <FaCheckCircle />, label: "Check" },
    { name: "FaMapMarkerAlt", icon: <FaMapMarkerAlt />, label: "Location" },
    { name: "FaClock", icon: <FaClock />, label: "Clock" },
    { name: "FaMoneyBillWave", icon: <FaMoneyBillWave />, label: "Money" },
    { name: "FaUsers", icon: <FaUsers />, label: "Users" },
    { name: "FaTools", icon: <FaTools />, label: "Tools" },
    { name: "FaShoppingCart", icon: <FaShoppingCart />, label: "Cart" },
    { name: "FaHome", icon: <FaHome />, label: "Home" },
    { name: "FaCar", icon: <FaCar />, label: "Car" },
    { name: "FaBicycle", icon: <FaBicycle />, label: "Bike" }
  ];

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateCategory = () => {
    if (!user) {
      // Redirect to login if not authenticated
      window.location.href = '/login';
      return;
    }

    if (newCategory.name && newCategory.description) {
      // In a real app, this would make an API call
      console.log("Creating new category:", newCategory);
      setShowCreateForm(false);
      setNewCategory({ name: "", description: "", icon: "FaStar" });
      // Show success message
      alert("Category created successfully! It will be reviewed by our team.");
    }
  };

  const handleTaskLink = (path) => {
    if (!user) {
      window.location.href = '/login';
    } else {
      window.location.href = path;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-12">

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 px-6 py-2 rounded-full mb-6">
            <FaFilter className="text-blue-600" />
            <span className="font-semibold text-blue-600">All Categories</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Find Help For <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Anything</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Browse through all available categories or create a new one. Connect with helpers
            who can assist you with any task, big or small.
          </p>
        </motion.div>

        {/* Search and Create Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
            </div>

            {/* Create Category Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowCreateForm(true)}
              className="bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3"
            >
              <FaPlus />
              <span>Create Category</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Create Category Modal */}
        {showCreateForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Create New Category</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category Name
                  </label>
                  <input
                    type="text"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                    placeholder="e.g., Gardening, Photography"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={newCategory.description}
                    onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
                    placeholder="Brief description of the category"
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Choose Icon
                  </label>
                  <div className="grid grid-cols-6 gap-2">
                    {availableIcons.map((icon) => (
                      <button
                        key={icon.name}
                        onClick={() => setNewCategory({...newCategory, icon: icon.name})}
                        className={`p-3 rounded-xl border-2 transition-all ${
                          newCategory.icon === icon.name
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-2xl text-gray-600">{icon.icon}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleCreateCategory}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-3 px-6 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all"
                >
                  Create Category
                </button>
                <button
                  onClick={() => setShowCreateForm(false)}
                  className="flex-1 border border-gray-300 text-gray-700 font-bold py-3 px-6 rounded-xl hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Categories Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group"
            >
              <div
                onClick={() => handleTaskLink(`/tasks?category=${category.name.toLowerCase()}`)}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 cursor-pointer h-full"
              >
                {/* Category Image */}
                <div className="h-32 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br opacity-20 from-blue-400 to-purple-600"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${category.color} text-white text-3xl`}>
                      {category.icon}
                    </div>
                  </div>

                  {/* Trending Badge */}
                  {category.trending && (
                    <div className="absolute top-3 right-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                      🔥 Trending
                    </div>
                  )}

                  {/* Task Count */}
                  <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-sm font-bold text-gray-900">{category.tasks} tasks</span>
                  </div>
                </div>

                {/* Category Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">
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
            </motion.div>
          ))}
        </motion.div>

        {/* No Results */}
        {filteredCategories.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <FaSearch className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No categories found</h3>
            <p className="text-gray-600">Try adjusting your search terms or create a new category.</p>
          </motion.div>
        )}

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 text-center"
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-6">Join Our Growing Community</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">16+</div>
              <div className="text-gray-600">Categories</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">2000+</div>
              <div className="text-gray-600">Active Tasks</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">500+</div>
              <div className="text-gray-600">Helpers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">50+</div>
              <div className="text-gray-600">Cities</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-3 px-8 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Join as Helper
            </Link>
            <Link
              to="/post-task"
              className="bg-transparent border-2 border-blue-500 text-blue-600 font-bold py-3 px-8 rounded-xl hover:bg-blue-50 transition-all duration-300"
            >
              Post a Task
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
