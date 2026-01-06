import { useState } from "react";
import {
  FaUsers,
  FaComments,
  FaThumbsUp,
  FaShare,
  FaSearch,
  FaPlus,
  FaUser,
  FaClock,
  FaTag,
  FaFire,
  FaStar,
  FaReply,
  FaHeart,
  FaBookmark,
  FaFlag,
  FaEllipsisH,
  FaFilter,
  FaLightbulb
} from "react-icons/fa";
import { motion } from "framer-motion";

export default function Community() {
  const [activeTab, setActiveTab] = useState("discussions");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Topics", icon: <FaComments />, count: 156 },
    { id: "help", label: "Help & Support", icon: <FaUsers />, count: 42 },
    { id: "tips", label: "Tips & Tricks", icon: <FaLightbulb />, count: 28 },
    { id: "success", label: "Success Stories", icon: <FaStar />, count: 19 },
    { id: "general", label: "General Chat", icon: <FaComments />, count: 67 }
  ];

  const discussions = [
    {
      id: 1,
      title: "Best practices for posting tasks",
      author: "Sarah Johnson",
      avatar: "SJ",
      category: "tips",
      replies: 23,
      likes: 45,
      timeAgo: "2 hours ago",
      lastReply: "Mike Chen",
      isPinned: true,
      content: "I've been using DoHelp for a few months now and wanted to share some tips that have helped me get better responses..."
    },
    {
      id: 2,
      title: "How to verify helper credentials?",
      author: "Raj Patel",
      avatar: "RP",
      category: "help",
      replies: 18,
      likes: 32,
      timeAgo: "4 hours ago",
      lastReply: "Lisa Wong",
      isPinned: false,
      content: "I'm new to the platform and want to make sure I'm hiring verified professionals. What should I look for?"
    },
    {
      id: 3,
      title: "Completed my first task - amazing experience!",
      author: "David Kim",
      avatar: "DK",
      category: "success",
      replies: 12,
      likes: 67,
      timeAgo: "6 hours ago",
      lastReply: "Anna Rodriguez",
      isPinned: false,
      content: "Just wanted to share my positive experience. Found a great helper for my home cleaning task..."
    },
    {
      id: 4,
      title: "Weekend project ideas",
      author: "Emma Thompson",
      avatar: "ET",
      category: "general",
      replies: 31,
      likes: 28,
      timeAgo: "1 day ago",
      lastReply: "John Smith",
      isPinned: false,
      content: "What kind of tasks are you all working on this weekend? I'm looking for some inspiration..."
    },
    {
      id: 5,
      title: "Payment security questions",
      author: "Alex Brown",
      avatar: "AB",
      category: "help",
      replies: 9,
      likes: 15,
      timeAgo: "1 day ago",
      lastReply: "Sarah Johnson",
      isPinned: false,
      content: "Can someone explain how the escrow system works? I want to understand the payment flow better."
    }
  ];

  const filteredDiscussions = discussions.filter(discussion => {
    const matchesSearch = discussion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         discussion.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || discussion.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category) => {
    const colors = {
      tips: "bg-blue-100 text-blue-800",
      help: "bg-green-100 text-green-800",
      success: "bg-yellow-100 text-yellow-800",
      general: "bg-purple-100 text-purple-800"
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">

        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Community <span className="text-blue-600">Forum</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with fellow users, share experiences, and get help from the DoHelp community.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">2,847</div>
            <div className="text-gray-600">Active Members</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">1,256</div>
            <div className="text-gray-600">Discussions</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">8,934</div>
            <div className="text-gray-600">Total Replies</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">156</div>
            <div className="text-gray-600">Online Now</div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                      selectedCategory === category.id
                        ? "bg-blue-50 text-blue-700 border border-blue-200"
                        : "hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{category.icon}</span>
                      <span className="font-medium">{category.label}</span>
                    </div>
                    <span className="text-sm text-gray-500">{category.count}</span>
                  </button>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="mt-8">
                <h4 className="text-md font-semibold text-gray-900 mb-3">Quick Actions</h4>
                <div className="space-y-2">
                  <button className="w-full flex items-center gap-3 p-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                    <FaPlus className="text-sm" />
                    <span className="font-medium">New Discussion</span>
                  </button>
                  <button className="w-full flex items-center gap-3 p-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">
                    <FaBookmark className="text-sm" />
                    <span>My Bookmarks</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">

            {/* Search and Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6"
            >
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search discussions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button className="flex items-center gap-2 px-4 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">
                  <FaFilter />
                  <span>Filter</span>
                </button>
              </div>
            </motion.div>

            {/* Discussions List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              {filteredDiscussions.map((discussion, index) => (
                <motion.div
                  key={discussion.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                        {discussion.avatar}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            {discussion.isPinned && (
                              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                <FaFire className="text-xs" />
                                Pinned
                              </span>
                            )}
                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(discussion.category)}`}>
                              <FaTag className="text-xs" />
                              {categories.find(cat => cat.id === discussion.category)?.label}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-gray-900 hover:text-blue-600 cursor-pointer transition-colors">
                            {discussion.title}
                          </h3>
                        </div>
                        <div className="flex items-center gap-2 text-gray-500">
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <FaEllipsisH />
                          </button>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-4 line-clamp-2">{discussion.content}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <FaUser className="text-xs" />
                            {discussion.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <FaClock className="text-xs" />
                            {discussion.timeAgo}
                          </span>
                          <span className="flex items-center gap-1">
                            <FaReply className="text-xs" />
                            Last reply by {discussion.lastReply}
                          </span>
                        </div>

                        <div className="flex items-center gap-4">
                          <button className="flex items-center gap-1 text-gray-500 hover:text-blue-600 transition-colors">
                            <FaThumbsUp />
                            <span>{discussion.likes}</span>
                          </button>
                          <button className="flex items-center gap-1 text-gray-500 hover:text-blue-600 transition-colors">
                            <FaComments />
                            <span>{discussion.replies}</span>
                          </button>
                          <button className="text-gray-500 hover:text-blue-600 transition-colors">
                            <FaShare />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Load More */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-center mt-8"
            >
              <button className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">
                Load More Discussions
              </button>
            </motion.div>
          </div>
        </div>

        {/* Community Guidelines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Community Guidelines</h2>
            <p className="text-lg opacity-90 max-w-3xl mx-auto">
              Help us keep our community safe, respectful, and helpful for everyone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaHeart className="text-2xl" />
              </div>
              <h3 className="text-lg font-bold mb-2">Be Respectful</h3>
              <p className="opacity-90">Treat others with kindness and respect their opinions</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUsers className="text-2xl" />
              </div>
              <h3 className="text-lg font-bold mb-2">Stay On Topic</h3>
              <p className="opacity-90">Keep discussions relevant to DoHelp and community topics</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaFlag className="text-2xl" />
              </div>
              <h3 className="text-lg font-bold mb-2">Report Issues</h3>
              <p className="opacity-90">Use the flag button to report inappropriate content</p>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
