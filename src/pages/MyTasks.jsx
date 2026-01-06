import { useState } from "react";
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

export default function MyTasks() {
  const [activeTab, setActiveTab] = useState("active");
  const [sortBy, setSortBy] = useState("recent");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const taskStats = {
    active: 3,
    pending: 2,
    completed: 12,
    cancelled: 1,
    totalEarnings: 45600
  };

  const tabs = [
    { id: "active", label: "Active", count: taskStats.active, color: "text-blue-600 bg-blue-100" },
    { id: "pending", label: "Pending", count: taskStats.pending, color: "text-yellow-600 bg-yellow-100" },
    { id: "completed", label: "Completed", count: taskStats.completed, color: "text-green-600 bg-green-100" },
    { id: "cancelled", label: "Cancelled", count: taskStats.cancelled, color: "text-red-600 bg-red-100" },
    { id: "all", label: "All Tasks", count: 18, color: "text-purple-600 bg-purple-100" },
  ];

  const tasks = {
    active: [
      {
        id: 1,
        title: "Office Documents Delivery",
        description: "Deliver important documents from Andheri to Bandra office",
        category: "Delivery",
        amount: "₹450",
        location: "Andheri to Bandra",
        postedBy: "Rajesh Kumar",
        postedByRating: 4.8,
        postedTime: "Today, 10:00 AM",
        deadline: "Today, 6:00 PM",
        status: "in-progress",
        progress: 60,
        urgent: true,
        messages: 5,
        offers: 3
      },
      {
        id: 2,
        title: "Pet Sitting - Golden Retriever",
        description: "Need someone to take care of my dog for 4 hours",
        category: "Pet Care",
        amount: "₹800",
        location: "Powai",
        postedBy: "Anita Desai",
        postedByRating: 4.9,
        postedTime: "Yesterday",
        deadline: "Tomorrow, 2:00 PM",
        status: "accepted",
        progress: 30,
        urgent: false,
        messages: 12,
        offers: 1
      },
      {
        id: 3,
        title: "Math Tutoring for Class 10",
        description: "Need help with algebra and geometry concepts",
        category: "Tutoring",
        amount: "₹1,200",
        location: "Online",
        postedBy: "Mrs. Sharma",
        postedByRating: 5.0,
        postedTime: "2 days ago",
        deadline: "Next Week",
        status: "negotiating",
        progress: 20,
        urgent: false,
        messages: 8,
        offers: 2
      },
    ],
    pending: [
      {
        id: 4,
        title: "Furniture Assembly",
        description: "Help with assembling IKEA furniture (Bed + Wardrobe)",
        category: "Handyman",
        amount: "₹600",
        location: "Malad",
        postedBy: "Vikram Singh",
        postedByRating: 4.7,
        postedTime: "3 hours ago",
        deadline: "Tomorrow",
        status: "pending-approval",
        progress: 10,
        urgent: true,
        messages: 0,
        offers: 5
      },
      {
        id: 5,
        title: "Home Cleaning - 3BHK",
        description: "Deep cleaning of 3BHK apartment before festival",
        category: "Cleaning",
        amount: "₹1,500",
        location: "Juhu",
        postedBy: "Priya Nair",
        postedByRating: 4.9,
        postedTime: "1 day ago",
        deadline: "This Weekend",
        status: "awaiting-payment",
        progress: 0,
        urgent: false,
        messages: 3,
        offers: 7
      },
    ],
    completed: [
      {
        id: 6,
        title: "Groceries Delivery",
        description: "Weekly groceries from supermarket to home",
        category: "Delivery",
        amount: "₹300",
        location: "Santacruz",
        postedBy: "Rahul Verma",
        postedByRating: 4.8,
        postedTime: "1 week ago",
        completedTime: "2 days ago",
        status: "completed",
        progress: 100,
        rating: 5,
        review: "Excellent service! Delivered on time and items were perfect.",
        urgent: false
      },
      {
        id: 7,
        title: "Website Bug Fix",
        description: "Fix responsive issues on WordPress website",
        category: "Online Help",
        amount: "₹2,000",
        location: "Remote",
        postedBy: "Tech Startup",
        postedByRating: 4.9,
        postedTime: "2 weeks ago",
        completedTime: "1 week ago",
        status: "completed",
        progress: 100,
        rating: 4,
        review: "Good work, fixed the main issues. Will work with again.",
        urgent: true
      },
    ],
    cancelled: [
      {
        id: 8,
        title: "Car Wash & Polish",
        description: "Complete car wash and polishing service",
        category: "Car Services",
        amount: "₹1,000",
        location: "Bandra",
        postedBy: "Mohan Das",
        postedByRating: 4.5,
        postedTime: "5 days ago",
        cancelledTime: "3 days ago",
        status: "cancelled",
        progress: 0,
        reason: "Task poster changed requirements",
        urgent: false
      },
    ]
  };

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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Tasks Summary</h1>
              <p className="text-gray-600">
                Manage all your posted and accepted tasks in one place
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <Link
                to="/post-task"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg hover:shadow-xl"
              >
                <FaPlusCircle className="text-white" />
                <span>Post New Task</span>
              </Link>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
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
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600 mb-1">Total Earnings from Completed Tasks</div>
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
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Column - Filters & Actions */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Search & Filter */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Filter Tasks</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaSearch className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        placeholder="Search tasks..."
                        className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <div className="space-y-2">
                      {["Delivery", "Cleaning", "Online Help", "Handyman", "Tutoring", "Pet Care"].map((category) => (
                        <label key={category} className="flex items-center">
                          <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                          <span className="ml-2 text-sm text-gray-700">{category}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="w-full py-2 rounded-lg border border-blue-500 text-blue-600 hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <FaFilter />
                    {showFilters ? "Hide Advanced Filters" : "Show Advanced Filters"}
                  </button>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-between p-3 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors">
                    <span className="font-medium text-gray-900">View All Offers</span>
                    <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">5 new</span>
                  </button>
                  <button className="w-full flex items-center justify-between p-3 rounded-xl border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-colors">
                    <span className="font-medium text-gray-900">Pending Payments</span>
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">₹2,500</span>
                  </button>
                  <button className="w-full flex items-center justify-between p-3 rounded-xl border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors">
                    <span className="font-medium text-gray-900">Awaiting Reviews</span>
                    <span className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded-full">3 tasks</span>
                  </button>
                  <button className="w-full flex items-center justify-between p-3 rounded-xl border border-gray-200 hover:border-yellow-300 hover:bg-yellow-50 transition-colors">
                    <span className="font-medium text-gray-900">Disputes</span>
                    <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-full">1 open</span>
                  </button>
                </div>
              </div>

              {/* Achievement */}
              <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-2xl p-6 border border-yellow-200">
                <div className="flex items-center gap-3 mb-4">
                  <FaTrophy className="text-2xl text-yellow-500" />
                  <div>
                    <h3 className="font-bold text-gray-900">Top Helper This Week</h3>
                    <p className="text-sm text-gray-600">Keep up the good work!</p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-2">#3</div>
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
              className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
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
                      className="p-6 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        {/* Left Content */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
                                {task.urgent && (
                                  <span className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded-full flex items-center gap-1">
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
                              
                              <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                                <span className="flex items-center gap-1">
                                  <FaMapMarkerAlt />
                                  {task.location}
                                </span>
                                <span className="flex items-center gap-1">
                                  <FaUser />
                                  {task.postedBy} • {task.postedByRating} ⭐
                                </span>
                                <span className="flex items-center gap-1">
                                  <FaCalendarAlt />
                                  {task.postedTime}
                                </span>
                              </div>
                            </div>
                            
                            <div className="lg:hidden text-2xl font-bold text-green-600 mb-3">
                              {task.amount}
                            </div>
                          </div>

                          <p className="text-gray-700 mb-4">{task.description}</p>

                          {/* Progress & Details */}
                          <div className="flex flex-wrap items-center gap-6">
                            {task.progress > 0 && (
                              <div className="flex items-center gap-3">
                                <div className="w-32">
                                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                                    <span>Progress</span>
                                    <span>{task.progress}%</span>
                                  </div>
                                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
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
                                <span className="font-medium text-gray-900">{task.deadline}</span>
                              </div>
                            )}
                          </div>

                          {/* Rating & Review for Completed Tasks */}
                          {task.status === "completed" && task.rating && (
                            <div className="mt-4 p-4 bg-green-50 rounded-xl border border-green-200">
                              <div className="flex items-center gap-3 mb-2">
                                <div className="flex items-center gap-1">
                                  <FaStar className="text-yellow-400" />
                                  <span className="font-bold text-gray-900">{task.rating}/5</span>
                                </div>
                                <span className="text-sm text-gray-600">Review from {task.postedBy}</span>
                              </div>
                              <p className="text-gray-700 italic">"{task.review}"</p>
                            </div>
                          )}

                          {/* Cancellation Reason */}
                          {task.status === "cancelled" && task.reason && (
                            <div className="mt-4 p-4 bg-red-50 rounded-xl border border-red-200">
                              <div className="flex items-center gap-2 text-red-700 mb-2">
                                <FaExclamationCircle />
                                <span className="font-medium">Cancellation Reason:</span>
                              </div>
                              <p className="text-gray-700">{task.reason}</p>
                            </div>
                          )}
                        </div>

                        {/* Right Actions */}
                        <div className="lg:w-48 flex flex-col gap-3">
                          <div className="hidden lg:block text-2xl font-bold text-green-600 text-right">
                            {task.amount}
                          </div>
                          
                          <div className="flex flex-col gap-2">
                            <button className="w-full py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transition-all flex items-center justify-center gap-2">
                              <FaEye />
                              View Details
                            </button>
                            
                            {task.status === "in-progress" && (
                              <button className="w-full py-2 rounded-lg border border-green-500 text-green-600 hover:bg-green-50 transition-colors flex items-center justify-center gap-2">
                                <FaCheckCircle />
                                Mark Complete
                              </button>
                            )}
                            
                            {task.status === "accepted" && (
                              <button className="w-full py-2 rounded-lg border border-blue-500 text-blue-600 hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
                                <FaComment />
                                Message
                              </button>
                            )}
                            
                            {(task.status === "pending-approval" || task.status === "negotiating") && (
                              <div className="flex gap-2">
                                <button className="flex-1 py-2 rounded-lg border border-green-500 text-green-600 hover:bg-green-50 transition-colors">
                                  Accept
                                </button>
                                <button className="flex-1 py-2 rounded-lg border border-red-500 text-red-600 hover:bg-red-50 transition-colors">
                                  Decline
                                </button>
                              </div>
                            )}
                            
                            <div className="flex gap-2">
                              <button className="flex-1 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">
                                <FaEdit />
                              </button>
                              <button className="flex-1 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">
                                <FaShare />
                              </button>
                              <button className="flex-1 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">
                                <FaTrash />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Empty State */}
                {(!tasks[activeTab] || tasks[activeTab].length === 0) && (
                  <div className="p-12 text-center">
                    <div className="text-gray-400 text-5xl mb-4">
                      {activeTab === "active" && <FaClock />}
                      {activeTab === "pending" && <FaExclamationCircle />}
                      {activeTab === "completed" && <FaCheckCircle />}
                      {activeTab === "cancelled" && <FaTimesCircle />}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      No {activeTab} tasks found
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {activeTab === "active" && "You don't have any active tasks right now."}
                      {activeTab === "pending" && "No pending tasks at the moment."}
                      {activeTab === "completed" && "You haven't completed any tasks yet."}
                      {activeTab === "cancelled" && "No cancelled tasks."}
                    </p>
                    <Link
                      to="/tasks"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transition-all"
                    >
                      Browse Available Tasks
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
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6"
            >
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200">
                <div className="flex items-center gap-3 mb-4">
                  <FaClock className="text-2xl text-blue-500" />
                  <div>
                    <h3 className="font-bold text-gray-900">Average Response Time</h3>
                    <p className="text-sm text-gray-600">To new tasks</p>
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900">15 mins</div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                <div className="flex items-center gap-3 mb-4">
                  <FaCheckCircle className="text-2xl text-green-500" />
                  <div>
                    <h3 className="font-bold text-gray-900">Completion Rate</h3>
                    <p className="text-sm text-gray-600">Tasks completed on time</p>
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900">96%</div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
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

// Add missing import
import { Link } from "react-router-dom";