import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useCategories } from "../contexts/CategoriesContext";
import { useTasks } from "../contexts/TasksContext";
import {
  FaSearch,
  FaFilter,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationCircle,
  FaMoneyBillWave,
  FaStar,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUser,
  FaArrowRight,
  FaPlusCircle,
  FaEllipsisH,
  FaEye,
  FaEdit,
  FaTrash,
  FaShare,
  FaPhone,
  FaComment,
  FaThumbsUp,
  FaChartLine,
  FaTrophy,
  FaSortAmountDown,
  FaSortAmountUp,
  FaFire
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function MyTasks() {
  const { user } = useAuth();
  const { categories, loading: categoriesLoading } = useCategories();
  const { userTasks, postedTasks, loading: tasksLoading, postedTasksLoading } = useTasks();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [nearbyTasks, setNearbyTasks] = useState([]);
  const [loadingNearby, setLoadingNearby] = useState(true);
  const [errorNearby, setErrorNearby] = useState(null);
  const [acceptingTasks, setAcceptingTasks] = useState(new Set());

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

  const formatDeadline = (deadlineString) => {
    if (!deadlineString) return null;
    const deadline = new Date(deadlineString);
    return deadline.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
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

  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : categoryId;
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
            urgent: task.urgency_level === 'urgent',
            status: task.status || 'open',
            user_name: task.user?.name || 'Nearby Task Poster',
            user_rating: task.user?.rating || 0,
            created_at: task.created_at,
            progress: 0,
            messages: 0,
            offers: 0,
            deadline: task.deadline,
            rating: null,
            review: null,
            reason: null
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

  // Categorize tasks dynamically
  const categorizeTasks = () => {
    const activeTasks = userTasks.filter(task =>
      ['in-progress', 'accepted', 'negotiating'].includes(task.status)
    );
    const pendingTasks = userTasks.filter(task =>
      ['pending-approval', 'awaiting-payment'].includes(task.status)
    );
    const completedTasks = userTasks.filter(task => task.status === 'completed');
    const cancelledTasks = userTasks.filter(task => task.status === 'cancelled');

    return {
      active: activeTasks,
      pending: pendingTasks,
      completed: completedTasks,
      cancelled: cancelledTasks,
      posted: postedTasks || [],
      all: [...activeTasks, ...pendingTasks, ...completedTasks, ...cancelledTasks, ...nearbyTasks]
    };
  };

  const tasks = categorizeTasks();

  // Calculate dynamic stats
  const taskStats = {
    active: tasks.active.length,
    pending: tasks.pending.length,
    completed: tasks.completed.length,
    cancelled: tasks.cancelled.length,
    totalEarnings: tasks.completed.reduce((sum, task) => sum + parseInt(task.amount.replace('₹', '')), 0)
  };

  const tabs = [
    { id: "active", label: "Active", count: taskStats.active, color: "text-blue-600 bg-blue-100" },
    { id: "pending", label: "Pending", count: taskStats.pending, color: "text-yellow-600 bg-yellow-100" },
    { id: "completed", label: "Completed", count: taskStats.completed, color: "text-green-600 bg-green-100" },
    { id: "cancelled", label: "Cancelled", count: taskStats.cancelled, color: "text-red-600 bg-red-100" },
    { id: "all", label: "All Tasks", count: tasks.all.length, color: "text-purple-600 bg-purple-100" },
  ];

  const statusColors = {
    "in-progress": "bg-blue-100 text-blue-700",
    "accepted": "bg-green-100 text-green-700",
    "negotiating": "bg-yellow-100 text-yellow-700",
    "pending-approval": "bg-orange-100 text-orange-700",
    "awaiting-payment": "bg-purple-100 text-purple-700",
    "completed": "bg-emerald-100 text-emerald-700",
    "cancelled": "bg-red-100 text-red-700"
  };

  const statusIcons = {
    "in-progress": <FaClock className="text-blue-500" />,
    "accepted": <FaCheckCircle className="text-green-500" />,
    "negotiating": <FaExclamationCircle className="text-yellow-500" />,
    "pending-approval": <FaClock className="text-orange-500" />,
    "awaiting-payment": <FaMoneyBillWave className="text-purple-500" />,
    "completed": <FaCheckCircle className="text-emerald-500" />,
    "cancelled": <FaTimesCircle className="text-red-500" />
  };

  const getStatusText = (status) => {
    const texts = {
      "in-progress": "In Progress",
      "accepted": "Accepted",
      "negotiating": "Negotiating",
      "pending-approval": "Pending Approval",
      "awaiting-payment": "Awaiting Payment",
      "completed": "Completed",
      "cancelled": "Cancelled"
    };
    return texts[status] || status;
  };

  return (
    <div className="min-h-screen p-4 bg-gradient-to-b from-gray-50 to-blue-50 md:p-6">
      <div className="mx-auto max-w-7xl">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col items-start justify-between gap-4 mb-6 md:flex-row md:items-center">
            <div>
              <h1 className="mb-2 text-3xl font-bold text-gray-900 md:text-4xl">Tasks Summary</h1>
              <p className="text-gray-600">
                Manage all your posted and accepted tasks in one place
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <Link
                to="/post-task"
                className="flex items-center gap-2 px-6 py-3 text-white transition-all shadow-lg rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 hover:shadow-xl"
              >
                <FaPlusCircle className="text-white" />
                <span className="text-white">Post New Task</span>
              </Link>
              <Link
                to="/posted-tasks"
                className="flex items-center gap-2 px-6 py-3 text-white transition-all shadow-lg rounded-xl bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 hover:shadow-xl"
              >
                <FaEye className="text-white" />
                <span className="text-white">View Posted Tasks</span>
              </Link>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 gap-4 mb-6 md:grid-cols-5">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  activeTab === tab.id
                    ? "border-blue-300 bg-white shadow-md"
                    : "border-gray-200 bg-white hover:border-blue-200"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-bold text-gray-900">{tab.count}</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${tab.color}`}>
                    {tab.label}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  {tab.label === "All Tasks" ? "Total Tasks" : tab.label}
                </div>
              </div>
            ))}
          </div>

          {/* Total Earnings Card */}
          <div className="p-6 mb-6 border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="mb-1 text-sm text-gray-600">Total Earnings from Completed Tasks</div>
                <div className="text-3xl font-bold text-gray-900">₹{taskStats.totalEarnings.toLocaleString()}</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">12</div>
                  <div className="text-sm text-gray-600">Completed</div>
                </div>
                <FaChartLine className="text-3xl text-green-500" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          {/* Left Column - Filters & Actions */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Search & Filter */}
              <div className="p-6 bg-white border border-gray-200 shadow-lg rounded-2xl">
                <h2 className="mb-4 text-lg font-bold text-gray-900">Filter Tasks</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Search</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <FaSearch className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        placeholder="Search tasks..."
                        className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Sort By</label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSortBy("recent")}
                        className={`flex-1 py-2 rounded-lg text-sm font-medium ${
                          sortBy === "recent"
                            ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        <FaSortAmountDown className="inline mr-2" />
                        Recent
                      </button>
                      <button
                        onClick={() => setSortBy("amount")}
                        className={`flex-1 py-2 rounded-lg text-sm font-medium ${
                          sortBy === "amount"
                            ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        <FaSortAmountUp className="inline mr-2" />
                        Amount
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Category</label>
                    <div className="space-y-2">
                      {["Delivery", "Cleaning", "Online Help", "Handyman", "Tutoring", "Pet Care"].map((category) => (
                        <label key={category} className="flex items-center">
                          <input type="checkbox" className="text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                          <span className="ml-2 text-sm text-gray-700">{category}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center justify-center w-full gap-2 py-2 text-blue-600 transition-colors border border-blue-500 rounded-lg hover:bg-blue-50"
                  >
                    <FaFilter />
                    {showFilters ? "Hide Advanced Filters" : "Show Advanced Filters"}
                  </button>
                </div>
              </div>

              {/* Nearby Tasks */}
              <div className="p-6 bg-white border border-gray-200 shadow-lg rounded-2xl">
                <h2 className="mb-4 text-lg font-bold text-gray-900">Nearby Tasks</h2>

                {loadingNearby ? (
                  <div className="py-4 text-center">
                    <div className="w-8 h-8 mx-auto border-b-2 border-blue-500 rounded-full animate-spin"></div>
                    <p className="mt-2 text-sm text-gray-600">Loading nearby tasks...</p>
                  </div>
                ) : errorNearby ? (
                  <div className="py-4 text-center">
                    <FaExclamationCircle className="mx-auto mb-2 text-2xl text-red-500" />
                    <p className="text-sm text-red-600">{errorNearby}</p>
                  </div>
                ) : nearbyTasks.length === 0 ? (
                  <div className="py-4 text-center">
                    <FaMapMarkerAlt className="mx-auto mb-2 text-2xl text-gray-400" />
                    <p className="text-sm text-gray-600">No nearby tasks found</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {nearbyTasks.slice(0, 3).map((task) => (
                      <div key={task.id} className="p-3 transition-colors border border-gray-100 rounded-lg hover:border-blue-200">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="text-sm font-medium text-gray-900 line-clamp-1">{task.title}</h4>
                          <span className="text-sm font-bold text-green-600">{task.amount}</span>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <FaMapMarkerAlt className="text-xs text-gray-400" />
                          <span className="text-xs text-gray-600">{task.location}</span>
                        </div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-gray-500">{task.time}</span>
                          {task.urgent && (
                            <span className="px-2 py-1 text-xs text-red-700 bg-red-100 rounded-full">Urgent</span>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => navigate(`/nearby-task-detail/${task.id}`)}
                            className="flex-1 py-2 text-sm font-medium text-center text-blue-600 transition-colors bg-blue-100 rounded-lg hover:bg-blue-200"
                          >
                            View Details
                          </button>
                          {task.status === 'open' && (
                            <button
                              onClick={() => acceptTask(task.id)}
                              disabled={acceptingTasks.has(task.id)}
                              className="flex-1 py-2 text-sm font-medium text-white transition-colors bg-green-600 rounded-lg hover:bg-green-700 disabled:bg-gray-400"
                            >
                              {acceptingTasks.has(task.id) ? "Accepting..." : "Accept"}
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                    {nearbyTasks.length > 3 && (
                      <Link
                        to="/nearby-tasks"
                        className="block py-2 text-sm font-medium text-center text-blue-600 hover:text-blue-700"
                      >
                        View all nearby tasks ({nearbyTasks.length})
                      </Link>
                    )}
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="p-6 bg-white border border-gray-200 shadow-lg rounded-2xl">
                <h2 className="mb-4 text-lg font-bold text-gray-900">Quick Actions</h2>
                <div className="space-y-3">
                  <button className="flex items-center justify-between w-full p-3 transition-colors border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50">
                    <span className="font-medium text-gray-900">View All Offers</span>
                    <span className="px-2 py-1 text-xs text-blue-700 bg-blue-100 rounded-full">5 new</span>
                  </button>
                  <button className="flex items-center justify-between w-full p-3 transition-colors border border-gray-200 rounded-xl hover:border-green-300 hover:bg-green-50">
                    <span className="font-medium text-gray-900">Pending Payments</span>
                    <span className="px-2 py-1 text-xs text-green-700 bg-green-100 rounded-full">₹2,500</span>
                  </button>
                  <button className="flex items-center justify-between w-full p-3 transition-colors border border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50">
                    <span className="font-medium text-gray-900">Awaiting Reviews</span>
                    <span className="px-2 py-1 text-xs text-purple-700 bg-purple-100 rounded-full">3 tasks</span>
                  </button>
                  <button className="flex items-center justify-between w-full p-3 transition-colors border border-gray-200 rounded-xl hover:border-yellow-300 hover:bg-yellow-50">
                    <span className="font-medium text-gray-900">Disputes</span>
                    <span className="px-2 py-1 text-xs text-yellow-700 bg-yellow-100 rounded-full">1 open</span>
                  </button>
                </div>
              </div>

              {/* Achievement */}
              <div className="p-6 border border-yellow-200 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <FaTrophy className="text-2xl text-yellow-500" />
                  <div>
                    <h3 className="font-bold text-gray-900">Top Helper This Week</h3>
                    <p className="text-sm text-gray-600">Keep up the good work!</p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="mb-2 text-3xl font-bold text-gray-900">#3</div>
                  <div className="text-sm text-gray-600">Rank in Mumbai</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Tasks List */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="overflow-hidden bg-white border border-gray-200 shadow-lg rounded-2xl"
            >
              {/* Tabs */}
              <div className="border-b border-gray-200">
                <div className="flex flex-wrap">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors ${
                        activeTab === tab.id
                          ? "text-blue-600 border-b-2 border-blue-600"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                      }`}
                    >
                      {tab.label}
                      <span className={`px-2 py-1 text-xs rounded-full ${tab.color}`}>
                        {tasks[tab.id]?.length || 0}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tasks List */}
              <div className="divide-y divide-gray-100">
                <AnimatePresence mode="wait">
                  {tasks[activeTab]?.map((task) => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-6 transition-colors hover:bg-gray-50"
                    >
                      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                        {/* Left Content */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
                                {task.urgent && (
                                  <span className="flex items-center gap-1 px-2 py-1 text-xs text-red-700 bg-red-100 rounded-full">
                                    <FaExclamationCircle />
                                    Urgent
                                  </span>
                                )}
                                <span className={`px-3 py-1 text-xs rounded-full ${statusColors[task.status]}`}>
                                  <span className="flex items-center gap-1">
                                    {statusIcons[task.status]}
                                    {getStatusText(task.status)}
                                  </span>
                                </span>
                              </div>
                              
                          <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
                                <span className="flex items-center gap-1">
                                  <FaMapMarkerAlt />
                                  {task.location}
                                </span>
                                <span className="flex items-center gap-1">
                                  <FaUser />
                                  {task.user_name || task.postedBy || 'Unknown'} • {task.user_rating || task.postedByRating || 0} ⭐
                                </span>
                                <span className="flex items-center gap-1">
                                  <FaCalendarAlt />
                                  {task.created_at ? formatTimeAgo(task.created_at) : task.postedTime || 'Unknown'}
                                </span>
                              </div>
                            </div>
                            
                            <div className="mb-3 text-2xl font-bold text-green-600 lg:hidden">
                              {typeof task.amount === 'string' ? task.amount : `₹${task.amount}`}
                            </div>
                          </div>

                          <p className="mb-4 text-gray-700">{task.description}</p>

                          {/* Progress & Details */}
                          <div className="flex flex-wrap items-center gap-6">
                            {task.progress > 0 && (
                              <div className="flex items-center gap-3">
                                <div className="w-32">
                                  <div className="flex justify-between mb-1 text-xs text-gray-600">
                                    <span>Progress</span>
                                    <span>{task.progress}%</span>
                                  </div>
                                  <div className="h-2 overflow-hidden bg-gray-200 rounded-full">
                                    <div 
                                      className={`h-full rounded-full ${
                                        task.status === "completed" ? "bg-green-500" :
                                        task.status === "cancelled" ? "bg-red-500" :
                                        "bg-blue-500"
                                      }`}
                                      style={{ width: `${task.progress}%` }}
                                    />
                                  </div>
                                </div>
                              </div>
                            )}

                            <div className="flex items-center gap-4">
                              {task.messages > 0 && (
                                <span className="flex items-center gap-1 text-sm text-gray-600">
                                  <FaComment />
                                  {task.messages} messages
                                </span>
                              )}
                              {task.offers > 0 && (
                                <span className="flex items-center gap-1 text-sm text-gray-600">
                                  <FaThumbsUp />
                                  {task.offers} offers
                                </span>
                              )}
                            </div>

                            {task.deadline && (
                              <div className="text-sm">
                                <span className="text-gray-600">Deadline: </span>
                                <span className="font-medium text-gray-900">{formatDeadline(task.deadline)}</span>
                              </div>
                            )}
                          </div>

                          {/* Rating & Review for Completed Tasks */}
                          {task.status === "completed" && task.rating && (
                            <div className="p-4 mt-4 border border-green-200 bg-green-50 rounded-xl">
                              <div className="flex items-center gap-3 mb-2">
                                <div className="flex items-center gap-1">
                                  <FaStar className="text-yellow-400" />
                                  <span className="font-bold text-gray-900">{task.rating}/5</span>
                                </div>
                                <span className="text-sm text-gray-600">Review from {task.postedBy}</span>
                              </div>
                              <p className="italic text-gray-700">"{task.review}"</p>
                            </div>
                          )}

                          {/* Cancellation Reason */}
                          {task.status === "cancelled" && task.reason && (
                            <div className="p-4 mt-4 border border-red-200 bg-red-50 rounded-xl">
                              <div className="flex items-center gap-2 mb-2 text-red-700">
                                <FaExclamationCircle />
                                <span className="font-medium">Cancellation Reason:</span>
                              </div>
                              <p className="text-gray-700">{task.reason}</p>
                            </div>
                          )}
                        </div>

{/* Right Actions */}
<div className="flex flex-col gap-3 lg:w-48">
  <div className="hidden text-2xl font-bold text-right text-green-600 lg:block">
    {task.amount}
  </div>
  
  <div className="flex flex-col gap-2">
    <button
      onClick={() => navigate(`/nearby-task-detail/${task.id}`)}
      className="flex items-center w-full gap-2 py-2 text-white transition-all rounded-lg justify-cent er bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
    >
      <FaEye />
      View Details
    </button>

    {task.status === "in-progress" && (
      <button className="flex items-center justify-center w-full gap-2 py-2 text-white transition-colors bg-green-600 border border-green-600 rounded-lg hover:bg-green-700">
        <FaCheckCircle />
        Mark Complete
      </button>
    )}

    {task.status === "accepted" && (
      <button className="flex items-center justify-center w-full gap-2 py-2 text-white transition-colors bg-blue-600 border border-blue-600 rounded-lg hover:bg-blue-700">
        <FaComment />
        Message
      </button>
    )}

    {(task.status === "pending-approval" || task.status === "negotiating") && (
      <div className="flex gap-2">
        <button className="flex-1 py-2 text-white transition-colors bg-green-600 border border-green-600 rounded-lg hover:bg-green-700">
          Accept
        </button>
        <button className="flex-1 py-2 text-white transition-colors bg-red-600 border border-red-600 rounded-lg hover:bg-red-700">
          Decline
        </button>
      </div>
    )}

    {task.status === "open" && (
      <button
        onClick={() => acceptTask(task.id)}
        disabled={acceptingTasks.has(task.id)}
        className="flex items-center justify-center w-full gap-2 py-2 text-white transition-colors bg-green-600 rounded-lg hover:bg-green-700 disabled:bg-gray-400"
      >
        {acceptingTasks.has(task.id) ? "Accepting..." : "Accept"}
      </button>
    )}

    {activeTab !== "all" && (
      <div className="flex gap-2">
        <button className="flex-1 py-2 text-gray-700 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50">
          <FaEdit />
        </button>
        <button className="flex-1 py-2 text-gray-700 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50">
          <FaShare />
        </button>
        <button className="flex-1 py-2 text-gray-700 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50">
          <FaTrash />
        </button>
      </div>
    )}
  </div>
</div>
</div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Empty State */}
                {(!tasks[activeTab] || tasks[activeTab].length === 0) && (
                  <div className="p-12 text-center">
                    <div className="mb-4 text-5xl text-gray-400">
                      {activeTab === "active" && <FaClock />}
                      {activeTab === "pending" && <FaExclamationCircle />}
                      {activeTab === "completed" && <FaCheckCircle />}
                      {activeTab === "cancelled" && <FaTimesCircle />}
                      {activeTab === "posted" && <FaPlusCircle />}
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-gray-900">
                      No {activeTab} tasks found
                    </h3>
                    <p className="mb-6 text-gray-600">
                      {activeTab === "active" && "You don't have any active tasks right now."}
                      {activeTab === "pending" && "No pending tasks at the moment."}
                      {activeTab === "completed" && "You haven't completed any tasks yet."}
                      {activeTab === "cancelled" && "No cancelled tasks."}
                      {activeTab === "posted" && "You haven't posted any tasks yet."}
                    </p>
                    <Link
                      to={activeTab === "posted" ? "/post-task" : "/tasks"}
                      className="inline-flex items-center gap-2 px-6 py-3 text-white transition-all rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                    >
                      {activeTab === "posted" ? "Post Your First Task" : "Browse Available Tasks"}
                      <FaArrowRight />
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Bottom Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-3"
            >
              <div className="p-6 border border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <FaClock className="text-2xl text-blue-500" />
                  <div>
                    <h3 className="font-bold text-gray-900">Average Response Time</h3>
                    <p className="text-sm text-gray-600">To new tasks</p>
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900">15 mins</div>
              </div>

              <div className="p-6 border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <FaCheckCircle className="text-2xl text-green-500" />
                  <div>
                    <h3 className="font-bold text-gray-900">Completion Rate</h3>
                    <p className="text-sm text-gray-600">Tasks completed on time</p>
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900">96%</div>
              </div>

              <div className="p-6 border border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <FaStar className="text-2xl text-purple-500" />
                  <div>
                    <h3 className="font-bold text-gray-900">Average Rating</h3>
                    <p className="text-sm text-gray-600">From task posters</p>
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900">4.8/5</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
