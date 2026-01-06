import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUser,
  FaGoogle,
  FaFacebook,
  FaShieldAlt,
  FaArrowRight,
  FaMapMarkerAlt
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    phone: "",
    password: "",
    rememberMe: false
  });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login data:", formData);

    try {
      const response = await fetch('https://dohelp.newhopeindia17.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: formData.phone,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Map the API response data to userData
        const userData = {
          id: data.data.user_uid || 1,
          name: data.data.name || 'User',
          email: data.data.email || '',
          phone: data.data.phone || formData.phone,
          profileImage: data.data.profile_image_url || "https://via.placeholder.com/40x40?text=U",
          isVerified: data.data.is_verified || false
        };
        login(userData, data.data.token);
        navigate("/tasks");
      } else {
        toast.error(data.message || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4 py-12">
      
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl flex flex-col md:flex-row rounded-3xl overflow-hidden shadow-2xl bg-white"
      >
        {/* Left Side - Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <div className="max-w-md mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
                  <FaUser className="text-white text-2xl" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
                  <p className="text-sm text-blue-600 font-medium mt-1">
                    Access Your DoHelp Account
                  </p>
                </div>
              </div>
              <p className="text-gray-600">
                Sign in to post tasks, find work, and connect with your community
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Phone Field */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <FaUser className="text-gray-500" />
                  Phone Number
                </label>
                <div className="relative">
                  <input
                    name="phone"
                    type="tel"
                    placeholder="7065170513"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 pl-11 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                    required
                  />
                  <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <FaLock className="text-gray-500" />
                    Password
                  </label>
                  <Link 
                    to="/forgot-password"
                    className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 pl-11 pr-11 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                    required
                  />
                  <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Security */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="rememberMe" className="text-sm text-gray-600">
                    Remember me
                  </label>
                </div>
                <div className="flex items-center gap-1 text-sm text-green-600">
                  <FaShieldAlt className="text-sm" />
                  <span>Secure Login</span>
                </div>
              </div>

              {/* Login Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <span>Sign In to Your Account</span>
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </motion.button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              {/* Social Login */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 p-3 rounded-xl border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  <FaGoogle className="w-5 h-5" />
                  <span className="text-gray-700 font-medium">Google</span>
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 p-3 rounded-xl border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  <FaFacebook className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700 font-medium">Facebook</span>
                </button>
              </div>

              {/* Demo Account Info */}
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <span className="text-blue-600 font-bold text-sm">💡</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">Demo Account:</span> Try with
                      <span className="font-mono bg-gray-100 px-2 py-1 rounded mx-1">7065170513</span>
                      /
                      <span className="font-mono bg-gray-100 px-2 py-1 rounded mx-1">am_2006@an</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Sign Up Link */}
              <p className="text-center text-gray-600">
                New to DoHelp?{" "}
                <Link 
                  to="/register" 
                  className="text-blue-600 hover:text-blue-800 font-semibold hover:underline transition-colors"
                >
                  Create a free account
                </Link>
              </p>
            </form>
          </div>
        </div>

        {/* Right Side - Benefits & Features */}
        <div className="hidden md:block md:w-1/2 relative bg-gradient-to-br from-blue-600 to-purple-700">
          {/* Content Overlay */}
          <div className="relative z-10 h-full flex flex-col justify-center p-12 text-white">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-4xl font-bold mb-8">
                Your Community <span className="text-yellow-300">Awaits</span>
              </h2>
              
              <div className="space-y-8 mb-8">
                {/* Benefit 1 */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/20 rounded-xl">
                    <FaUser className="text-white text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">One Account, Dual Access</h3>
                    <p className="text-white/90">
                      Post tasks you need help with and find tasks to earn money - all from one account.
                    </p>
                  </div>
                </div>

                {/* Benefit 2 */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/20 rounded-xl">
                    <FaMapMarkerAlt className="text-white text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Local Connections</h3>
                    <p className="text-white/90">
                      Connect with trusted helpers and task posters in your neighborhood.
                    </p>
                  </div>
                </div>

                {/* Benefit 3 */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/20 rounded-xl">
                    <FaShieldAlt className="text-white text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Secure & Trusted</h3>
                    <p className="text-white/90">
                      Verified users, secure payments, and community ratings ensure safe interactions.
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <h4 className="text-xl font-semibold mb-4">What's Happening Now:</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">150+</div>
                    <div className="text-sm text-white/80">Tasks Available</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">₹25K+</div>
                    <div className="text-sm text-white/80">Earned Today</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">98%</div>
                    <div className="text-sm text-white/80">Success Rate</div>
                  </div>
                </div>
              </div>

              {/* User Testimonials */}
              <div className="mt-8 pt-8 border-t border-white/30">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="text-xl">⭐</span>
                  </div>
                  <div>
                    <p className="text-white/90 italic">
                      "Logged in and found a helper within minutes. This platform changed how I get things done!"
                    </p>
                    <div className="mt-2 text-sm text-white/70">
                      - Priya S., Community Member
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

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
      <ToastContainer />
    </div>
  );
}
