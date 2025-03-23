import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import DashboardSidebar from '../../components/DashboardSidebar';

interface Skill {
  id: number;
  name: string;
  level: number;
}

interface Certification {
  id: number;
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
  verificationLink?: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  clientName: string;
  clientFeedback?: string;
  rating: number;
  completionDate: string;
  image?: string;
}

interface EngineerData {
  id: number;
  name: string;
  title: string;
  location: string;
  about: string;
  skills: Skill[];
  certifications: Certification[];
  completedProjects: Project[];
  education: string[];
  profileImage?: string;
  coverImage?: string;
  hourlyRate: number;
  availability: string;
  joinedDate: string;
  totalEarnings: number;
  successRate: number;
  languages: { language: string, proficiency: string }[];
}

const EngineerProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [engineer, setEngineer] = useState<EngineerData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const isOwnProfile = true; // This would be determined by authentication state
  
  useEffect(() => {
    // Simulated API call to fetch engineer data
    setTimeout(() => {
      const engineerData: EngineerData = {
        id: parseInt(id || '1'),
        name: 'James Mwangi',
        title: 'Solar PV Engineer & Installer',
        location: 'Dar es Salaam, Tanzania',
        about: 'Certified solar PV engineer with over 7 years of experience designing and installing renewable energy systems across East Africa. Specializing in off-grid solutions for rural communities, solar water pumping, and commercial installations. Committed to expanding clean energy access and supporting sustainable development in Tanzania.',
        skills: [
          { id: 1, name: 'Solar PV Design', level: 95 },
          { id: 2, name: 'Off-Grid System Installation', level: 90 },
          { id: 3, name: 'Electrical Wiring', level: 85 },
          { id: 4, name: 'System Troubleshooting', level: 80 },
          { id: 5, name: 'Energy Load Assessment', level: 90 },
          { id: 6, name: 'Battery Storage Systems', level: 85 },
          { id: 7, name: 'Charge Controllers', level: 80 },
          { id: 8, name: 'Inverter Installation', level: 85 }
        ],
        certifications: [
          { 
            id: 1, 
            name: 'Certified Solar PV Installer', 
            issuer: 'Renewable Energy Association of Tanzania', 
            date: '2020-05-15',
            expiryDate: '2025-05-15',
            verificationLink: 'https://reat.org/verify/cert12345'
          },
          { 
            id: 2, 
            name: 'Advanced Off-Grid System Design', 
            issuer: 'Solar Energy International', 
            date: '2021-08-10' 
          },
          { 
            id: 3, 
            name: 'Electrical Safety Certification', 
            issuer: 'Tanzania Bureau of Standards', 
            date: '2019-11-22',
            expiryDate: '2024-11-22' 
          }
        ],
        completedProjects: [
          {
            id: 1,
            title: 'Rural Health Clinic Solar Installation',
            description: 'Designed and installed a 10kW solar system with battery backup for a rural health clinic in Morogoro, providing reliable 24/7 power for critical medical equipment.',
            clientName: 'Ministry of Health',
            clientFeedback: 'James was professional, knowledgeable and completed the project ahead of schedule. The system has been running flawlessly for over a year.',
            rating: 5,
            completionDate: '2023-08-15',
            image: '/assets/project1.jpg'
          },
          {
            id: 2,
            title: 'Community School Electrification',
            description: 'Installed a 5kW solar system for a school serving 200 students, enabling computer classes and evening study sessions.',
            clientName: 'Bright Future Foundation',
            clientFeedback: 'The installation has transformed our school. Students now have access to computers and can study after dark.',
            rating: 5,
            completionDate: '2023-05-22'
          },
          {
            id: 3,
            title: 'Solar Water Pumping System',
            description: 'Designed and installed a solar-powered water pumping system for agricultural irrigation, serving a 5-acre farm.',
            clientName: 'Kilimo Cooperative',
            rating: 4,
            completionDate: '2023-01-10'
          }
        ],
        education: [
          'Bachelor of Engineering, Electrical Engineering, University of Dar es Salaam, 2016',
          'Diploma in Renewable Energy Technologies, Technical College of Arusha, 2013'
        ],
        hourlyRate: 25,
        availability: 'Available for projects',
        joinedDate: '2022-06-01',
        totalEarnings: 12500,
        successRate: 98,
        languages: [
          { language: 'English', proficiency: 'Fluent' },
          { language: 'Swahili', proficiency: 'Native' },
          { language: 'French', proficiency: 'Basic' }
        ]
      };
      
      setEngineer(engineerData);
      setIsLoading(false);
    }, 1000);
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col pt-10">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!engineer) {
    return (
      <div className="min-h-screen flex flex-col pt-10">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Engineer Not Found</h2>
            <p className="text-gray-600 mb-6">The profile you're looking for doesn't exist or has been removed.</p>
            <Link to="/find-engineers" className="px-4 py-2 bg-green-600 text-white rounded-md">
              Browse Engineers
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col pt-10">
      <Navbar />
      
      <div className="flex-grow flex flex-col md:flex-row bg-gray-50">
        {isOwnProfile && <DashboardSidebar userType="engineer" />}
        
        <main className="flex-grow p-4 md:p-6">
          {/* Profile Header */}
          <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
            <div 
              className="h-48 bg-green-700 relative"
              style={engineer.coverImage ? { backgroundImage: `url(${engineer.coverImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
            >
              {isOwnProfile && (
                <button className="absolute top-4 right-4 bg-white bg-opacity-80 p-2 rounded-full hover:bg-opacity-100 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              )}
            </div>
            
            <div className="px-6 py-5 relative">
              <div className="absolute -top-16 left-6">
                <div className="h-32 w-32 rounded-full bg-white p-1 shadow-md">
                  {engineer.profileImage ? (
                    <img 
                      src={engineer.profileImage} 
                      alt={engineer.name}
                      className="h-full w-full rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full rounded-full bg-green-100 flex items-center justify-center text-green-700 text-4xl font-bold">
                      {engineer.name.charAt(0)}
                    </div>
                  )}
                  {isOwnProfile && (
                    <button className="absolute bottom-1 right-1 bg-white p-1 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
              
              <div className="mt-16 md:flex md:justify-between md:items-end">
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">{engineer.name}</h1>
                  <p className="text-lg text-gray-600 mb-1">{engineer.title}</p>
                  <div className="flex items-center text-gray-600 mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{engineer.location}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    <div className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
                      ${engineer.hourlyRate}/hr
                    </div>
                    <div className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                      {engineer.availability}
                    </div>
                    <div className="bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full">
                      {engineer.successRate}% Success Rate
                    </div>
                  </div>
                </div>
                
                {!isOwnProfile && (
                  <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
                    <button className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium transition-colors">
                      Contact
                    </button>
                    <button className="px-6 py-2 border border-green-600 text-green-600 hover:bg-green-50 rounded-md font-medium transition-colors">
                      Invite to Job
                    </button>
                  </div>
                )}
                
                {isOwnProfile && (
                  <div className="mt-4 md:mt-0">
                    <Link 
                      to="/edit-profile" 
                      className="px-6 py-2 border border-green-600 text-green-600 hover:bg-green-50 rounded-md font-medium transition-colors"
                    >
                      Edit Profile
                    </Link>
                  </div>
                )}
              </div>
            </div>
            
            {/* Profile Tabs */}
            <div className="border-t border-gray-200">
              <div className="flex overflow-x-auto">
                <button 
                  onClick={() => setActiveTab('overview')}
                  className={`px-6 py-3 font-medium text-sm transition-colors whitespace-nowrap
                    ${activeTab === 'overview' 
                      ? 'border-b-2 border-green-600 text-green-600' 
                      : 'text-gray-600 hover:text-gray-900'}`}
                >
                  Overview
                </button>
                <button 
                  onClick={() => setActiveTab('projects')}
                  className={`px-6 py-3 font-medium text-sm transition-colors whitespace-nowrap
                    ${activeTab === 'projects' 
                      ? 'border-b-2 border-green-600 text-green-600' 
                      : 'text-gray-600 hover:text-gray-900'}`}
                >
                  Projects & Feedback
                </button>
                <button 
                  onClick={() => setActiveTab('certifications')}
                  className={`px-6 py-3 font-medium text-sm transition-colors whitespace-nowrap
                    ${activeTab === 'certifications' 
                      ? 'border-b-2 border-green-600 text-green-600' 
                      : 'text-gray-600 hover:text-gray-900'}`}
                >
                  Certifications
                </button>
                <button 
                  onClick={() => setActiveTab('education')}
                  className={`px-6 py-3 font-medium text-sm transition-colors whitespace-nowrap
                    ${activeTab === 'education' 
                      ? 'border-b-2 border-green-600 text-green-600' 
                      : 'text-gray-600 hover:text-gray-900'}`}
                >
                  Education
                </button>
              </div>
            </div>
          </div>
          
          {/* Profile Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content - changes based on active tab */}
            <div className="lg:col-span-2 space-y-6">
              {activeTab === 'overview' && (
                <>
                  {/* About Section */}
                  <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">About</h2>
                    <p className="text-gray-700 whitespace-pre-line">{engineer.about}</p>
                  </div>
                  
                  {/* Skills Section */}
                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-semibold text-gray-800">Skills</h2>
                      {isOwnProfile && (
                        <button className="text-sm text-green-600 hover:text-green-800">
                          Edit Skills
                        </button>
                      )}
                    </div>
                    
                    <div className="space-y-4">
                      {engineer.skills.map((skill) => (
                        <div key={skill.id}>
                          <div className="flex justify-between mb-1">
                            <span className="text-gray-700">{skill.name}</span>
                            <span className="text-gray-600 text-sm">{skill.level}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${skill.level}%` }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Featured Projects */}
                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-semibold text-gray-800">Featured Projects</h2>
                      <button 
                        onClick={() => setActiveTab('projects')}
                        className="text-sm text-green-600 hover:text-green-800"
                      >
                        View All
                      </button>
                    </div>
                    
                    <div className="space-y-6">
                      {engineer.completedProjects.slice(0, 2).map((project) => (
                        <div key={project.id} className="border border-gray-200 rounded-lg p-4 hover:border-green-300 transition-colors">
                          <h3 className="font-medium text-gray-800 mb-2">{project.title}</h3>
                          <p className="text-gray-600 text-sm mb-2">{project.description}</p>
                          <div className="flex items-center justify-between mt-3">
                            <span className="text-xs text-gray-500">Completed {new Date(project.completionDate).toLocaleDateString()}</span>
                            <div className="flex text-yellow-400">
                              {[...Array(5)].map((_, i) => (
                                <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${i < project.rating ? 'text-yellow-400' : 'text-gray-300'}`} viewBox="0 0 20 20" fill="currentColor">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.95-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
              
              {activeTab === 'projects' && (
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-6">Projects & Client Feedback</h2>
                  <div className="space-y-8">
                    {engineer.completedProjects.map((project) => (
                      <div key={project.id} className="border border-gray-200 rounded-lg p-5 hover:border-green-300 transition-colors">
                        {project.image && (
                          <div className="mb-4 h-48 rounded-md overflow-hidden">
                            <img 
                              src={project.image} 
                              alt={project.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <h3 className="text-lg font-medium text-gray-800 mb-2">{project.title}</h3>
                        <p className="text-gray-700 mb-3">{project.description}</p>
                        
                        <div className="flex items-center text-gray-600 mb-3">
                          <span className="text-sm font-medium mr-2">Client:</span>
                          <span>{project.clientName}</span>
                        </div>
                        
                        <div className="flex items-center text-gray-600 mb-3">
                          <span className="text-sm font-medium mr-2">Completed:</span>
                          <span>{new Date(project.completionDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                        
                        <div className="flex items-center text-gray-600 mb-4">
                          <span className="text-sm font-medium mr-2">Rating:</span>
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${i < project.rating ? 'text-yellow-400' : 'text-gray-300'}`} viewBox="0 0 20 20" fill="currentColor">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.95-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                        
                        {project.clientFeedback && (
                          <div className="bg-gray-50 rounded-md p-4 border-l-4 border-green-500 italic text-gray-700">
                            "{project.clientFeedback}"
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {activeTab === 'certifications' && (
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">Certifications</h2>
                    {isOwnProfile && (
                      <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm font-medium transition-colors">
                        Add Certification
                      </button>
                    )}
                  </div>
                  
                  <div className="space-y-6">
                    {engineer.certifications.map((cert) => (
                      <div key={cert.id} className="flex flex-col md:flex-row border border-gray-200 rounded-lg p-5 hover:border-green-300 transition-colors">
                        <div className="flex-grow">
                          <h3 className="text-lg font-medium text-gray-800 mb-1">{cert.name}</h3>
                          <p className="text-gray-600 mb-3">Issued by {cert.issuer}</p>
                          
                          <div className="flex flex-wrap gap-y-2 gap-x-6 text-sm text-gray-600">
                            <div>
                              <span className="font-medium">Issued:</span> {new Date(cert.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                            </div>
                            
                            {cert.expiryDate && (
                              <div>
                                <span className="font-medium">Expires:</span> {new Date(cert.expiryDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {cert.verificationLink && (
                          <div className="mt-4 md:mt-0 md:ml-4 flex items-center">
                            <a 
                              href={cert.verificationLink} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="px-4 py-2 border border-green-600 text-green-600 hover:bg-green-50 rounded-md text-sm font-medium transition-colors"
                            >
                              Verify
                            </a>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {activeTab === 'education' && (
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">Education</h2>
                    {isOwnProfile && (
                      <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm font-medium transition-colors">
                        Add Education
                      </button>
                    )}
                  </div>
                  
                  <div className="space-y-5">
                    {engineer.education.map((edu, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-5 hover:border-green-300 transition-colors">
                        <p className="text-gray-800 font-medium">{edu}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              {/* Languages */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Languages</h2>
                <div className="space-y-3">
                  {engineer.languages.map((lang, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-gray-700">{lang.language}</span>
                      <span className="text-gray-600 text-sm">{lang.proficiency}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Account Stats */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Account Information</h2>
                <div className="space-y-3">
                  <div>
                    <p className="text-gray-500 text-sm">Member Since</p>
                    <p className="text-gray-800">{new Date(engineer.joinedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</p>
                  </div>
                  
                  <div>
                    <p className="text-gray-500 text-sm">Total Earnings</p>
                    <p className="text-gray-800">${engineer.totalEarnings.toLocaleString()}</p>
                  </div>
                  
                  <div>
                    <p className="text-gray-500 text-sm">Completed Projects</p>
                    <p className="text-gray-800">{engineer.completedProjects.length}</p>
                  </div>
                  
                  <div>
                    <p className="text-gray-500 text-sm">Success Rate</p>
                    <p className="text-gray-800">{engineer.successRate}%</p>
                  </div>
                </div>
              </div>
              
              {/* Download CV or Contact */}
              <div className="bg-white rounded-lg shadow p-6">
                {isOwnProfile ? (
                  <>
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Profile Settings</h2>
                    <div className="space-y-3">
                      <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors">
                        Download CV
                      </button>
                      <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-md font-medium transition-colors">
                        Set Availability
                      </button>
                      <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-md font-medium transition-colors">
                        Set Availability
                      </button>
                      <button className="w-full px-4 py-2 border border-red-500 text-red-500 hover:bg-red-50 rounded-md font-medium transition-colors">
                        Delete Account
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Hire This Engineer</h2>
                    <button className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium transition-colors">
                      Contact
                    </button>
                    <button className="w-full px-4 py-2 border border-green-600 text-green-600 hover:bg-green-50 rounded-md font-medium transition-colors">
                      Invite to Job
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default EngineerProfile;
