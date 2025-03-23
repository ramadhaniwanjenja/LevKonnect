import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const JobPostedSuccess: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col pt-15">
      <Navbar />
      
      <div className="flex-grow flex flex-col items-center justify-center p-6 bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Job Posted Successfully!</h1>
          <p className="text-gray-600 mb-6">
            Your job has been successfully posted on LevKonnect. Engineers will be able to see your job and submit bids.
          </p>
          
          <div className="space-y-4">
            <Link 
              to="/dashboard" 
              className="block w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-md transition duration-200"
            >
              Return to Dashboard
            </Link>
            <Link 
              to="/post-job" 
              className="block w-full py-2 px-4 border border-gray-300 hover:bg-gray-50 rounded-md transition duration-200"
            >
              Post Another Job
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default JobPostedSuccess;