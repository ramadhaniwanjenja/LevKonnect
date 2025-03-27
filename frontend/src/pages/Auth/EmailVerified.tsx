import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import axios from 'axios';

const EmailVerified: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [, setToken] = useState('');
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState('');

  // Use VITE_API_URL from environment variables
  const API_URL = import.meta.env.VITE_API_URL || 'https://levkonnect-backend.onrender.com';
  console.log('API_URL being used:', API_URL);

  // Extract token from URL query parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tokenParam = params.get('token');
    if (tokenParam) {
      setToken(tokenParam);
      verifyEmail(tokenParam);
    } else {
      setError('No verification token found. Please use the link from your email.');
    }
  }, [location]);

  const verifyEmail = async (token: string) => {
    try {
      const response = await axios.get(`${API_URL}/verify-email?token=${token}`);
      if (response.status === 200) {
        setVerified(true);
        setTimeout(() => navigate('/dashboard'), 3000);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Failed to verify email. The token may be invalid or expired.');
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <section className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden p-8 text-center">
            {verified ? (
              <>
                <div className="mb-4">
                  <svg
                    className="w-16 h-16 mx-auto text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold mb-4 text-green-600">Email Verified Successfully!</h2>
                <p className="text-gray-600 mb-6">
                  Your email has been verified. You will be redirected to your dashboard shortly.
                </p>
                <p className="text-gray-600">
                  If you are not redirected,{' '}
                  <Link to="/dashboard" className="text-blue-600 hover:underline">
                    click here
                  </Link>
                  .
                </p>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Verifying Your Email...</h2>
                {error ? (
                  <p className="text-red-500 mb-6">{error}</p>
                ) : (
                  <p className="text-gray-600 mb-6">Please wait while we verify your email address.</p>
                )}
                <Link to="/register" className="text-blue-600 hover:underline">
                  Back to Register
                </Link>
              </>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default EmailVerified;