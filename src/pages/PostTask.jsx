import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCategories } from "../contexts/CategoriesContext";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";
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
  FaStar,
  FaRupeeSign,
  FaUpload,
  FaPlusCircle,
  FaMinusCircle,
  FaPercent,
  FaShieldAlt,
  FaFire,
  FaCrosshairs
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function PostTask() {
  const navigate = useNavigate();
  const { categories, loading: categoriesLoading } = useCategories();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [addressLoading, setAddressLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [mapCenter, setMapCenter] = useState([19.0760, 72.8777]); // Default to Mumbai
  const [mapZoom, setMapZoom] = useState(13);
  const [selectedPosition, setSelectedPosition] = useState(null);

  // Auto-detect user location when reaching step 3
  useEffect(() => {
    if (step === 3 && !selectedPosition) {
      if (!navigator.geolocation) {
        toast.error("Geolocation is not supported by this browser.");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const coords = [latitude, longitude];
          setSelectedPosition(coords);
          setMapCenter(coords);
          setFormData(prev => ({
            ...prev,
            latitude: latitude.toString(),
            longitude: longitude.toString()
          }));
          toast.success("Your current location has been pinned on the map!");
        },
        (error) => {
          console.error("Location detection error:", error);
          // Don't show error toast to avoid blocking user, just log it
        },
        {
          enableHighAccuracy: true,
          timeout: 30000,
          maximumAge: 300000
        }
      );
    }
  }, [step]);

  // Location Marker Component for displaying current location
  function LocationMarker() {
    return selectedPosition === null ? null : (
      <Marker position={selectedPosition}>
        <Popup>Your Current Location</Popup>
      </Marker>
    );
  }

  // Component to center map on selected position
  function MapCenterer() {
    const map = useMap();

    useEffect(() => {
      if (selectedPosition) {
        map.setView(selectedPosition, 15); // Center on selected position with zoom level 15
      }
    }, [selectedPosition, map]);

    return null;
  }

  // Component to handle map clicks for location selection
  function LocationSelector() {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setSelectedPosition([lat, lng]);
        setFormData(prev => ({
          ...prev,
          latitude: lat.toString(),
          longitude: lng.toString()
        }));
        toast.success("Location pinned on the map!");
      }
    });

    return null;
  }

  const [formData, setFormData] = useState({
    title: "",
    categories: [],
    description: "",
    budgetType: "fixed",
    amount: "",
    fullAddress: "",
    houseBuilding: "",
    streetArea: "",
    landmark: "",
    city: "",
    state: "",
    pin: "",
    latitude: "",
    longitude: "",
    deadline: "",
    urgency: "week",
    duration: "",
    skillsRequired: [],
    additionalInfo: "",
    contactPreference: "message",
    privacy: "public"
  });

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

  const handleCategoryToggle = (categoryId) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(categoryId)
        ? prev.categories.filter(c => c !== categoryId)
        : [...prev.categories, categoryId]
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

  const calculateDeadline = (urgency, duration) => {
    const now = new Date();

    switch(urgency) {
      case "urgent":
        if (duration) {
          const deadline = new Date(now.getTime() + duration * 60000); // duration in minutes
          return deadline.toISOString().slice(0, 16);
        }
        return "";
      case "today":
        const todayDeadline = new Date(now);
        todayDeadline.setHours(23, 59, 59, 999);
        return todayDeadline.toISOString().slice(0, 16);
      case "tomorrow":
        const tomorrowDeadline = new Date(now);
        tomorrowDeadline.setDate(now.getDate() + 1);
        tomorrowDeadline.setHours(23, 59, 59, 999);
        return tomorrowDeadline.toISOString().slice(0, 16);
      case "week":
        const weekDeadline = new Date(now);
        weekDeadline.setDate(now.getDate() + 7);
        return weekDeadline.toISOString().slice(0, 16);
      default:
        return "";
    }
  };

  const handleUrgencyChange = (urgency) => {
    setFormData(prev => ({
      ...prev,
      urgency,
      deadline: calculateDeadline(urgency, prev.duration)
    }));
  };

  const handleDurationChange = (duration) => {
    setFormData(prev => ({
      ...prev,
      duration,
      deadline: calculateDeadline(prev.urgency, duration)
    }));
  };

  const handleLocationDetect = async () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by this browser.");
      return;
    }

    setLocationLoading(true);

    try {
      console.log("Requesting location...");
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 30000,
          maximumAge: 300000
        });
      });

      const { latitude, longitude } = position.coords;
      console.log("Got position:", latitude, longitude);

      // Reverse geocoding using Nominatim API
      console.log("Fetching address from Nominatim...");
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`
      );
      const data = await response.json();
      console.log("Nominatim response:", data);

      if (data && data.address) {
        const address = data.address;
        console.log("Parsed address object:", address);

        // Only set the full address, don't auto-fill individual fields
        setFormData(prev => ({
          ...prev,
          fullAddress: data.display_name || ""
        }));
        console.log("Full address set successfully");
      } else {
        toast.error("Unable to detect precise location. Please enter manually.");
      }
    } catch (error) {
      console.error("Location detection error:", error);
      let errorMessage = "Unable to detect location. Please enter address manually.";

      if (error.code) {
        switch (error.code) {
          case 1: // PERMISSION_DENIED
            errorMessage = "Location access denied. Please enable location permissions and try again, or enter address manually.";
            break;
          case 2: // POSITION_UNAVAILABLE
            errorMessage = "Location information is unavailable. Please enter address manually.";
            break;
          case 3: // TIMEOUT
            errorMessage = "Location request timed out. Please try again or enter address manually.";
            break;
          default:
            errorMessage = "An unknown error occurred while detecting location. Please enter address manually.";
            break;
        }
      }

      toast.error(errorMessage);
    } finally {
      setLocationLoading(false);
    }
  };

  const handleAddressFetch = async () => {
    setAddressLoading(true);

    try {
      const token = sessionStorage.getItem('token');
      // Fetch user profile from API to get address
      const response = await fetch('https://dohelp.newhopeindia17.com/api/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }

      const responseData = await response.json();

      if (responseData.status) {
        const profileData = responseData.data;
        const location = profileData.location || "";

        console.log("Raw location string from API:", location);

        // Parse the location string into individual fields
        // Assuming format: "house, street, landmark, city, state - pin"
        const parts = location.split(', ');
        console.log("Split parts:", parts);

        let houseBuilding = "";
        let streetArea = "";
        let landmark = "";
        let city = "";
        let state = "";
        let pin = "";

        if (parts.length >= 1) houseBuilding = parts[0];
        if (parts.length >= 2) streetArea = parts[1];
        if (parts.length >= 3) landmark = parts[2];
        if (parts.length >= 4) city = parts[3];
        if (parts.length >= 5) {
          const statePin = parts[4].split(' - ');
          console.log("State-PIN split:", statePin);
          state = statePin[0];
          pin = statePin[1] || "";
        }

        console.log("Parsed values:", { houseBuilding, streetArea, landmark, city, state, pin });

        setFormData(prev => ({
          ...prev,
          houseBuilding,
          streetArea,
          landmark,
          city,
          state,
          pin,
          fullAddress: location // Also set fullAddress for consistency
        }));

        toast.success("Address filled successfully from profile!");
      } else {
        throw new Error(responseData.message || 'Failed to fetch profile');
      }
    } catch (error) {
      console.error("Profile fetch error:", error);
      toast.error("Unable to fetch your address from profile. Please enter manually.");
    } finally {
      setAddressLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (formData.categories.length === 0) {
      toast.error("Please select at least one category.");
      return;
    }

    setLoading(true);

    const token = sessionStorage.getItem('token');

    if (!token) {
      toast.error("Please login to post a task.");
      setLoading(false);
      return;
    }

    const form = new FormData();

    // Basic task data
    form.append('title', formData.title);
    form.append('category', formData.categories[0]); // Take first category
    form.append('description', formData.description);
    form.append('budget_type', formData.budgetType);
    form.append('amount', formData.amount);
    form.append('urgency_level', formData.urgency);
    form.append('contact_preference', formData.contactPreference);
    form.append('privacy', formData.privacy);

    // Duration and deadline
    if (formData.duration) {
      form.append('duration', formData.duration);
    }

    if (formData.deadline) {
      form.append('deadline', formData.deadline);
    }

    // Location data
    const fullAddress = [
      formData.houseBuilding,
      formData.streetArea,
      formData.landmark,
      formData.city,
      formData.state,
      formData.pin
    ].filter(Boolean).join(', ');

    form.append('location', formData.fullAddress || fullAddress);
    form.append('address', fullAddress);

    if (formData.latitude) {
      form.append('lat', formData.latitude);
    }

    if (formData.longitude) {
      form.append('lng', formData.longitude);
    }

    // Additional info
    if (formData.additionalInfo) {
      form.append('additional_info', formData.additionalInfo);
    }

    // Skills
    if (formData.skillsRequired.length > 0) {
      formData.skillsRequired.forEach(skill => {
        form.append('skills[]', skill);
      });
    }

    // Images
    if (images.length > 0) {
      images.forEach((image, index) => {
        form.append('images[]', image);
      });
    }

    try {
      const response = await fetch('https://dohelp.newhopeindia17.com/api/tasks', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: form
      });

      let result;
      const responseText = await response.text();

      try {
        result = JSON.parse(responseText);
      } catch (parseError) {
        console.error("Failed to parse response as JSON:", parseError);
        console.error("Raw response:", responseText);
        toast.error("Server error occurred. Please try again later.");
        return;
      }

      if (response.ok && result.success) {
        toast.success("Task posted successfully!");
        navigate("/posted-tasks");
      } else {
        // Handle validation errors
        if (result.errors) {
          const errorMessages = Object.values(result.errors).flat();
          errorMessages.forEach(error => toast.error(error));
        } else {
          toast.error(result.message || "Failed to post task");
        }
      }
    } catch (error) {
      console.error("Task submission error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { number: 1, title: "Task Details", icon: <FaBullhorn /> },
    { number: 2, title: "Budget & Time", icon: <FaMoneyBillWave /> },
    { number: 3, title: "Location", icon: <FaMapMarkerAlt /> },
    { number: 4, title: "Review & Post", icon: <FaCheckCircle /> },
  ];

  const getCategoryColor = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.color : "from-gray-500 to-gray-600";
  };

  return (
    <div className="min-h-screen p-4 bg-gradient-to-b from-gray-50 to-blue-50 md:p-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col items-start justify-between gap-4 mb-6 md:flex-row md:items-center">
            <div>
              <h1 className="mb-2 text-3xl font-bold text-gray-900 md:text-4xl">Post a Task</h1>
              <p className="text-gray-600">
                Get help from trusted helpers in your community
              </p>
            </div>
            
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 transition-colors border border-gray-300 rounded-xl hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>

          {/* Progress Steps */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 mb-6 bg-white border border-gray-200 shadow-lg rounded-2xl"
          >
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
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
              <div className="flex justify-between mb-2 text-sm text-gray-600">
                <span>Progress</span>
                <span>{Math.round((step / steps.length) * 100)}%</span>
              </div>
              <div className="h-2 overflow-hidden bg-gray-200 rounded-full">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: `${(step / steps.length) * 100}%` }}
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
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
          className="overflow-hidden bg-white border border-gray-200 shadow-lg rounded-2xl"
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
                      <label className="block mb-2 text-lg font-semibold text-gray-900">
                        What do you need help with?
                      </label>
                      <input
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="e.g., Grocery delivery, Home cleaning, Tutoring"
                        className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    {/* Category Selection */}
                    <div>
                      <label className="block mb-3 text-sm font-medium text-gray-700">
                        <span className="flex items-center gap-2">
                          <FaTags />
                          Select Category (Required)
                        </span>
                      </label>
                      {categoriesLoading ? (
                        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                          {[...Array(6)].map((_, index) => (
                            <div key={index} className="p-4 border-2 border-gray-200 rounded-xl animate-pulse">
                              <div className="flex flex-col items-center gap-2">
                                <div className="w-12 h-12 bg-gray-300 rounded-lg"></div>
                                <div className="w-20 h-4 bg-gray-300 rounded"></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                          {categories.map((category) => (
                            <button
                              key={category.id}
                              type="button"
                              onClick={() => handleCategoryToggle(category.id)}
                              className={`p-4 rounded-xl border-2 transition-all relative ${
                                formData.categories.includes(category.id)
                                  ? "border-blue-500 bg-blue-50"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              <div className="flex flex-col items-center gap-2">
                                <div className="relative">
                                  <img
                                    src={category.image}
                                    alt={category.name}
                                    className="object-cover w-12 h-12 rounded-lg"
                                  />
                                  {category.badge && (
                                    <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 py-0.5 rounded-full flex items-center gap-1">
                                      <FaFire className="text-xs" />
                                      {category.badge}
                                    </div>
                                  )}
                                </div>
                                <span className="font-medium text-gray-900">{category.name}</span>
                                {formData.categories.includes(category.id) && (
                                  <FaCheckCircle className="text-blue-500" />
                                )}
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Describe the task in detail
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows="6"
                        placeholder="Provide clear details about what needs to be done, any specific requirements, materials needed, etc."
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    {/* Image Upload */}
                    <div>
                      <label className="block mb-3 text-sm font-medium text-gray-700">
                        <span className="flex items-center gap-2">
                          <FaCamera />
                          Add Photos (Optional)
                        </span>
                        <span className="text-xs text-gray-500">Upload up to 5 photos to help helpers understand the task better</span>
                      </label>
                      
                      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
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
                          <FaUpload className="mb-2 text-2xl text-gray-400" />
                          <span className="text-sm text-gray-600">Upload</span>
                          <span className="text-xs text-gray-500">{images.length}/5</span>
                        </label>

                        {/* Preview Images */}
                        {images.map((image, index) => (
                          <div key={index} className="relative overflow-hidden border border-gray-200 aspect-square rounded-xl">
                            <img
                              src={URL.createObjectURL(image)}
                              alt={`Preview ${index + 1}`}
                              className="object-cover w-full h-full"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute p-1 text-white bg-red-500 rounded-full top-2 right-2 hover:bg-red-600"
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
                      <label className="block mb-4 text-lg font-semibold text-gray-900">
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
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <FaRupeeSign className="text-gray-400" />
                        </div>
                        <input
                          name="amount"
                          type="number"
                          value={formData.amount}
                          onChange={handleInputChange}
                          placeholder={formData.budgetType === "fixed" ? "Enter total amount" : "Enter hourly rate"}
                          className="w-full py-3 pl-10 pr-4 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </div>
                    </div>

                    {/* Urgency */}
                    <div>
                      <label className="block mb-3 text-sm font-medium text-gray-700">
                        <span className="flex items-center gap-2">
                          <FaExclamationCircle />
                          How urgent is this task?
                        </span>
                      </label>
                      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
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
                            <div className="mt-1 text-sm">{urgency.time}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Duration */}
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        <span className="flex items-center gap-2">
                          <FaClock />
                          Estimated Duration
                        </span>
                      </label>
                      <select
                        name="duration"
                        value={formData.duration}
                        onChange={(e) => handleDurationChange(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select duration</option>
                        <option value="60">1 hour or less</option>
                        <option value="120">1-2 hours</option>
                        <option value="240">2-4 hours</option>
                        <option value="480">4-8 hours</option>
                        <option value="1440">Full day</option>
                        <option value="">Multiple days</option>
                      </select>
                    </div>

                    {/* Deadline */}
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                      <div className="flex items-center justify-between mb-4">
                        <label className="block text-lg font-semibold text-gray-900">
                          Where does this task need to be done?
                        </label>
                        <button
                              type="button"
                              onClick={handleAddressFetch}
                              disabled={addressLoading}
                              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-900 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {addressLoading ? (
                                <>
                                  <div className="w-4 h-4 border-2 border-gray-900 rounded-full border-t-transparent animate-spin"></div>
                                  Loading...
                                </>
                              ) : (
                                "Same as local address"
                              )}
                            </button>
                      </div>
                      <p className="mb-4 text-gray-600">
                        Helpers will use this information to find tasks near them
                      </p>
                      
                      {/* Location Input */}
                      <div className="space-y-4">
                        {/* Full Address Input for Detection */}
                        <div>
                          <label className="block mb-2 text-sm font-medium text-gray-700">
                            <span className="flex items-center gap-2">
                              <FaMapMarkerAlt />
                              Full Address (for Location Detection)
                            </span>
                          </label>
                          <div className="relative">
                            <input
                              name="fullAddress"
                              value={formData.fullAddress || ""}
                              onChange={handleInputChange}
                              placeholder="Enter full address to detect location"
                              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <button
                              type="button"
                              onClick={handleLocationDetect}
                              disabled={locationLoading}
                              className="absolute text-gray-400 transition-colors transform -translate-y-1/2 right-3 top-1/2 hover:text-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {locationLoading ? (
                                <div className="w-5 h-5 border-2 border-gray-400 rounded-full border-t-transparent animate-spin"></div>
                              ) : (
                                <FaCrosshairs className="text-lg" />
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Manual Address Input Fields */}
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <label className="block text-sm font-medium text-gray-700">
                              for more precise write your address manually
                            </label>
                          
                          </div>
                          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                              <label className="block mb-2 text-sm font-medium text-gray-700">
                                House/Building
                              </label>
                              <input
                                name="houseBuilding"
                                value={formData.houseBuilding}
                                onChange={handleInputChange}
                                placeholder="e.g., A-101, Shanti Tower"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                              />
                            </div>

                            <div>
                              <label className="block mb-2 text-sm font-medium text-gray-700">
                                Street/Area
                              </label>
                              <input
                                name="streetArea"
                                value={formData.streetArea}
                                onChange={handleInputChange}
                                placeholder="e.g., Andheri West"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                              />
                            </div>

                            <div>
                              <label className="block mb-2 text-sm font-medium text-gray-700">
                                Landmark
                              </label>
                              <input
                                name="landmark"
                                value={formData.landmark}
                                onChange={handleInputChange}
                                placeholder="e.g., Near Metro Station"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                              />
                            </div>

                            <div>
                              <label className="block mb-2 text-sm font-medium text-gray-700">
                                City
                              </label>
                              <input
                                name="city"
                                value={formData.city}
                                onChange={handleInputChange}
                                placeholder="e.g., Mumbai"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                              />
                            </div>

                            <div>
                              <label className="block mb-2 text-sm font-medium text-gray-700">
                                State
                              </label>
                              <input
                                name="state"
                                value={formData.state}
                                onChange={handleInputChange}
                                placeholder="e.g., Maharashtra"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                              />
                            </div>

                            <div>
                              <label className="block mb-2 text-sm font-medium text-gray-700">
                                PIN Code
                              </label>
                              <input
                                name="pin"
                                value={formData.pin}
                                onChange={handleInputChange}
                                placeholder="e.g., 400058"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Interactive Map */}
                      <div className="mt-6">
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          <span className="flex items-center gap-2">
                            <FaMapMarkerAlt />
                            Select Location on Map
                          </span>
                          <span className="text-xs text-gray-500">Click on the map to set your task location</span>
                        </label>
                        <div className="relative h-64 overflow-hidden border border-gray-300 rounded-xl">
                          <MapContainer
                            center={selectedPosition || mapCenter}
                            zoom={mapZoom}
                            style={{ height: '100%', width: '100%' }}
                          >
                            <TileLayer
                              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                            <LocationMarker />
                            <MapCenterer />
                            <LocationSelector />
                          </MapContainer>
                          {/* Crosshair overlay in center */}
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <FaCrosshairs className="text-2xl text-red-500 opacity-75" />
                          </div>
                        </div>
                        {selectedPosition && (
                          <div className="mt-2 text-sm text-gray-600">
                            Selected coordinates: {selectedPosition[0].toFixed(6)}, {selectedPosition[1].toFixed(6)}
                          </div>
                        )}
                      </div>

                      {/* Skills Required */}
                      <div className="mt-8">
                        <label className="block mb-3 text-sm font-medium text-gray-700">
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
                      <h2 className="mb-6 text-2xl font-bold text-center text-gray-900">
                        Review Your Task
                      </h2>
                      
                      {/* Task Summary */}
                      <div className="p-6 mb-6 border border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                          <div>
                            <h3 className="mb-2 text-lg font-bold text-gray-900">{formData.title}</h3>
                            <div className="flex flex-wrap items-center gap-2 mb-3">
                              {formData.categories.map((categoryId) => {
                                const category = categories.find(c => c.id === categoryId);
                                return (
                                  <span key={categoryId} className={`px-3 py-1 rounded-full text-sm bg-gradient-to-r ${getCategoryColor(categoryId)} text-white`}>
                                    {category ? category.name : categoryId}
                                  </span>
                                );
                              })}
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
                              <div className="font-medium text-gray-900">
                                {formData.houseBuilding && `${formData.houseBuilding}, `}
                                {formData.streetArea && `${formData.streetArea}, `}
                                {formData.landmark && `${formData.landmark}, `}
                                {formData.city && `${formData.city}, `}
                                {formData.state && `${formData.state} - `}
                                {formData.pin}
                              </div>
                            </div>
                            
                            <div>
                              <div className="text-sm text-gray-600">Deadline</div>
                              <div className="font-medium text-gray-900">
                                {formData.deadline ? new Date(formData.deadline).toLocaleString('en-IN', {
                                  timeZone: 'Asia/Kolkata',
                                  weekday: 'short',
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                  hour12: false
                                }) : 'Not set'}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Additional Preferences */}
                      <div className="space-y-6">
                        <div>
                          <h3 className="mb-4 font-bold text-gray-900">Additional Preferences</h3>
                          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="p-4 border border-gray-200 rounded-xl">
                              <label className="block mb-2 text-sm font-medium text-gray-700">
                                Contact Preference
                              </label>
                              <select
                                name="contactPreference"
                                value={formData.contactPreference}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                              >
                                <option value="message">Message Only</option>
                                <option value="call">Phone Call Allowed</option>
                                <option value="both">Both Message & Call</option>
                              </select>
                            </div>

                            <div className="p-4 border border-gray-200 rounded-xl">
                              <label className="block mb-2 text-sm font-medium text-gray-700">
                                Task Privacy
                              </label>
                              <select
                                name="privacy"
                                value={formData.privacy}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
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
                          <label className="block mb-2 text-sm font-medium text-gray-700">
                            Additional Information (Optional)
                          </label>
                          <textarea
                            name="additionalInfo"
                            value={formData.additionalInfo}
                            onChange={handleInputChange}
                            rows="3"
                            placeholder="Any special instructions, requirements, or additional details..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>

                        {/* Terms & Conditions */}
                        <div className="p-4 border border-gray-200 rounded-xl bg-gray-50">
                          <div className="flex items-start gap-3">
                            <FaShieldAlt className="mt-1 text-blue-500" />
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
                    className="px-6 py-3 text-gray-700 transition-colors border border-gray-300 rounded-xl hover:bg-gray-100"
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
                    className="px-6 py-3 text-white transition-all rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-2 px-8 py-3 text-white transition-all rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
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
          className="p-6 mt-6 border border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl"
        >
          <div className="flex items-start gap-4">
            <FaInfoCircle className="mt-1 text-2xl text-blue-500" />
            <div>
              <h3 className="mb-2 font-bold text-gray-900">Tips for a Great Task Post</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="flex-shrink-0 mt-1 text-green-500" />
                  <span>Be clear and specific about what needs to be done</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="flex-shrink-0 mt-1 text-green-500" />
                  <span>Include photos when possible to help helpers understand better</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="flex-shrink-0 mt-1 text-green-500" />
                  <span>Set a reasonable budget based on market rates</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaCheckCircle className="flex-shrink-0 mt-1 text-green-500" />
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