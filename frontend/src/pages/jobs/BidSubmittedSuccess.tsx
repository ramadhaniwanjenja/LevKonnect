import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const BidSubmittedSuccess: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col pt-15">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center p-6 bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-800 mb-3">Bid Submitted Successfully!</h1>
          
          <p className="text-gray-600 mb-6">
            Your proposal has been submitted successfully. The client will review your bid and contact you if they're interested.
          </p>
          
          <div className="mb-6 p-4 bg-blue-50 rounded-lg text-blue-700 text-sm">
            <p className="font-medium mb-2">What happens next?</p>
            <ul className="text-left space-y-2">
              <li className="flex items-start">
                <span className="mr-2">1.</span>
                <span>Client reviews all submitted proposals</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">2.</span>
                <span>If selected, you'll receive a notification</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">3.</span>
                <span>You can discuss project details with the client</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">4.</span>
                <span>Once terms are agreed, the project begins</span>
              </li>
            </ul>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
            <Link
              to="/my-bids"
              className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium transition-colors duration-200 flex-grow"
            >
              View My Bids
            </Link>
            <Link
              to="/find-jobs"
              className="px-6 py-2 border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 rounded-md font-medium transition-colors duration-200 flex-grow"
            >
              Find More Jobs
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BidSubmittedSuccess;