import { useState } from "react";
import { Link } from "react-router-dom";
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
  FaSortAmountUp
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function PostedTasks() {
  const [sortBy, setSortBy] = useState("recent");
  const [showFilters, setShowFilters] = useState(false);

  const tasks = [
    {
      id: 9,
      title: "Home Cleaning Service Needed",
      description: "Need someone to clean my 2BHK apartment thoroughly",
      category: "Cleaning",
      amount: "₹1,200",
      location: "Andheri West",
      postedTime: "2 days ago",
      deadline: "This Weekend",
      status: "open",
      offers: 4,
      acceptedBy: null,
      urgent: false
    },
    {
      id: 10,
      title: "Grocery Shopping & Delivery",
      description: "Need groceries picked up from supermarket and delivered",
      category: "Delivery",
      amount: "₹500",
      location: "Powai to Andheri",
      postedTime: "1 day ago",
      deadline: "Tomorrow",
      status: "assigned",
      offers: 6,
      acceptedBy: "Rajesh Kumar",
      acceptedByRating: 4.8,
      urgent: true
    },
  ];

  const statusColors = {
    "open": "bg-green-100 text-green-700",
    "assigned": "bg-blue-100 text-blue-700",
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
              <h1 className="mb-2 text-3xl font-bold text-gray-900 md:text-4xl">My Posted Tasks</h1>
              <p className="text-gray-600">
                Manage tasks you've posted and track their progress
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
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 gap-4 mb-6 md:grid-cols-4">
            <div className="p-4 bg-white border border-gray-200 rounded-2xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-bold text-gray-900">{tasks.length}</span>
                <span className="px-2 py-1 text-xs text-indigo-600 bg-indigo-100 rounded-full">
                  Total Posted
                </span>
              </div>
              <div className="text-sm text-gray-600">Tasks Posted</div>
            </div>

            <div className="p-4 bg-white border border-gray-200 rounded-2xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-bold text-gray-900">{tasks.filter(t => t.status === 'open').length}</span>
                <span className="px-2 py-1 text-xs text-green-600 bg-green-100 rounded-full">
                  Open
                </span>
              </div>
              <div className="text-sm text-gray-600">Awaiting Offers</div>
            </div>

            <div className="p-4 bg-white border border-gray-200 rounded-2xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-bold text-gray-900">{tasks.filter(t => t.status === 'assigned').length}</span>
                <span className="px-2 py-1 text-xs text-blue-600 bg-blue-100 rounded-full">
                  Assigned
                </span>
              </div>
              <div className="text-sm text-gray-600">In Progress</div>
            </div>

            <div className="p-4 bg-white border border-gray-200 rounded-2xl">
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
              {/* Tasks List */}
              <div className="divide-y divide-gray-100">
                <AnimatePresence mode="wait">
                  {tasks.map((task) => (
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
                                  <FaCalendarAlt />
                                  Posted {task.postedTime}
                                </span>
                              </div>
                            </div>

                            <div className="mb-3 text-2xl font-bold text-green-600 lg:hidden">
                              {task.amount}
                            </div>
                          </div>

                          <p className="mb-4 text-gray-700">{task.description}</p>

                          {/* Task Details */}
                          <div className="flex flex-wrap items-center gap-6">
                            <div className="flex items-center gap-4">
                              {task.offers > 0 && (
                                <span className="flex items-center gap-1 text-sm text-gray-600">
                                  <FaThumbsUp />
                                  {task.offers} offers
                                </span>
                              )}
                              <span className="flex items-center gap-1 text-sm text-gray-600">
                                <FaCalendarAlt />
                                Deadline: {task.deadline}
                              </span>
                              <span className="flex items-center gap-1 text-sm text-gray-600">
                                <FaMoneyBillWave />
                                {task.category}
                              </span>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex flex-wrap items-center gap-2">
                            <button className="flex items-center gap-1 px-3 py-1 text-sm text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50">
                              <FaEye />
                              View Details
                            </button>
                            {task.status === 'open' && (
                              <button className="flex items-center gap-1 px-3 py-1 text-sm text-green-600 border border-green-300 rounded-lg hover:bg-green-50">
                                <FaEdit />
                                Edit
                              </button>
                            )}
                            <button className="flex items-center gap-1 px-3 py-1 text-sm text-purple-600 border border-purple-300 rounded-lg hover:bg-purple-50">
                              <FaShare />
                              Share
                            </button>
                            <button className="flex items-center gap-1 px-3 py-1 text-sm text-red-600 border border-red-300 rounded-lg hover:bg-red-50">
                              <FaTrash />
                              Delete
                            </button>
                          </div>
                        </div>

                        {/* Right Content - Amount */}
                        <div className="hidden text-right lg:block">
                          <span className="text-2xl font-bold text-green-600">{task.amount}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
