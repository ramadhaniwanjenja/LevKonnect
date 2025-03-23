import React from 'react';
import { useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
  const navigate = useNavigate();

  const handleServicesClick = () => {
    navigate('/services');
  };

  return (
    <section
      id="home"
      className="relative bg-cover bg-center min-h-screen flex items-center justify-center text-center"
      style={{ backgroundImage: "url('/home.png')" }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto text-left">
        <h1 className="text-6xl md:text-7xl font-bold text-white mb-4">
          Connect with Experts
        </h1>
        <p className="text-lg md:text-xl text-white mb-6">
          Find skilled professionals effortlessly
        </p>
        <button 
          onClick={handleServicesClick}
          className="bg-green-600 text-white px-6 py-3 text-lg font-semibold rounded shadow-lg hover:bg-green-700 transition">
          VIEW SERVICES
        </button>
      </div>
    </section>
  );
};

export default Hero;