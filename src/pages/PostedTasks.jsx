import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useCategories } from "../contexts/CategoriesContext";
import {
  FaSearch,
  FaFilter,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationCircle,
  FaMoneyBillWave,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUser,
  FaArrowRight,
  FaPlusCircle,
  FaEllipsisH,
  FaEye,
  FaTrash,
  FaShare,
  FaPhone,
  FaComment,
  FaThumbsUp,
  FaChartLine,
  FaTrophy,
  FaSortAmountDown,
  FaSortAmountUp
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function PostedTasks() {
  const navigate = useNavigate();
  const { categories, loading: categoriesLoading } = useCategories();
  const [sortBy, setSortBy] = useState("recent");
  const [showFilters, setShowFilters] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("all");

  const getPostedTime = (createdAt) => {
    const now = new Date();
    const created = new Date(createdAt);
    const diffMs = now - created;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays === 0) {
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      if (diffHours === 0) {
        const diffMinutes = Math.floor(diffMs / (1000 * 60));
        return diffMinutes === 0 ? 'Just now' : `${diffMinutes} minutes ago`;
      } else {
        return `${diffHours} hours ago`;
      }
    }
    if (diffDays === 1) return '1 day ago';
    return `${diffDays} days ago`;
  };

  const deleteTask = async (id) => {
  if (!window.confirm("Are you sure you want to delete this task?")) return;

  const token = sessionStorage.getItem("token");

  try {
    const res = await fetch(`https://dohelp.newhopeindia17.com/api/tasks/delete/${id}`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (data.success) {
      // Task ko UI se hata do
      setTasks((prev) => prev.filter((task) => task.id !== id));
      toast.success("Task deleted successfully!");
    } else {
      toast.error(data.message || "Failed to delete task");
    }
  } catch (error) {
    toast.error("Something went wrong");
    console.error(error);
  }
};


  const formatDateTime = (dateString) => {
    console.log('formatDateTime called with:', dateString);
    if (!dateString || dateString === null || dateString === undefined) {
      console.log('Date string is null/undefined/empty');
      return 'Date not available';
    }
    try {
      let date;

      // Handle ISO format with microseconds like "2026-01-08T10:16:19.000000Z"
      if (typeof dateString === 'string' && dateString.includes('T') && dateString.includes('Z')) {
        // Remove microseconds (anything after the first 3 digits after the dot)
        const cleanDate = dateString.replace(/(\.\d{3})\d*Z$/, '$1Z');
        console.log('Cleaned date string:', cleanDate);
        date = new Date(cleanDate);
        console.log('Parsed date:', date, 'isNaN:', isNaN(date.getTime()));
        if (!isNaN(date.getTime())) {
          const formatted = `${date.toLocaleDateString('en-IN')} at ${date.toLocaleTimeString('en-IN')}`;
          console.log('Formatted date:', formatted);
          return formatted;
        }
      }

      // If it's already a valid date string
      date = new Date(dateString);
      if (!isNaN(date.getTime())) {
        return `${date.toLocaleDateString('en-IN')} at ${date.toLocaleTimeString('en-IN')}`;
      }

      return 'Invalid Date';
    } catch (error) {
      console.log('Error parsing date:', error);
      return 'Invalid Date';
    }
  };

  useEffect(() => {
    if (categories.length === 0) return; // Wait for categories to load

    const token = sessionStorage.getItem('token');

    fetch('https://dohelp.newhopeindia17.com/api/post-task', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log('API Response:', data); // Debug log
        if (data.success) {
          const mappedTasks = data.tasks.map(task => {
            console.log('Task created_at:', task.created_at); // Debug log
            return {
              id: task.id,
              title: task.title,
              description: task.description,
              category: getCategoryName(task.category),
              amount: `₹${task.amount}`,
              location: task.location,
              created_at: task.created_at,
              postedTime: getPostedTime(task.created_at),
              deadline: new Date(task.deadline).toLocaleDateString(),
              status: task.status,
              offers: 0,
              acceptedBy: null,
              urgent: task.urgency_level === 'urgent'
            };
          });
          setTasks(mappedTasks);
        } else {
          setError('Failed to fetch tasks');
        }
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [categories]);

  const statusColors = {
    "open": "bg-green-100 text-green-700",
    "assigned": "bg-orange-100 text-orange-700",
    "in-progress": "bg-blue-100 text-blue-700",
    "completed": "bg-emerald-100 text-emerald-700",
    "cancelled": "bg-red-100 text-red-700"
  };

  const statusIcons = {
    "open": <FaCheckCircle className="text-green-500" />,
    "assigned": <FaClock className="text-blue-500" />,
    "in-progress": <FaClock className="text-blue-500" />,
    "completed": <FaCheckCircle className="text-emerald-500" />,
    "cancelled": <FaTimesCircle className="text-red-500" />
  };

  const getStatusText = (status) => {
    const texts = {
      "open": "Open",
      "assigned": "Assigned",
      "in-progress": "In Progress",
      "completed": "Completed",
      "cancelled": "Cancelled"
    };
    return texts[status] || status;
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id == categoryId);
    return category ? category.name : categoryId;
  };

  return (
    <div className="min-h-screen p-4 md:p-6 bg-gradient-to-b from-gray-50 to-blue-50">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col items-start justify-between gap-4 mb-6 md:flex-row md:items-center">
            <div>
              <h1 className="mb-2 text-3xl font-bold text-gray-900 md:text-4xl">My Posted Tasks</h1>
              <p className="text-gray-600">
                Manage tasks you've posted and track their progress
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Link
                to="/post-task"
                className="flex items-center gap-2 px-6 py-3 text-white transition-all shadow-lg rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 hover:shadow-xl hover:scale-105"
              >
                <FaPlusCircle className="text-white" />
                <span className="text-white">Post New Task</span>
              </Link>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 gap-4 mb-6 md:grid-cols-4">
            <div className="p-4 bg-white border border-gray-200 shadow-lg rounded-2xl backdrop-blur-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-bold text-gray-900">{tasks.length}</span>
                <span className="px-2 py-1 text-xs text-indigo-600 bg-indigo-100 rounded-full">
                  Total Posted
                </span>
              </div>
              <div className="text-sm text-gray-600">Tasks Posted</div>
            </div>

            <div className="p-4 bg-white border border-gray-200 shadow-lg rounded-2xl backdrop-blur-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-bold text-gray-900">{tasks.filter(t => t.status === 'open').length}</span>
                <span className="px-2 py-1 text-xs text-green-600 bg-green-100 rounded-full">
                  Open
                </span>
              </div>
              <div className="text-sm text-gray-600">Awaiting Offers</div>
            </div>

            <div className="p-4 bg-white border border-gray-200 shadow-lg rounded-2xl backdrop-blur-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-bold text-gray-900">{tasks.filter(t => t.status === 'assigned').length}</span>
                <span className="px-2 py-1 text-xs text-orange-600 bg-orange-100 rounded-full">
                  Assigned
                </span>
              </div>
              <div className="text-sm text-gray-600">In Progress</div>
            </div>

            <div className="p-4 bg-white border border-gray-200 shadow-lg rounded-2xl backdrop-blur-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-bold text-gray-900">{tasks.filter(t => t.status === 'completed').length}</span>
                <span className="px-2 py-1 text-xs rounded-full text-emerald-600 bg-emerald-100">
                  Completed
                </span>
              </div>
              <div className="text-sm text-gray-600">Finished</div>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          {/* Left Column - Filters */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Search & Filter */}
              <div className="p-6 bg-white border border-gray-200 shadow-lg rounded-2xl backdrop-blur-sm">
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
                        className="w-full py-2 pl-10 pr-4 transition-colors bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Sort By</label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSortBy("recent")}
                        className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
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
                        className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
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
                    <label className="block mb-2 text-sm font-medium text-gray-700">Status</label>
                    <div className="space-y-2">
                      {["Open", "Assigned", "In Progress", "Completed", "Cancelled"].map((status) => (
                        <label key={status} className="flex items-center">
                          <input type="checkbox" className="text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                          <span className="ml-2 text-sm text-gray-700">{status}</span>
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

              {/* Quick Actions */}
              <div className="p-6 bg-white border border-gray-200 shadow-lg rounded-2xl backdrop-blur-sm">
                <h2 className="mb-4 text-lg font-bold text-gray-900">Quick Actions</h2>
                <div className="space-y-3">
                  <button className="flex items-center justify-between w-full p-3 text-gray-900 transition-colors border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50">
                    <span className="font-medium">View All Offers</span>
                    <span className="px-2 py-1 text-xs text-blue-700 bg-blue-100 rounded-full">5 new</span>
                  </button>
                  <button className="flex items-center justify-between w-full p-3 text-gray-900 transition-colors border border-gray-200 rounded-xl hover:border-green-300 hover:bg-green-50">
                    <span className="font-medium">Pending Payments</span>
                    <span className="px-2 py-1 text-xs text-orange-700 bg-orange-100 rounded-full">₹2,500</span>
                  </button>
                  <button className="flex items-center justify-between w-full p-3 text-gray-900 transition-colors border border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50">
                    <span className="font-medium">Awaiting Reviews</span>
                    <span className="px-2 py-1 text-xs text-purple-700 bg-purple-100 rounded-full">3 tasks</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Tasks List */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="overflow-hidden bg-white border border-gray-200 shadow-lg rounded-2xl backdrop-blur-sm"
            >
              {/* Tasks Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex flex-col items-start justify-between gap-4 mb-4 md:flex-row md:items-center">
                  <div>
                    <h2 className="mb-2 text-xl font-bold text-gray-900">Your Posted Tasks</h2>
                    <p className="text-gray-600">Manage and track your posted tasks</p>
                  </div>
                </div>

                {/* Category Tabs */}
                <div className="flex flex-wrap gap-2">
                  {["all", "open", "assigned", "in-progress", "completed"].map((tab) => (
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
                      {tab === "open" && (
                        <span className="flex items-center gap-1">
                          <FaCheckCircle className="text-green-500" />
                          Open
                        </span>
                      )}
                      {tab === "assigned" && (
                        <span className="flex items-center gap-1">
                          <FaClock className="text-blue-500" />
                          Assigned
                        </span>
                      )}
                      {tab === "in-progress" && (
                        <span className="flex items-center gap-1">
                          <FaClock className="text-blue-500" />
                          In Progress
                        </span>
                      )}
                      {tab === "completed" && (
                        <span className="flex items-center gap-1">
                          <FaCheckCircle className="text-emerald-500" />
                          Completed
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
              {/* Loading State */}
              {loading && (
                <div className="flex items-center justify-center p-8">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-4 border-b-2 border-blue-500 rounded-full animate-spin"></div>
                    <p className="text-gray-600">Loading tasks...</p>
                  </div>
                </div>
              )}

              {/* Error State */}
              {error && (
                <div className="p-8 text-center">
                  <div className="mb-4 text-red-500">
                    <FaTimesCircle className="mx-auto mb-2 text-4xl" />
                    <p className="text-lg font-semibold">Error loading tasks</p>
                  </div>
                  <p className="text-gray-600">{error}</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="px-4 py-2 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                  >
                    Try Again
                  </button>
                </div>
              )}

              {/* Tasks List */}
              {!loading && !error && (
                <div className="divide-y divide-gray-100">
                  {(() => {
                    const filteredTasks = activeTab === "all"
                      ? tasks
                      : tasks.filter(task => task.status === activeTab);

                    return filteredTasks.length === 0 ? (
                      <div className="p-8 text-center">
                        <FaPlusCircle className="mx-auto mb-4 text-4xl text-gray-400" />
                        <p className="mb-4 text-gray-600">
                          {activeTab === "all" ? "No tasks posted yet" : `No ${activeTab} tasks found`}
                        </p>
                        {activeTab === "all" && (
                          <Link
                            to="/post-task"
                            className="inline-flex items-center gap-2 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                          >
                            <FaPlusCircle />
                            Post Your First Task
                          </Link>
                        )}
                      </div>
                    ) : (
                      <AnimatePresence>
                        {filteredTasks.map((task) => (
                        <motion.div
                          key={task.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="p-6 transition-all duration-300 bg-white border border-gray-200 shadow-lg rounded-2xl hover:shadow-2xl hover:bg-gradient-to-br hover:from-white hover:to-gray-50 hover:scale-105"
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
                                {task.category}
                              </span>
                              <span className="flex items-center gap-1 font-semibold text-blue-600">
                                <FaClock className="text-blue-500" />
                                Posted {task.postedTime}
                              </span>
                              <span className="flex items-center gap-1">
                                <FaCalendarAlt />
                                Deadline: {task.deadline}
                              </span>
                            </div>

                            {/* Fourth row: Location */}
                            <div className="text-sm text-gray-600">
                              <span className="flex items-center gap-1">
                                <FaMapMarkerAlt />
                                {task.location}
                              </span>
                            </div>

                            {/* Bottom row: Actions on left, status and urgency on right */}
                            <div className="flex items-center justify-between">
                              <div className="flex flex-wrap items-center gap-2">
                                <Link
                                  to={`/task-detail/${task.id}`}
                                  className="flex items-center gap-1 px-3 py-1 text-sm text-blue-600 transition-colors border border-blue-300 rounded-lg hover:bg-blue-50"
                                >
                                  <FaEye />
                                  View Details
                                </Link>
<button
  onClick={() => deleteTask(task.id)}
  className="flex items-center gap-1 px-3 py-1 text-sm text-red-600 transition-colors border border-red-300 rounded-lg hover:bg-red-50"
>
  <FaTrash />
  Delete
</button>


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
                      ))}
                    </AnimatePresence>
                  );
                })()}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
