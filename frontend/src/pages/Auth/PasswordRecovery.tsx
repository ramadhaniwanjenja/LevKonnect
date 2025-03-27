import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import axios from 'axios';

const PasswordRecovery: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [stage, setStage] = useState<'request' | 'verify' | 'reset'>('request');
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Use VITE_API_URL from environment variables
  const API_URL = import.meta.env.VITE_API_URL || 'https://levkonnect-backend.vercel.app';
  console.log('API_URL being used:', API_URL);

  // Check for token in URL to skip to reset stage
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tokenParam = params.get('token');
    if (tokenParam) {
      setToken(tokenParam);
      verifyResetToken(tokenParam);
    }
  }, [location]);

  const verifyResetToken = async (token: string) => {
    try {
      console.log('Verifying token with URL:', `${API_URL}/api/auth/verify-reset-token?token=${token}`);
      const response = await axios.get(`${API_URL}/api/auth/verify-reset-token?token=${token}`);
      console.log('Verify reset token response:', response.data);
      if (response.status === 200) {
        setStage('reset');
      }
    } catch (err) {
      console.error('Error verifying reset token:', err);
      if (axios.isAxiosError(err)) {
        console.error('Error response:', err.response?.data);
      }
      if (axios.isAxiosError(err)) {
        console.error('Error status:', err.response?.status);
      }
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Invalid or expired reset token. Please request a new reset link.');
      } else {
        setError('An unexpected error occurred');
      }
      setStage('request');
    }
  };

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError('Please enter your email address');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const response = await axios.post(`${API_URL}/api/auth/request-password-reset`, { email });
      if (response.status === 200) {
        setStage('verify');
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'An error occurred. Please try again.');
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      setPasswordError('Please fill in all fields');
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    setIsSubmitting(true);
    setPasswordError('');

    try {
      const response = await axios.post(`${API_URL}/api/auth/reset-password`, {
        token,
        newPassword,
      });
      if (response.status === 200) {
        navigate('/password-reset-success');
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setPasswordError(err.response?.data?.message || 'An error occurred. Please try again.');
      } else {
        setPasswordError('An unexpected error occurred');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Removed duplicate declaration of verifyResetToken

  const renderRequestForm = () => (
    <form onSubmit={handleRequestReset}>
      <div className="mb-6">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500"
          required
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mb-4 disabled:opacity-50"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Sending...
          </span>
        ) : (
          'Send Reset Link'
        )}
      </button>

      <div className="text-center">
        <Link to="/login" className="text-sm text-green-600 hover:text-green-800">
          Remember your password? Sign in
        </Link>
      </div>
    </form>
  );

  const renderVerifyForm = () => (
    <div className="text-center">
      <p className="text-gray-600 mb-4">
        We’ve sent a password reset link to <strong>{email}</strong>.
        Please check your inbox (and spam/junk folder) and click the link to reset your password.
      </p>
      <button
        onClick={() => setStage('request')}
        className="text-sm text-green-600 hover:text-green-800"
      >
        Back to email entry
      </button>
    </div>
  );

  const renderResetForm = () => (
    <form onSubmit={handleResetPassword}>
      <div className="mb-6">
        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
          New Password
        </label>
        <input
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Enter new password"
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500"
          required
        />
      </div>

      <div className="mb-6">
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm new password"
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500"
          required
        />
        {passwordError && <p className="mt-1 text-sm text-red-500">{passwordError}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mb-4 disabled:opacity-50"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Resetting...
        </span>
        ) : (
          'Reset Password'
        )}
      </button>
    </form>
  );

  const renderStageTitle = () => {
    switch (stage) {
      case 'request':
        return 'Forgot Your Password?';
      case 'verify':
        return 'Check Your Email';
      case 'reset':
        return 'Create New Password';
      default:
        return '';
    }
  };

  const renderStageDescription = () => {
    switch (stage) {
      case 'request':
        return "Enter your email address and we'll send you a link to reset your password.";
      case 'verify':
        return 'We’ve sent a password reset link to your email.';
      case 'reset':
        return 'Create a new password for your account.';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen flex flex-col pt-15">
      <Navbar />
      <div className="flex-grow flex items-center justify-center bg-gray-50 p-6">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">{renderStageTitle()}</h1>
            <p className="text-gray-600">{renderStageDescription()}</p>
          </div>
          {stage === 'request' && renderRequestForm()}
          {stage === 'verify' && renderVerifyForm()}
          {stage === 'reset' && renderResetForm()}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PasswordRecovery;