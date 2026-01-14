import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCategories } from "../contexts/CategoriesContext";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaMoneyBillWave,
  FaExclamationCircle,
  FaCheckCircle,
  FaTimesCircle,
  FaUser,
  FaArrowLeft,
  FaImage,
  FaTag,
  FaShieldAlt,
  FaPhone,
  FaEnvelope,
  FaLock,
  FaGlobe,
  FaEdit,
  FaTrash,
  FaShareAlt,
  FaBookmark,
  FaRupeeSign,
  FaInfoCircle,
  FaStar,
  FaCrown,
  FaCalendarCheck,
  FaVideo,
  FaComment
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function TaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { categories } = useCategories();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('token');

    fetch(`https://dohelp.newhopeindia17.com/api/task/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setTask(data.task);
        } else {
          setError('Task not found');
        }
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const formatDateTime = (dateString) => {
    if (!dateString) return 'Date not available';
    try {
      const date = new Date(dateString);
      if (!isNaN(date.getTime())) {
        return `${date.toLocaleDateString('en-IN', {
          weekday: 'short',
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        })} at ${date.toLocaleTimeString('en-IN', {
          hour: '2-digit',
          minute: '2-digit'
        })}`;
      }
      return 'Invalid Date';
    } catch (error) {
      return 'Invalid Date';
    }
  };

  const deleteTask = async () => {
    setIsDeleting(true);
    const token = sessionStorage.getItem("token");

    try {
      const res = await fetch(`https://dohelp.newhopeindia17.com/api/tasks/delete/${id}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (data.success) {
        setShowDeleteModal(false);
        setTimeout(() => {
          navigate("/posted-tasks");
        }, 1000);
      } else {
        alert(data.message || "Failed to delete task");
        setIsDeleting(false);
      }
    } catch (error) {
      alert("Something went wrong");
      setIsDeleting(false);
    }
  };

  const getPostedTime = (createdAt) => {
    const now = new Date();
    const created = new Date(createdAt);
    const diffMs = now - created;
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMinutes < 60) {
      return diffMinutes === 0 ? 'Just now' : `${diffMinutes} minutes ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hours ago`;
    } else {
      return `${diffDays} days ago`;
    }
  };

  const statusConfig = {
    "open": {
      text: "Pending",
      color: "bg-green-50 text-green-700 border-green-200",
      icon: <FaCheckCircle className="text-green-500" />,
      badge: "bg-gradient-to-r from-green-400 to-emerald-500"
    },
    "accepted": {
      text: "Accepted",
      color: "bg-orange-50 text-orange-700 border-orange-200",
      icon: <FaUser className="text-orange-500" />,
      badge: "bg-gradient-to-r from-orange-400 to-amber-500"
    },
    "in-progress": {
      text: "In Progress",
      color: "bg-blue-50 text-blue-700 border-blue-200",
      icon: <FaClock className="text-blue-500" />,
      badge: "bg-gradient-to-r from-blue-400 to-cyan-500"
    },
    "completed": {
      text: "Completed",
      color: "bg-emerald-50 text-emerald-700 border-emerald-200",
      icon: <FaCalendarCheck className="text-emerald-500" />,
      badge: "bg-gradient-to-r from-emerald-400 to-teal-500"
    },
    "cancelled": {
      text: "Cancelled",
      color: "bg-red-50 text-red-700 border-red-200",
      icon: <FaTimesCircle className="text-red-500" />,
      badge: "bg-gradient-to-r from-red-400 to-pink-500"
    }
  };

  const urgencyConfig = {
    "urgent": {
      text: "Urgent",
      icon: <FaExclamationCircle className="animate-pulse" />,
      color: "bg-gradient-to-r from-red-500 to-pink-600 text-white"
    },
    "normal": {
      text: "Normal",
      icon: <FaInfoCircle />,
      color: "bg-gray-100 text-gray-700"
    }
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id == categoryId);
    return category ? category.name : categoryId;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 mx-auto mb-6 border-4 border-blue-200 rounded-full border-t-blue-500"
          ></motion.div>
          <p className="text-lg font-medium text-gray-700">Loading task details...</p>
          <p className="text-sm text-gray-500">Please wait a moment</p>
        </div>
      </div>
    );
  }

  if (error || !task) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <div className="max-w-md p-8 text-center">
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-400 to-pink-500 opacity-20 blur-xl"></div>
            <FaTimesCircle className="relative text-6xl text-red-500" />
          </div>
          <h2 className="mb-3 text-2xl font-bold text-gray-900">Task Not Found</h2>
          <p className="mb-6 text-gray-600">{error || "The task you're looking for doesn't exist or has been removed."}</p>
<Link
  to="/posted-tasks"
  className="inline-flex items-center gap-3 px-5 py-3 font-medium text-white transition-all duration-300 bg-black/40 backdrop-blur-md rounded-xl hover:bg-black/60"
>
  <FaArrowLeft />
  Back to My Tasks
</Link>


   
     </div>
      </div>
    );
  }

  const status = statusConfig[task.status] || statusConfig.open;
  const urgency = urgencyConfig[task.urgency_level] || urgencyConfig.normal;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md p-6 bg-white shadow-2xl rounded-2xl"
          >
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full">
              <FaTrash className="text-2xl text-red-500" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-center text-gray-900">Delete Task</h3>
            <p className="mb-6 text-center text-gray-600">
              Are you sure you want to delete this task? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-3 font-medium text-gray-700 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={deleteTask}
                className="flex-1 px-4 py-3 font-medium text-white transition-colors rounded-lg bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 disabled:opacity-50"
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete Task"}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <div className="relative">
        {/* Header Background */}
        <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-r from-blue-500 via-blue-600 to-cyan-500"></div>

        <div className="relative max-w-6xl px-4 pt-8 mx-auto sm:px-6 lg:px-8">
          {/* Back Button */}
          <div className="mb-8">
            <Link
              to="/posted-tasks"
              className="inline-flex items-center gap-3 px-5 py-3 font-medium text-white transition-all duration-300 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 hover:shadow-lg"
            >
              <FaArrowLeft />
              Back to My Tasks
            </Link>
          </div>

          {/* Main Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="overflow-hidden bg-white shadow-2xl rounded-3xl backdrop-blur-sm"
          >
            {/* Status Ribbon */}
            <div className={`absolute top-6 right-6 px-4 py-2 text-sm font-semibold text-white rounded-lg shadow-lg ${status.badge} z-10`}>
              <div className="flex items-center gap-2">
                {status.icon}
                {status.text}
              </div>
            </div>

            <div className="p-8 lg:p-10">
              {/* Header Section */}
              <div className="mb-10">
                <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`inline-flex items-center gap-2 px-4 py-1.5 text-sm font-medium rounded-full ${urgency.color}`}>
                        {urgency.icon}
                        {urgency.text}
                      </span>
                      <span className="flex items-center gap-2 px-4 py-1.5 text-sm font-medium text-blue-700 bg-blue-50 rounded-full">
                        <FaMoneyBillWave />
                        {getCategoryName(task.category)}
                      </span>
                    </div>
                    
                    <h1 className="mb-4 text-4xl font-bold text-gray-900 lg:text-5xl">{task.title}</h1>
                    
                    <div className="flex flex-wrap items-center gap-4 text-gray-600">
                      <span className="flex items-center gap-2">
                        <FaClock className="text-blue-500" />
                        <span className="font-medium">Posted {getPostedTime(task.created_at)}</span>
                      </span>
                      <span className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-gray-400" />
                        {task.location}
                      </span>
                    </div>
                  </div>

                  {/* Price Card */}
                  <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-100 min-w-[200px]">
                    <div className="mb-2 text-sm font-medium text-blue-700">Budget</div>
                    <div className="flex items-baseline gap-2">
                      <FaRupeeSign className="text-2xl text-blue-600" />
                      <span className="text-5xl font-bold text-gray-900">{task.amount}</span>
                    </div>
                    <div className="mt-2 text-sm text-gray-600 capitalize">
                      {task.budget_type || 'Fixed'} Budget
                    </div>
                  </div>
                </div>
              </div>

              {/* Description Card */}
              <div className="p-6 mb-8 border border-gray-100 bg-gradient-to-br from-gray-50 to-white rounded-2xl">
                <h2 className="flex items-center gap-3 mb-4 text-2xl font-bold text-gray-900">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FaInfoCircle className="text-blue-600" />
                  </div>
                  Description
                </h2>
                <p className="text-lg leading-relaxed text-gray-700">{task.description}</p>
              </div>

              {/* Progress Section */}
              <div className="p-6 mb-8 border border-gray-100 bg-gradient-to-br from-white to-gray-50 rounded-2xl">
                <h3 className="flex items-center gap-3 mb-6 text-xl font-semibold text-gray-900">
                  <FaClock className="text-blue-500" />
                  Task Progress
                </h3>
                <div className="relative">
                  {(() => {
                    const statusOrder = { 'open': 0, 'accepted': 1, 'in-progress': 2, 'completed': 3 };
                    const currentStep = statusOrder[task.status] || 0;

                    return (
                      <>
                        {/* Progress Bar Background */}
                        <div className="w-full h-2 bg-gray-200 rounded-full mb-6">
                          <div
                            className="h-2 bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all duration-500 ease-out"
                            style={{
                              width: `${(currentStep + 1) * 25}%`
                            }}
                          ></div>
                        </div>

                        <div className="flex items-center justify-between">
                          {[
                            { key: 'open', label: 'Posted', icon: <FaCheckCircle className="text-xs" /> },
                            { key: 'accepted', label: 'Accepted', icon: <FaCheckCircle className="text-xs" /> },
                            { key: 'in-progress', label: 'In Progress', icon: <FaClock className="text-xs" /> },
                            { key: 'completed', label: 'Completed', icon: <FaCalendarCheck className="text-xs" /> }
                          ].map((step, index) => {
                            const isActive = currentStep >= index;
                            const isCompleted = currentStep > index;

                            return (
                              <div key={step.key} className="flex flex-col items-center flex-1">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-300 border-4 ${
                                  isCompleted ? 'bg-green-500 text-white border-green-500 shadow-lg' :
                                  isActive ? 'bg-blue-500 text-white border-blue-500 shadow-lg' :
                                  'bg-white text-gray-500 border-gray-300'
                                }`}>
                                  {step.icon}
                                </div>
                                <span className={`text-xs font-medium text-center ${
                                  isActive ? 'text-blue-600' : 'text-gray-500'
                                }`}>
                                  {step.label}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                        <div className="mt-6 text-center">
                          <span className="text-sm text-gray-600">
                            Current Status: <span className="font-semibold text-blue-600">{status.text}</span>
                          </span>
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-2">
                {/* Left Column */}
                <div className="space-y-6">
                  <div className="p-6 border border-gray-100 bg-gradient-to-br from-white to-gray-50 rounded-2xl">
                    <h3 className="flex items-center gap-3 mb-4 text-xl font-semibold text-gray-900">
                      <FaCalendarAlt className="text-blue-500" />
                      Timeline Details
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm font-medium text-gray-500">Deadline</div>
                        <div className="flex items-center gap-3 mt-1">
                          <FaCalendarAlt className="text-gray-400" />
                          <span className="text-lg font-medium text-gray-900">{formatDateTime(task.deadline)}</span>
                        </div>
                      </div>
                      <div>

                        <div className="text-sm font-medium text-gray-500">Duration</div>
                        <div className="flex items-center gap-3 mt-1">
                          <FaClock className="text-gray-400" />
                          <span className="text-lg font-medium text-gray-900">
                            {task.duration ? (Number(task.duration) < 60 ? `${task.duration} minutes` : `${Math.round(Number(task.duration) / 60)} hours`) : 'Not specified'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 border border-gray-100 bg-gradient-to-br from-white to-gray-50 rounded-2xl">
                    <h3 className="flex items-center gap-3 mb-4 text-xl font-semibold text-gray-900">
                      <FaUser className="text-green-500" />
                      User Information
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <FaUser className="text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{task.user?.name || 'N/A'}</div>
                          <div className="text-sm text-gray-500">ID: {task.user?.id || 'N/A'}</div>
                        </div>
                      </div>
                      {task.user?.email && (
                        <div className="flex items-center gap-3">
                          <FaEnvelope className="text-gray-400" />
                          <span className="text-gray-900">{task.user.email}</span>
                        </div>
                      )}
                      {task.user?.phone && (
                        <div className="flex items-center gap-3">
                          <FaPhone className="text-gray-400" />
                          <span className="text-gray-900">{task.user.phone}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <div className="p-6 border border-gray-100 bg-gradient-to-br from-white to-gray-50 rounded-2xl">
                    <h3 className="flex items-center gap-3 mb-4 text-xl font-semibold text-gray-900">
                      <FaCrown className="text-amber-500" />
                      Helper Information
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-amber-100">
                          <FaUser className="text-amber-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{task.helper?.name || 'Aman singh'}</div>
                          <div className="text-sm text-gray-500">Helper ID: {task.helper?.user_uid || 'USR-OGB6QVEC'}</div>
                        </div>
                      </div>
                      <div className="flex gap-3 pt-4 border-t border-gray-200">
                        <button
                          onClick={() => alert('Voice call feature coming soon!')}
                          className="flex items-center gap-2 px-4 py-2 font-medium text-white transition-all duration-300 bg-gradient-to-r from-green-500 to-green-600 rounded-lg hover:from-green-600 hover:to-green-700 hover:shadow-lg"
                        >
                          <FaPhone className="text-sm" />
                          Voice Call
                        </button>
                        <button
                          onClick={() => alert('Video call feature coming soon!')}
                          className="flex items-center gap-2 px-4 py-2 font-medium text-white transition-all duration-300 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg hover:from-blue-600 hover:to-blue-700 hover:shadow-lg"
                        >
                          <FaVideo className="text-sm" />
                          Video Call
                        </button>
                        <button
                          onClick={() => alert('Chat feature coming soon!')}
                          className="flex items-center gap-2 px-4 py-2 font-medium text-white transition-all duration-300 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg hover:from-purple-600 hover:to-purple-700 hover:shadow-lg"
                        >
                          <FaComment className="text-sm" />
                          Chat
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 border border-gray-100 bg-gradient-to-br from-white to-gray-50 rounded-2xl">
                    <h3 className="flex items-center gap-3 mb-4 text-xl font-semibold text-gray-900">
                      <FaShieldAlt className="text-purple-500" />
                      Task Settings
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm font-medium text-gray-500">Contact Preference</div>
                        <div className="flex items-center gap-3 mt-1">
                          {task.contact_preference === 'message' ? (
                            <>
                              <FaEnvelope className="text-blue-500" />
                              <span className="font-medium text-gray-900">Message Only</span>
                            </>
                          ) : (
                            <>
                              <FaPhone className="text-green-500" />
                              <span className="font-medium text-gray-900">Phone Calls Allowed</span>
                            </>
                          )}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-500">Privacy</div>
                        <div className="flex items-center gap-3 mt-1">
                          {task.privacy === 'public' ? (
                            <>
                              <FaGlobe className="text-green-500" />
                              <span className="font-medium text-gray-900">Public Task</span>
                            </>
                          ) : (
                            <>
                              <FaLock className="text-gray-500" />
                              <span className="font-medium text-gray-900">Private Task</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Address and Additional Info */}
              <div className="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-2">
                <div className="p-6 border border-gray-100 bg-gradient-to-br from-white to-gray-50 rounded-2xl">
                  <h3 className="flex items-center gap-3 mb-4 text-xl font-semibold text-gray-900">
                    <FaMapMarkerAlt className="text-red-500" />
                    Location Details
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm font-medium text-gray-500">Address</div>
                      <p className="mt-1 text-gray-900">{task.address || 'Address not provided'}</p>
                    </div>
                  </div>
                </div>

                {task.additional_info && (
                  <div className="p-6 border border-gray-100 bg-gradient-to-br from-white to-gray-50 rounded-2xl">
                    <h3 className="flex items-center gap-3 mb-4 text-xl font-semibold text-gray-900">
                      <FaInfoCircle className="text-cyan-500" />
                      Additional Information
                    </h3>
                    <p className="text-gray-700">{task.additional_info}</p>
                  </div>
                )}
              </div>

              {/* Skills Section */}
              {task.skills && task.skills.length > 0 && (
                <div className="p-6 mb-8 border border-gray-100 bg-gradient-to-br from-white to-gray-50 rounded-2xl">
                  <h3 className="flex items-center gap-3 mb-4 text-xl font-semibold text-gray-900">
                    <FaTag className="text-purple-500" />
                    Required Skills
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {task.skills.map((skillObj, index) => (
                      <span
                        key={index}
                        className="flex items-center gap-2 px-4 py-2 font-medium text-purple-700 transition-shadow border border-purple-200 bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl hover:shadow-md"
                      >
                        <FaTag className="text-purple-500" />
                        {skillObj.skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Images Gallery */}
              {task.images && task.images.length > 0 && (
                <div className="p-6 mb-8 border border-gray-100 bg-gradient-to-br from-white to-gray-50 rounded-2xl">
                  <h3 className="flex items-center gap-3 mb-4 text-xl font-semibold text-gray-900">
                    <FaImage className="text-amber-500" />
                    Task Images
                  </h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {task.images.map((image, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        className="overflow-hidden border border-gray-200 rounded-xl"
                      >
                        <img
                          src={image.full_url}
                          alt={`Task image ${index + 1}`}
                          className="object-cover w-full h-48 transition-transform duration-300 hover:scale-105"
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80';
                          }}
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions Footer */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-8 mt-8 border-t border-gray-200">
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <span className="flex items-center gap-2">
                    <FaClock className="text-gray-400" />
                    Created: {formatDateTime(task.created_at)}
                  </span>
                  <span className="flex items-center gap-2">
                    <FaClock className="text-gray-400" />
                    Updated: {formatDateTime(task.updated_at)}
                  </span>
                </div>

                <div className="flex flex-wrap gap-3">
                 
                  
                  {task.status === 'open' && (
                    <Link
                      to="/post-task"
                      state={{ task: task, isEdit: true }}
                      className="flex items-center gap-2 px-5 py-3 font-medium text-white transition-all duration-300 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl hover:from-blue-600 hover:to-blue-700 hover:shadow-lg hover:-translate-y-0.5"
                    >
                      <FaEdit />
                      Edit Task
                    </Link>
                  )}
                  
                  {task.status === 'open' && (
                    <button
                      onClick={() => setShowDeleteModal(true)}
                      className="flex items-center gap-2 px-5 py-3 font-medium text-white transition-all duration-300 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl hover:from-red-600 hover:to-pink-700 hover:shadow-lg hover:-translate-y-0.5"
                    >
                      <FaTrash />
                      Delete Task
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Task ID Footer */}
          <div className="mt-6 text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-500 bg-white rounded-full shadow-sm">
              <FaInfoCircle className="text-gray-400" />
              Task ID: #{task.id}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}