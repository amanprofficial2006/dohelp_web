import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FaMapMarkerAlt,
  FaUser,
  FaTasks,
  FaWallet,
  FaSignOutAlt,
  FaHome,
  FaBell,
  FaSearch,
  FaPlusCircle,
  FaChevronDown,
  FaHeart,
  FaShieldAlt,
  FaQuestionCircle,
  FaCog,
  FaComments,
  FaStar,
  FaBars,
  FaTimes
} from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Layout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  console.log("Layout render - user:", user);
  console.log("User profileImage:", user?.profileImage);

  const getInitials = (name) => {
    if (!name) return "U";
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(3); // Mock notification count
  const [currentLocation, setCurrentLocation] = useState(null);

  // Fetch current location after login
  useEffect(() => {
    if (user && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude, accuracy } = position.coords;
          try {
            // Use reverse geocoding to get precise location name
            const response = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
            );
            const data = await response.json();

            // Build more precise location string
            let locationParts = [];
            if (data.localityInfo && data.localityInfo.administrative) {
              const admin = data.localityInfo.administrative;
              if (admin[2] && admin[2].name) locationParts.push(admin[2].name); // Neighborhood/Area
              if (admin[1] && admin[1].name) locationParts.push(admin[1].name); // City
            }
            if (data.city) locationParts.push(data.city);
            if (data.locality) locationParts.push(data.locality);

            // Remove duplicates and join
            const uniqueParts = [...new Set(locationParts)];
            const locationName = uniqueParts.length > 0
              ? uniqueParts.join(', ')
              : `${latitude.toFixed(4)}, ${longitude.toFixed(4)} (±${Math.round(accuracy)}m)`;

            setCurrentLocation(locationName);
          } catch (error) {
            console.error('Error fetching location name:', error);
            setCurrentLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)} (±${Math.round(accuracy)}m)`);
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          setCurrentLocation('Location unavailable');
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        }
      );
    }
  }, [user]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProfileMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsProfileMenuOpen(false);
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/categories", label: "Categories" },
    { to: "/how-it-works", label: "How It Works" },
    { to: "/faqs", label: "FAQs" },
    { to: "/contact", label: "Contact" },
  ];

  const profileMenuItems = [
    { to: "/profile", label: "My Profile", icon: <FaUser /> },
    { to: "/my-tasks", label: "My Tasks", icon: <FaTasks /> },
    { to: "/wallet", label: "Wallet", icon: <FaWallet /> },
    { to: "/settings", label: "Settings", icon: <FaCog /> },
    { to: "/Contact", label: "Help & Support", icon: <FaQuestionCircle /> },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 text-gray-900">
      
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                  <FaMapMarkerAlt className="text-white text-base" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full border-2 border-white"></div>
              </motion.div>
              <div>
                <h1 className="text-sm font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent" style={{ fontSize: '2.5rem' }}>
                  DoHelp
                </h1>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {!user && navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                    location.pathname === link.to
                      ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 border border-blue-100"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  } ${link.highlight ? "font-semibold" : ""}`}
                >
                  {link.icon}
                  <span>{link.label}</span>
                  {link.highlight && (
                    <span className="ml-1 px-2 py-0.5 text-xs bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full">
                      New
                    </span>
                  )}
                </Link>
              ))}

              {/* Search Bar - Only show when logged in */}
              {user && (
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaSearch className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search tasks..."
                      className="pl-10 pr-4 py-2 w-64 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              )}

              {/* Notifications - Only show when logged in */}
              {user && (
                <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <FaBell className="text-gray-600 text-xl" />
                  {notifications > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {notifications}
                    </span>
                  )}
                </button>
              )}

              {/* User Profile Menu */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div className="relative">
                      <img
                        src={user.profileImage ? (user.profileImage.startsWith('http') ? user.profileImage : `https://dohelp.newhopeindia17.com${user.profileImage}`) : `https://ui-avatars.com/api/?name=${encodeURIComponent(getInitials(user.name))}&background=blue&color=fff&bold=true`}
                        alt="Profile"
                        className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                      />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div className="text-left hidden lg:block">
                      <div className="font-semibold text-gray-900">
                        {user.name || "Welcome"}
                      </div>
                      <div className="text-xs text-gray-500">
                        {user.rating ? `${user.rating} ⭐` : "New Member"}
                      </div>
                    </div>
                    <FaChevronDown className={`text-gray-500 transition-transform ${isProfileMenuOpen ? "rotate-180" : ""}`} />
                  </button>

                  {/* Profile Dropdown */}
                  <AnimatePresence>
                    {isProfileMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50"
                      >
                        <div className="px-4 py-3 border-b border-gray-100">
                          <div className="font-semibold text-gray-900">{user.name || "User"}</div>
                          <div className="text-sm text-gray-500">{user.email || ""}</div>
                          {currentLocation && (
                            <div className="flex items-center gap-1 mt-1 text-xs text-blue-600">
                              <FaMapMarkerAlt className="text-xs" />
                              <span>{currentLocation}</span>
                            </div>
                          )}
                        </div>
                        
                        {profileMenuItems.map((item) => (
                          <Link
                            key={item.to}
                            to={item.to}
                            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                          >
                            <div className="text-gray-500">{item.icon}</div>
                            <span>{item.label}</span>
                          </Link>
                        ))}

                        <div className="border-t border-gray-100 pt-2 mt-2">
                          <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-4 py-3 w-full text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <FaSignOutAlt />
                            <span>Logout</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link
                    to="/login"
                    className="px-6 py-2 rounded-xl border border-blue-500 text-blue-600 hover:bg-blue-50 transition-colors font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-6 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 !text-white hover:from-blue-600 hover:to-purple-600 transition-all shadow-md hover:shadow-lg"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-gray-200"
            >
              <div className="px-4 py-3 space-y-2">
                {!user && navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                      location.pathname === link.to
                        ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {link.icon}
                    <span>{link.label}</span>
                    {link.highlight && (
                      <span className="ml-auto px-2 py-1 text-xs bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full">
                        New
                      </span>
                    )}
                  </Link>
                ))}

                {/* Mobile Search - Only show when logged in */}
                {user && (
                  <div className="relative mt-4">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaSearch className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search tasks..."
                      className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                )}

                {/* Mobile Profile - Only show when logged in */}
                {user && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <img
                        src={user.profileImage ? (user.profileImage.startsWith('http') ? user.profileImage : `https://dohelp.newhopeindia17.com${user.profileImage}`) : `https://ui-avatars.com/api/?name=${encodeURIComponent(getInitials(user.name))}&background=blue&color=fff&bold=true`}
                        alt="Profile"
                        className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
                      />
                      <div>
                        <div className="font-semibold text-gray-900">{user.name || "Welcome"}</div>
                        <div className="text-sm text-gray-500">{user.email || ""}</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Mobile Auth Buttons */}
                {!user && (
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <Link
                      to="/login"
                      className="px-4 py-3 text-center rounded-xl border border-blue-500 text-blue-600 hover:bg-blue-50 transition-colors"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="px-4 py-3 text-center rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 !text-white hover:from-blue-600 hover:to-purple-600 transition-all"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Page Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                  <FaMapMarkerAlt className="text-white text-xl" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">DoHelp</h2>
                  <p className="text-sm text-gray-400">Your local helping community</p>
                </div>
              </div>
              <p className="text-gray-400 mb-6">
                Connecting people through helpful tasks. Making everyday life easier, one task at a time.
              </p>
              <div className="flex gap-4">
                {["Twitter", "Facebook", "Instagram", "LinkedIn"].map((social) => (
                  <button
                    key={social}
                    className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors flex items-center justify-center"
                  >
                    {social[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <FaMapMarkerAlt />
                Quick Links
              </h3>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                      {link.icon}
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <FaQuestionCircle />
                Support
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/help" className="text-gray-400 hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/faqs" className="text-gray-400 hover:text-white transition-colors">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link to="/community" className="text-gray-400 hover:text-white transition-colors">
                    Community
                  </Link>
                </li>
                <li>
                  <Link to="/safety" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                    <FaShieldAlt />
                    Safety Tips
                  </Link>
                </li>
              </ul>
            </div>

            {/* Newsletter & Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <FaComments />
                Stay Updated
              </h3>
              <p className="text-gray-400 mb-4">
                Subscribe to get updates on new features and community tips.
              </p>
              <div className="flex flex-col gap-2 mb-6">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
                />
                <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all">
                  Subscribe
                </button>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <FaHeart className="text-red-400" />
                <span>Trusted by 10,000+ community members</span>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-g  ray-400 text-sm">
                © {new Date().getFullYear()} DoHelp. All rights reserved.
              </div>
              <div className="flex gap-6 text-sm">
                <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
                <Link to="/cookies" className="text-gray-400 hover:text-white transition-colors">
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Button for Mobile */}
      {user && (
        <Link
          to="/post-task"
          className="fixed bottom-6 right-6 md:hidden z-40 w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
        >
          <FaPlusCircle className="text-2xl" />
        </Link>
      )}

      {/* Animation Styles */}
      <style>{`
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
      `}</style>
    </div>
  );
}