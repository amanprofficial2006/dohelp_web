import { useState } from "react";
import {
  FaShieldAlt,
  FaUserCheck,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaLock,
  FaEye,
  FaHandshake,
  FaExclamationTriangle,
  FaCheckCircle,
  FaStar,
  FaComments,
  FaArrowRight,
  FaHeart,
  FaClock,
  FaUsers
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function Safety() {
  const [activeTab, setActiveTab] = useState("overview");

  const safetyTips = [
    {
      icon: <FaUserCheck />,
      title: "Verify Identities",
      description: "All helpers are verified with ID checks, background screening, and skill validation before they can accept tasks."
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Meet in Public",
      description: "For in-person tasks, choose public locations initially. Share your location with trusted contacts and use our in-app tracking."
    },
    {
      icon: <FaComments />,
      title: "Use In-App Communication",
      description: "Keep all communication within the app. Never share personal contact information until you feel completely comfortable."
    },
    {
      icon: <FaLock />,
      title: "Secure Payments",
      description: "All payments go through our secure escrow system. Funds are held until you confirm satisfactory completion."
    },
    {
      icon: <FaEye />,
      title: "Trust Your Instincts",
      description: "If something feels off, don't proceed. You can cancel tasks at any time and report concerns to our safety team."
    },
    {
      icon: <FaStar />,
      title: "Check Reviews",
      description: "Review ratings and feedback from previous clients. Look for consistent positive experiences and verified badges."
    }
  ];

  const emergencyContacts = [
    { name: "Emergency Services", number: "112", description: "For immediate danger" },
    { name: "Police", number: "100", description: "Local police station" },
    { name: "Women Helpline", number: "181", description: "24/7 support for women" },
    { name: "DoHelp Safety Team", number: "+91 9876543210", description: "Our 24/7 safety support" }
  ];

  const verificationSteps = [
    "Identity verification with government ID",
    "Address confirmation",
    "Background check (criminal records)",
    "Skill validation through testing",
    "Reference checks from previous clients",
    "Regular performance monitoring"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">

        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <FaShieldAlt className="text-green-600 text-3xl" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Your <span className="text-green-600">Safety</span> First
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We prioritize your safety with comprehensive verification, secure systems, and 24/7 support.
            Learn how we protect our community members.
          </p>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-12 bg-white rounded-xl p-2 shadow-lg"
        >
          {[
            { id: "overview", label: "Overview", icon: <FaShieldAlt /> },
            { id: "verification", label: "Verification", icon: <FaUserCheck /> },
            { id: "tips", label: "Safety Tips", icon: <FaExclamationTriangle /> },
            { id: "meetings", label: "Safe Meetings", icon: <FaHandshake /> },
            { id: "emergency", label: "Emergency", icon: <FaPhone /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? "bg-green-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">99.8%</div>
                  <div className="text-gray-600">Verified Users</div>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
                  <div className="text-gray-600">Safety Support</div>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">50K+</div>
                  <div className="text-gray-600">Safe Transactions</div>
                </div>
              </div>

              {/* Overview Content */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Safety Commitment</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <FaCheckCircle className="text-green-600" />
                      What We Do
                    </h3>
                    <ul className="space-y-3 text-gray-600">
                      <li className="flex items-start gap-3">
                        <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                        Rigorous background checks for all users
                      </li>
                      <li className="flex items-start gap-3">
                        <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                        Secure escrow payment system
                      </li>
                      <li className="flex items-start gap-3">
                        <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                        Real-time location sharing
                      </li>
                      <li className="flex items-start gap-3">
                        <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                        24/7 safety monitoring
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <FaHeart className="text-red-600" />
                      Community Guidelines
                    </h3>
                    <ul className="space-y-3 text-gray-600">
                      <li className="flex items-start gap-3">
                        <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                        Zero tolerance for harassment
                      </li>
                      <li className="flex items-start gap-3">
                        <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                        Respectful communication required
                      </li>
                      <li className="flex items-start gap-3">
                        <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                        Professional conduct expected
                      </li>
                      <li className="flex items-start gap-3">
                        <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                        Immediate reporting of concerns
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "verification" && (
            <motion.div
              key="verification"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <FaUserCheck className="text-blue-600" />
                Helper Verification Process
              </h2>
              <p className="text-gray-600 mb-8">
                Every helper goes through a comprehensive verification process to ensure your safety and peace of mind.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {verificationSteps.map((step, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-gray-900 font-medium">{step}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-blue-50 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Verification Badges</h3>
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">ID Verified</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">Background Checked</span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">Skills Certified</span>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">Top Rated</span>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "tips" && (
            <motion.div
              key="tips"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {safetyTips.map((tip, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 text-green-600">
                    {tip.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{tip.title}</h3>
                  <p className="text-gray-600">{tip.description}</p>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === "meetings" && (
            <motion.div
              key="meetings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <FaHandshake className="text-purple-600" />
                  Safe Meeting Guidelines
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Before Meeting</h3>
                    <ul className="space-y-3 text-gray-600">
                      <li className="flex items-start gap-3">
                        <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                        Share meeting details with trusted contacts
                      </li>
                      <li className="flex items-start gap-3">
                        <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                        Enable location sharing in the app
                      </li>
                      <li className="flex items-start gap-3">
                        <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                        Verify helper's identity in person
                      </li>
                      <li className="flex items-start gap-3">
                        <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                        Choose well-lit, public locations
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">During Meeting</h3>
                    <ul className="space-y-3 text-gray-600">
                      <li className="flex items-start gap-3">
                        <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                        Keep communication open with contacts
                      </li>
                      <li className="flex items-start gap-3">
                        <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                        Trust your instincts - leave if uncomfortable
                      </li>
                      <li className="flex items-start gap-3">
                        <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                        Document the work with photos if needed
                      </li>
                      <li className="flex items-start gap-3">
                        <FaCheckCircle className="text-green-600 mt-1 flex-shrink-0" />
                        Complete payment only after satisfaction
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
                <div className="flex items-start gap-4">
                  <FaExclamationTriangle className="text-yellow-600 text-2xl flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Important Reminder</h3>
                    <p className="text-gray-700">
                      Never meet in private residences without proper precautions. Always prioritize your personal safety and comfort.
                      If you feel unsafe at any point, contact emergency services immediately and report the incident to our safety team.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "emergency" && (
            <motion.div
              key="emergency"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <FaPhone className="text-red-600" />
                  Emergency Contacts & Support
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {emergencyContacts.map((contact, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-red-300 transition-colors">
                      <h3 className="font-semibold text-gray-900 mb-1">{contact.name}</h3>
                      <p className="text-red-600 font-bold text-lg mb-1">{contact.number}</p>
                      <p className="text-gray-600 text-sm">{contact.description}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <FaClock className="text-red-600" />
                    24/7 Safety Support
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Our dedicated safety team is available around the clock to assist you with any concerns.
                    Don't hesitate to reach out - your safety is our highest priority.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
                      Call Safety Team
                    </button>
                    <button className="px-6 py-3 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-medium">
                      Report Incident
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Report Incident CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-8 text-white text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Need Immediate Help?</h2>
          <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
            If you're in danger or need urgent assistance, contact emergency services immediately.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 rounded-xl bg-white text-red-600 hover:bg-gray-100 font-bold text-lg transition-colors flex items-center justify-center gap-3">
              <FaPhone />
              Emergency: 112
            </button>
            <button className="px-8 py-4 rounded-xl border-2 border-white text-white hover:bg-white/10 transition-colors font-bold text-lg flex items-center justify-center gap-3">
              <FaComments />
              Contact Safety Team
            </button>
          </div>
        </motion.div>

        {/* Community Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 text-center hover:shadow-xl transition-shadow">
            <div className="p-3 bg-blue-100 rounded-xl inline-block mb-4">
              <FaUsers className="text-blue-600 text-2xl" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Community Guidelines</h3>
            <p className="text-gray-600 text-sm mb-4">Learn about our community standards</p>
            <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center justify-center gap-2">
              View Guidelines
              <FaArrowRight />
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 text-center hover:shadow-xl transition-shadow">
            <div className="p-3 bg-green-100 rounded-xl inline-block mb-4">
              <FaShieldAlt className="text-green-600 text-2xl" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Safety Resources</h3>
            <p className="text-gray-600 text-sm mb-4">Additional safety information</p>
            <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center justify-center gap-2">
              Browse Resources
              <FaArrowRight />
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 text-center hover:shadow-xl transition-shadow">
            <div className="p-3 bg-purple-100 rounded-xl inline-block mb-4">
              <FaComments className="text-purple-600 text-2xl" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Support Community</h3>
            <p className="text-gray-600 text-sm mb-4">Connect with other users</p>
            <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center justify-center gap-2">
              Join Discussion
              <FaArrowRight />
            </button>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
