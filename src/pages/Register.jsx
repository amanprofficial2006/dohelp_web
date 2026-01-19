import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaCheck,
  FaTasks,
  FaHandshake,
  FaMoneyBillWave,
  FaShieldAlt
} from "react-icons/fa";
import { motion } from "framer-motion";

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    phone: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("https://dohelp.newhopeindia17.com/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          device_type: "web",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Registration successful! Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setError(data.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-64 h-64 bg-blue-200 rounded-full top-1/4 left-1/4 mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute w-64 h-64 bg-purple-200 rounded-full bottom-1/4 right-1/4 mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full top-1/2 left-1/2 w-96 h-96 bg-cyan-200 mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col w-full max-w-6xl overflow-hidden bg-white shadow-2xl md:flex-row rounded-3xl"
      >
        {/* Left Side - Form */}
        <div className="w-full p-8 md:w-1/2 md:p-12">
          <div className="max-w-md mx-auto">
            {/* Header */}
            <div className="mb-8 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
                  <FaHandshake className="text-2xl text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Join DoHelp</h1>
                  <p className="mt-1 text-sm font-medium text-blue-600">
                    Post Tasks • Find Tasks • Earn Money
                  </p>
                </div>
              </div>
              <p className="text-gray-600">
                Create one account to both post tasks and help others in your community
              </p>
            </div>

            {/* Universal Role Badge */}
            <div className="p-4 mb-8 border border-blue-100 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <div className="flex">
                    <FaTasks className="text-blue-500" />
                    <FaHandshake className="-ml-2 text-purple-500" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">One Account, Two Ways to Connect</h3>
                  <p className="text-sm text-gray-600">
                    With a single account, you can both post tasks you need help with 
                    <span className="font-medium text-blue-600"> AND </span>
                    find tasks to earn money
                  </p>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <FaUser className="text-gray-500" />
                  Full Name
                </label>
                <div className="relative">
                  <input
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 transition-all border border-gray-300 outline-none pl-11 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    required
                  />
                  <FaUser className="absolute text-gray-400 transform -translate-y-1/2 left-4 top-1/2" />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <FaEnvelope className="text-gray-500" />
                  Email Address
                </label>
                <div className="relative">
                  <input
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 transition-all border border-gray-300 outline-none pl-11 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    required
                  />
                  <FaEnvelope className="absolute text-gray-400 transform -translate-y-1/2 left-4 top-1/2" />
                </div>
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Phone Number
                </label>
                <div className="relative">
                  <input
                    name="phone"
                    type="tel"
                    placeholder="+91 9876543210"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 transition-all border border-gray-300 outline-none pl-11 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    required
                  />
                  <span className="absolute text-gray-400 transform -translate-y-1/2 left-4 top-1/2">
                    📱
                  </span>
                </div>
              </div>



              {/* Password Field */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <FaLock className="text-gray-500" />
                  Password
                </label>
                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 transition-all border border-gray-300 outline-none pl-11 pr-11 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    required
                  />
                  <FaLock className="absolute text-gray-400 transform -translate-y-1/2 left-4 top-1/2" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute text-gray-500 transform -translate-y-1/2 right-4 top-1/2 hover:text-gray-700"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                  <FaCheck className="text-green-500" />
                  <span>Use at least 8 characters with letters and numbers</span>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <FaLock className="text-gray-500" />
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    name="password_confirmation"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.password_confirmation}
                    onChange={handleChange}
                    className="w-full px-4 py-3 transition-all border border-gray-300 outline-none pl-11 pr-11 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    required
                  />
                  <FaLock className="absolute text-gray-400 transform -translate-y-1/2 left-4 top-1/2" />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute text-gray-500 transform -translate-y-1/2 right-4 top-1/2 hover:text-gray-700"
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* Dual Capability Section */}
              <div className="p-4 border border-blue-100 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                <h4 className="flex items-center gap-2 mb-3 font-semibold text-gray-900">
                  <FaShieldAlt className="text-blue-500" />
                  Your Account Lets You:
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-white border border-blue-100 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-1 bg-blue-100 rounded">
                        <FaTasks className="text-sm text-blue-600" />
                      </div>
                      <span className="text-sm font-medium text-gray-900">Post Tasks</span>
                    </div>
                    <p className="text-xs text-gray-600">Get help for anything you need</p>
                  </div>
                  <div className="p-3 bg-white border border-purple-100 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-1 bg-purple-100 rounded">
                        <FaHandshake className="text-sm text-purple-600" />
                      </div>
                      <span className="text-sm font-medium text-gray-900">Help Others</span>
                    </div>
                    <p className="text-xs text-gray-600">Earn money by completing tasks</p>
                  </div>
                </div>
              </div>

              {/* Terms & Conditions */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  className="mt-1 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  required
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to the{" "}
                  <a href="/terms" className="font-medium text-blue-600 hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="/privacy" className="font-medium text-blue-600 hover:underline">
                    Privacy Policy
                  </a>
                </label>
              </div>

              {/* Error/Success Messages */}
              {error && (
                <div className="p-4 border border-red-200 bg-red-50 rounded-xl">
                  <p className="text-sm font-medium text-red-600">{error}</p>
                </div>
              )}
              {success && (
                <div className="p-4 border border-green-200 bg-green-50 rounded-xl">
                  <p className="text-sm font-medium text-green-600">{success}</p>
                </div>
              )}

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full py-4 font-semibold text-white transition-all shadow-lg rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Creating Account..." : "Create Universal Account"}
              </motion.button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 text-gray-500 bg-white">Or continue with</span>
                </div>
              </div>

              {/* Social Login */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 p-3 transition-colors border border-gray-300 rounded-xl hover:bg-gray-50"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="font-medium text-gray-700">Google</span>
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 p-3 transition-colors border border-gray-300 rounded-xl hover:bg-gray-50"
                >
                  <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span className="font-medium text-gray-700">Facebook</span>
                </button>
              </div>

              {/* Login Link */}
              <p className="text-center text-gray-600">
                Already have an account?{" "}
                <Link 
                  to="/login" 
                  className="font-semibold text-blue-600 transition-colors hover:text-blue-800 hover:underline"
                >
                  Sign in to your account
                </Link>
              </p>
            </form>
          </div>
        </div>

        {/* Right Side - Benefits & Features */}
        <div className="relative hidden md:block md:w-1/2 bg-gradient-to-br from-blue-600 to-purple-700">
          {/* Content Overlay */}
          <div className="relative z-10 flex flex-col justify-center h-full p-12 text-white">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="mb-8 text-4xl font-bold">
                One Account, <span className="text-yellow-300">Endless Possibilities</span>
              </h2>
              
              <div className="mb-8 space-y-8">
                {/* Benefit 1 */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/20 rounded-xl">
                    <div className="flex">
                      <FaTasks className="text-xl text-white" />
                      <FaMoneyBillWave className="-ml-2 text-xl text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-semibold">Post & Earn Simultaneously</h3>
                    <p className="text-white/90">
                      Need help with something? Post a task. Want to earn? Help someone else. 
                      Do both with the same account!
                    </p>
                  </div>
                </div>

                {/* Benefit 2 */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/20 rounded-xl">
                    <FaHandshake className="text-2xl text-white" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-semibold">Build Community Trust</h3>
                    <p className="text-white/90">
                      Your ratings and reviews work both ways - whether you're posting tasks 
                      or helping others.
                    </p>
                  </div>
                </div>

                {/* Benefit 3 */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/20 rounded-xl">
                    <FaShieldAlt className="text-2xl text-white" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-semibold">Secure & Flexible</h3>
                    <p className="text-white/90">
                      Complete control over your interactions. Switch between posting and 
                      helping anytime.
                    </p>
                  </div>
                </div>
              </div>

              {/* How It Works */}
              <div className="p-6 mt-8 bg-white/10 backdrop-blur-sm rounded-2xl">
                <h4 className="mb-4 text-xl font-semibold">How It Works:</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center w-10 h-10 mx-auto mb-2 rounded-full bg-white/20">
                      <span className="font-bold">1</span>
                    </div>
                    <div className="text-sm">Create Account</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center w-10 h-10 mx-auto mb-2 rounded-full bg-white/20">
                      <span className="font-bold">2</span>
                    </div>
                    <div className="text-sm">Browse & Post Tasks</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center w-10 h-10 mx-auto mb-2 rounded-full bg-white/20">
                      <span className="font-bold">3</span>
                    </div>
                    <div className="text-sm">Earn & Get Help</div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 mt-8 border-t border-white/30">
                <div className="text-center">
                  <div className="text-2xl font-bold">500+</div>
                  <div className="text-sm text-white/80">Tasks Posted Weekly</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">₹10L+</div>
                  <div className="text-sm text-white/80">Total Earnings</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">95%</div>
                  <div className="text-sm text-white/80">Satisfaction Rate</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>


    </div>
  );
}