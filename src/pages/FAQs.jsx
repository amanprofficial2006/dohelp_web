import { useState } from "react";
import {
  FaQuestionCircle,
  FaChevronDown,
  FaChevronUp,
  FaSearch,
  FaComments,
  FaLightbulb,
  FaShieldAlt,
  FaStar,
  FaArrowRight,
  FaPhone,
  FaEnvelope,
  FaWhatsapp
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Questions", icon: <FaQuestionCircle /> },
    { id: "getting-started", label: "Getting Started", icon: <FaLightbulb /> },
    { id: "payments", label: "Payments", icon: <FaStar /> },
    { id: "safety", label: "Safety", icon: <FaShieldAlt /> },
    { id: "support", label: "Support", icon: <FaComments /> }
  ];

  const faqs = [
    {
      id: 1,
      category: "getting-started",
      question: "How do I post a task?",
      answer: "Click on 'Post Task' button, fill in details about what you need help with, set your budget, and publish. Helpers in your area will start contacting you within minutes. You can review their profiles and choose the best match for your needs."
    },
    {
      id: 2,
      category: "getting-started",
      question: "How do I become a helper?",
      answer: "Sign up as a helper by creating an account and completing your profile. You'll need to provide identification, skills verification, and background check. Once approved, you can start browsing and accepting tasks in your area."
    },
    {
      id: 3,
      category: "getting-started",
      question: "What types of tasks can I post?",
      answer: "You can post various tasks including home repairs, cleaning, gardening, tutoring, event help, moving assistance, tech support, and many more. Make sure your task description is clear and detailed for better responses."
    },
    {
      id: 4,
      category: "payments",
      question: "What payment methods are accepted?",
      answer: "We accept UPI, credit/debit cards, net banking, and digital wallets. All payments are secured through our escrow system - funds are held safely until you confirm the work is completed satisfactorily."
    },
    {
      id: 5,
      category: "payments",
      question: "When do I pay for the service?",
      answer: "Payment is processed through our secure escrow system. You pay upfront, but the funds are held until you approve the completed work. This protects both helpers and task posters."
    },
    {
      id: 6,
      category: "payments",
      question: "Are there any hidden fees?",
      answer: "We charge a small service fee (typically 10-15%) on completed transactions. There are no hidden fees, and all costs are clearly displayed before you confirm payment."
    },
    {
      id: 7,
      category: "safety",
      question: "How are helpers verified?",
      answer: "All helpers go through identity verification, background checks, and skill validation before they can accept tasks. We also collect reviews and ratings from previous clients to ensure quality."
    },
    {
      id: 8,
      category: "safety",
      question: "What if I'm not satisfied with the work?",
      answer: "We offer 100% satisfaction guarantee. If you're not happy with the work, contact support within 24 hours and we'll help resolve the issue. This may include finding a replacement helper or providing a refund."
    },
    {
      id: 9,
      category: "safety",
      question: "How do you ensure safety during in-person meetings?",
      answer: "We recommend meeting in public places initially, sharing location with trusted contacts, and using our in-app messaging. All users must agree to our safety guidelines, and we have a zero-tolerance policy for inappropriate behavior."
    },
    {
      id: 10,
      category: "support",
      question: "How can I contact customer support?",
      answer: "You can reach us through multiple channels: WhatsApp (+91 9876543210), email (support@DoHelp.com), phone support (Mon-Sat, 9AM-8PM), or through the contact form on our website. Average response time is 2.4 hours."
    },
    {
      id: 11,
      category: "support",
      question: "Can I cancel a task after posting it?",
      answer: "Yes, you can cancel a task before a helper accepts it. If a helper has already been assigned, please contact them directly to discuss cancellation. Refunds are processed according to our cancellation policy."
    },
    {
      id: 12,
      category: "support",
      question: "How do I leave a review for a helper?",
      answer: "After completing a task, you'll receive a notification to rate and review your experience. Reviews help other users make informed decisions and help helpers improve their services."
    }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFAQ = (id) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">

        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked <span className="text-blue-600">Questions</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about using DoHelp. Can't find what you're looking for? Contact our support team.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="relative max-w-md mx-auto">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-8"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg border transition-all flex items-center gap-2 ${
                selectedCategory === category.id
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:border-blue-300"
              }`}
            >
              {category.icon}
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* FAQ List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4 mb-12"
        >
          <AnimatePresence>
            {filteredFAQs.map((faq) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</span>
                  {expandedFAQ === faq.id ? (
                    <FaChevronUp className="text-blue-600 flex-shrink-0" />
                  ) : (
                    <FaChevronDown className="text-gray-400 flex-shrink-0" />
                  )}
                </button>

                <AnimatePresence>
                  {expandedFAQ === faq.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-6 pb-4"
                    >
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* No Results */}
        {filteredFAQs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <FaQuestionCircle className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No FAQs found</h3>
            <p className="text-gray-600">Try adjusting your search terms or browse all categories.</p>
          </motion.div>
        )}

        {/* Contact Support CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Still Need Help?</h2>
          <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
            Can't find the answer you're looking for? Our support team is here to help.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 rounded-xl bg-white text-blue-600 hover:bg-gray-100 font-semibold transition-colors flex items-center justify-center gap-2">
              <FaPhone />
              Call Support
            </button>
            <button className="px-6 py-3 rounded-xl border-2 border-white text-white hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
              <FaWhatsapp />
              WhatsApp Chat
            </button>
            <button className="px-6 py-3 rounded-xl border-2 border-white text-white hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
              <FaEnvelope />
              Email Us
            </button>
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 text-center hover:shadow-xl transition-shadow">
            <div className="p-3 bg-blue-100 rounded-xl inline-block mb-4">
              <FaLightbulb className="text-blue-600 text-2xl" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Help Center</h3>
            <p className="text-gray-600 text-sm mb-4">Browse detailed guides and tutorials</p>
            <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center justify-center gap-2">
              Visit Help Center
              <FaArrowRight />
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 text-center hover:shadow-xl transition-shadow">
            <div className="p-3 bg-green-100 rounded-xl inline-block mb-4">
              <FaShieldAlt className="text-green-600 text-2xl" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Safety Center</h3>
            <p className="text-gray-600 text-sm mb-4">Learn about our safety measures</p>
            <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center justify-center gap-2">
              View Safety Tips
              <FaArrowRight />
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 text-center hover:shadow-xl transition-shadow">
            <div className="p-3 bg-purple-100 rounded-xl inline-block mb-4">
              <FaComments className="text-purple-600 text-2xl" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Community</h3>
            <p className="text-gray-600 text-sm mb-4">Connect with other users</p>
            <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center justify-center gap-2">
              Join Community
              <FaArrowRight />
            </button>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
