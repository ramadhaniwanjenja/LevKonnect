import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';

const CheckEmail: React.FC = () => {
  const location = useLocation();
  const email = new URLSearchParams(location.search).get('email') || 'your email';

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <section className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden p-8 text-center">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Check Your Email</h2>
            <p className="text-gray-600 mb-6">
              We’ve sent a verification link to{' '}
              <span className="font-medium">{email}</span>. Please check your inbox (and
              spam/junk folder) and click the link to verify your account.
            </p>
            <p className="text-gray-600">
              Didn’t receive the email?{' '}
              <Link to="/register" className="text-blue-600 hover:underline">
                Try registering again
              </Link>
              .
            </p>
            <div className="mt-6">
              <Link to="/login" className="text-blue-600 hover:underline">
                Go to Login
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default CheckEmail;