import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useCategories } from "../contexts/CategoriesContext";
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
  FaVideo,
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
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [nearbyTasks, setNearbyTasks] = useState([]);
  const [loadingNearby, setLoadingNearby] = useState(true);
  const [errorNearby, setErrorNearby] = useState(null);
  const [acceptingTasks, setAcceptingTasks] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [minAmount, setMinAmount] = useState("0");
  const [maxAmount, setMaxAmount] = useState("10000");
  const [selectedCategories, setSelectedCategories] = useState([]);

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

        const response = await fetch('https://dohelp.newhopeindia17.com/api/tasks/accepted', {
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
            reason: null,
            contact_preference: task.contact_preference
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
    const acceptedTasks = nearbyTasks.filter(task => task.status === 'accepted');
    const inProgressTasks = nearbyTasks.filter(task => task.status === 'in-progress');
    const completedTasks = nearbyTasks.filter(task => task.status === 'completed');

    return {
      accepted: acceptedTasks,
      inProgress: inProgressTasks,
      completed: completedTasks,
      all: nearbyTasks
    };
  };

  const tasks = categorizeTasks();

  // Calculate dynamic stats
  const taskStats = {
    accepted: tasks.accepted.length,
    inProgress: tasks.inProgress.length,
    completed: tasks.completed.length,
    totalEarnings: tasks.completed.reduce((sum, task) => sum + parseInt(task.amount.replace('₹', '')), 0)
  };

  const tabs = [
    { id: "all", label: "All Tasks", count: tasks.all.length, color: "text-purple-600 bg-purple-100" },
    { id: "accepted", label: "Accepted", count: taskStats.accepted, color: "text-green-600 bg-green-100" },
    { id: "inProgress", label: "In Progress", count: taskStats.inProgress, color: "text-blue-600 bg-blue-100" },
    { id: "completed", label: "Completed", count: taskStats.completed, color: "text-emerald-600 bg-emerald-100" },
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
    <div className="min-h-screen p-4 bg-linear-to-b from-gray-50 to-blue-50 md:p-6">
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
                className="flex items-center gap-2 px-6 py-3 text-white transition-all shadow-lg rounded-xl bg-linear-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 hover:shadow-xl"
              >
                <FaPlusCircle className="text-white" />
                <span className="text-white">Post New Task</span>
              </Link>
              <Link
                to="/posted-tasks"
                className="flex items-center gap-2 px-6 py-3 text-white transition-all shadow-lg rounded-xl bg-linear-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 hover:shadow-xl"
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
          <div className="p-6 mb-6 border border-green-200 bg-linear-to-r from-green-50 to-emerald-50 rounded-2xl">
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
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Sort By</label>
                    <div className="flex gap-2">
                    <button
                      onClick={() => setSortBy("amount")}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                        sortBy === "amount"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                        <FaSortAmountUp className="inline mr-2" />
                        Amount
                      </button>
                      <button
                          onClick={() => { setMinAmount("0"); setMaxAmount("10000"); }}
                          className="px-3 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
                        >
                          Clear
                        </button>
                    </div>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Amount Range</label>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          placeholder="Min ₹"
                          value={minAmount}
                          onChange={(e) => setMinAmount(e.target.value)}
                          className="w-24 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <input
                          type="number"
                          placeholder="Max ₹"
                          value={maxAmount}
                          onChange={(e) => setMaxAmount(e.target.value)}
                          className="w-24 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="50000"
                        step="500"
                        value={maxAmount}
                        onChange={(e) => setMaxAmount(e.target.value)}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>₹0</span>
                        <span>₹50,000</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Category</label>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <label key={category.id} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(category.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedCategories(prev => [...prev, category.id]);
                              } else {
                                setSelectedCategories(prev => prev.filter(id => id !== category.id));
                              }
                            }}
                            className="text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">{category.name}</span>
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
                  {(() => {
                    // First filter by search query if specified
                    let filteredTasks = tasks[activeTab] || [];
                    if (searchQuery) {
                      filteredTasks = filteredTasks.filter(task =>
                        (task.title && task.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
                        (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
                        (task.location && task.location.toLowerCase().includes(searchQuery.toLowerCase()))
                      );
                    }

                    // Then filter by amount range if specified
                    if (minAmount || maxAmount) {
                      filteredTasks = filteredTasks.filter(task => {
                        const taskAmount = parseInt(task.amount.replace('₹', ''));
                        const min = minAmount ? parseInt(minAmount) : 0;
                        const max = maxAmount ? parseInt(maxAmount) : Infinity;
                        return taskAmount >= min && taskAmount <= max;
                      });
                    }

                    // Then filter by selected categories if specified
                    if (selectedCategories.length > 0) {
                      filteredTasks = filteredTasks.filter(task =>
                        selectedCategories.includes(task.category)
                      );
                    }

                    return filteredTasks.length === 0 ? (
                      <div className="p-12 text-center">
                        <FaSearch className="mx-auto mb-4 text-4xl text-gray-400" />
                        <p className="mb-4 text-gray-600">   
                             No tasks found matching your filters
                        </p>
                        <button
                          onClick={() => {
                            setSearchQuery("");
                            setMinAmount("0");
                            setMaxAmount("10000");
                            setSelectedCategories([]);
                          }}
                          className="inline-flex items-center gap-2 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                        >
                          Clear Filters
                        </button>
                      </div>
                    ) : (
                      filteredTasks.map((task) => (
                        <motion.div
                          key={task.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="p-6 transition-all duration-300 bg-white border border-gray-200 shadow-lg rounded-2xl hover:shadow-2xl hover:bg-linear-to-br hover:from-white hover:to-gray-50 hover:scale-105"
                        >
                          <div className="flex flex-col gap-4">
                            {/* Top row: Title and amount */}
                            <div className="flex items-start justify-between">
                              <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
                              <div className="text-2xl font-bold text-green-600">
                                {task.amount}
                              </div>
                            </div>

                            {/* Second row: Description */}
                            <p className="text-gray-700">{task.description}</p>

                            {/* Third row: Category, posted time, deadline */}
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span className="flex items-center gap-1">
                                <FaMoneyBillWave />
                                {getCategoryName(task.category)}
                              </span>
                              <span className="flex items-center gap-1 font-semibold text-blue-600">
                                <FaClock className="text-blue-500" />
                                Posted {task.created_at ? formatTimeAgo(task.created_at) : task.postedTime || 'Unknown'}
                              </span>
                              {task.deadline && (
                                <span className="flex items-center gap-1">
                                  <FaCalendarAlt />
                                  Deadline: {formatDeadline(task.deadline)}
                                </span>
                              )}
                            </div>

                            {/* Fourth row: Location */}
                            <div className="text-sm text-gray-600">
                              <span className="flex items-center gap-1">
                                <FaMapMarkerAlt />
                                {task.location}
                              </span>
                            </div>

                            {/* Fifth row: Helper Name or User Name */}
                            <div className="text-sm text-gray-600">
                              <span className="flex items-center gap-1">
                                <FaUser />
                                {task.user_name || task.postedBy || 'Unknown'} • {task.user_rating || task.postedByRating || 0} ⭐
                              </span>
                            </div>

                            {/* Bottom row: Actions on left, status and urgency on right */}
                            <div className="flex items-center justify-between">
                              <div className="flex flex-wrap items-center gap-2">
                                <button
                                  onClick={() => navigate(`/nearby-task-detail/${task.id}`)}
                                  className="flex items-center gap-1 px-3 py-1 text-sm text-blue-600 transition-colors border border-blue-300 rounded-lg hover:bg-blue-50"
                                >
                                  <FaEye />
                                  View Details
                                </button>
                                 {task.status === "in-progress" && (
                                  <>
                                    <button className="flex items-center gap-1 px-3 py-1 text-sm text-green-600 transition-colors border border-green-300 rounded-lg hover:bg-green-50">
                                      <FaCheckCircle />
                                      Mark Complete
                                    </button>
                                  </>
                                )}
                                {task.status === "accepted" && (
                                  <>
                                    {(task.contact_preference === 'message'|| task.contact_preference === 'both') && (
                                      <button className="flex items-center gap-1 px-3 py-1 text-sm text-blue-600 transition-colors border border-blue-300 rounded-lg hover:bg-blue-50">
                                        <FaComment />
                                        Message
                                      </button>
                                    )}
                                    {(task.contact_preference === 'call' || task.contact_preference === 'both') && (
                                      <button className="flex items-center gap-1 px-3 py-1 text-sm text-green-600 transition-colors border border-green-300 rounded-lg hover:bg-green-50">
                                        <FaPhone />
                                        Call
                                      </button>
                                    )}
                                  </>
                                )}


                              </div>
                              <div className="flex items-center gap-2">
                                {task.urgent && (
                                  <span className="flex items-center gap-1 px-3 py-2 text-sm text-red-700 bg-red-100 rounded-full">
                                    <FaExclamationCircle />
                                    Urgent
                                  </span>
                                )}
                                <span className={`px-4 py-2 text-sm rounded-full ${statusColors[task.status]}`}>
                                  <span className="flex items-center gap-1">
                                    {statusIcons[task.status]}
                                    {getStatusText(task.status)}
                                  </span>
                                </span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))
                    );
                  })()}
                </AnimatePresence>


              </div>
            </motion.div>

            {/* Bottom Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-3"
            >
              <div className="p-6 border border-blue-200 bg-linear-to-r from-blue-50 to-cyan-50 rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <FaClock className="text-2xl text-blue-500" />
                  <div>
                    <h3 className="font-bold text-gray-900">Average Response Time</h3>
                    <p className="text-sm text-gray-600">To new tasks</p>
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900">15 mins</div>
              </div>

              <div className="p-6 border border-green-200 bg-linear-to-r from-green-50 to-emerald-50 rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <FaCheckCircle className="text-2xl text-green-500" />
                  <div>
                    <h3 className="font-bold text-gray-900">Completion Rate</h3>
                    <p className="text-sm text-gray-600">Tasks completed on time</p>
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900">96%</div>
              </div>

              <div className="p-6 border border-purple-200 bg-linear-to-r from-purple-50 to-pink-50 rounded-2xl">
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
