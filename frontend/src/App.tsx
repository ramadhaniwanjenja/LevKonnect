import './App.css'
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from './components/Footer';
import Contact from './pages/Contact';
import HowItWorks from './pages/HowItWorks';
import Services from './pages/Services';
import About from './pages/About';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Login from './pages/Auth/Login';
import Dashboard from './pages/dashboard/Dashboard'; 
import JobPostingPage from './pages/jobs/PostJob';
import JobListingPage from './pages/jobs/FindJobs';
import BidSubmissionPage from './pages/jobs/JobPostedSuccess';
import ProjectManagementPage from './pages/projects/ManageProject';
import Home from './pages/Home';
import Register from './pages/Auth/Register';
import PostJob from './pages/jobs/PostJob';
import JobPostedSuccess from './pages/jobs/JobPostedSuccess';
import FindJobs from './pages/jobs/FindJobs';
import JobDetails from './pages/jobs/JobDetails';
import BidSubmittedSuccess from './pages/jobs/BidSubmittedSuccess';
import MyBids from './pages/jobs/MyBids';
import Profile from './pages/dashboard/Profile';
import Messages from './pages/dashboard/Messages';
import ManageProjects from './pages/projects/ManageProject';
import PasswordRecovery from './pages/Auth/PasswordRecovery';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import ActiveProjects from './pages/projects/ActiveProjects';
import ProjectDetails from './pages/projects/ProjectDetails';
import EngineerProfile from './pages/dashboard/EngineerProfile';
import ClientProfile from './pages/dashboard/Clientprofile';
import EmailVerified from './pages/Auth/EmailVerified';
import PasswordResetSuccess from './pages/Auth/PasswordResetSuccess';
import CheckEmail from './pages/Auth/CheckEmail';
import EngineerDashboard from './pages/dashboard/EngineerDashboard';
import ProtectedRoute from './components/ProtectedRoute'; // Ensure this path is correct or update it to the correct path
import ErrorBoundary from './components/ErrorBoundary';
import ClientProjectDetails from './pages/projects/ClientProjectDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/post-job" element={<JobPostingPage />} />
        <Route path="/jobs" element={<JobListingPage />} />
        <Route path="/jobs/:id" element={<BidSubmissionPage />} />
        <Route path="/projects" element={<ProjectManagementPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/register" element={<Register />} />
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/job-posted-success" element={<JobPostedSuccess />} />
        <Route path="/find-jobs" element={<ErrorBoundary> <FindJobs /> </ErrorBoundary> } />
        <Route path="/job-details/:id" element={<ProtectedRoute allowedTypes={['engineer']}><JobDetails /></ProtectedRoute>} />
        <Route path="/bid-submitted" element={<BidSubmittedSuccess />} />
        <Route path="/my-bids" element={<MyBids />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/manage-projects" element={<ManageProjects />} />
        <Route path="/password-recovery" element={<PasswordRecovery />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/active-projects" element={<ActiveProjects />} />
        <Route path="/project-details" element={<ProjectDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/engineer-profile" element={<EngineerProfile />} />
        <Route path="/client-profile" element={<ClientProfile />} /> 
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/email-verified' element={<EmailVerified />} />
        <Route path='/password-reset-success' element={<PasswordResetSuccess />} />
        <Route path='/check-email' element={<CheckEmail />} />
        <Route path="/project-details/:id" element={<ClientProjectDetails />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={<ProtectedRoute allowedTypes={['client']}><Dashboard /></ProtectedRoute>}/>
        <Route path="/engineer-dashboard" element={<ProtectedRoute allowedTypes={['engineer']}><EngineerDashboard /></ProtectedRoute> }/>
      </Routes>
    </Router>
  );
}

export default App;
