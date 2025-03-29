import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { FaHardHat, FaBuilding, FaSolarPanel } from 'react-icons/fa';

const Home: React.FC = () => {
  const stats = [
    { value: '200+', label: 'Engineers Registered' },
    { value: '150+', label: 'Completed Projects' },
    { value: '15+', label: 'Renewable Energy Solutions' },
    { value: '5+', label: 'African Countries' },
  ];

  const testimonials = [
    {
      quote: "LevKonnect helped me find talented engineers for our solar installation project in rural Tanzania. The process was seamless and the results were outstanding.",
      author: "Maria Nzomo",
      position: "Project Manager, SunPower Africa"
    },
    {
      quote: "As an engineer specializing in renewable energy, LevKonnect opened doors to projects I wouldn't have found otherwise. My career has grown tremendously.",
      author: "Emmanuel Osei",
      position: "Solar Engineer"
    },
  ];

  return (
    <div className="min-h-screen flex flex-col pt-10 bg-white overflow-hidden">
      {/* Hero Section */}
      <Navbar />
      <Hero />
      
      {/* Mission Statement */}
      <section className="py-20 bg-white text-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 animate-twinkle"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block mb-6 animate-fade-in">
              <div className="h-1 w-24 bg-gradient-to-r from-green-400 to-green-600 mx-auto mb-4"></div>
              <h2 className="text-4xl font-bold text-gray-900 drop-shadow-lg">Our Mission</h2>
              <div className="h-1 w-24 bg-gradient-to-r from-green-400 to-green-600 mx-auto mt-4"></div>
            </div>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed animate-fade-in-up">
              LevKonnect aims to revolutionise the engineering sector in Africa by creating a digital platform that connects skilled engineers with job opportunities in solar energy, electrical installation, and related technical services. The platform serves as a bridge between clients, companies, and engineers, promoting clean energy adoption, job creation, and professional growth.
            </p>
            <Link 
              to="/about" 
              className="inline-flex items-center px-8 py-3 border-2 border-green-600 text-green-600 bg-white hover:bg-green-600 hover:text-white transition-all duration-300 rounded-md shadow-lg shadow-green-500/20 font-medium animate-bounce-slow"
            >
              Learn More About Us
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white text-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="text-center p-6 rounded-lg bg-white shadow-lg shadow-green-500/20 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-green-600"></div>
                  <div className="text-5xl font-bold text-green-600 mb-3 animate-pulse-slow">{stat.value}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16 bg-white text-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 drop-shadow-lg animate-fade-in text-gray-900">How We Help</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-white shadow-lg shadow-green-500/20 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="flex justify-center mb-6">
                <FaHardHat className="w-20 h-20 text-green-600 animate-float-slow" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-center text-gray-900">For Engineers</h3>
              <ul className="list-disc pl-5 text-gray-600 mb-6">
                <li>Access to job opportunities</li>
                <li>Project matching based on skills</li>
                <li>Secure payment system</li>
                <li>Professional growth resources</li>
              </ul>
              <div className="text-center">
                <Link 
                  to="/services" 
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-300 inline-block"
                >
                  Learn more →
                </Link>
              </div>
            </div>
            
            <div className="p-6 rounded-2xl bg-white shadow-lg shadow-green-500/20 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="flex justify-center mb-6">
                <FaBuilding className="w-20 h-20 text-green-600 animate-float-slow" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-center text-gray-900">For Clients</h3>
              <ul className="list-disc pl-5 text-gray-600 mb-6">
                <li>Access to verified professionals</li>
                <li>Post job requirements easily</li>
                <li>Track project milestones</li>
                <li>Support for sustainable solutions</li>
              </ul>
              <div className="text-center">
                <Link 
                  to="/services" 
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-300 inline-block"
                >
                  Learn more →
                </Link>
              </div>
            </div>
            
            <div className="p-6 rounded-2xl bg-white shadow-lg shadow-green-500/20 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="flex justify-center mb-6">
                <FaSolarPanel className="w-20 h-20 text-green-600 animate-float-slow" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-center text-gray-900">Renewable Energy</h3>
              <ul className="list-disc pl-5 text-gray-600 mb-6">
                <li>Solar power solutions</li>
                <li>Clean energy consultations</li>
                <li>Sustainable project planning</li>
                <li>Community awareness programs</li>
              </ul>
              <div className="text-center">
                <Link 
                  to="/services" 
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-300 inline-block"
                >
                  Learn more →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-white text-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 drop-shadow-lg animate-fade-in text-gray-900">What People Say</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="p-6 bg-white rounded-2xl shadow-lg shadow-green-500/20 transform transition hover:scale-105 duration-300">
                <p className="italic text-gray-600 mb-4">"{testimonial.quote}"</p>
                <div className="font-semibold text-green-600">{testimonial.author}</div>
                <div className="text-sm text-gray-500">{testimonial.position}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-white text-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 animate-twinkle"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl font-bold mb-6 drop-shadow-lg animate-fade-in-up text-gray-900">Ready to Connect?</h2>
          <p className="max-w-2xl mx-auto mb-8 text-gray-600 animate-fade-in">
            Join our platform to find opportunities or skilled professionals for your projects.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/register" 
              className="px-8 py-3 bg-green-600 text-white font-medium rounded-full hover:bg-green-700 transition-transform duration-300 transform hover:scale-105 shadow-lg shadow-green-500/20 animate-bounce-slow"
            >
              Register Now
            </Link>
            <Link 
              to="/contact" 
              className="px-8 py-3 border-2 border-green-600 text-green-600 bg-white font-medium rounded-full hover:bg-green-600 hover:text-white transition-transform duration-300 transform hover:scale-105 shadow-lg shadow-green-500/20 animate-bounce-slow"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Home;