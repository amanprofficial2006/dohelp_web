import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const response = await fetch('https://dohelp.newhopeindia17.com/api/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const responseData = await response.json();
        if (responseData.status && responseData.data) {
          // Map API fields to expected user object fields
          const userData = {
            ...responseData.data,
            id: responseData.data.id || responseData.data.user_id,
            profileImage: responseData.data.profile_image_url || responseData.data.profileImage,
            // Add other mappings if needed
          };
          setUser(userData);
        } else {
          console.error('Invalid response structure:', responseData);
          setUser(null);
        }
      } else {
        console.error('Failed to fetch profile:', response.status, response.statusText);
        setUser(null);
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        console.error('Profile fetch request timed out after 10 seconds');
      } else {
        console.error('Error fetching profile:', error.message || error);
      }
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const login = (userData, token) => {
    // Map API fields to expected user object fields
    const mappedUserData = {
      ...userData,
      profileImage: userData.profile_image_url || userData.profileImage,
      // Add other mappings if needed
    };
    setUser(mappedUserData);
    localStorage.setItem('user', JSON.stringify(mappedUserData));
    // Store numeric user ID separately for chat functionality
    if (userData.id || userData.user_id) {
      localStorage.setItem('user_id', String(userData.id || userData.user_id));
    }
    if (token) {
      sessionStorage.setItem('token', token);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    sessionStorage.removeItem('token');
  };

  const refreshProfile = () => {
    fetchProfile();
  };

  const value = {
    user,
    login,
    logout,
    refreshProfile,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
