import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
  FaGlobe
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function TaskDetail() {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        return `${date.toLocaleDateString('en-IN')} at ${date.toLocaleTimeString('en-IN')}`;
      }
      return 'Invalid Date';
    } catch (error) {
      return 'Invalid Date';
    }
  };

  const getPostedTime = (createdAt) => {
    const now = new Date();
    const created = new Date(createdAt);
    const diffMs = now - created;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays === 0) {
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      if (diffHours === 0) {
        const diffMinutes = Math.floor(diffMs / (1000 * 60));
        return diffMinutes === 0 ? 'Just now' : `${diffMinutes} minutes ago`;
      } else {
        return `${diffHours} hours ago`;
      }
    }
    if (diffDays === 1) return '1 day ago';
    return `${diffDays} days ago`;
  };

  const statusColors = {
    "open": "bg-green-100 text-green-700",
    "assigned": "bg-orange-100 text-orange-700",
    "in-progress": "bg-blue-100 text-blue-700",
    "completed": "bg-emerald-100 text-emerald-700",
    "cancelled": "bg-red-100 text-red-700"
  };

  const statusIcons = {
    "open": <FaCheckCircle className="text-green-500" />,
    "assigned": <FaClock className="text-blue-500" />,
    "in-progress": <FaClock className="text-blue-500" />,
    "completed": <FaCheckCircle className="text-emerald-500" />,
    "cancelled": <FaTimesCircle className="text-red-500" />
  };

  const getStatusText = (status) => {
    const texts = {
      "open": "Open",
      "assigned": "Assigned",
      "in-progress": "In Progress",
      "completed": "Completed",
      "cancelled": "Cancelled"
    };
    return texts[status] || status;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-blue-50">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 border-b-2 border-blue-500 rounded-full animate-spin"></div>
          <p className="text-gray-600">Loading task details...</p>
        </div>
      </div>
    );
  }

  if (error || !task) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-blue-50">
        <div className="text-center">
          <FaTimesCircle className="mx-auto mb-4 text-4xl text-red-500" />
          <p className="mb-4 text-xl text-gray-900">Task not found</p>
          <p className="mb-6 text-gray-600">{error}</p>
          <Link
            to="/posted-tasks"
            className="inline-flex items-center gap-2 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            <FaArrowLeft />
            Back to Tasks
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-6 bg-gradient-to-b from-gray-50 to-blue-50">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            to="/posted-tasks"
            className="inline-flex items-center gap-2 px-4 py-2 text-gray-600 transition-colors hover:text-gray-900"
          >
            <FaArrowLeft />
            Back to My Tasks
          </Link>
        </div>

        {/* Task Details Card */}
        <div className="overflow-hidden bg-white border border-gray-200 shadow-lg rounded-2xl backdrop-blur-sm">
          <div className="p-6 md:p-8">
            {/* Header */}
            <div className="flex flex-col justify-between gap-4 mb-6 md:flex-row md:items-start">
              <div className="flex-1">
                <h1 className="mb-2 text-3xl font-bold text-gray-900">{task.title}</h1>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <FaMoneyBillWave />
                    {task.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaClock className="text-blue-500" />
                    Posted {getPostedTime(task.created_at)}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="mb-2 text-3xl font-bold text-green-600">₹{task.amount}</div>
                <span className={`inline-flex items-center gap-1 px-3 py-1 text-sm rounded-full ${statusColors[task.status]}`}>
                  {statusIcons[task.status]}
                  {getStatusText(task.status)}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h2 className="mb-3 text-xl font-semibold text-gray-900">Description</h2>
              <p className="leading-relaxed text-gray-700">{task.description}</p>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <h3 className="mb-1 text-sm font-medium text-gray-500">Location</h3>
                  <div className="flex items-center gap-2 text-gray-900">
                    <FaMapMarkerAlt className="text-gray-400" />
                    <span>{task.location}</span>
                  </div>
                </div>

                <div>
                  <h3 className="mb-1 text-sm font-medium text-gray-500">Deadline</h3>
                  <div className="flex items-center gap-2 text-gray-900">
                    <FaCalendarAlt className="text-gray-400" />
                    <span>{formatDateTime(task.deadline)}</span>
                  </div>
                </div>

                <div>
                  <h3 className="mb-1 text-sm font-medium text-gray-500">Created At</h3>
                  <div className="flex items-center gap-2 text-gray-900">
                    <FaClock className="text-gray-400" />
                    <span>{formatDateTime(task.created_at)}</span>
                  </div>
                </div>

                <div>
                  <h3 className="mb-1 text-sm font-medium text-gray-500">Updated At</h3>
                  <div className="flex items-center gap-2 text-gray-900">
                    <FaClock className="text-gray-400" />
                    <span>{formatDateTime(task.updated_at)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="mb-1 text-sm font-medium text-gray-500">Urgency Level</h3>
                  <div className="flex items-center gap-2">
                    {task.urgency_level === 'urgent' ? (
                      <span className="flex items-center gap-1 px-3 py-1 text-sm text-red-700 bg-red-100 rounded-full">
                        <FaExclamationCircle />
                        Urgent
                      </span>
                    ) : (
                      <span className="text-gray-900">Normal</span>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="mb-1 text-sm font-medium text-gray-500">Task ID</h3>
                  <span className="font-mono text-gray-900">#{task.id}</span>
                </div>

                <div>
                  <h3 className="mb-1 text-sm font-medium text-gray-500">Budget Type</h3>
                  <span className="text-gray-900 capitalize">{task.budget_type || 'Fixed'}</span>
                </div>

                <div>
                  <h3 className="mb-1 text-sm font-medium text-gray-500">Duration</h3>
                  <span className="text-gray-900">{task.duration ? `${task.duration} minutes` : 'Not specified'}</span>
                </div>
              </div>
            </div>

            {/* User and Helper Information */}
            <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
              <div>
                <h3 className="mb-3 text-lg font-semibold text-gray-900">User Information</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-900">
                    <FaUser className="text-gray-400" />
                    <span>{task.user?.name || 'N/A'} (ID: {task.user?.id || 'N/A'})</span>
                  </div>
                  {task.user?.email && (
                    <div className="flex items-center gap-2 text-gray-900">
                      <FaEnvelope className="text-gray-400" />
                      <span>{task.user.email}</span>
                    </div>
                  )}
                  {task.user?.phone && (
                    <div className="flex items-center gap-2 text-gray-900">
                      <FaPhone className="text-gray-400" />
                      <span>{task.user.phone}</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-lg font-semibold text-gray-900">Helper Information</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-900">
                    <FaUser className="text-gray-400" />
                    <span>{task.assigned_helper?.name || 'Not assigned'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="mb-6">
              <h3 className="mb-3 text-lg font-semibold text-gray-900">Address</h3>
              <div className="flex items-start gap-2 text-gray-900">
                <FaMapMarkerAlt className="mt-1 text-gray-400" />
                <span>{task.address || 'Address not provided'}</span>
              </div>
            </div>

            {/* Contact and Privacy */}
            <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
              <div>
                <h3 className="mb-3 text-lg font-semibold text-gray-900">Contact Preference</h3>
                <div className="flex items-center gap-2 text-gray-900">
                  {task.contact_preference === 'message' ? (
                    <>
                      <FaEnvelope className="text-gray-400" />
                      <span>Message</span>
                    </>
                  ) : (
                    <>
                      <FaPhone className="text-gray-400" />
                      <span>Call</span>
                    </>
                  )}
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-lg font-semibold text-gray-900">Privacy</h3>
                <div className="flex items-center gap-2 text-gray-900">
                  {task.privacy === 'public' ? (
                    <>
                      <FaGlobe className="text-gray-400" />
                      <span>Public</span>
                    </>
                  ) : (
                    <>
                      <FaLock className="text-gray-400" />
                      <span>Private</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Additional Info */}
            {task.additional_info && (
              <div className="mb-6">
                <h3 className="mb-3 text-lg font-semibold text-gray-900">Additional Information</h3>
                <p className="leading-relaxed text-gray-700">{task.additional_info}</p>
              </div>
            )}

            {/* Skills Required */}
            {task.skills && task.skills.length > 0 && (
              <div className="mb-6">
                <h3 className="mb-3 text-lg font-semibold text-gray-900">Skills Required</h3>
                <div className="flex flex-wrap gap-2">
                  {task.skills.map((skillObj, index) => (
                    <span key={index} className="flex items-center gap-1 px-3 py-1 text-sm text-blue-700 bg-blue-100 rounded-full">
                      <FaTag className="text-blue-500" />
                      {skillObj.skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Task Images */}
            {task.images && task.images.length > 0 && (
              <div className="mb-6">
                <h3 className="mb-3 text-lg font-semibold text-gray-900">Task Images</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {task.images.map((image, index) => (
                    <div key={index}>
                      <img
                        src={image.full_url}
                        alt={`Task image ${index + 1}`}
                        className="object-cover w-full h-32 border border-gray-200 rounded-lg"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Available';
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap gap-3 pt-6 border-t border-gray-200">
              {task.status === 'open' && (
                <Link
                  to="/post-task"
                  state={{ task: task, isEdit: true }}
                  className="flex items-center gap-2 px-4 py-2 text-green-600 transition-colors border border-green-300 rounded-lg hover:bg-green-50"
                >
                  <FaUser />
                  Edit Task
                </Link>
              )}
              <button className="flex items-center gap-2 px-4 py-2 text-blue-600 transition-colors border border-blue-300 rounded-lg hover:bg-blue-50">
                <FaUser />
                View Offers
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-purple-600 transition-colors border border-purple-300 rounded-lg hover:bg-purple-50">
                <FaUser />
                Share Task
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-red-600 transition-colors border border-red-300 rounded-lg hover:bg-red-50">
                <FaUser />
                Delete Task
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
