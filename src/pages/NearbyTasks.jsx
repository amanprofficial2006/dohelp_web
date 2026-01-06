import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { 
  FaSearch, 
  FaFilter, 
  FaPlusCircle, 
  FaClock, 
  FaCheckCircle, 
  FaMoneyBillWave,
  FaStar,
  FaMapMarkerAlt,
  FaUserFriends,
  FaChartLine,
  FaBell,
  FaTrophy,
  FaFire,
  FaHandshake,
  FaBullhorn,
  FaShoppingBag,
  FaCar,
  FaHome,
  FaLaptop,
  FaBroom
} from "react-icons/fa";
import { motion } from "framer-motion";

export default function NearbyTasks() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("all");
  const [userStats, setUserStats] = useState({
    completedTasks: 12,
    earnings: 12500,
    rating: 4.8,
    activeTasks: 3
  });

  const categories = [
    { icon: <FaShoppingBag />, name: "Delivery", count: 45, color: "bg-blue-100 text-blue-600" },
    { icon: <FaBroom />, name: "Cleaning", count: 32, color: "bg-green-100 text-green-600" },
    { icon: <FaLaptop />, name: "Online Help", count: 28, color: "bg-purple-100 text-purple-600" },
    { icon: <FaCar />, name: "Rides", count: 19, color: "bg-orange-100 text-orange-600" },
    { icon: <FaHome />, name: "Home Services", count: 26, color: "bg-red-100 text-red-600" },
    { icon: <FaHandshake />, name: "Handyman", count: 37, color: "bg-yellow-100 text-yellow-600" },
  ];

  const tasks = [
    { 
      id: 1, 
      title: "Groceries Delivery", 
      description: "Need groceries delivered from supermarket to home", 
      amount: "₹300", 
      location: "2 km away", 
      time: "1 hour ago",
      category: "Delivery",
      urgent: true,
      userRating: 4.9
    },
    { 
      id: 2, 
      title: "Home Cleaning", 
      description: "2BHK apartment cleaning service needed", 
      amount: "₹800", 
      location: "3 km away", 
      time: "2 hours ago",
      category: "Cleaning",
      urgent: false,
      userRating: 4.7
    },
    { 
      id: 3, 
      title: "Website Design Help", 
      description: "Need help with WordPress website setup", 
      amount: "₹1500", 
      location: "Remote", 
      time: "3 hours ago",
      category: "Online Help",
      urgent: true,
      userRating: 5.0
    },
    { 
      id: 4, 
      title: "Furniture Assembly", 
      description: "Help with IKEA furniture assembly", 
      amount: "₹600", 
      location: "1 km away", 
      time: "4 hours ago",
      category: "Handyman",
      urgent: false,
      userRating: 4.8
    },
  ];

  const yourTasks = [
    { 
      id: 101, 
      title: "Office Documents Delivery", 
      status: "in-progress", 
      amount: "₹450", 
      time: "Today, 3:00 PM",
      progress: 60
    },
    { 
      id: 102, 
      title: "Pet Sitting", 
      status: "pending", 
      amount: "₹1200", 
      time: "Tomorrow, 10:00 AM",
      progress: 30
    },
    { 
      id: 103, 
      title: "Gardening Help", 
      status: "completed", 
      amount: "₹900", 
      time: "Yesterday",
      progress: 100
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Welcome back, <span className="text-blue-600">{user?.name || 'User'}!</span>
              </h1>
              <p className="text-gray-600">
                Ready to find your next task or post something you need help with?
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              
              
              <Link
                to="/post-task"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg hover:shadow-xl"
              >
                <FaPlusCircle className="text-white" />
                <span className="text-white">Post a Task</span>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {[
            { 
              title: "Total Earnings", 
              value: `₹${userStats.earnings.toLocaleString()}`, 
              icon: <FaMoneyBillWave className="text-green-500" />, 
              change: "+12%", 
              color: "bg-gradient-to-r from-green-50 to-emerald-50 border-green-100" 
            },
            { 
              title: "Completed Tasks", 
              value: userStats.completedTasks, 
              icon: <FaCheckCircle className="text-blue-500" />, 
              change: "+3", 
              color: "bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-100" 
            },
            { 
              title: "Your Rating", 
              value: userStats.rating, 
              icon: <FaStar className="text-yellow-500" />, 
              change: "4.8", 
              color: "bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-100" 
            },
            { 
              title: "Active Tasks", 
              value: userStats.activeTasks, 
              icon: <FaClock className="text-purple-500" />, 
              change: "2 ongoing", 
              color: "bg-gradient-to-r from-purple-50 to-pink-50 border-purple-100" 
            },
          ].map((stat, index) => (
            <div key={index} className={`${stat.color} rounded-2xl p-6 border shadow-sm`}>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-white">
                  {stat.icon}
                </div>
                <span className="text-sm font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                  {stat.change}
                </span>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.title}</div>
            </div>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Left Column - Available Tasks */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
            >
              {/* Tasks Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Available Tasks Near You</h2>
                    <p className="text-gray-600">Tasks posted in your area</p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaSearch className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        placeholder="Search tasks..."
                        className="pl-10 pr-4 py-2 w-full md:w-64 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <button className="p-2 rounded-xl border border-gray-300 hover:bg-gray-50 transition-colors">
                      <FaFilter className="text-gray-600" />
                    </button>
                  </div>
                </div>
                
                {/* Category Tabs */}
                <div className="flex flex-wrap gap-2">
                  {["all", "urgent", "nearby", "high-paying", "new"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeTab === tab
                          ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {tab === "all" && "All Tasks"}
                      {tab === "urgent" && (
                        <span className="flex items-center gap-1">
                          <FaFire className="text-orange-500" />
                          Urgent
                        </span>
                      )}
                      {tab === "nearby" && (
                        <span className="flex items-center gap-1">
                          <FaMapMarkerAlt className="text-blue-500" />
                          Nearby
                        </span>
                      )}
                      {tab === "high-paying" && (
                        <span className="flex items-center gap-1">
                          <FaMoneyBillWave className="text-green-500" />
                          High Paying
                        </span>
                      )}
                      {tab === "new" && "New"}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Tasks List */}
              <div className="divide-y divide-gray-100">
                {tasks.map((task) => (
                  <motion.div
                    key={task.id}
                    whileHover={{ scale: 1.005 }}
                    className="p-6 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
                          {task.urgent && (
                            <span className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded-full flex items-center gap-1">
                              <FaFire className="text-xs" />
                              Urgent
                            </span>
                          )}
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            task.category === "Delivery" ? "bg-blue-100 text-blue-700" :
                            task.category === "Cleaning" ? "bg-green-100 text-green-700" :
                            task.category === "Online Help" ? "bg-purple-100 text-purple-700" :
                            "bg-yellow-100 text-yellow-700"
                          }`}>
                            {task.category}
                          </span>
                        </div>
                        
                        <p className="text-gray-600 mb-3">{task.description}</p>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <FaMapMarkerAlt className="text-gray-400" />
                            {task.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <FaClock className="text-gray-400" />
                            {task.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <FaStar className="text-yellow-400" />
                            {task.userRating} ⭐
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end gap-3">
                        <div className="text-2xl font-bold text-green-600">{task.amount}</div>
                        <button className="px-6 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transition-all">
                          View Details
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* View All Link */}
              <div className="p-6 border-t border-gray-100">
                <Link
                  to="/tasks"
                  className="flex items-center justify-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                >
                  View All Available Tasks
                  <FaHandshake />
                </Link>
              </div>
            </motion.div>
          </div>
          
          {/* Right Column - Your Activity */}
          <div className="space-y-6">
            {/* Your Tasks */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Your Tasks</h2>
                <Link to="/my-tasks" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View All
                </Link>
              </div>
              
              <div className="space-y-4">
                {yourTasks.map((task) => (
                  <div key={task.id} className="p-4 rounded-xl border border-gray-200 hover:border-blue-300 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900">{task.title}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        task.status === "completed" ? "bg-green-100 text-green-700" :
                        task.status === "in-progress" ? "bg-blue-100 text-blue-700" :
                        "bg-yellow-100 text-yellow-700"
                      }`}>
                        {task.status}
                      </span>
                    </div>
                    
                    <div className="mb-3">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{task.progress}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            task.status === "completed" ? "bg-green-500" :
                            task.status === "in-progress" ? "bg-blue-500" :
                            "bg-yellow-500"
                          }`}
                          style={{ width: `${task.progress}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{task.time}</span>
                      <span className="font-semibold text-green-600">{task.amount}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-6 py-3 rounded-xl border-2 border-dashed border-gray-300 text-gray-500 hover:text-gray-700 hover:border-gray-400 transition-colors">
                <div className="flex items-center justify-center gap-2">
                  <FaPlusCircle />
                  <span>Take on New Task</span>
                </div>
              </button>
            </motion.div>
            
            {/* Popular Categories */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6">Popular Categories</h2>
              
              <div className="grid grid-cols-2 gap-3">
                {categories.map((category, index) => (
                  <Link
                    key={index}
                    to={`/tasks?category=${category.name.toLowerCase()}`}
                    className="group p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2 rounded-lg ${category.color}`}>
                        {category.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">{category.name}</h3>
                        <p className="text-sm text-gray-500">{category.count} tasks</p>
                      </div>
                    </div>
                    <div className="text-xs text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      Browse tasks →
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
            
            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white"
            >
              <h2 className="text-xl font-bold mb-6">Your Weekly Progress</h2>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Tasks Completed</span>
                    <span>4/6</span>
                  </div>
                  <div className="h-2 bg-white/30 rounded-full overflow-hidden">
                    <div className="h-full bg-white rounded-full" style={{ width: "66%" }} />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Earnings Goal</span>
                    <span>₹8,500/₹10,000</span>
                  </div>
                  <div className="h-2 bg-white/30 rounded-full overflow-hidden">
                    <div className="h-full bg-green-300 rounded-full" style={{ width: "85%" }} />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Rating Improvement</span>
                    <span>4.8/5.0</span>
                  </div>
                  <div className="h-2 bg-white/30 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-300 rounded-full" style={{ width: "96%" }} />
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-white/20">
                <div className="flex items-center justify-center gap-2">
                  <FaTrophy className="text-yellow-300" />
                  <span className="text-sm">On track to be Top Helper this week!</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Bottom Section - How it Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            How DoHelp Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Browse or Post",
                description: "Find tasks in your area or post what you need help with",
                icon: <FaBullhorn className="text-3xl" />
              },
              {
                step: "2",
                title: "Connect & Agree",
                description: "Message the task poster/helper and agree on terms",
                icon: <FaHandshake className="text-3xl" />
              },
              {
                step: "3",
                title: "Complete & Earn",
                description: "Get the task done and earn money or get help",
                icon: <FaMoneyBillWave className="text-3xl" />
              },
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <div className="p-4 rounded-xl bg-white border border-gray-200">
                  <div className="text-blue-600 mb-3 flex justify-center">
                    {step.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}