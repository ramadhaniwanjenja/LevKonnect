import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';

const PasswordResetSuccess: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <section className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden p-8 text-center">
            <h2 className="text-2xl font-bold mb-4 text-green-600">Password Reset Successfully!</h2>
            <p className="text-gray-600 mb-6">
              Your password has been reset. You will be redirected to the login page shortly.
            </p>
            <p className="text-gray-600">
              If you are not redirected,{' '}
              <Link to="/login" className="text-blue-600 hover:underline">
                click here
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default PasswordResetSuccess;