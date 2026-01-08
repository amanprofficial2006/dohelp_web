import { createContext, useContext, useState, useEffect } from 'react';
import {
  FaTruck,
  FaBroom,
  FaLaptop,
  FaShoppingBag,
  FaHandshake,
  FaUsers,
  FaWrench
} from "react-icons/fa";

const CategoriesContext = createContext();

export const useCategories = () => {
  const context = useContext(CategoriesContext);
  if (!context) {
    throw new Error('useCategories must be used within a CategoriesProvider');
  }
  return context;
};

// Icon mapping based on category name
const getCategoryIcon = (name) => {
  const iconMap = {
    'Delivery': FaTruck,
    'Cleaning': FaBroom,
    'Online Help': FaLaptop,
    'Errands': FaShoppingBag,
    'Handyman': FaHandshake,
    'Tutoring': FaUsers,
    'Other': FaWrench
  };
  return iconMap[name] || FaWrench;
};

// Color mapping based on category name
const getCategoryColor = (name) => {
  const colorMap = {
    'Delivery': 'from-blue-500 to-cyan-500',
    'Cleaning': 'from-green-500 to-emerald-500',
    'Online Help': 'from-purple-500 to-pink-500',
    'Errands': 'from-orange-500 to-red-500',
    'Handyman': 'from-amber-500 to-yellow-500',
    'Tutoring': 'from-indigo-500 to-blue-500',
    'Other': 'from-gray-500 to-gray-600'
  };
  return colorMap[name] || 'from-gray-500 to-gray-600';
};

export const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const response = await fetch('https://dohelp.newhopeindia17.com/api/categories/index', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const responseData = await response.json();
        if (responseData.status && responseData.data) {
          // Map API data to expected format
          const mappedCategories = responseData.data
            .filter(cat => cat.is_active) // Only active categories
            .map(cat => ({
              id: cat.id,
              name: cat.name,
              image: cat.image_url || cat.image,
              icon: getCategoryIcon(cat.name),
              color: getCategoryColor(cat.name),
              is_active: cat.is_active
            }));
          setCategories(mappedCategories);
        } else {
          throw new Error('Invalid response structure');
        }
      } else {
        throw new Error(`Failed to fetch categories: ${response.status}`);
      }
    } catch (error) {
      console.error('Error fetching categories:', error.message || error);
      setError(error.message || 'Failed to load categories');

      // Fallback to hardcoded categories if API fails
      const fallbackCategories = [
        { id: 1, name: "Delivery", icon: FaTruck, color: "from-blue-500 to-cyan-500" },
        { id: 2, name: "Cleaning", icon: FaBroom, color: "from-green-500 to-emerald-500" },
        { id: 3, name: "Online Help", icon: FaLaptop, color: "from-purple-500 to-pink-500" },
        { id: 4, name: "Errands", icon: FaShoppingBag, color: "from-orange-500 to-red-500" },
        { id: 5, name: "Handyman", icon: FaHandshake, color: "from-amber-500 to-yellow-500" },
        { id: 6, name: "Other", icon: FaWrench, color: "from-gray-500 to-gray-600" },
      ];
      setCategories(fallbackCategories);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const refreshCategories = () => {
    fetchCategories();
  };

  const value = {
    categories,
    loading,
    error,
    refreshCategories
  };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
