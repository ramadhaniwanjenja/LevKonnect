import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import axios from 'axios';

const EmailVerified: React.FC = () => {
 const location = useLocation();
 const navigate = useNavigate();
 const [isLoading, setIsLoading] = useState(true);
 const [verified, setVerified] = useState(false);
 const [error, setError] = useState('');

 // Use VITE_API_URL from environment variables
 const API_URL = import.meta.env.VITE_API_URL || 'https://levkonnect-backend.onrender.com';

 useEffect(() => {
 const verifyEmailProcess = async () => {
 try {
 // Extract token from URL query parameters
 const params = new URLSearchParams(location.search);
 const tokenParam = params.get('token');

 // Validate token existence
 if (!tokenParam) {
 setError('No verification token found. Please check your email and try again.');
 setIsLoading(false);
 return;
 }

 // Log debugging information
 console.log('Verification Token:', tokenParam);
 console.log('Full Verification URL:', `${API_URL}/api/auth/verify-email?token=${tokenParam}`);

 // Attempt email verification
 const response = await axios.get(`${API_URL}/api/auth/verify-email`, {
 params: { token: tokenParam },
 headers: {
 'Content-Type': 'application/json',
 'Accept': 'application/json'
 }
 });

 // Handle successful verification
 if (response.status === 200) {
 setVerified(true);
 setIsLoading(false);

 // Redirect after a short delay
 setTimeout(() => {
 navigate('/login');
 }, 3000);
 }
 } catch (err) {
 setIsLoading(false);

 // Detailed error handling
 if (axios.isAxiosError(err)) {
 console.error('Verification Error Response:', err.response);

 // Use more specific error messages
 if (err.response?.status === 400) {
 setError(err.response.data.message || 'Invalid or expired verification token.');
 } else if (err.response?.status === 500) {
 setError('Server error. Please try again later.');
 } else {
 setError('An unexpected error occurred during email verification.');
 }
 } else {
 setError('Network error. Please check your connection.');
 }
 }
 };

 verifyEmailProcess();
 }, [location, navigate]);

 return (
 <div className="min-h-screen flex flex-col">
 <Navbar />
 <section className="flex-grow py-12 bg-gray-50">
 <div className="container mx-auto px-4">
 <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden p-8 text-center">
 {isLoading ? (
 <div>
 <h2 className="text-2xl font-bold mb-4 text-gray-800">Verifying Your Email...</h2>
 <p className="text-gray-600 mb-6">Please wait while we process your verification.</p>
 </div>
 ) : verified ? (
 <div>
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
 <h2 className="text-2xl font-bold mb-4 text-green-600">Email Verified Successfully!</h2>
 <p className="text-gray-600 mb-6">
 Your email has been verified. You will be redirected to login shortly.
 </p>
 <p className="text-gray-600">
 If you are not redirected,{' '}
 <Link to="/login" className="text-blue-600 hover:underline">
 click here to login
 </Link>
 </p>
 </div>
 ) : (
 <div>
 <h2 className="text-2xl font-bold mb-4 text-red-600">Email Verification Failed</h2>
 <p className="text-red-500 mb-6">{error}</p>
 <div className="flex justify-center space-x-4">
 <Link
 to="/register"
 className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
 >
 Back to Register
 </Link>
 <Link
 to="/resend-verification"
 className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
 >
 Resend Verification
 </Link>
 </div>
 </div>
 )}
 </div>
 </div>
 </section>
 
 </div>
 );
};

export default EmailVerified;