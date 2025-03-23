import React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const Services: React.FC = () => {
  const engineerServices = [
    {
      title: 'Job Matching',
      description: 'Connect with relevant job opportunities based on your skills, experience, and location.',
      icon: '🔍'
    },
    {
      title: 'Profile Showcase',
      description: 'Create a professional profile highlighting your skills, certifications, and past projects.',
      icon: '👤'
    },
    {
      title: 'Bid on Projects',
      description: 'Submit proposals for projects that match your expertise and interests.',
      icon: '📝'
    },
    {
      title: 'Secure Payments',
      description: 'Get paid securely through our platform with milestone-based payment protection.',
      icon: '💰'
    },
    {
      title: 'Professional Growth',
      description: 'Access training resources and networking opportunities to enhance your career.',
      icon: '📈'
    }
  ];

  const clientServices = [
    {
      title: 'Find Qualified Professionals',
      description: 'Access a network of verified engineers and technicians for your projects.',
      icon: '👥'
    },
    {
      title: 'Post Job Requirements',
      description: 'Easily create detailed job postings with your project specifications.',
      icon: '📢'
    },
    {
      title: 'Review Proposals',
      description: 'Compare bids from multiple professionals to find the best match.',
      icon: '✅'
    },
    {
      title: 'Project Management',
      description: 'Track project progress and milestones through our intuitive dashboard.',
      icon: '📊'
    },
    {
      title: 'Sustainable Solutions',
      description: 'Get expert guidance on implementing renewable energy and clean tech solutions.',
      icon: '🌱'
    }
  ];

  const energyServices = [
    {
      title: 'Solar Power Solutions',
      description: 'Connect with experts in solar panel installation and maintenance.',
      icon: '☀️'
    },
    {
      title: 'Energy Efficiency Audits',
      description: 'Find professionals to assess and improve your energy consumption.',
      icon: '🔋'
    },
    {
      title: 'Renewable Energy Consulting',
      description: 'Get expert advice on transitioning to clean energy sources.',
      icon: '💡'
    },
    {
      title: 'Community Projects',
      description: 'Support initiatives bringing sustainable energy to underserved areas.',
      icon: '🏘️'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col pt-10 bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 animate-twinkle"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h5 className="text-green-600 uppercase tracking-wide font-semibold mb-2 drop-shadow-lg animate-fade-in">EMPOWERING CONNECTIONS</h5>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 drop-shadow-lg animate-float-slow">Linking Talent with Opportunity</h1>
            <p className="text-lg text-gray-600 animate-fade-in-up">
              Our comprehensive suite of services connects skilled professionals with meaningful projects while supporting clients in finding the perfect expertise for their needs.
            </p>
          </div>
        </div>
      </section>
      
      {/* Services Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {/* For Engineers */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-green-700 to-green-900 text-white shadow-lg shadow-green-500/40 hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-float-slow">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto shadow-lg animate-pulse-slow">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mt-4 drop-shadow-md">For Engineers</h3>
                <p className="text-gray-200 mt-2">Connect with top job opportunities tailored for engineers.</p>
              </div>
              
              <ul className="space-y-4">
                {engineerServices.map((service, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-2xl mr-4 animate-twinkle">{service.icon}</span>
                    <div>
                      <h4 className="font-semibold">{service.title}</h4>
                      <p className="text-gray-200 text-sm">{service.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8 text-center">
                <Link
                  to="/register?type=engineer"
                  className="inline-block px-6 py-2 bg-gradient-to-br from-green-600 to-green-700 text-white rounded-full hover:bg-yellow-100 hover:text-green-600 transition-all duration-300 shadow-lg shadow-green-500/40 animate-bounce-slow"
                >
                  Register as Engineer
                </Link>
              </div>
            </div>
            
            {/* For Clients */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-700 to-blue-900 text-white shadow-lg shadow-blue-500/40 hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-float-slow">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto shadow-lg animate-pulse-slow">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mt-4 drop-shadow-md">For Clients</h3>
                <p className="text-gray-200 mt-2">Find skilled professionals to meet your project needs.</p>
              </div>
              
              <ul className="space-y-4">
                {clientServices.map((service, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-2xl mr-4 animate-twinkle">{service.icon}</span>
                    <div>
                      <h4 className="font-semibold">{service.title}</h4>
                      <p className="text-gray-200 text-sm">{service.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8 text-center">
                <Link
                  to="/register?type=client"
                  className="inline-block px-6 py-2 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full hover:bg-yellow-100 hover:text-blue-600 transition-all duration-300 shadow-lg shadow-blue-500/40 animate-bounce-slow"
                >
                  Register as Client
                </Link>
              </div>
            </div>
            
            {/* Renewable Energy */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-yellow-700 to-yellow-900 text-white shadow-lg shadow-yellow-500/40 hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-float-slow">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto shadow-lg animate-pulse-slow">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mt-4 drop-shadow-md">Renewable Energy</h3>
                <p className="text-gray-200 mt-2">Empower your projects with sustainable energy technologies.</p>
              </div>
              
              <ul className="space-y-4">
                {energyServices.map((service, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-2xl mr-4 animate-twinkle">{service.icon}</span>
                    <div>
                      <h4 className="font-semibold">{service.title}</h4>
                      <p className="text-gray-200 text-sm">{service.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8 text-center">
                <Link
                  to="/contact"
                  className="inline-block px-6 py-2 bg-gradient-to-br from-yellow-600 to-yellow-700 text-white rounded-full hover:bg-green-100 hover:text-yellow-600 transition-all duration-300 shadow-lg shadow-yellow-500/40 animate-bounce-slow"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Preview */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="absolute inset-0 animate-fireflies"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 drop-shadow-lg animate-fade-in-up">How It Works</h2>
          <p className="max-w-2xl mx-auto mb-8 text-gray-600 animate-fade-in">
            Our platform makes it easy to connect with the right professionals or find the perfect projects.
          </p>
          <Link
            to="/how-it-works"
            className="inline-block px-6 py-2 bg-gradient-to-br from-gray-700 to-gray-900 text-white rounded-full hover:bg-yellow-100 hover:text-gray-900 transition-all duration-300 shadow-lg shadow-green-500/40 animate-bounce-slow"
          >
            See How It Works
          </Link>
        </div>
      </section>
      
      {/* Client CTA */}
      <section className="py-16 bg-white text-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-700 to-blue-900 text-white shadow-lg shadow-blue-500/40 hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-float-slow">
                <h2 className="text-3xl font-bold mb-4 drop-shadow-md">Looking for Skilled Engineers?</h2>
                <p className="mb-6 text-gray-200">
                  Post your project requirements and connect with qualified professionals who can deliver quality results.
                </p>
                <Link
                  to="/register?type=client"
                  className="inline-block px-6 py-2 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full hover:bg-yellow-100 hover:text-blue-600 transition-all duration-300 shadow-lg shadow-blue-500/40 animate-bounce-slow"
                >
                  Post a Job
                </Link>
              </div>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-green-700 to-green-900 text-white shadow-lg shadow-green-500/40 hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-float-slow">
                <h2 className="text-3xl font-bold mb-4 drop-shadow-md">Are You an Engineer?</h2>
                <p className="mb-6 text-gray-200">
                  Create your profile, showcase your skills, and get matched with relevant projects in your field.
                </p>
                <Link
                  to="/register?type=engineer"
                  className="inline-block px-6 py-2 bg-gradient-to-br from-green-600 to-green-700 text-white rounded-full hover:bg-yellow-100 hover:text-green-600 transition-all duration-300 shadow-lg shadow-green-500/40 animate-bounce-slow"
                >
                  Create Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Services;