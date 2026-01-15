import { useState } from "react";
import { 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaClock,
  FaPaperPlane,
  FaHeadset,
  FaWhatsapp,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaCheckCircle,
  FaUser,
  FaComments,
  FaLightbulb,
  FaShieldAlt,
  FaArrowRight,
  FaStar
} from "react-icons/fa";
import { motion } from "framer-motion";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    category: "general"
  });

  const [submitted, setSubmitted] = useState(false);

  const contactInfo = [
    {
      icon: <FaPhone className="text-2xl" />,
      title: "Phone Support",
      details: ["+91 9876543210", "+91 9876543211"],
      description: "Mon-Sat, 9AM-8PM",
      color: "from-blue-500 to-cyan-500",
      action: "Call Now"
    },
    {
      icon: <FaWhatsapp className="text-2xl" />,
      title: "WhatsApp",
      details: ["+91 9876543210"],
      description: "24/7 Quick Response",
      color: "from-green-500 to-emerald-500",
      action: "Message on WhatsApp"
    },
    {
      icon: <FaEnvelope className="text-2xl" />,
      title: "Email",
      details: ["support@DoHelp.com", "hello@DoHelp.com"],
      description: "Response within 24 hours",
      color: "from-purple-500 to-pink-500",
      action: "Send Email"
    },
    {
      icon: <FaHeadset className="text-2xl" />,
      title: "Live Chat",
      details: ["Available on website"],
      description: "Instant support during business hours",
      color: "from-orange-500 to-red-500",
      action: "Start Chat"
    }
  ];

  const officeLocations = [
    {
      city: "Mumbai",
      address: "123 Business Center, Andheri West, Mumbai 400053",
      phone: "+91 22 12345678",
      hours: "Mon-Fri: 9AM-6PM, Sat: 10AM-4PM",
      email: "mumbai@DoHelp.com"
    },
    {
      city: "Delhi",
      address: "456 Corporate Park, Connaught Place, Delhi 110001",
      phone: "+91 11 87654321",
      hours: "Mon-Fri: 9AM-6PM, Sat: 10AM-4PM",
      email: "delhi@DoHelp.com"
    },
    {
      city: "Bangalore",
      address: "789 Tech Park, Koramangala, Bangalore 560034",
      phone: "+91 80 23456789",
      hours: "Mon-Fri: 9AM-6PM, Sat: 10AM-4PM",
      email: "bangalore@DoHelp.com"
    }
  ];

  const faqs = [
    {
      question: "How do I post a task?",
      answer: "Click on 'Post Task' button, fill in details, set your budget, and publish. Helpers will start contacting you within minutes."
    },
    {
      question: "What payment methods are accepted?",
      answer: "We accept UPI, credit/debit cards, net banking, and digital wallets. All payments are secured through escrow."
    },
    {
      question: "How are helpers verified?",
      answer: "All helpers go through identity verification, background checks, and skill validation before they can accept tasks."
    },
    {
      question: "What if I'm not satisfied with the work?",
      answer: "We offer 100% satisfaction guarantee. Contact support within 24 hours and we'll help resolve the issue."
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        category: "general"
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen p-4 bg-linear-to-b from-gray-50 to-blue-50 md:p-6">
      <div className="mx-auto max-w-7xl">
        
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
            Get in <span className="text-blue-600">Touch</span>
          </h1>
          <p className="max-w-3xl mx-auto text-xl text-gray-600">
            We're here to help! Contact us for any questions, feedback, or support you need.
          </p>
        </motion.div>

        {/* Contact Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 gap-6 mb-12 md:grid-cols-2 lg:grid-cols-4"
        >
          {contactInfo.map((info, index) => (
            <div
              key={index}
              className="p-6 transition-shadow bg-white border border-gray-200 shadow-lg rounded-2xl hover:shadow-xl"
            >
              <div className={`w-14 h-14 rounded-xl bg-linear-to-br ${info.color} flex items-center justify-center text-white mb-4`}>
                {info.icon}
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">{info.title}</h3>
              <div className="mb-4 space-y-2">
                {info.details.map((detail, idx) => (
                  <div key={idx} className="text-gray-700">{detail}</div>
                ))}
              </div>
              <div className="mb-4 text-sm text-gray-500">{info.description}</div>
              <button className={`w-full py-2 rounded-lg bg-linear-to-r ${info.color} text-white hover:opacity-90 transition-opacity`}>
                {info.action}
              </button>
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column - Contact Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="overflow-hidden bg-white border border-gray-200 shadow-lg rounded-2xl"
            >
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-linear-to-r from-blue-500 to-purple-500 rounded-xl">
                    <FaPaperPlane className="text-2xl text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Send us a Message</h2>
                    <p className="text-gray-600">We'll get back to you within 24 hours</p>
                  </div>
                </div>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center"
                  >
                    <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 text-3xl text-white rounded-full bg-linear-to-r from-green-500 to-emerald-500">
                      <FaCheckCircle />
                    </div>
                    <h3 className="mb-3 text-2xl font-bold text-gray-900">Message Sent!</h3>
                    <p className="mb-6 text-gray-600">
                      Thank you for contacting us. Our team will get back to you soon.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-3 text-blue-600 transition-colors border border-blue-500 rounded-xl hover:bg-blue-50"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          <span className="flex items-center gap-2">
                            <FaUser />
                            Your Name
                          </span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter your name"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>

                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          <span className="flex items-center gap-2">
                            <FaEnvelope />
                            Email Address
                          </span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your@email.com"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>

                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          <span className="flex items-center gap-2">
                            <FaPhone />
                            Phone Number
                          </span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+91 9876543210"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Inquiry Category
                        </label>
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="general">General Inquiry</option>
                          <option value="support">Technical Support</option>
                          <option value="billing">Billing & Payments</option>
                          <option value="safety">Safety Concerns</option>
                          <option value="feedback">Feedback & Suggestions</option>
                          <option value="partnership">Business Partnership</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Subject
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="What is this regarding?"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Your Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows="6"
                        placeholder="Please describe your inquiry in detail..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        We respect your privacy and will never share your information
                      </div>
                      <button
                        type="submit"
                        className="flex items-center gap-2 px-8 py-3 text-white transition-all shadow-lg rounded-xl bg-linear-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 hover:shadow-xl"
                      >
                        <FaPaperPlane />
                        Send Message
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Office Locations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8"
            >
              <h2 className="mb-6 text-2xl font-bold text-gray-900">Our Offices</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {officeLocations.map((office, index) => (
                  <div
                    key={index}
                    className="p-6 bg-white border border-gray-200 shadow-lg rounded-2xl"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <FaMapMarkerAlt className="text-blue-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">{office.city}</h3>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <FaMapMarkerAlt className="mt-1 text-gray-400" />
                        <span className="text-gray-700">{office.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaPhone className="text-gray-400" />
                        <span className="text-gray-700">{office.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaClock className="text-gray-400" />
                        <span className="text-gray-700">{office.hours}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaEnvelope className="text-gray-400" />
                        <span className="text-gray-700">{office.email}</span>
                      </div>
                    </div>
                    
                    <button className="w-full py-2 mt-6 text-blue-600 transition-colors border border-blue-500 rounded-lg hover:bg-blue-50">
                      Get Directions
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - FAQ & Info */}
          <div className="space-y-8">
            {/* FAQ Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 bg-white border border-gray-200 shadow-lg rounded-2xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-linear-to-r from-green-500 to-emerald-500 rounded-xl">
                  <FaComments className="text-2xl text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">FAQ</h2>
                  <p className="text-gray-600">Common questions answered</p>
                </div>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="p-4 transition-colors border border-gray-200 rounded-xl hover:border-blue-300"
                  >
                    <h3 className="mb-2 font-bold text-gray-900">{faq.question}</h3>
                    <p className="text-sm text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>

              <button className="flex items-center justify-center w-full gap-2 py-3 mt-6 text-blue-600 transition-colors border border-blue-500 rounded-lg hover:bg-blue-50">
                View All FAQs
                <FaArrowRight />
              </button>
            </motion.div>

            {/* Support Resources */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="p-6 text-white bg-linear-to-br from-blue-600 to-purple-600 rounded-2xl"
            >
              <h2 className="mb-6 text-2xl font-bold">Support Resources</h2>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 transition-colors cursor-pointer rounded-xl bg-white/10 hover:bg-white/20">
                  <FaLightbulb className="text-2xl text-yellow-300" />
                  <div>
                    <div className="font-semibold">Help Center</div>
                    <div className="text-sm opacity-90">Browse articles & tutorials</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 transition-colors cursor-pointer rounded-xl bg-white/10 hover:bg-white/20">
                  <FaShieldAlt className="text-2xl text-green-300" />
                  <div>
                    <div className="font-semibold">Safety Center</div>
                    <div className="text-sm opacity-90">Safety tips & guidelines</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 transition-colors cursor-pointer rounded-xl bg-white/10 hover:bg-white/20">
                  <FaStar className="text-2xl text-yellow-300" />
                  <div>
                    <div className="font-semibold">Community Forum</div>
                    <div className="text-sm opacity-90">Connect with other users</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Social Media */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="p-6 bg-white border border-gray-200 shadow-lg rounded-2xl"
            >
              <h2 className="mb-6 text-xl font-bold text-center text-gray-900">
                Connect With Us
              </h2>
              
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: <FaFacebook className="text-blue-600" />, label: "Facebook", color: "hover:bg-blue-50" },
                  { icon: <FaTwitter className="text-sky-500" />, label: "Twitter", color: "hover:bg-sky-50" },
                  { icon: <FaInstagram className="text-pink-600" />, label: "Instagram", color: "hover:bg-pink-50" },
                  { icon: <FaLinkedin className="text-blue-700" />, label: "LinkedIn", color: "hover:bg-blue-50" },
                  { icon: <FaWhatsapp className="text-green-600" />, label: "WhatsApp", color: "hover:bg-green-50" },
                  { icon: <FaEnvelope className="text-red-500" />, label: "Newsletter", color: "hover:bg-red-50" },
                ].map((social, index) => (
                  <button
                    key={index}
                    className={`p-4 rounded-xl border border-gray-200 ${social.color} transition-colors flex flex-col items-center gap-2`}
                  >
                    <div className="text-2xl">{social.icon}</div>
                    <span className="text-sm font-medium text-gray-900">{social.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Response Time Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="p-6 border border-green-200 bg-linear-to-r from-green-50 to-emerald-50 rounded-2xl"
            >
              <div className="text-center">
                <div className="mb-2 text-4xl font-bold text-gray-900">2.4 hrs</div>
                <div className="font-medium text-gray-700">Average Response Time</div>
                <div className="mt-2 text-sm text-gray-600">
                  We pride ourselves on quick responses to all inquiries
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12"
        >
          <div className="overflow-hidden bg-white border border-gray-200 shadow-lg rounded-2xl">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Find Us on Map</h2>
              <p className="text-gray-600">Visit our headquarters or find the nearest office</p>
            </div>
            
            <div className="relative h-96 bg-linear-to-r from-blue-100 to-cyan-100">
              {/* Map Placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <FaMapMarkerAlt className="mx-auto mb-4 text-4xl text-blue-500 animate-bounce" />
                  <div className="max-w-md p-6 mx-auto bg-white/90 backdrop-blur-sm rounded-xl">
                    <h3 className="mb-2 font-bold text-gray-900">Our Headquarters</h3>
                    <p className="text-gray-700">123 Business Center, Andheri West, Mumbai 400053</p>
                    <button className="px-4 py-2 mt-4 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700">
                      Open in Maps
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Map Markers */}
              {officeLocations.map((office, index) => (
                <div
                  key={index}
                  className="absolute"
                  style={{
                    left: `${20 + index * 30}%`,
                    top: `${30 + index * 10}%`
                  }}
                >
                  <div className="relative">
                    <div className="flex items-center justify-center w-8 h-8 text-white bg-red-500 border-4 border-white rounded-full shadow-lg">
                      {index + 1}
                    </div>
                    <div className="absolute hidden p-3 mt-2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg top-full left-1/2 min-w-50 group-hover:block">
                      <div className="font-bold text-gray-900">{office.city}</div>
                      <div className="text-sm text-gray-600">{office.address}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-12 text-center"
        >
          <div className="p-12 text-white bg-linear-to-r from-blue-600 to-purple-600 rounded-2xl">
            <h2 className="mb-4 text-3xl font-bold">Still Have Questions?</h2>
            <p className="max-w-2xl mx-auto mb-8 text-xl opacity-90">
              Our dedicated support team is ready to help you with any questions or concerns.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <button className="flex items-center justify-center gap-2 px-8 py-3 font-semibold text-blue-600 transition-colors bg-white rounded-xl hover:bg-gray-100">
                <FaPhone />
                Call Support Now
              </button>
              <button className="flex items-center justify-center gap-2 px-8 py-3 text-white transition-colors border-2 border-white rounded-xl hover:bg-white/10">
                <FaWhatsapp />
                Chat on WhatsApp
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}