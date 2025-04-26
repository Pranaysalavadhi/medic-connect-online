
import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'sonner';

const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {},
  register: () => {},
});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // In a real app, this would be an API call to your backend
      // For demo purposes, we'll simulate a successful login
      const response = {
        token: 'mock-jwt-token',
        user: {
          id: '123',
          name: email.split('@')[0],
          email: email,
          role: email.includes('doctor') ? 'DOCTOR' : 'PATIENT',
        }
      };
      
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      setUser(response.user);
      setIsAuthenticated(true);
      
      toast.success('Logged in successfully!');
      return response.user;
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Failed to login. Please check your credentials and try again.');
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      // In a real app, this would be an API call to your backend
      // For demo purposes, we'll simulate a successful registration
      const response = {
        token: 'mock-jwt-token',
        user: {
          id: Math.floor(Math.random() * 1000).toString(),
          name: userData.name,
          email: userData.email,
          role: userData.role,
        }
      };
      
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      setUser(response.user);
      setIsAuthenticated(true);
      
      toast.success('Registered successfully!');
      return response.user;
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Failed to register. Please try again.');
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
    toast.success('Logged out successfully!');
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
