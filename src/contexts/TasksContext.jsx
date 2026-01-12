import { createContext, useContext, useState, useEffect } from 'react';

const TasksContext = createContext();

export const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error('useTasks must be used within a TasksProvider');
  }
  return context;
};

export const TasksProvider = ({ children }) => {
  const [userTasks, setUserTasks] = useState([]);
  const [postedTasks, setPostedTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [postedTasksLoading, setPostedTasksLoading] = useState(true);
  const [error, setError] = useState(null);
  const [postedTasksError, setPostedTasksError] = useState(null);

  const fetchUserTasks = async () => {
    try {
      setLoading(true);
      setError(null);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      // Get user ID from localStorage or context
      const token = sessionStorage.getItem('token'); // Default to 1 for demo

      const response = await fetch('https://dohelp.newhopeindia17.com/api/post-task', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        signal: controller.signal
      });
  

      clearTimeout(timeoutId);

      if (response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const responseData = await response.json();
          if (responseData.success && responseData.tasks) {
            // Map API data to expected format
            const mappedTasks = responseData.tasks.map(task => ({
              id: task.id,
              title: task.title,
              status: task.status,
              amount: `₹${task.budget || task.amount || 0}`,
              time: formatTaskTime(task.created_at || task.updated_at),
              progress: calculateProgress(task.status)
            }));
            setUserTasks(mappedTasks);
          } else {
            throw new Error('Invalid response structure');
          }
        } else {
          throw new Error('Server returned non-JSON response');
        }
      } else {
        throw new Error(`Failed to fetch tasks: ${response.status}`);
      }
    } catch (error) {
      console.error('Error fetching user tasks:', error.message || error);
      setError(error.message || 'Failed to load tasks');

      // Fallback to demo data if API fails
      const fallbackTasks = [
        {
          id: 101,
          title: "Office Documents Delivery",
          status: "in-progress",
          amount: "₹450",
          time: "Today, 3:00 PM",
          progress: 60
        },
        {
          id: 102,
          title: "Pet Sitting",
          status: "pending",
          amount: "₹1200",
          time: "Tomorrow, 10:00 AM",
          progress: 30
        },
        {
          id: 103,
          title: "Gardening Help",
          status: "completed",
          amount: "₹900",
          time: "Yesterday",
          progress: 100
        },
      ];
      setUserTasks(fallbackTasks);
    } finally {
      setLoading(false);
    }
  };

  const fetchPostedTasks = async () => {
    try {
      setPostedTasksLoading(true);
      setPostedTasksError(null);

      const token = sessionStorage.getItem('token');

      const response = await fetch('https://dohelp.newhopeindia17.com/api/post-task', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (data.success) {
        const mappedTasks = data.tasks.map(task => ({
          id: task.id,
          title: task.title,
          description: task.description,
          category: task.category,
          amount: `₹${task.amount}`,
          location: task.location,
          created_at: task.created_at,
          postedTime: getPostedTime(task.created_at),
          deadline: new Date(task.deadline).toLocaleDateString(),
          status: task.status,
          offers: 0,
          acceptedBy: null,
          urgent: task.urgency_level === 'urgent'
        }));
        setPostedTasks(mappedTasks);
      } else {
        throw new Error('Failed to fetch posted tasks');
      }
    } catch (error) {
      console.error('Error fetching posted tasks:', error);
      setPostedTasksError(error.message || 'Failed to load posted tasks');

      // Fallback to demo data if API fails
      const fallbackTasks = [
        {
          id: 201,
          title: "Office Documents Delivery",
          description: "Need to deliver important documents to office",
          category: "Delivery",
          amount: "₹450",
          location: "Mumbai, Maharashtra",
          created_at: new Date().toISOString(),
          postedTime: "2 hours ago",
          deadline: new Date(Date.now() + 86400000).toLocaleDateString(),
          status: "open",
          offers: 3,
          acceptedBy: null,
          urgent: false
        },
        {
          id: 202,
          title: "Pet Sitting Service",
          description: "Looking for someone to take care of my dog for 3 days",
          category: "Pet Care",
          amount: "₹1200",
          location: "Delhi, India",
          created_at: new Date(Date.now() - 86400000).toISOString(),
          postedTime: "1 day ago",
          deadline: new Date(Date.now() + 172800000).toLocaleDateString(),
          status: "assigned",
          offers: 5,
          acceptedBy: "John Doe",
          urgent: true
        },
        {
          id: 203,
          title: "Gardening Help",
          description: "Need help with lawn mowing and garden maintenance",
          category: "Gardening",
          amount: "₹900",
          location: "Bangalore, Karnataka",
          created_at: new Date(Date.now() - 172800000).toISOString(),
          postedTime: "2 days ago",
          deadline: new Date(Date.now() + 259200000).toLocaleDateString(),
          status: "completed",
          offers: 2,
          acceptedBy: "Jane Smith",
          urgent: false
        },
      ];
      setPostedTasks(fallbackTasks);
    } finally {
      setPostedTasksLoading(false);
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

  const formatTaskTime = (dateString) => {
    if (!dateString) return "Recently";

    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "Today";
    if (diffDays === 2) return "Yesterday";
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    return date.toLocaleDateString();
  };

  const calculateProgress = (status) => {
    switch (status) {
      case 'completed':
        return 100;
      case 'in-progress':
      case 'accepted':
        return 60;
      case 'pending':
        return 30;
      default:
        return 0;
    }
  };

  useEffect(() => {
    fetchUserTasks();
    fetchPostedTasks();
  }, []);

  const refreshTasks = () => {
    fetchUserTasks();
  };

  const refreshPostedTasks = () => {
    fetchPostedTasks();
  };

  const value = {
    userTasks,
    postedTasks,
    loading,
    postedTasksLoading,
    error,
    postedTasksError,
    refreshTasks,
    refreshPostedTasks
  };

  return (
    <TasksContext.Provider value={value}>
      {children}
    </TasksContext.Provider>
  );
};
