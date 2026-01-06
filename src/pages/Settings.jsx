import { useState, useEffect } from "react";
import {
  FaUser,
  FaBell,
  FaLock,
  FaShieldAlt,
  FaPalette,
  FaGlobe,
  FaCreditCard,
  FaQuestionCircle,
  FaSignOutAlt,
  FaCheckCircle,
  FaMoon,
  FaSun,
  FaVolumeUp,
  FaVolumeMute,
  FaEye,
  FaEyeSlash,
  FaTrash,
  FaDownload,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaEdit,
  FaSave,
  FaTimes,
  FaCog,
  FaDatabase,
  FaHistory,
  FaUsers,
  FaShareAlt,
  FaPiggyBank,
  FaPlusCircle,
  FaUniversity,
  FaGooglePay,
  FaCamera
} from "react-icons/fa";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useAuth } from "../contexts/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Settings() {
  const { user, refreshProfile } = useAuth();
  const [activeTab, setActiveTab] = useState("account");
  const [showPassword, setShowPassword] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    tasks: true,
    messages: true,
    promotions: false
  });
  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    showEarnings: false,
    showRatings: true,
    allowMessages: true,
    showOnlineStatus: true,
    locationSharing: "city"
  });
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    joinDate: "",
    language: "English",
    timezone: "IST (UTC+5:30)",
    bio: "",
    coverImage: "",
    profileImage: ""
  });
  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmNewPassword: ""
  });
  const [selectedProfileImage, setSelectedProfileImage] = useState(null);
  const [selectedCoverImage, setSelectedCoverImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  // Fetch profile data on component mount and when user changes
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
              setUserData(prevData => ({
                ...prevData,
                name: profileData.name || prevData.name,
                email: profileData.email || prevData.email,
                phone: profileData.phone || prevData.phone,
                location: profileData.location || prevData.location,
                bio: profileData.description || prevData.bio,
                coverImage: profileData.cover_image_url || prevData.coverImage,
                profileImage: profileData.profile_image_url || prevData.profileImage,
              }));
            }
          }
        }
      } catch (err) {
        console.error("Profile fetch error:", err);
      } finally {
        setInitialLoading(false);
      }
    };

    if (user) {
      console.log('User object:', user);
      console.log('User bio:', user.bio);
      setUserData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        location: user.location || "",
        joinDate: user.created_at ? new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : "",
        language: "English",
        timezone: "IST (UTC+5:30)",
        bio: user.description || "",
        coverImage: ""
      });
      fetchProfile();
      console.log('Setting userData.bio to:', user.bio || "");
    } else {
      setInitialLoading(false);
    }
  }, [user]);

  const handleUserDataChange = (field, value) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedProfileImage(file);
    }
  };

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedCoverImage(file);
    }
  };

  const handleUpdateProfile = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const formData = new FormData();
      formData.append('name', userData.name);
      formData.append('email', userData.email);
      formData.append('phone_number', userData.phone);
      formData.append('location', userData.location);
      formData.append('bio', userData.bio);

      if (selectedProfileImage) {
        formData.append('profile_image', selectedProfileImage);
      }
      if (selectedCoverImage) {
        formData.append('cover_image', selectedCoverImage);
      }

      const response = await fetch('https://dohelp.newhopeindia17.com/api/profile', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      let responseData;
      try {
        responseData = await response.json();
      } catch (parseError) {
        // If JSON parsing fails, the response is likely HTML (error page)
        if (response.ok) {
          throw new Error('Server returned an unexpected response format');
        } else {
          throw new Error(`Server error (${response.status}): ${response.statusText}`);
        }
      }

      if (response.ok) {
        if (responseData.status) {
          // Refresh profile data
          refreshProfile();
          toast.success('Profile updated successfully!');
        } else {
          throw new Error(responseData.message || 'Failed to update profile');
        }
      } else {
        throw new Error(responseData.message || `Failed to update profile (${response.status})`);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setError(error.message);
      alert('Failed to update profile: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      setPasswordError('New passwords do not match');
      return;
    }

    setPasswordLoading(true);
    setPasswordError(null);

    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const formData = new FormData();
      formData.append('password', passwordData.newPassword);
      formData.append('password_confirmation', passwordData.confirmNewPassword);

      const response = await fetch('https://dohelp.newhopeindia17.com/api/profile', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      let responseData;
      try {
        responseData = await response.json();
      } catch (parseError) {
        // If JSON parsing fails, the response is likely HTML (error page)
        if (response.ok) {
          throw new Error('Server returned an unexpected response format');
        } else {
          throw new Error(`Server error (${response.status}): ${response.statusText}`);
        }
      }

      if (response.ok) {
        if (responseData.status) {
          toast.success('Password changed successfully!');
          setPasswordData({
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: ""
          });
        } else {
          throw new Error(responseData.message || 'Failed to change password');
        }
      } else {
        throw new Error(responseData.message || `Failed to change password (${response.status})`);
      }
    } catch (error) {
      console.error('Error changing password:', error);
      setPasswordError(error.message);
    } finally {
      setPasswordLoading(false);
    }
  };

  const tabs = [
    { id: "account", label: "Account", icon: <FaUser /> },
    { id: "notifications", label: "Notifications", icon: <FaBell /> },
    { id: "privacy", label: "Privacy", icon: <FaLock /> },
    { id: "security", label: "Security", icon: <FaShieldAlt /> },
    { id: "appearance", label: "Appearance", icon: <FaPalette /> },
    { id: "language", label: "Language", icon: <FaGlobe /> },
    { id: "payment", label: "Payment", icon: <FaCreditCard /> },
    { id: "data", label: "Data", icon: <FaDatabase /> },
  ];

  const securityFeatures = [
    { name: "Two-Factor Authentication", enabled: true, description: "Add an extra layer of security" },
    { name: "Login Alerts", enabled: true, description: "Get notified of new logins" },
    { name: "Session Management", enabled: false, description: "Manage active sessions" },
    { name: "Password Change Required", enabled: false, description: "Change password every 90 days" },
    { name: "Trusted Devices", enabled: true, description: "Manage trusted devices" },
  ];

  const activeSessions = [
    { device: "iPhone 13", location: "Mumbai, IN", lastActive: "Now", current: true },
    { device: "Chrome on Mac", location: "Delhi, IN", lastActive: "2 hours ago", current: false },
    { device: "Samsung Galaxy", location: "Bangalore, IN", lastActive: "1 week ago", current: false },
  ];

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handlePrivacyChange = (key, value) => {
    setPrivacy(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 p-4 md:p-6">
      <ToastContainer />
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Settings</h1>
              <p className="text-gray-600">
                Manage your account preferences and privacy settings
              </p>
            </div>
            
          
          </div>

          {/* Settings Overview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-white/20 rounded-xl">
                    <FaCog className="text-2xl" />
                  </div>
                  <div>
                    {initialLoading ? (
                      <>
                        <Skeleton width={200} height={32} className="mb-2" />
                        <Skeleton width={150} height={20} />
                      </>
                    ) : (
                      <>
                        <div className="text-2xl font-bold">{userData.name}</div>
                        <div className="text-blue-100">{userData.email}</div>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <FaShieldAlt className="text-green-300" />
                    <span>Account Security: High</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-300" />
                    <span>Profile: 85% Complete</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-end">
                <div className="text-sm text-blue-100 mb-2">Member Since</div>
                <div className="text-xl font-bold">{userData.joinDate}</div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Column - Tabs */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
            >
              <div className="p-4">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Settings Menu</h2>
                <div className="space-y-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors ${
                        activeTab === tab.id
                          ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 border border-blue-100"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <div className={`p-2 rounded-lg ${
                        activeTab === tab.id ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"
                      }`}>
                        {tab.icon}
                      </div>
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  ))}
                </div>
                
                {/* Logout Button */}
                <button className="w-full flex items-center gap-3 px-4 py-3 mt-6 rounded-xl text-left text-red-600 hover:bg-red-50 transition-colors border border-red-200">
                  <div className="p-2 rounded-lg bg-red-100">
                    <FaSignOutAlt />
                  </div>
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mt-6"
            >
              <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Links</h2>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-3 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors">
                  <span className="font-medium text-gray-900">Help Center</span>
                  <FaQuestionCircle className="text-gray-400" />
                </button>
                <button className="w-full flex items-center justify-between p-3 rounded-xl border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-colors">
                  <span className="font-medium text-gray-900">Account Recovery</span>
                  <FaHistory className="text-gray-400" />
                </button>
                <button className="w-full flex items-center justify-between p-3 rounded-xl border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors">
                  <span className="font-medium text-gray-900">Contact Support</span>
                  <FaEnvelope className="text-gray-400" />
                </button>
                <button className="w-full flex items-center justify-between p-3 rounded-xl border border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-colors">
                  <span className="font-medium text-gray-900">Share Feedback</span>
                  <FaShareAlt className="text-gray-400" />
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Content */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
            >
              <div className="p-6">
                {activeTab === "account" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-8"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-900">Account Information</h2>
                        <button
                          onClick={handleUpdateProfile}
                          disabled={loading}
                          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-blue-500 text-blue-600 hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <FaSave />
                          {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                      </div>

                      <div className="space-y-6">
                        {/* Profile Section */}
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
                          <h3 className="text-lg font-bold text-gray-900 mb-4">Profile Images</h3>

                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Profile Picture */}
                            <div className="lg:col-span-1">
                              <label className="block text-sm font-medium text-gray-700 mb-3">
                                Profile Picture
                              </label>
                              <div className="relative group">
                                <div className="w-32 h-32 mx-auto rounded-2xl border-4 border-white shadow-lg overflow-hidden bg-gray-100">
                                  {userData.profileImage ? (
                                    <img
                                      src={userData.profileImage}
                                      alt="Profile"
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <img
                                      src="https://images.unsplash.com/photo-1494790108755-2616b786d4f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                                      alt="Profile"
                                      className="w-full h-full object-cover"
                                    />
                                  )}

                                </div>
                                <input
                                  type="file"
                                  name="profileImage"
                                  accept="image/*"
                                  className="hidden"
                                  id="profileImage"
                                  onChange={handleProfileImageChange}
                                />
                                <label
                                  htmlFor="profileImage"
                                  className="block mt-3 text-center px-4 py-2 rounded-lg border border-blue-500 text-blue-600 hover:bg-blue-50 transition-colors text-sm font-medium cursor-pointer inline-block"
                                >
                                  Change Profile Picture
                                </label>
                              </div>
                            </div>

                            {/* Cover Image */}
                            <div className="lg:col-span-2">
                              <label className="block text-sm font-medium text-gray-700 mb-3">
                                Cover Image
                              </label>
                              <div className="relative group">
                                {userData.coverImage ? (
                                  <div className="w-full h-24 rounded-xl overflow-hidden bg-gray-50 cursor-pointer">
                                    <img
                                      src={userData.coverImage}
                                      alt="Cover"
                                      className="w-full h-full object-cover"
                                    />

                                  </div>
                                ) : (
                                  <div className="w-full h-24 rounded-xl border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors cursor-pointer overflow-hidden bg-gray-50 flex items-center justify-center">
                                    <div className="text-center">
                                      <FaCamera className="text-2xl text-gray-400 mx-auto mb-1" />
                                      <p className="text-gray-500 text-sm">Click to upload cover image</p>
                                    </div>
                                  </div>
                                )}
                                <input
                                  type="file"
                                  name="coverImage"
                                  accept="image/*"
                                  className="hidden"
                                  id="coverImage"
                                  onChange={handleCoverImageChange}
                                />
                                <label htmlFor="coverImage" className="w-full h-full absolute inset-0 cursor-pointer"></label>
                              </div>
                              <label
                                htmlFor="coverImage"
                                className="block mt-3 text-center px-4 py-2 rounded-lg border border-blue-500 text-blue-600 hover:bg-blue-50 transition-colors text-sm font-medium cursor-pointer inline-block"
                                onClick={() => document.getElementById('coverImage').click()}
                              >
                                Change Cover Image
                              </label>
                            </div>
                          </div>
                        </div>

                        {/* Personal Information */}
                        <div className="bg-white rounded-2xl border border-gray-200 p-6">
                          <h3 className="text-lg font-bold text-gray-900 mb-6">Personal Information</h3>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                <span className="flex items-center gap-2">
                                  <FaUser className="text-blue-500" />
                                  Full Name
                                </span>
                              </label>
                              <input
                                type="text"
                                value={userData.name || ""}
                                onChange={(e) => handleUserDataChange('name', e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="Enter your full name"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                <span className="flex items-center gap-2">
                                  <FaEnvelope className="text-blue-500" />
                                  Email Address
                                </span>
                              </label>
                              <input
                                type="email"
                                value={userData.email}
                                onChange={(e) => handleUserDataChange('email', e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="Enter your email"
                              />
                            </div>



                            <div className="md:col-span-2">
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                <span className="flex items-center gap-2">
                                  <FaMapMarkerAlt className="text-blue-500" />
                                  Location
                                </span>
                              </label>
                              <input
                                type="text"
                                value={userData.location}
                                onChange={(e) => handleUserDataChange('location', e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="Enter your location"
                              />
                            </div>

                            <div className="md:col-span-2">
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Bio / Description
                              </label>
                              <textarea
                                rows="4"
                                value={userData.bio}
                                onChange={(e) => handleUserDataChange('bio', e.target.value)}
                                placeholder="Tell others about yourself..."
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Danger Zone */}
                    <div className="border-t border-gray-200 pt-8">
                      <h3 className="text-lg font-bold text-red-600 mb-4">Danger Zone</h3>
                      <div className="space-y-4">
                        <button className="flex items-center justify-between w-full p-4 rounded-xl border border-red-300 bg-red-50 hover:bg-red-100 transition-colors">
                          <div className="flex items-center gap-3">
                            <FaTrash className="text-red-600" />
                            <div className="text-left">
                              <div className="font-medium text-red-700">Delete Account</div>
                              <div className="text-sm text-red-600">Permanently delete your account and all data</div>
                            </div>
                          </div>
                          <FaTimes className="text-red-600" />
                        </button>

                        <button className="flex items-center justify-between w-full p-4 rounded-xl border border-yellow-300 bg-yellow-50 hover:bg-yellow-100 transition-colors">
                          <div className="flex items-center gap-3">
                            <FaDownload className="text-yellow-600" />
                            <div className="text-left">
                              <div className="font-medium text-yellow-700">Download Data</div>
                              <div className="text-sm text-yellow-600">Download all your personal data</div>
                            </div>
                          </div>
                          <FaDownload className="text-yellow-600" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "notifications" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-8"
                  >
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-6">Notification Preferences</h2>
                      
                      <div className="space-y-6">
                        {Object.entries(notifications).map(([key, value]) => (
                          <div key={key} className="flex items-center justify-between p-4 rounded-xl border border-gray-200">
                            <div>
                              <div className="font-medium text-gray-900 capitalize">
                                {key.replace(/([A-Z])/g, ' $1').trim()}
                              </div>
                              <div className="text-sm text-gray-600">
                                {key === 'email' && 'Receive notifications via email'}
                                {key === 'push' && 'Push notifications on your device'}
                                {key === 'sms' && 'SMS notifications'}
                                {key === 'tasks' && 'New task alerts and updates'}
                                {key === 'messages' && 'New message notifications'}
                                {key === 'promotions' && 'Promotional offers and updates'}
                              </div>
                            </div>
                            <button
                              onClick={() => handleNotificationChange(key)}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                                value ? 'bg-blue-600' : 'bg-gray-300'
                              }`}
                            >
                              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                                value ? 'translate-x-6' : 'translate-x-1'
                              }`} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Notification Sounds */}
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Sound & Vibration</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 rounded-xl border border-gray-200">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-gray-900">Notification Sound</span>
                            <FaVolumeUp className="text-gray-500" />
                          </div>
                          <select className="w-full px-3 py-2 rounded-lg border border-gray-300">
                            <option>Default</option>
                            <option>Chime</option>
                            <option>Bell</option>
                            <option>None</option>
                          </select>
                        </div>

                        <div className="p-4 rounded-xl border border-gray-200">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-gray-900">Vibration</span>
                            <FaVolumeMute className="text-gray-500" />
                          </div>
                          <select className="w-full px-3 py-2 rounded-lg border border-gray-300">
                            <option>Default</option>
                            <option>Strong</option>
                            <option>Weak</option>
                            <option>None</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "privacy" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-8"
                  >
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-6">Privacy Settings</h2>
                      
                      <div className="space-y-6">
                        {Object.entries(privacy).map(([key, value]) => (
                          <div key={key} className="p-4 rounded-xl border border-gray-200">
                            <div className="flex items-center justify-between mb-3">
                              <div>
                                <div className="font-medium text-gray-900 capitalize">
                                  {key.replace(/([A-Z])/g, ' $1').trim()}
                                </div>
                                <div className="text-sm text-gray-600">
                                  {key === 'profileVisible' && 'Allow others to see your profile'}
                                  {key === 'showEarnings' && 'Show your earnings on profile'}
                                  {key === 'showRatings' && 'Display your ratings and reviews'}
                                  {key === 'allowMessages' && 'Allow others to message you'}
                                  {key === 'showOnlineStatus' && 'Show when you are online'}
                                  {key === 'locationSharing' && 'Control location sharing'}
                                </div>
                              </div>
                              
                              {typeof value === 'boolean' ? (
                                <button
                                  onClick={() => handlePrivacyChange(key, !value)}
                                  className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                                    value ? 'bg-blue-600' : 'bg-gray-300'
                                  }`}
                                >
                                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                                    value ? 'translate-x-6' : 'translate-x-1'
                                  }`} />
                                </button>
                              ) : (
                                <select
                                  value={value}
                                  onChange={(e) => handlePrivacyChange(key, e.target.value)}
                                  className="px-3 py-1 rounded-lg border border-gray-300"
                                >
                                  <option value="city">City Only</option>
                                  <option value="area">Area Only</option>
                                  <option value="none">Don't Share</option>
                                </select>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Blocked Users */}
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Blocked Users</h3>
                      <div className="p-4 rounded-xl border border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <div className="font-medium text-gray-900">Manage Blocked Accounts</div>
                            <div className="text-sm text-gray-600">Users you've blocked from contacting you</div>
                          </div>
                          <button className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50">
                            Manage List
                          </button>
                        </div>
                        <div className="text-sm text-gray-500">
                          You have 2 users blocked
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "security" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-8"
                  >
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-6">Security Settings</h2>
                      
                      <div className="space-y-6">
                        {/* Change Password */}
                        <div className="p-6 rounded-xl border border-blue-200 bg-blue-50">
                          <h3 className="font-bold text-gray-900 mb-4">Change Password</h3>
                          {passwordError && (
                            <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-700 text-sm">
                              {passwordError}
                            </div>
                          )}
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                New Password
                              </label>
                              <input
                                type={showPassword ? "text" : "password"}
                                value={passwordData.newPassword}
                                onChange={(e) => setPasswordData(prev => ({...prev, newPassword: e.target.value}))}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Confirm New Password
                              </label>
                              <input
                                type={showPassword ? "text" : "password"}
                                value={passwordData.confirmNewPassword}
                                onChange={(e) => setPasswordData(prev => ({...prev, confirmNewPassword: e.target.value}))}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            </div>

                            <button
                              onClick={handleChangePassword}
                              disabled={passwordLoading}
                              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {passwordLoading ? 'Updating...' : 'Update Password'}
                            </button>
                          </div>
                        </div>

                        {/* Security Features */}
                        <div>
                          <h3 className="font-bold text-gray-900 mb-4">Security Features</h3>
                          <div className="space-y-4">
                            {securityFeatures.map((feature, index) => (
                              <div key={index} className="flex items-center justify-between p-4 rounded-xl border border-gray-200">
                                <div>
                                  <div className="font-medium text-gray-900">{feature.name}</div>
                                  <div className="text-sm text-gray-600">{feature.description}</div>
                                </div>
                                <button
                                  className={`px-4 py-2 rounded-lg ${
                                    feature.enabled
                                      ? "bg-green-100 text-green-700 hover:bg-green-200"
                                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                  }`}
                                >
                                  {feature.enabled ? "Configure" : "Enable"}
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Active Sessions */}
                        <div>
                          <h3 className="font-bold text-gray-900 mb-4">Active Sessions</h3>
                          <div className="space-y-3">
                            {activeSessions.map((session, index) => (
                              <div key={index} className="flex items-center justify-between p-4 rounded-xl border border-gray-200">
                                <div className="flex items-center gap-3">
                                  <div className={`p-2 rounded-lg ${
                                    session.current ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"
                                  }`}>
                                    <FaUsers />
                                  </div>
                                  <div>
                                    <div className="font-medium text-gray-900">{session.device}</div>
                                    <div className="text-sm text-gray-600">{session.location} • {session.lastActive}</div>
                                  </div>
                                </div>
                                {session.current ? (
                                  <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                                    Current
                                  </span>
                                ) : (
                                  <button className="px-3 py-1 text-sm rounded-lg border border-red-300 text-red-600 hover:bg-red-50">
                                    Logout
                                  </button>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "appearance" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-8"
                  >
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-6">Appearance Settings</h2>
                      
                      <div className="space-y-6">
                        {/* Theme Selection */}
                        <div className="p-6 rounded-xl border border-gray-200">
                          <h3 className="font-bold text-gray-900 mb-4">Theme</h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <button
                              onClick={() => setDarkMode(false)}
                              className={`p-6 rounded-xl border-2 ${
                                !darkMode
                                  ? "border-blue-500 bg-blue-50"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              <div className="flex flex-col items-center gap-3">
                                <FaSun className="text-3xl text-yellow-500" />
                                <div className="font-medium text-gray-900">Light Mode</div>
                              </div>
                            </button>

                            <button
                              onClick={() => setDarkMode(true)}
                              className={`p-6 rounded-xl border-2 ${
                                darkMode
                                  ? "border-blue-500 bg-blue-50"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              <div className="flex flex-col items-center gap-3">
                                <FaMoon className="text-3xl text-indigo-500" />
                                <div className="font-medium text-gray-900">Dark Mode</div>
                              </div>
                            </button>

                            <button className="p-6 rounded-xl border border-gray-200 hover:border-gray-300">
                              <div className="flex flex-col items-center gap-3">
                                <FaPalette className="text-3xl text-purple-500" />
                                <div className="font-medium text-gray-900">Auto</div>
                                <div className="text-sm text-gray-600">Follow system</div>
                              </div>
                            </button>
                          </div>
                        </div>

                        {/* Font Size */}
                        <div className="p-6 rounded-xl border border-gray-200">
                          <h3 className="font-bold text-gray-900 mb-4">Font Size</h3>
                          <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-600">Small</span>
                            <input
                              type="range"
                              min="12"
                              max="18"
                              defaultValue="16"
                              className="flex-1"
                            />
                            <span className="text-sm text-gray-600">Large</span>
                            <span className="font-medium text-gray-900">Medium</span>
                          </div>
                        </div>

                        {/* Color Scheme */}
                        <div className="p-6 rounded-xl border border-gray-200">
                          <h3 className="font-bold text-gray-900 mb-4">Color Scheme</h3>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                              { name: "Blue", color: "bg-blue-500" },
                              { name: "Purple", color: "bg-purple-500" },
                              { name: "Green", color: "bg-green-500" },
                              { name: "Orange", color: "bg-orange-500" },
                            ].map((scheme, index) => (
                              <button
                                key={index}
                                className="p-4 rounded-xl border border-gray-200 hover:border-gray-300"
                              >
                                <div className="flex flex-col items-center gap-3">
                                  <div className={`w-12 h-12 rounded-full ${scheme.color}`} />
                                  <div className="font-medium text-gray-900">{scheme.name}</div>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "language" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-8"
                  >
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-6">Language & Region</h2>
                      
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              App Language
                            </label>
                            <select className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                              <option>English</option>
                              <option>Hindi</option>
                              <option>Marathi</option>
                              <option>Gujarati</option>
                              <option>Bengali</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Date Format
                            </label>
                            <select className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                              <option>DD/MM/YYYY</option>
                              <option>MM/DD/YYYY</option>
                              <option>YYYY-MM-DD</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Time Format
                            </label>
                            <select className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                              <option>12-hour</option>
                              <option>24-hour</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Currency
                            </label>
                            <select className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                              <option>Indian Rupee (₹)</option>
                              <option>US Dollar ($)</option>
                              <option>Euro (€)</option>
                              <option>Pound (£)</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 rounded-xl border border-gray-200">
                      <h3 className="font-bold text-gray-900 mb-4">Region Settings</h3>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-900">Current Region</div>
                          <div className="text-sm text-gray-600">India (IN)</div>
                        </div>
                        <button className="px-4 py-2 rounded-lg border border-blue-500 text-blue-600 hover:bg-blue-50">
                          Change Region
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "payment" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-8"
                  >
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Settings</h2>
                      
                      <div className="space-y-6">
                        <div className="p-6 rounded-xl border border-blue-200 bg-blue-50">
                          <h3 className="font-bold text-gray-900 mb-4">Default Payment Method</h3>
                          <div className="flex items-center justify-between p-4 rounded-lg bg-white">
                            <div className="flex items-center gap-3">
                              <FaCreditCard className="text-2xl text-blue-500" />
                              <div>
                                <div className="font-medium text-gray-900">Visa •••• 4321</div>
                                <div className="text-sm text-gray-600">Expires 12/2025</div>
                              </div>
                            </div>
                            <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                              Default
                            </span>
                          </div>
                        </div>

                        <div className="p-6 rounded-xl border border-gray-200">
                          <h3 className="font-bold text-gray-900 mb-4">Payment Methods</h3>
                          <div className="space-y-4">
                            <button className="w-full p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <FaUniversity className="text-xl text-gray-500" />
                                  <div>
                                    <div className="font-medium text-gray-900">Add Bank Account</div>
                                    <div className="text-sm text-gray-600">Link your bank for direct transfers</div>
                                  </div>
                                </div>
                                <FaPlusCircle className="text-gray-400" />
                              </div>
                            </button>

                            <button className="w-full p-4 rounded-xl border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-colors">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <FaGooglePay className="text-xl text-green-500" />
                                  <div>
                                    <div className="font-medium text-gray-900">Setup UPI</div>
                                    <div className="text-sm text-gray-600">Link your UPI ID for instant payments</div>
                                  </div>
                                </div>
                                <FaPlusCircle className="text-gray-400" />
                              </div>
                            </button>
                          </div>
                        </div>

                        <div className="p-6 rounded-xl border border-gray-200">
                          <h3 className="font-bold text-gray-900 mb-4">Payment Preferences</h3>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-medium text-gray-900">Auto-Withdrawal</div>
                                <div className="text-sm text-gray-600">Automatically withdraw earnings weekly</div>
                              </div>
                              <button className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200">
                                Configure
                              </button>
                            </div>

                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-medium text-gray-900">Payment Notifications</div>
                                <div className="text-sm text-gray-600">Get notified for all payments</div>
                              </div>
                              <button className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200">
                                Configure
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "data" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-8"
                  >
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-6">Data & Privacy</h2>
                      
                      <div className="space-y-6">
                        <div className="p-6 rounded-xl border border-gray-200">
                          <h3 className="font-bold text-gray-900 mb-4">Download Your Data</h3>
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium text-gray-900">Request Data Export</div>
                              <div className="text-sm text-gray-600">Download all your personal data in JSON format</div>
                            </div>
                            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-blue-500 text-blue-600 hover:bg-blue-50">
                              <FaDownload />
                              Request Export
                            </button>
                          </div>
                        </div>

                        <div className="p-6 rounded-xl border border-gray-200">
                          <h3 className="font-bold text-gray-900 mb-4">Data Usage</h3>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-medium text-gray-900">Analytics & Personalization</div>
                                <div className="text-sm text-gray-600">Allow data usage for personalized experience</div>
                              </div>
                              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
                                <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6" />
                              </button>
                            </div>

                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-medium text-gray-900">Marketing Communications</div>
                                <div className="text-sm text-gray-600">Receive promotional emails and notifications</div>
                              </div>
                              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300">
                                <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-1" />
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="p-6 rounded-xl border border-red-200 bg-red-50">
                          <h3 className="font-bold text-red-700 mb-4">Clear Data</h3>
                          <div className="space-y-4">
                            <button className="w-full p-4 rounded-lg border border-red-300 bg-white hover:bg-red-50 transition-colors">
                              <div className="flex items-center justify-between">
                                <div>
                                  <div className="font-medium text-red-700">Clear Search History</div>
                                  <div className="text-sm text-red-600">Delete all your search queries</div>
                                </div>
                                <FaTrash className="text-red-600" />
                              </div>
                            </button>

                            <button className="w-full p-4 rounded-lg border border-red-300 bg-white hover:bg-red-50 transition-colors">
                              <div className="flex items-center justify-between">
                                <div>
                                  <div className="font-medium text-red-700">Clear Chat History</div>
                                  <div className="text-sm text-red-600">Delete all your conversation history</div>
                                </div>
                                <FaTrash className="text-red-600" />
                              </div>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>


          </div>
        </div>
      </div>
    </div>
  );
}