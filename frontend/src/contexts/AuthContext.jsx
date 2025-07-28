import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        try {
          // Set the header for the verification request
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          // Call our new verification endpoint
          const response = await axios.get('http://127.0.0.1:8000/api/verify-token/');
          
          // If successful, set the user and token state
          setUser(response.data);
          setAccessToken(token);
        } catch (error) {
          // If verification fails, it means the token is bad. Log the user out.
          console.error("Token verification failed:", error);
          logout();
        }
      }
      setLoading(false); // Stop loading once verification is complete
    };

    verifyUser();
  }, []); // Run only once on initial app load

  const login = async (email, password, role) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login/', {
        email: email,
        pin: password,
        role: role,
      });

      const { token, user: userData } = response.data;
      
      localStorage.setItem('accessToken', token);
      localStorage.setItem('user', JSON.stringify(userData));
      
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setUser(userData);
      setAccessToken(token);

      return { success: true, user: userData };

    } catch (error) {
      console.error("Login failed:", error.response ? error.response.data : error.message);
      logout(); 
      return { success: false, error: error.response?.data?.detail || "An unknown error occurred." };
    }
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
  };

  // While verifying, we can show a loading screen or nothing
  if (loading) {
    return <div>Loading...</div>; // Or return null
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, accessToken, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
