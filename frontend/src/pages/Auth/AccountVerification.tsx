import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import axios from 'axios';

const AccountVerification: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [tokenFromURL, setTokenFromURL] = useState('');
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const API_URL = import.meta.env.VITE_API_URL || 'https://levkonnect-backend.onrender.com';
  console.log('API_URL being used:', API_URL);

  // Extract email and token from URL query parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const emailParam = params.get('email');
    const tokenParam = params.get('token');
    if (emailParam) setEmail(emailParam);
    if (tokenParam) setTokenFromURL(tokenParam);
  }, [location]);

  const handleCodeChange = (index: number, value: string) => {
    if (/^[0-9]*$/.test(value)) {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = verificationCode.join('');

    if (code.length !== 6) {
      setError('Please enter the 6-digit verification code');
      return;
    }

    setIsVerifying(true);
    setError('');

    try {
      const response = await axios.get(`${API_URL}/api/auth/verify-email?token=${tokenFromURL}`);
      if (response.status === 200) {
        setSuccess(true);
        setTimeout(() => navigate('/dashboard'), 2000);
      }
    } catch (err) {
      setError('Invalid or expired verification token. Try resending.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    setError('');
    try {
      // Placeholder for resend API call
      await axios.post('${API_URL}/api/auth/resend-verification', { email });
      setError('Verification email resent. Please check your inbox.');
    } catch (err) {
      setError('Failed to resend verification email. Try again later.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <section className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden p-8">
            <h2 className="text-2xl font-bold mb-4 text-center">Verify Your Account</h2>
            <p className="text-gray-600 mb-6 text-center">
              We’ve sent a verification code to <span className="font-medium">{email || 'your email'}</span>.
              Please enter the 6-digit code below to verify your account.
            </p>

            {success ? (
              <div className="text-center">
                <p className="text-green-600 font-medium mb-4">Account verified successfully!</p>
                <p className="text-gray-600">Redirecting to dashboard...</p>
              </div>
            ) : (
              <form onSubmit={handleVerify}>
                <div className="flex justify-between mb-6">
                  {verificationCode.map((digit, index) => (
                    <input
                      key={index}
                      id={`code-${index}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleCodeChange(index, e.target.value)}
                      className="w-12 h-12 text-center text-lg border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ))}
                </div>

                {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

                <button
                  type="submit"
                  className={`w-full py-3 rounded font-medium text-white bg-blue-600 hover:bg-blue-700 ${isVerifying ? 'opacity-70 cursor-not-allowed' : ''}`}
                  disabled={isVerifying}
                >
                  {isVerifying ? 'Verifying...' : 'Verify Account'}
                </button>

                <div className="mt-4 text-center">
                  <p className="text-gray-600">
                    Didn’t receive the code?{' '}
                    <button
                      type="button"
                      onClick={handleResend}
                      className="text-blue-600 hover:underline"
                    >
                      Resend Code
                    </button>
                  </p>
                </div>
              </form>
            )}

            <div className="mt-6 text-center">
              <Link to="/register" className="text-blue-600 hover:underline">
                Back to Register
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default AccountVerification;