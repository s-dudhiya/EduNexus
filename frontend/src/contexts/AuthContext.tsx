import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

interface User {
  id: number;
  email: string;
  full_name: string;
  role: 'student' | 'faculty';
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  accessToken: string | null;
  login: (email, password, role) => Promise<{ access: string; refresh: string; user: User }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem('accessToken'));

  useEffect(() => {
    const fetchUser = async () => {
      if (accessToken) {
        try {
          axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
          const { user_id } = jwtDecode(accessToken);
          const response = await axios.get(`/api/user/${user_id}/`);
          setUser(response.data);
        } catch (error) {
          console.error("Failed to fetch user or token is invalid", error);
          logout();
        }
      }
    };
    fetchUser();
  }, [accessToken]);

  const login = async (email, password, role) => {
    const response = await axios.post('/api/token/', { email, password, role });
    const { access, refresh } = response.data;
    
    localStorage.setItem('accessToken', access);
    localStorage.setItem('refreshToken', refresh);
    
    axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;
    
    const { user_id } = jwtDecode(access);
    const userResponse = await axios.get(`/api/user/${user_id}/`);
    
    setUser(userResponse.data);
    setAccessToken(access);

    return { access, refresh, user: userResponse.data };
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, accessToken, login, logout }}>
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
