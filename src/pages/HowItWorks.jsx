import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaBullhorn, FaSearch, FaCheckCircle, FaArrowRight,
  FaShieldAlt, FaUsers, FaClock, FaMoneyBillWave,
  FaMapMarkerAlt, FaStar, FaHandshake, FaRocket
} from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Post a Task",
      description: "Describe what you need help with. Set your budget and location. Be specific about requirements and timeline.",
      icon: <FaBullhorn className="text-2xl" />,
      color: "from-blue-500 to-cyan-500",
      details: [
        "Choose from popular categories or create custom task",
        "Set your preferred budget and deadline",
        "Add photos or attachments if needed",
        "Specify location and preferred time"
      ]
    },
    {
      number: "2",
      title: "Find Helpers",
      description: "Browse offers from verified helpers nearby. Compare ratings, reviews, and prices to choose the best match.",
      icon: <FaSearch className="text-2xl" />,
      color: "from-purple-500 to-pink-500",
      details: [
        "Receive notifications when helpers apply",
        "View helper profiles, ratings, and reviews",
        "Compare offers and negotiate terms",
        "Chat directly with potential helpers"
      ]
    },
    {
      number: "3",
      title: "Get it Done",
      description: "Choose the best helper. Pay securely only when satisfied. Rate and review after completion.",
      icon: <FaCheckCircle className="text-2xl" />,
      color: "from-green-500 to-emerald-500",
      details: [
        "Select and confirm your helper",
        "Secure payment held in escrow",
        "Track progress and communicate",
        "Release payment only when satisfied"
      ]
    }
  ];

  const features = [
    {
      icon: <FaShieldAlt />,
      title: "Secure Payments",
      description: "All payments are held in escrow until you confirm the work is completed satisfactorily."
    },
    {
      icon: <FaUsers />,
      title: "Verified Helpers",
      description: "All helpers undergo identity verification and background checks for your safety."
    },
    {
      icon: <FaClock />,
      title: "Quick Response",
      description: "Most tasks receive offers within minutes, with completion often within hours."
    },
    {
      icon: <FaMoneyBillWave />,
      title: "Flexible Pricing",
      description: "Set your own budget or get competitive offers from multiple helpers."
    }
  ];

  const tips = [
    {
      title: "Write Clear Descriptions",
      content: "The more specific you are about what you need, the better offers you'll receive from qualified helpers."
    },
    {
      title: "Check Reviews First",
      content: "Always review helper ratings and past work before making your selection."
    },
    {
      title: "Communicate Clearly",
      content: "Use the in-app messaging to discuss details, timelines, and expectations before starting work."
    },
    {
      title: "Be Respectful",
      content: "Treat helpers with respect and pay promptly upon satisfactory completion."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-12">

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 px-6 py-2 rounded-full mb-6">
            <FaRocket className="text-blue-600" />
            <span className="font-semibold text-blue-600">How It Works</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Simple Steps to <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Get Help</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Getting help has never been easier. Follow these three simple steps to connect with
            trusted helpers in your community and get your tasks done quickly and safely.
          </p>
        </motion.div>

        {/* Steps Section */}
        <div className="mb-20">
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="relative group"
              >
                {/* Connecting Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 left-3/4 w-full h-1 bg-gradient-to-r from-blue-200 to-purple-200 z-0 group-hover:from-blue-300 group-hover:to-purple-300 transition-all"></div>
                )}

                <div className="relative bg-gradient-to-br from-white to-gray-50 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 z-10">
                  <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white text-3xl font-bold shadow-lg`}>
                    {step.number}
                  </div>

                  <div className="mt-10 mb-6 flex justify-center">
                    <div className={`p-6 rounded-2xl bg-gradient-to-br ${step.color} text-white text-4xl`}>
                      {step.icon}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-center mb-6">
                    {step.description}
                  </p>

                  <div className="space-y-2">
                    {step.details.map((detail, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></div>
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
            Why Choose <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">DoHelp</span>?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
            Tips for <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Success</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {tips.map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-3">
                  <FaCheckCircle className="text-green-600" />
                  {tip.title}
                </h3>
                <p className="text-gray-700">{tip.content}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white text-center"
        >
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto leading-relaxed mb-8">
            Join thousands of users who are already getting help and earning money through our platform.
            It's free to join and start posting tasks or offering your services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="inline-flex items-center gap-3 bg-white text-blue-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <span>Sign Up Free</span>
              <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
            </Link>
            <Link
              to="/tasks"
              className="inline-flex items-center gap-3 bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300"
            >
              <FaSearch />
              <span>Browse Tasks</span>
            </Link>
          </div>
          <p className="text-sm opacity-75 mt-6">
            No credit card required • Free to join • Start immediately
          </p>
        </motion.div>

      </div>
    </div>
  );
}
