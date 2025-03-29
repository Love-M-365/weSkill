import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Homepage from './components/Homepage';
import RegisterPage from './components/RegisterPage';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import JobSeeker from './components/JobSeeker';
import JobProvider from './components/JobProvider';
import ProfileList from './components/ProfilePage';
import JobSeekerDashboard from './components/JobSeekerProfilePage';
import ProfileDetails from './components/ProfileDetails';
import TaskList from './components/TaskList';
import Questionnaire from './components/AiQuestions';
import QuestionnairePage from './components/JobSeekerQ';
import MyOrders from './components/MyOrders';
import PostWorkPage from './components/Postwork';
import JobSeekerProfile from './components/JobSeekerOrdersPage';
import PaymentPage from './components/PaymentPage';
import { AuthProvider } from './AuthContext';
import WelcomeMsg from './components/WelcomeMsg';
import Profiles from './components/Profiles';


const App = () => {
  return (
    
       <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/registerpage" element={<RegisterPage />} />
          <Route path="/loginpage" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/job-Seeker" element={<JobSeekerDashboard />} />
          <Route path="/job-provider" element={<JobProvider />} />
          <Route path="/profiles" element={<ProfileList />} />
          <Route path="/profile-details" element={<ProfileDetails />} />
          <Route path="/taskList" element={<TaskList />} />
          <Route path="/aiquestions" element={<Questionnaire />} />
          <Route path="/questionnaire" element={<QuestionnairePage />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/postwork" element={<PostWorkPage />} />
          <Route path="/jobseekerorderspage" element={<JobSeekerProfile />} />
          <Route path="/paymentpage" element={<PaymentPage />} />
          <Route path="/welcomemsg" element={<WelcomeMsg />} />
          <Route path="/profilesDS" element={<Profiles />} />
          
          

          
        </Routes>
  
  );
};

export default App;
