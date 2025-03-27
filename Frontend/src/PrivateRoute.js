import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import JobSeekerProfile from './components/JobSeekerOrdersPage';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    
    return <Navigate to="/login" />;
  }

  <JobSeekerProfile></JobSeekerProfile>
  return children;
};

export default PrivateRoute;
