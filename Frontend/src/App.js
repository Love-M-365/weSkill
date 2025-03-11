import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Homepage from './components/Homepage';
import RegisterPage from './components/RegisterPage';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';

const App = () => {
  return (

    <Router>
       <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/registerpage" element={<RegisterPage />} />
          <Route path="/loginpage" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          

          
        </Routes>
    </Router>
  );
};

export default App;
