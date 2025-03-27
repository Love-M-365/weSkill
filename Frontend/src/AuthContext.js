import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // User info
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Simulate fetching logged-in user info on app load
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // Verify token from backend and fetch user info
      fetch('http://localhost:5000/api/auth/verify', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setUser(data.user); // Set user info
          } else {
            localStorage.removeItem('authToken');
          }
        })
        .catch(() => localStorage.removeItem('authToken'))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = (token, userData) => {
    localStorage.setItem('authToken', token); // Save token
    setUser(userData);
    navigate('/job-seeker');
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    navigate('/login');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
