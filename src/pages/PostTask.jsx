import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaBullhorn, 
  FaMoneyBillWave, 
  FaMapMarkerAlt, 
  FaCalendarAlt,
  FaClock,
  FaTags,
  FaCamera,
  FaPaperclip,
  FaExclamationCircle,
  FaCheckCircle,
  FaTimesCircle,
  FaInfoCircle,
  FaTruck,
  FaBroom,
  FaLaptop,
  FaShoppingBag,
  FaHandshake,
  FaUsers,
  FaStar,
  FaRupeeSign,
  FaUpload,
  FaPlusCircle,
  FaMinusCircle,
  FaPercent,
  FaShieldAlt
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function PostTask() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    budgetType: "fixed",
    amount: "",
    location: "",
    address: "",
    deadline: "",
    urgency: "normal",
    duration: "",
    skillsRequired: [],
    additionalInfo: "",
    contactPreference: "message",
    privacy: "public"
  });

  const categories = [
    { icon: <FaTruck />, name: "Delivery", color: "from-blue-500 to-cyan-500" },
    { icon: <FaBroom />, name: "Cleaning", color: "from-green-500 to-emerald-500" },
    { icon: <FaLaptop />, name: "Online Help", color: "from-purple-500 to-pink-500" },
    { icon: <FaShoppingBag />, name: "Errands", color: "from-orange-500 to-red-500" },
    { icon: <FaHandshake />, name: "Handyman", color: "from-amber-500 to-yellow-500" },
    { icon: <FaUsers />, name: "Tutoring", color: "from-indigo-500 to-blue-500" },
  ];

  const skills = [
    "Driving", "Cleaning", "Cooking", "Teaching", "Technical", "Creative",
    "Organizational", "Physical Labor", "Customer Service", "Language Skills"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSkillToggle = (skill) => {
    setFormData(prev => ({
      ...prev,
      skillsRequired: prev.skillsRequired.includes(skill)
        ? prev.skillsRequired.filter(s => s !== skill)
        : [...prev.skillsRequired, skill]
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.slice(0, 5 - images.length);
    setImages(prev => [...prev, ...newImages]);
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const calculateDeadline = (urgency) => {
    const today = new Date();
    const deadline = new Date(today);
    
    switch(urgency) {
      case "urgent":
        deadline.setHours(today.getHours() + 6);
        return deadline.toISOString().slice(0, 16);
      case "today":
        deadline.setDate(today.getDate() + 1);
        return deadline.toISOString().slice(0, 16);
      case "tomorrow":
        deadline.setDate(today.getDate() + 2);
        return deadline.toISOString().slice(0, 16);
      case "week":
        deadline.setDate(today.getDate() + 7);
        return deadline.toISOString().slice(0, 16);
      default:
        return "";
    }
  };

  const handleUrgencyChange = (urgency) => {
    setFormData(prev => ({
      ...prev,
      urgency,
      deadline: calculateDeadline(urgency)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      navigate("/my-tasks");
    }, 2000);
  };

  const steps = [
    { number: 1, title: "Task Details", icon: <FaBullhorn /> },
    { number: 2, title: "Budget & Time", icon: <FaMoneyBillWave /> },
    { number: 3, title: "Location", icon: <FaMapMarkerAlt /> },
    { number: 4, title: "Review & Post", icon: <FaCheckCircle /> },
  ];

  const getCategoryColor = (categoryName) => {
    const category = categories.find(c => c.name === categoryName);
    return category ? category.color : "from-gray-500 to-gray-600";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Post a Task</h1>
              <p className="text-gray-600">
                Get help from trusted helpers in your community
              </p>
            </div>
            
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>

          {/* Progress Steps */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-6"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {steps.map((s) => (
                <div
                  key={s.number}
                  className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${
                    step === s.number
                      ? "border-blue-300 bg-blue-50"
                      : step > s.number
                      ? "border-green-300 bg-green-50"
                      : "border-gray-200"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step === s.number
                      ? "bg-blue-600 text-white"
                      : step > s.number
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}>
                    {step > s.number ? <FaCheckCircle /> : s.icon}
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Step {s.number}</div>
                    <div className="font-medium text-gray-900">{s.title}</div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Progress Bar */}
            <div className="mt-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Progress</span>
                <span>{Math.round((step / steps.length) * 100)}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: `${(step / steps.length) * 100}%` }}
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Form */}
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
        >
          <form onSubmit={handleSubmit}>
            <div className="p-6 md:p-8">
              <AnimatePresence mode="wait">
                {/* Step 1: Task Details */}
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <label className="block text-lg font-semibold text-gray-900 mb-2">
                        What do you need help with?
                      </label>
                      <input
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="e.g., Grocery delivery, Home cleaning, Tutoring"
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                        required
                      />
                    </div>

                    {/* Category Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        <span className="flex items-center gap-2">
                          <FaTags />
                          Select Category
                        </span>
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {categories.map((category) => (
                          <button
                            key={category.name}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, category: category.name }))}
                            className={`p-4 rounded-xl border-2 transition-all ${
                              formData.category === category.name
                                ? "border-blue-500 bg-gradient-to-r bg-opacity-10"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <div className="flex flex-col items-center gap-2">
                              <div className={`p-3 rounded-lg bg-gradient-to-br ${category.color} text-white`}>
                                {category.icon}
                              </div>
                              <span className="font-medium text-gray-900">{category.name}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Describe the task in detail
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows="6"
                        placeholder="Provide clear details about what needs to be done, any specific requirements, materials needed, etc."
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    {/* Image Upload */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        <span className="flex items-center gap-2">
                          <FaCamera />
                          Add Photos (Optional)
                        </span>
                        <span className="text-xs text-gray-500">Upload up to 5 photos to help helpers understand the task better</span>
                      </label>
                      
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {/* Image Upload Button */}
                        <label className={`aspect-square rounded-xl border-2 border-dashed ${
                          images.length < 5 
                            ? "border-blue-300 hover:border-blue-400 cursor-pointer bg-blue-50"
                            : "border-gray-300 bg-gray-100"
                        } flex flex-col items-center justify-center transition-colors`}>
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageUpload}
                            className="hidden"
                            disabled={images.length >= 5}
                          />
                          <FaUpload className="text-2xl text-gray-400 mb-2" />
                          <span className="text-sm text-gray-600">Upload</span>
                          <span className="text-xs text-gray-500">{images.length}/5</span>
                        </label>

                        {/* Preview Images */}
                        {images.map((image, index) => (
                          <div key={index} className="relative aspect-square rounded-xl overflow-hidden border border-gray-200">
                            <img
                              src={URL.createObjectURL(image)}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                            >
                              <FaTimesCircle className="text-sm" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Budget & Time */}
                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    {/* Budget Type */}
                    <div>
                      <label className="block text-lg font-semibold text-gray-900 mb-4">
                        What's your budget?
                      </label>
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, budgetType: "fixed" }))}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            formData.budgetType === "fixed"
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div className="flex flex-col items-center gap-2">
                            <FaRupeeSign className="text-2xl text-green-500" />
                            <span className="font-medium text-gray-900">Fixed Price</span>
                            <span className="text-sm text-gray-600">Know exactly what you'll pay</span>
                          </div>
                        </button>
                        
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, budgetType: "hourly" }))}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            formData.budgetType === "hourly"
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div className="flex flex-col items-center gap-2">
                            <FaClock className="text-2xl text-blue-500" />
                            <span className="font-medium text-gray-900">Hourly Rate</span>
                            <span className="text-sm text-gray-600">Pay by the hour</span>
                          </div>
                        </button>
                      </div>

                      {/* Amount Input */}
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaRupeeSign className="text-gray-400" />
                        </div>
                        <input
                          name="amount"
                          type="number"
                          value={formData.amount}
                          onChange={handleInputChange}
                          placeholder={formData.budgetType === "fixed" ? "Enter total amount" : "Enter hourly rate"}
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                          required
                        />
                      </div>
                    </div>

                    {/* Urgency */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        <span className="flex items-center gap-2">
                          <FaExclamationCircle />
                          How urgent is this task?
                        </span>
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {[
                          { level: "urgent", label: "Urgent", time: "Within 6 hours", color: "bg-red-100 text-red-700 border-red-300" },
                          { level: "today", label: "Today", time: "Within 24 hours", color: "bg-orange-100 text-orange-700 border-orange-300" },
                          { level: "tomorrow", label: "Tomorrow", time: "Next day", color: "bg-yellow-100 text-yellow-700 border-yellow-300" },
                          { level: "week", label: "This Week", time: "Within 7 days", color: "bg-blue-100 text-blue-700 border-blue-300" },
                        ].map((urgency) => (
                          <button
                            key={urgency.level}
                            type="button"
                            onClick={() => handleUrgencyChange(urgency.level)}
                            className={`p-4 rounded-xl border-2 transition-all text-left ${
                              formData.urgency === urgency.level
                                ? `${urgency.color} border-2`
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <div className="font-medium">{urgency.label}</div>
                            <div className="text-sm mt-1">{urgency.time}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Duration */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <span className="flex items-center gap-2">
                          <FaClock />
                          Estimated Duration
                        </span>
                      </label>
                      <select
                        name="duration"
                        value={formData.duration}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select duration</option>
                        <option value="1">1 hour or less</option>
                        <option value="2">1-2 hours</option>
                        <option value="4">2-4 hours</option>
                        <option value="8">4-8 hours</option>
                        <option value="full-day">Full day</option>
                        <option value="multiple">Multiple days</option>
                      </select>
                    </div>

                    {/* Deadline */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <span className="flex items-center gap-2">
                          <FaCalendarAlt />
                          Deadline
                        </span>
                      </label>
                      <input
                        type="datetime-local"
                        name="deadline"
                        value={formData.deadline}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Location */}
                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <label className="block text-lg font-semibold text-gray-900 mb-2">
                        Where does this task need to be done?
                      </label>
                      <p className="text-gray-600 mb-4">
                        Helpers will use this information to find tasks near them
                      </p>
                      
                      {/* Location Input */}
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <span className="flex items-center gap-2">
                              <FaMapMarkerAlt />
                              City / Area
                            </span>
                          </label>
                          <input
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            placeholder="e.g., Andheri West, Mumbai"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Full Address (Optional)
                          </label>
                          <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            rows="3"
                            placeholder="Provide exact address if needed. This will be shared only with selected helper."
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>

                      {/* Map Preview (Placeholder) */}
                      <div className="mt-6">
                        <div className="h-48 rounded-xl bg-gradient-to-r from-blue-100 to-cyan-100 border border-blue-200 flex items-center justify-center">
                          <div className="text-center">
                            <FaMapMarkerAlt className="text-3xl text-blue-500 mx-auto mb-3" />
                            <p className="text-gray-700">Map will show your selected location</p>
                            <p className="text-sm text-gray-500 mt-1">Address is shared only after helper selection</p>
                          </div>
                        </div>
                      </div>

                      {/* Skills Required */}
                      <div className="mt-8">
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          <span className="flex items-center gap-2">
                            <FaStar />
                            Skills Required (Optional)
                          </span>
                          <span className="text-xs text-gray-500">Select skills that would be helpful for this task</span>
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {skills.map((skill) => (
                            <button
                              key={skill}
                              type="button"
                              onClick={() => handleSkillToggle(skill)}
                              className={`px-4 py-2 rounded-full text-sm transition-all ${
                                formData.skillsRequired.includes(skill)
                                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                              }`}
                            >
                              {skill}
                              {formData.skillsRequired.includes(skill) && (
                                <FaCheckCircle className="inline ml-2" />
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Review & Post */}
                {step === 4 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                        Review Your Task
                      </h2>
                      
                      {/* Task Summary */}
                      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200 mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="font-bold text-gray-900 text-lg mb-2">{formData.title}</h3>
                            <div className="flex items-center gap-2 mb-3">
                              <span className={`px-3 py-1 rounded-full text-sm bg-gradient-to-r ${getCategoryColor(formData.category)} text-white`}>
                                {formData.category}
                              </span>
                              <span className={`px-3 py-1 rounded-full text-sm ${
                                formData.urgency === "urgent" ? "bg-red-100 text-red-700" :
                                formData.urgency === "today" ? "bg-orange-100 text-orange-700" :
                                formData.urgency === "tomorrow" ? "bg-yellow-100 text-yellow-700" :
                                "bg-blue-100 text-blue-700"
                              }`}>
                                {formData.urgency}
                              </span>
                            </div>
                            <p className="text-gray-700">{formData.description}</p>
                          </div>
                          
                          <div className="space-y-4">
                            <div>
                              <div className="text-sm text-gray-600">Budget</div>
                              <div className="text-2xl font-bold text-green-600">
                                ₹{formData.amount}
                                {formData.budgetType === "hourly" && <span className="text-lg">/hour</span>}
                              </div>
                            </div>
                            
                            <div>
                              <div className="text-sm text-gray-600">Location</div>
                              <div className="font-medium text-gray-900">{formData.location}</div>
                            </div>
                            
                            <div>
                              <div className="text-sm text-gray-600">Deadline</div>
                              <div className="font-medium text-gray-900">
                                {new Date(formData.deadline).toLocaleString()}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Additional Preferences */}
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-bold text-gray-900 mb-4">Additional Preferences</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl border border-gray-200">
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Contact Preference
                              </label>
                              <select
                                name="contactPreference"
                                value={formData.contactPreference}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 rounded-lg border border-gray-300"
                              >
                                <option value="message">Message Only</option>
                                <option value="call">Phone Call Allowed</option>
                                <option value="both">Both Message & Call</option>
                              </select>
                            </div>

                            <div className="p-4 rounded-xl border border-gray-200">
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Task Privacy
                              </label>
                              <select
                                name="privacy"
                                value={formData.privacy}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 rounded-lg border border-gray-300"
                              >
                                <option value="public">Public (Visible to all)</option>
                                <option value="verified">Verified Helpers Only</option>
                                <option value="invite">By Invitation Only</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        {/* Additional Information */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Additional Information (Optional)
                          </label>
                          <textarea
                            name="additionalInfo"
                            value={formData.additionalInfo}
                            onChange={handleInputChange}
                            rows="3"
                            placeholder="Any special instructions, requirements, or additional details..."
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>

                        {/* Terms & Conditions */}
                        <div className="p-4 rounded-xl border border-gray-200 bg-gray-50">
                          <div className="flex items-start gap-3">
                            <FaShieldAlt className="text-blue-500 mt-1" />
                            <div>
                              <p className="text-sm text-gray-700">
                                By posting this task, you agree to our Terms of Service and Privacy Policy. 
                                You understand that DoHelp provides a platform to connect with helpers 
                                and is not responsible for the work performed.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex justify-between">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Back
                  </button>
                ) : (
                  <div></div>
                )}

                {step < steps.length ? (
                  <button
                    type="button"
                    onClick={() => setStep(step + 1)}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transition-all"
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Posting...
                      </>
                    ) : (
                      <>
                        <FaBullhorn />
                        Post Task Now
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </form>
        </motion.div>

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200"
        >
          <div className="flex items-start gap-4">
            <FaInfoCircle className="text-2xl text-blue-500 mt-1" />
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Tips for a Great Task Post</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                  <span>Be clear and specific about what needs to be done</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                  <span>Include photos when possible to help helpers understand better</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                  <span>Set a reasonable budget based on market rates</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                  <span>Be responsive to messages from potential helpers</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}