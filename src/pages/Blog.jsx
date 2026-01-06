import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaUser,
  FaTag,
  FaSearch,
  FaArrowRight,
  FaClock,
  FaEye,
  FaThumbsUp,
  FaShare,
  FaBookmark,
  FaFilter,
  FaComments,
  FaHeart,
  FaLightbulb,
  FaRocket,
  FaUsers,
  FaShieldAlt
} from "react-icons/fa";

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Posts", count: 24 },
    { id: "community", label: "Community", count: 8 },
    { id: "technology", label: "Technology", count: 6 },
    { id: "tips", label: "Tips & Tricks", count: 5 },
    { id: "success", label: "Success Stories", count: 5 }
  ];

  const featuredPost = {
    id: 1,
    title: "How HelpNearby is Transforming Local Communities",
    excerpt: "Discover how our platform is connecting neighbors and building stronger communities across India, one task at a time.",
    author: "Rajesh Kumar",
    date: "2024-01-15",
    readTime: "5 min read",
    views: "2.3K",
    likes: 156,
    image: "/api/placeholder/800/400",
    category: "community",
    featured: true
  };

  const blogPosts = [
    {
      id: 2,
      title: "10 Essential Skills Every Helper Should Master",
      excerpt: "From basic repairs to advanced tech support, learn the skills that will make you a top-rated helper on our platform.",
      author: "Priya Sharma",
      date: "2024-01-12",
      readTime: "7 min read",
      views: "1.8K",
      likes: 89,
      image: "/api/placeholder/400/250",
      category: "tips",
      tags: ["Skills", "Helper", "Professional Development"]
    },
    {
      id: 3,
      title: "The Future of Gig Economy in India",
      excerpt: "Exploring how platforms like HelpNearby are reshaping work culture and creating opportunities for millions.",
      author: "Amit Patel",
      date: "2024-01-10",
      readTime: "6 min read",
      views: "3.1K",
      likes: 234,
      image: "/api/placeholder/400/250",
      category: "technology",
      tags: ["Gig Economy", "Future", "Technology"]
    },
    {
      id: 4,
      title: "From Task to Triumph: A Helper's Journey",
      excerpt: "Meet Ramesh, who turned his passion for fixing things into a successful career on HelpNearby.",
      author: "Team HelpNearby",
      date: "2024-01-08",
      readTime: "4 min read",
      views: "1.5K",
      likes: 67,
      image: "/api/placeholder/400/250",
      category: "success",
      tags: ["Success Story", "Inspiration", "Career"]
    },
    {
      id: 5,
      title: "Building Trust in the Digital Age",
      excerpt: "How HelpNearby ensures safety and reliability for both helpers and those seeking help.",
      author: "Security Team",
      date: "2024-01-05",
      readTime: "8 min read",
      views: "2.7K",
      likes: 145,
      image: "/api/placeholder/400/250",
      category: "community",
      tags: ["Safety", "Trust", "Security"]
    },
    {
      id: 6,
      title: "Seasonal Tasks: Making the Most of Holiday Help",
      excerpt: "Tips for posting and completing tasks during festive seasons when demand for help is at its peak.",
      author: "Operations Team",
      date: "2024-01-03",
      readTime: "5 min read",
      views: "1.2K",
      likes: 43,
      image: "/api/placeholder/400/250",
      category: "tips",
      tags: ["Seasonal", "Holidays", "Planning"]
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const insights = [
    {
      icon: <FaLightbulb className="text-2xl" />,
      title: "Latest Trends",
      description: "Stay updated with the latest developments in community help and gig economy"
    },
    {
      icon: <FaRocket className="text-2xl" />,
      title: "Growth Tips",
      description: "Learn strategies to grow your helper profile and increase your earnings"
    },
    {
      icon: <FaUsers className="text-2xl" />,
      title: "Community Stories",
      description: "Real stories from our community members and their experiences"
    },
    {
      icon: <FaShieldAlt className="text-2xl" />,
      title: "Safety First",
      description: "Best practices for safe and secure interactions on our platform"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 py-12">

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            HelpNearby <span className="text-blue-600">Blog</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Insights, stories, and tips from the world of community help.
            Discover how we're building stronger neighborhoods together.
          </p>
        </motion.div>

        {/* Insights Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {insights.map((insight, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white mb-4">
                {insight.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{insight.title}</h3>
              <p className="text-gray-600 text-sm">{insight.description}</p>
            </div>
          ))}
        </motion.div>

        {/* Featured Post */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Article</h2>
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow">
            <div className="md:flex">
              <div className="md:w-1/2">
                <div className="h-64 md:h-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
                  <span className="text-white text-6xl">📝</span>
                </div>
              </div>
              <div className="md:w-1/2 p-8">
                <div className="flex items-center gap-4 mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                    {featuredPost.category}
                  </span>
                  <span className="text-gray-500 text-sm">Featured</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{featuredPost.title}</h3>
                <p className="text-gray-600 mb-6">{featuredPost.excerpt}</p>

                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <FaUser />
                      {featuredPost.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <FaCalendarAlt />
                      {new Date(featuredPost.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <FaClock />
                      {featuredPost.readTime}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <FaEye />
                      {featuredPost.views}
                    </div>
                    <div className="flex items-center gap-1">
                      <FaThumbsUp />
                      {featuredPost.likes}
                    </div>
                  </div>
                  <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all flex items-center gap-2">
                    Read More
                    <FaArrowRight />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Blog Posts Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Latest Articles</h2>

          {/* Search and Filter */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                      selectedCategory === category.id
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {category.label} ({category.count})
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredPosts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
                  <span className="text-white text-4xl">📄</span>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <FaUser />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <FaCalendarAlt />
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <FaClock />
                      {post.readTime}
                    </div>
                    <div className="flex items-center gap-1">
                      <FaEye />
                      {post.views}
                    </div>
                    <div className="flex items-center gap-1">
                      <FaThumbsUp />
                      {post.likes}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <button className="w-full py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all flex items-center justify-center gap-2">
                    Read Article
                    <FaArrowRight />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <FaSearch className="text-4xl text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-600">Try adjusting your search criteria</p>
            </div>
          )}
        </motion.div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white text-center"
        >
          <h2 className="text-3xl font-bold mb-6">Stay Updated</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto leading-relaxed mb-8">
            Subscribe to our newsletter and get the latest insights, tips, and community stories delivered to your inbox.
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="px-6 py-3 rounded-xl bg-white text-blue-600 hover:bg-gray-100 font-semibold transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
