import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEdit,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaCalendarAlt,
  FaStar,
  FaCheckCircle,
  FaTasks,
  FaMoneyBillWave,
  FaShieldAlt,
  FaCamera,
  FaShareAlt,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaGlobe,
  FaLock,
  FaBell,
  FaCreditCard,
  FaHistory,
  FaAward,
  FaHeart,
  FaUsers,
  FaChartLine,
  FaCertificate,
  FaCog,
  FaArrowRight,
  FaCopy
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useAuth } from "../contexts/AuthContext";
  
export default function Profile() {
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };



  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    joinDate: "",
    bio: "",
    profileImage: "",
    coverImage: "",
    rating: 0.00,
    reviews: 0,
    completedTasks: 0,
    totalEarnings: 0,
    activeTasks: 0,
    responseRate: 0,
    avgResponseTime: "",
    badges: [],
    skills: [],
    languages: [],
    verification: {
      email: false,
      phone: false,
      id: false,
      address: false
    }
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const response = await fetch('https://dohelp.newhopeindia17.com/api/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }),
          },
        });

        if (response.ok) {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const responseData = await response.json();
            if (responseData.status) {
              const profileData = responseData.data;
              // Format the join date from created_at
              const formatJoinDate = (createdAt) => {
                if (!createdAt) return prevData.joinDate;
                const date = new Date(createdAt);
                const monthNames = [
                  "January", "February", "March", "April", "May", "June",
                  "July", "August", "September", "October", "November", "December"
                ];
                const month = monthNames[date.getMonth()];
                const year = date.getFullYear();
                return `${month} ${year}`;
              };

              setUserData(prevData => ({
                ...prevData,
                name: profileData.name || prevData.name,
                email: profileData.email || prevData.email,
                phone: profileData.phone || prevData.phone,
                location: profileData.location || prevData.location,
                bio: profileData.description || prevData.bio,
                coverImage: profileData.cover_image_url || prevData.coverImage,
                profileImage: profileData.profile_image_url || prevData.profileImage,
                rating: parseFloat(profileData.rating_avg) || prevData.rating,
                reviews: profileData.rating_count || prevData.reviews,
                totalEarnings: parseFloat(profileData.total_earned) || prevData.totalEarnings,
                joinDate: formatJoinDate(profileData.created_at),
                verification: {
                  email: profileData.is_verified || false,
                  phone: profileData.is_verified || false,
                  id: profileData.is_verified || false,
                  address: profileData.is_verified || false
                }
              }));


            } else {
              setError(data.message || "Failed to fetch profile");
            }
          } else {
            setError("Unexpected response format from server");
          }
        } else {
          setError(`Failed to fetch profile: ${response.status} ${response.statusText}`);
        }
      } catch (err) {
        setError("Network error. Please try again.");
        console.error("Profile fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, [user]);



  const stats = [
    { label: "Tasks Completed", value: userData.completedTasks, icon: <FaTasks />, color: "text-blue-600" },
    { label: "Total Earnings", value: `₹${userData.totalEarnings.toLocaleString()}`, icon: <FaMoneyBillWave />, color: "text-green-600" },
    { label: "Average Rating", value: userData.rating, icon: <FaStar />, color: "text-yellow-600" },
    { label: "Response Rate", value: `${userData.responseRate}%`, icon: <FaCheckCircle />, color: "text-purple-600" },
  ];

  const recentActivities = [
    { id: 1, action: "Completed Delivery Task", amount: "₹450", time: "2 hours ago", type: "completed" },
    { id: 2, action: "Posted Cleaning Task", amount: "₹800", time: "1 day ago", type: "posted" },
    { id: 3, action: "Received 5-star Rating", amount: "", time: "2 days ago", type: "rating" },
    { id: 4, action: "Withdrew Earnings", amount: "₹5,000", time: "3 days ago", type: "withdrawal" },
    { id: 5, action: "Accepted Online Help Task", amount: "₹1,200", time: "4 days ago", type: "accepted" },
  ];

  const tabs = [
    { id: "overview", label: "Overview", icon: <FaUser /> },
    { id: "tasks", label: "My Tasks", icon: <FaTasks /> },
    { id: "reviews", label: "Reviews", icon: <FaStar /> },
    { id: "earnings", label: "Earnings", icon: <FaMoneyBillWave /> },
    { id: "settings", label: "Settings", icon: <FaCog /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">

        {/* Profile Header with Cover Image */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-2xl overflow-hidden shadow-xl mb-6"
        >
          {/* Cover Image */}
          <div className="h-48 md:h-64 relative">
            {loading ? (
              <Skeleton height="100%" />
            ) : (
              userData.coverImage ? (
                <img
                  src={userData.coverImage}
                  alt="Cover"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-r from-blue-400 to-purple-500"></div>
              )
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>

          {/* Profile Info Section */}
          <div className="relative bg-white p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              {/* Profile Image */}
              <div className="relative -mt-20 md:-mt-24">
                <div className="relative group">
                  {loading ? (
                    <Skeleton circle width={160} height={160} className="md:w-40 md:h-40" />
                  ) : (
                    userData.profileImage ? (
                      <img
                        src={userData.profileImage}
                        alt={userData.name}
                        className="w-32 h-32 md:w-40 md:h-40 rounded-2xl border-4 border-white shadow-lg object-cover"
                      />
                    ) : (
                      <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl border-4 border-white shadow-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <FaUser className="text-white text-4xl md:text-5xl" />
                      </div>
                    )
                  )}
                  {!loading && (
                    <button className="absolute bottom-2 right-2 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors opacity-0 group-hover:opacity-100">
                      <FaCamera className="text-sm" />
                    </button>
                  )}
                </div>

                {/* Online Status */}
                {!loading && (
                  <div className="absolute bottom-4 right-4 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                )}

                {/* UID Display */}
                {user?.user_uid && !loading && (
                  <div className="text-center mt-2">
                    <div className="flex items-center justify-center gap-2">
                      <div className="text-sm text-gray-500">
                        {user.user_uid}
                      </div>
                      <button
                        onClick={() => copyToClipboard(user.user_uid)}
                        className="p-1 text-gray-400 hover:text-blue-500 transition-colors"
                        title="Copy UID"
                      >
                        <FaCopy className="text-xs" />
                      </button>
                    </div>
                    {copied && (
                      <div className="text-xs text-green-600 mt-1">
                        Copied!
                      </div>
                    )}
                  </div>
                )}
                {console.log('User object:', user)}
              </div>

              {/* User Info */}
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      {loading ? (
                        <Skeleton width={200} height={32} />
                      ) : (
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{userData.name}</h1>
                      )}
                      {!loading && userData.verification.email && userData.verification.phone && userData.verification.id && userData.verification.address && (
                        <span className="px-3 py-1 text-sm bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full">
                          Verified Member
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
                      {loading ? (
                        <Skeleton width={300} height={20} />
                      ) : (
                        <>
                          <span className="flex items-center gap-1">
                            <FaMapMarkerAlt />
                            {userData.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <FaCalendarAlt />
                            Joined {userData.joinDate}
                          </span>
                          <span className="flex items-center gap-1">
                            <FaStar className="text-yellow-400" />
                            {userData.rating} ({userData.reviews} reviews)
                          </span>
                        </>
                      )}
                    </div>

                    {loading ? (
                      <Skeleton count={2} />
                    ) : (
                      <p className="text-gray-700 mb-6 max-w-2xl">{userData.bio}</p>
                    )}
                  </div>

                  {!loading && (
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => navigate('/settings')}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl border border-blue-500 text-blue-600 hover:bg-blue-50 transition-colors"
                      >
                        <FaEdit />
                        Edit Profile
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transition-all">
                        <FaShareAlt />
                        Share Profile
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Stats Cards */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6"
            >
              <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Stats</h2>
              <div className="space-y-4">
                {loading ? (
                  Array(4).fill(0).map((_, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
                      <Skeleton circle width={32} height={32} />
                      <div className="flex-1">
                        <Skeleton width={60} height={16} />
                        <Skeleton width={80} height={12} />
                      </div>
                    </div>
                  ))
                ) : (
                  stats.map((stat, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                      <div className={`p-2 rounded-lg ${stat.color} bg-opacity-10`}>
                        {stat.icon}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">{stat.value}</div>
                        <div className="text-sm text-gray-600">{stat.label}</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>

            {/* Verification Status */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6"
            >
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FaShieldAlt className="text-green-500" />
                Verification Status
              </h2>
              <div className="space-y-3">
                {loading ? (
                  Array(4).fill(0).map((_, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Skeleton circle width={8} height={8} />
                        <Skeleton width={100} height={14} />
                      </div>
                      <Skeleton width={50} height={14} />
                    </div>
                  ))
                ) : (
                  Object.entries(userData.verification).map(([key, verified]) => (
                    <div key={key} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${verified ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                        <span className="text-sm text-gray-700 capitalize">{key} Verified</span>
                      </div>
                      {verified ? (
                        <FaCheckCircle className="text-green-500" />
                      ) : (
                        <button className="text-sm text-blue-600 hover:text-blue-700">
                          Verify
                        </button>
                      )}
                    </div>
                  ))
                )}
              </div>
            </motion.div>

            {/* Skills & Languages */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6"
            >
              <h2 className="text-lg font-bold text-gray-900 mb-4">Skills & Languages</h2>

              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {loading ? (
                    Array(6).fill(0).map((_, index) => (
                      <Skeleton key={index} width={80} height={24} className="rounded-full" />
                    ))
                  ) : (
                    userData.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full"
                      >
                        {skill}
                      </span>
                    ))
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Languages</h3>
                <div className="space-y-2">
                  {loading ? (
                    Array(3).fill(0).map((_, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <Skeleton width={60} height={16} />
                        <Skeleton width={40} height={14} />
                      </div>
                    ))
                  ) : (
                    userData.languages.map((language, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-gray-700">{language}</span>
                        <span className="text-sm text-gray-500">Fluent</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden mb-6"
            >
              <div className="flex flex-wrap border-b border-gray-200">
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
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>
              
              {/* Tab Content */}
              <div className="p-6">
                {activeTab === "overview" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                  >
                    {/* Badges */}
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Achievements & Badges</h3>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                        {userData.badges.map((badge, index) => (
                          <div
                            key={index}
                            className={`${badge.color} p-4 rounded-xl text-center`}
                          >
                            <div className="text-2xl mb-2">{badge.icon}</div>
                            <div className="text-sm font-medium">{badge.name}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Recent Activity */}
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
                      <div className="space-y-3">
                        {recentActivities.map((activity) => (
                          <div
                            key={activity.id}
                            className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-blue-300 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg ${
                                activity.type === 'completed' ? 'bg-green-100 text-green-600' :
                                activity.type === 'posted' ? 'bg-blue-100 text-blue-600' :
                                activity.type === 'rating' ? 'bg-yellow-100 text-yellow-600' :
                                'bg-purple-100 text-purple-600'
                              }`}>
                                {activity.type === 'completed' && <FaCheckCircle />}
                                {activity.type === 'posted' && <FaTasks />}
                                {activity.type === 'rating' && <FaStar />}
                                {activity.type === 'withdrawal' && <FaMoneyBillWave />}
                                {activity.type === 'accepted' && <FaCheckCircle />}
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">{activity.action}</div>
                                <div className="text-sm text-gray-500">{activity.time}</div>
                              </div>
                            </div>
                            {activity.amount && (
                              <div className="font-bold text-green-600">{activity.amount}</div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Performance Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Performance</h3>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Task Completion Rate</span>
                              <span>96%</span>
                            </div>
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div className="h-full bg-green-500 rounded-full" style={{ width: "96%" }} />
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>On-time Delivery</span>
                              <span>94%</span>
                            </div>
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div className="h-full bg-blue-500 rounded-full" style={{ width: "94%" }} />
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Customer Satisfaction</span>
                              <span>98%</span>
                            </div>
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div className="h-full bg-purple-500 rounded-full" style={{ width: "98%" }} />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">This Month</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <FaTasks className="text-blue-500" />
                              <span className="text-gray-700">Tasks Completed</span>
                            </div>
                            <span className="font-bold text-gray-900">8</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <FaMoneyBillWave className="text-green-500" />
                              <span className="text-gray-700">Earnings</span>
                            </div>
                            <span className="font-bold text-green-600">₹12,500</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <FaStar className="text-yellow-500" />
                              <span className="text-gray-700">New Ratings</span>
                            </div>
                            <span className="font-bold text-gray-900">12</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <FaUsers className="text-purple-500" />
                              <span className="text-gray-700">New Connections</span>
                            </div>
                            <span className="font-bold text-gray-900">6</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "tasks" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="text-center py-12">
                      <FaTasks className="text-4xl text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-gray-900 mb-2">My Tasks</h3>
                      <p className="text-gray-600 mb-6">View and manage all your posted and accepted tasks</p>
                      <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transition-all">
                        View All Tasks
                      </button>
                    </div>
                  </motion.div>
                )}

                {activeTab === "reviews" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="text-center py-12">
                      <FaStar className="text-4xl text-yellow-400 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Reviews & Ratings</h3>
                      <p className="text-gray-600 mb-6">See what others have said about working with you</p>
                      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-50 to-amber-50 px-6 py-3 rounded-xl">
                        <FaStar className="text-yellow-400" />
                        <span className="text-2xl font-bold">{userData.rating}</span>
                        <span className="text-gray-600">({userData.reviews} reviews)</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "earnings" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="text-center py-12">
                      <FaMoneyBillWave className="text-4xl text-green-400 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Earnings & Payments</h3>
                      <p className="text-gray-600 mb-6">Track your earnings, withdrawals, and payment history</p>
                      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-3 rounded-xl">
                        <FaMoneyBillWave className="text-green-500" />
                        <span className="text-2xl font-bold">₹{userData.totalEarnings.toLocaleString()}</span>
                        <span className="text-gray-600">Total Earnings</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "settings" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="text-center py-12">
                      <FaCog className="text-4xl text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Account Settings</h3>
                      <p className="text-gray-600 mb-6">Manage your account preferences and privacy settings</p>
                      <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transition-all">
                        Open Settings
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Connect Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white"
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h2 className="text-2xl font-bold mb-3">Let's Connect!</h2>
                  <p className="text-blue-100 mb-4">
                    Share your profile or connect on social media to build your community presence.
                  </p>
                  <div className="flex gap-4">
                    {[
                      { icon: <FaLinkedin />, label: "LinkedIn", color: "hover:bg-blue-700" },
                      { icon: <FaTwitter />, label: "Twitter", color: "hover:bg-sky-600" },
                      { icon: <FaFacebook />, label: "Facebook", color: "hover:bg-blue-800" },
                      { icon: <FaInstagram />, label: "Instagram", color: "hover:bg-pink-600" },
                    ].map((social, index) => (
                      <button
                        key={index}
                        className={`p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors ${social.color}`}
                      >
                        {social.icon}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">#{userData.completedTasks}</div>
                  <div className="text-blue-100">Tasks Completed</div>
                  <div className="mt-4 text-sm opacity-90">
                    Community Rank: <span className="font-bold">Top 5%</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}