import React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const HowItWorks: React.FC = () => {
  const engineerSteps = [
    {
      step: 1,
      title: 'Create Your Profile',
      description: 'Register and build a comprehensive profile showcasing your skills, experience, certifications, and portfolio.',
      icon: '👤'
    },
    {
      step: 2,
      title: 'Explore Opportunities',
      description: 'Browse available projects or get automatically matched with relevant opportunities based on your profile.',
      icon: '🔍'
    },
    {
      step: 3,
      title: 'Submit Proposals',
      description: 'Apply to projects with detailed proposals outlining your approach, timeline, and cost estimations.',
      icon: '📝'
    },
    {
      step: 4,
      title: 'Get Selected',
      description: 'If your proposal is accepted, you\'ll be connected with the client to discuss project details further.',
      icon: '✅'
    },
    {
      step: 5,
      title: 'Complete Milestones',
      description: 'Work on the project, submitting deliverables according to agreed-upon milestones.',
      icon: '🏆'
    },
    {
      step: 6,
      title: 'Receive Payment',
      description: 'Get paid securely through our platform as you complete milestones and the overall project.',
      icon: '💰'
    }
  ];

  const clientSteps = [
    {
      step: 1,
      title: 'Register Your Account',
      description: 'Create an account as a client, providing details about your organization or personal needs.',
      icon: '✍️'
    },
    {
      step: 2,
      title: 'Post Your Project',
      description: 'Submit a detailed project description including requirements, budget, timeline, and other specifications.',
      icon: '📢'
    },
    {
      step: 3,
      title: 'Review Proposals',
      description: 'Receive and evaluate proposals from qualified engineers and professionals.',
      icon: '👀'
    },
    {
      step: 4,
      title: 'Select Professional',
      description: 'Choose the best candidate based on their expertise, proposal, and reviews from previous clients.',
      icon: '🤝'
    },
    {
      step: 5,
      title: 'Track Progress',
      description: 'Monitor project development through our platform with regular updates and milestone tracking.',
      icon: '📊'
    },
    {
      step: 6,
      title: 'Approve & Pay',
      description: 'Review completed work, approve milestones, and release secure payments for completed work.',
      icon: '💲'
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
            <h5 className="text-green-600 uppercase tracking-wide font-semibold mb-2 drop-shadow-lg animate-fade-in">SIMPLE PROCESS</h5>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 drop-shadow-lg animate-float-slow">How LevKonnect Works</h1>
            <p className="text-lg text-gray-600 animate-fade-in-up">
              Our platform makes it easy for engineers and clients to connect, collaborate, and complete successful projects together.
            </p>
          </div>
        </div>
      </section>
      
      {/* For Engineers Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 text-gray-900 drop-shadow-lg animate-fade-in">For Engineers & Professionals</h2>
          
          <div className="max-w-5xl mx-auto">
            {/* Timeline style steps */}
            <div className="relative">
              {/* Vertical line with magical glow */}
              <div className="absolute left-0 md:left-1/2 transform md:translate-x-[-50%] h-full w-1 bg-gradient-to-b from-green-400 to-green-600 shadow-lg shadow-green-500/40 animate-pulse-slow"></div>
              
              {/* Steps */}
              {engineerSteps.map((step, index) => (
                <div key={index} className={`relative z-10 flex flex-col md:flex-row items-center mb-12 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  {/* Step content */}
                  <div className="flex-1 md:w-1/2 px-4 md:px-8">
                    <div className={`p-6 rounded-2xl bg-gradient-to-br from-green-700 to-green-900 text-white shadow-lg shadow-green-500/40 hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-float-slow`}>
                      <div className="flex items-center mb-3">
                        <span className="text-4xl mr-3 animate-twinkle">{step.icon}</span>
                        <h3 className="text-xl font-bold drop-shadow-md">{step.title}</h3>
                      </div>
                      <p className="text-gray-200">{step.description}</p>
                    </div>
                  </div>
                  
                  {/* Circle in the middle */}
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full border-4 border-white shadow-lg shadow-green-500/40 my-4 md:my-0 z-20 animate-bounce-slow">
                    <span className="font-bold text-white">{step.step}</span>
                  </div>
                  
                  {/* Empty space for alternating layout */}
                  <div className="flex-1 md:w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Link 
              to="/register?type=engineer" 
              className="inline-block px-8 py-3 bg-gradient-to-br from-green-600 to-green-700 text-white font-medium rounded-full hover:bg-yellow-100 hover:text-green-600 transition-all duration-300 shadow-lg shadow-green-500/40 animate-bounce-slow"
            >
              Register as an Engineer
            </Link>
          </div>
        </div>
      </section>
      
      {/* For Clients Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 text-gray-900 drop-shadow-lg animate-fade-in">For Clients</h2>
          
          <div className="max-w-5xl mx-auto">
            {/* Timeline style steps */}
            <div className="relative">
              {/* Vertical line with magical glow */}
              <div className="absolute left-0 md:left-1/2 transform md:translate-x-[-50%] h-full w-1 bg-gradient-to-b from-blue-400 to-blue-600 shadow-lg shadow-blue-500/40 animate-pulse-slow"></div>
              
              {/* Steps */}
              {clientSteps.map((step, index) => (
                <div key={index} className={`relative z-10 flex flex-col md:flex-row items-center mb-12 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  {/* Step content */}
                  <div className="flex-1 md:w-1/2 px-4 md:px-8">
                    <div className={`p-6 rounded-2xl bg-gradient-to-br from-blue-700 to-blue-900 text-white shadow-lg shadow-blue-500/40 hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-float-slow`}>
                      <div className="flex items-center mb-3">
                        <span className="text-4xl mr-3 animate-twinkle">{step.icon}</span>
                        <h3 className="text-xl font-bold drop-shadow-md">{step.title}</h3>
                      </div>
                      <p className="text-gray-200">{step.description}</p>
                    </div>
                  </div>
                  
                  {/* Circle in the middle */}
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full border-4 border-white shadow-lg shadow-blue-500/40 my-4 md:my-0 z-20 animate-bounce-slow">
                    <span className="font-bold text-white">{step.step}</span>
                  </div>
                  
                  {/* Empty space for alternating layout */}
                  <div className="flex-1 md:w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Link 
              to="/register?type=client" 
              className="inline-block px-8 py-3 bg-gradient-to-br from-blue-600 to-blue-700 text-white font-medium rounded-full hover:bg-yellow-100 hover:text-blue-600 transition-all duration-300 shadow-lg shadow-blue-500/40 animate-bounce-slow"
            >
              Register as a Client
            </Link>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 drop-shadow-lg animate-fade-in">Frequently Asked Questions</h2>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {[
                {
                  question: 'How much does it cost to join LevKonnect?',
                  answer: 'Registration is free for both engineers and clients. Clients pay a small service fee when a project is completed successfully, while engineers receive their full quoted amount.'
                },
                {
                  question: 'How are engineers verified on the platform?',
                  answer: 'Engineers go through a verification process that includes checking their qualifications, certifications, and past work experience. This ensures clients connect with legitimate professionals.'
                },
                {
                  question: 'How is payment handled?',
                  answer: 'We use a milestone-based payment system. Clients deposit funds into our secure escrow system, and payments are released to engineers upon successful completion of agreed-upon milestones.'
                },
                {
                  question: 'What types of projects can be posted?',
                  answer: 'Any engineering or technical projects can be posted, but we specialize in renewable energy, solar installations, energy efficiency, and sustainable technology implementations.'
                },
                {
                  question: 'How do I get support if I have issues?',
                  answer: 'Our support team is available via chat, email, and phone during business hours. You can also access our comprehensive help center for immediate assistance.'
                }
              ].map((faq, index) => (
                <div key={index} className="p-6 rounded-2xl bg-gradient-to-br from-gray-700 to-gray-900 text-white shadow-lg shadow-green-500/40 hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-float-slow">
                  <h3 className="text-xl font-bold mb-3 drop-shadow-md">{faq.question}</h3>
                  <p className="text-gray-200">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-white text-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 animate-fireflies"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 drop-shadow-lg animate-fade-in-up">Ready to Get Started?</h2>
          <p className="max-w-2xl mx-auto mb-8 text-gray-600 animate-fade-in">
            Join our platform today and be part of the movement toward sustainable energy solutions in Africa.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/register" 
              className="px-8 py-3 bg-gradient-to-br from-green-600 to-green-700 text-white font-medium rounded-full hover:bg-yellow-100 hover:text-green-600 transition-all duration-300 shadow-lg shadow-green-500/40 animate-bounce-slow"
            >
              Register Now
            </Link>
            <Link 
              to="/contact" 
              className="px-8 py-3 bg-gradient-to-br from-blue-600 to-blue-700 text-white font-medium rounded-full hover:bg-yellow-100 hover:text-blue-600 transition-all duration-300 shadow-lg shadow-blue-500/40 animate-bounce-slow"
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

export default HowItWorks;