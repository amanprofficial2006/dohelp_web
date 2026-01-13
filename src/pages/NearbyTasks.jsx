import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useCategories } from "../contexts/CategoriesContext";
import { useTasks } from "../contexts/TasksContext";
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
  const { categories, loading: categoriesLoading } = useCategories();
  const { userTasks, loading: tasksLoading } = useTasks();
  const [activeTab, setActiveTab] = useState("all");
  const [userStats, setUserStats] = useState({
    completedTasks: 12,
    earnings: 12500,
    rating: 4.8,
    activeTasks: 3
  });
  const [nearbyTasks, setNearbyTasks] = useState([]);
  const [loadingNearby, setLoadingNearby] = useState(true);
  const [errorNearby, setErrorNearby] = useState(null);
  const [acceptingTasks, setAcceptingTasks] = useState(new Set());

  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : categoryId;
  };

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const created = new Date(dateString);
    const diffMs = now - created;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return 'Just now';
    if (diffHours === 1) return '1 hour ago';
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;

    // After 7 days, show the actual date
    return created.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: created.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  };

  const acceptTask = async (taskId) => {
    setAcceptingTasks(prev => new Set(prev).add(taskId));
    const token = sessionStorage.getItem("token");

    try {
      const res = await fetch(`https://dohelp.newhopeindia17.com/api/tasks/accept/${taskId}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (data.success) {
        alert("Task accepted successfully!");
        // Refresh the tasks list
        setNearbyTasks(prev => prev.filter(task => task.id !== taskId));
      } else {
        alert(data.message || "Failed to accept task");
      }
    } catch (error) {
      alert("Something went wrong");
    } finally {
      setAcceptingTasks(prev => {
        const newSet = new Set(prev);
        newSet.delete(taskId);
        return newSet;
      });
    }
  };





  useEffect(() => {
    const fetchNearbyTasks = async () => {
      try {
        const token = sessionStorage.getItem('token');
        if (!token) {
          setErrorNearby('Authentication required');
          setLoadingNearby(false);
          return;
        }

        const response = await fetch('https://dohelp.newhopeindia17.com/api/tasks/nearby', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data.success) {
          const transformedTasks = data.tasks.map(task => ({
            id: task.id,
            title: task.title,
            description: task.description,
            amount: `₹${task.amount}`,
            location: task.location,
            time: formatTimeAgo(task.created_at),
            category: task.category,
            urgent: task.urgency_level === 'urgent'
          }));
          setNearbyTasks(transformedTasks);
        } else {
          setErrorNearby(data.message || 'Failed to fetch nearby tasks');
        }
      } catch (error) {
        setErrorNearby('Failed to fetch nearby tasks');
      } finally {
        setLoadingNearby(false);
      }
    };
    fetchNearbyTasks();
  }, []);

  return (
    <div className="min-h-screen p-4 bg-gradient-to-b from-gray-50 to-blue-50 md:p-6">
      <div className="mx-auto max-w-7xl">
        
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h1 className="mb-2 text-3xl font-bold text-gray-900 md:text-4xl">
                Welcome back, <span className="text-blue-600">{user?.name || 'User'}!</span>
              </h1>
              <p className="text-gray-600">
                Ready to find your next task or post something you need help with?
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              
              
              <Link
                to="/post-task"
                className="flex items-center gap-2 px-6 py-3 text-white transition-all shadow-lg rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 hover:shadow-xl"
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
          className="grid grid-cols-1 gap-4 mb-8 md:grid-cols-2 lg:grid-cols-4"
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
                <div className="p-3 bg-white rounded-xl">
                  {stat.icon}
                </div>
                <span className="px-2 py-1 text-sm font-semibold text-green-600 bg-green-100 rounded-full">
                  {stat.change}
                </span>
              </div>
              <div className="mb-1 text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.title}</div>
            </div>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-3">
          {/* Left Column - Available Tasks */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="overflow-hidden bg-white border border-gray-200 shadow-lg rounded-2xl"
            >
              {/* Tasks Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex flex-col items-start justify-between gap-4 mb-4 md:flex-row md:items-center">
                  <div>
                    <h2 className="mb-2 text-xl font-bold text-gray-900">Available Tasks Near You</h2>
                    <p className="text-gray-600">Tasks posted in your area</p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <FaSearch className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        placeholder="Search tasks..."
                        className="w-full py-2 pl-10 pr-4 border border-gray-300 md:w-64 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <button className="p-2 transition-colors border border-gray-300 rounded-xl hover:bg-gray-50">
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
                {loadingNearby ? (
                  // Loading skeleton for nearby tasks
                  [...Array(3)].map((_, index) => (
                    <div key={index} className="p-6 animate-pulse">
                      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-48 h-6 bg-gray-300 rounded"></div>
                            <div className="w-16 h-6 bg-gray-300 rounded-full"></div>
                            <div className="w-20 h-6 bg-gray-300 rounded-full"></div>
                          </div>
                          <div className="mb-3">
                            <div className="h-4 bg-gray-200 rounded-full"></div>
                          </div>
                          <div className="flex flex-wrap items-center gap-4 text-sm">
                            <div className="w-24 h-4 bg-gray-300 rounded"></div>
                            <div className="w-20 h-4 bg-gray-300 rounded"></div>
                            <div className="w-16 h-4 bg-gray-300 rounded"></div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-3">
                          <div className="w-16 h-8 bg-gray-300 rounded"></div>
                          <div className="w-24 h-10 bg-gray-300 rounded-xl"></div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : errorNearby ? (
                  <div className="p-6 text-center text-red-500">
                    {errorNearby}
                  </div>
                ) : nearbyTasks.length > 0 ? (
                  nearbyTasks.map((task) => (
                    <motion.div
                      key={task.id}
                      whileHover={{ scale: 1.005 }}
                      className="p-6 transition-colors hover:bg-gray-50"
                    >
                      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
                            {task.urgent && (
                              <span className="flex items-center gap-1 px-2 py-1 text-xs text-red-700 bg-red-100 rounded-full">
                                <FaFire className="text-xs" />
                                Urgent
                              </span>
                            )}
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              getCategoryName(task.category) === "Delivery" ? "bg-blue-100 text-blue-700" :
                              getCategoryName(task.category) === "Cleaning" ? "bg-green-100 text-green-700" :
                              getCategoryName(task.category) === "Online Help" ? "bg-purple-100 text-purple-700" :
                              "bg-yellow-100 text-yellow-700"
                            }`}>
                              {getCategoryName(task.category)}
                            </span>
                          </div>

                          <p className="mb-3 text-gray-600">{task.description}</p>

                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <FaMapMarkerAlt className="text-gray-400" />
                              {task.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <FaClock className="text-gray-400" />
                              {task.time}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-3">
                          <div className="text-2xl font-bold text-green-600">{task.amount}</div>
                          <div className="flex gap-2">
                            <Link
                              to={`/nearby-task-detail/${task.id}`}
                              className="px-4 py-2 text-white transition-all rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                              style={{ color: 'white' }}
                            >
                              View
                            </Link>
                            <button
                              onClick={() => acceptTask(task.id)}
                              disabled={acceptingTasks.has(task.id)}
                              className="px-4 py-2 text-white transition-all rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:opacity-50"
                            >
                              {acceptingTasks.has(task.id) ? "Accepting..." : "Accept"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="p-6 text-center text-gray-500">
                    No nearby tasks available.
                  </div>
                )}
              </div>
              
              {/* View All Link */}
              <div className="p-6 border-t border-gray-100">
                <Link
                  to="/my-tasks"
                  className="flex items-center justify-center gap-2 font-medium text-blue-600 hover:text-blue-700"
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
              className="p-6 bg-white border border-gray-200 shadow-lg rounded-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Your Tasks</h2>
                <Link to="/posted-tasks" className="text-sm font-medium text-blue-600 hover:text-blue-700">
                  View All
                </Link>
              </div>
              
              <div className="space-y-4">
                {tasksLoading ? (
                  // Loading skeleton for tasks
                  [...Array(3)].map((_, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-xl animate-pulse">
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-32 h-4 bg-gray-300 rounded"></div>
                        <div className="w-16 h-6 bg-gray-300 rounded-full"></div>
                      </div>
                      <div className="mb-3">
                        <div className="h-2 bg-gray-200 rounded-full"></div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="w-20 h-3 bg-gray-300 rounded"></div>
                        <div className="w-16 h-4 bg-gray-300 rounded"></div>
                      </div>
                    </div>
                  ))
                ) : userTasks.length > 0 ? (
                  userTasks.map((task) => (
                    <div key={task.id} className="p-4 transition-colors border border-gray-200 rounded-xl hover:border-blue-300">
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
                        <div className="flex justify-between mb-1 text-sm text-gray-600">
                          <span>Progress</span>
                          <span>{task.progress}%</span>
                        </div>
                        <div className="h-2 overflow-hidden bg-gray-200 rounded-full">
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
                  ))
                ) : (
                  <div className="py-8 text-center text-gray-500">
                    <FaClock className="mx-auto mb-2 text-2xl" />
                    <p>No tasks yet. Start by taking on some tasks!</p>
                  </div>
                )}
              </div>
              
              
            </motion.div>
            
            {/* Popular Categories */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="p-6 bg-white border border-gray-200 shadow-lg rounded-2xl"
            >
              <h2 className="mb-6 text-xl font-bold text-gray-900">Popular Categories</h2>

              {categoriesLoading ? (
                <div className="grid grid-cols-2 gap-3">
                  {[...Array(6)].map((_, index) => (
                    <div key={index} className="p-4 border-2 border-gray-200 rounded-xl animate-pulse">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 bg-gray-300 rounded-lg"></div>
                        <div className="w-20 h-4 bg-gray-300 rounded"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      to={`/tasks?category=${category.name.toLowerCase()}`}
                      className="p-4 transition-all border border-gray-200 group rounded-xl hover:border-blue-300 hover:bg-blue-50"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <img
                          src={category.image}
                          alt={category.name}
                          className="object-cover w-12 h-12 rounded-lg"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">{category.name}</h3>
                        </div>
                      </div>
                      <div className="text-xs text-blue-600 transition-opacity opacity-0 group-hover:opacity-100">
                        Browse tasks →
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </motion.div>
            
            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="p-6 text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl"
            >
              <h2 className="mb-6 text-xl font-bold">Your Weekly Progress</h2>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Tasks Completed</span>
                    <span>4/6</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/30">
                    <div className="h-full bg-white rounded-full" style={{ width: "66%" }} />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Earnings Goal</span>
                    <span>₹8,500/₹10,000</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/30">
                    <div className="h-full bg-green-300 rounded-full" style={{ width: "85%" }} />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Rating Improvement</span>
                    <span>4.8/5.0</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/30">
                    <div className="h-full bg-yellow-300 rounded-full" style={{ width: "96%" }} />
                  </div>
                </div>
              </div>
              
              <div className="pt-6 mt-6 border-t border-white/20">
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
          className="p-8 border border-blue-100 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl"
        >
          <h2 className="mb-6 text-2xl font-bold text-center text-gray-900">
            How DoHelp Works
          </h2>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
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
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-2xl font-bold text-white rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500">
                  {step.step}
                </div>
                <div className="p-4 bg-white border border-gray-200 rounded-xl">
                  <div className="flex justify-center mb-3 text-blue-600">
                    {step.icon}
                  </div>
                  <h3 className="mb-2 font-bold text-gray-900">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}