import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import DashboardSidebar from '../../components/DashboardSidebar';

interface Milestone {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  status: 'Pending' | 'In Progress' | 'Completed' | 'Overdue';
  amount: number;
}

interface ProjectDetail {
  id: number;
  title: string;
  description: string;
  clientName: string;
  clientImage?: string;
  startDate: string;
  deadline: string;
  status: 'In Progress' | 'On Hold' | 'Pending Client Review' | 'Completed';
  budget: number;
  completionPercentage: number;
  milestones: Milestone[];
  location: string;
  projectType: string;
  projectScope: string[];
  attachments: {
    id: number;
    name: string;
    type: string;
    uploadedOn: string;
    uploadedBy: string;
  }[];
}

const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<ProjectDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'milestones' | 'files' | 'payments'>('overview');

  useEffect(() => {
    // Simulate API call to fetch project details
    setTimeout(() => {
      // This would be replaced with an actual API call
      const projectData: ProjectDetail = {
        id: parseInt(id || '1'),
        title: 'Solar Panel Installation for Rural School',
        description: 'Complete installation of a 5kW solar system for a rural school in Dodoma, including panel mounting, electrical connections, and battery system setup. The installation should follow best practices and comply with all local regulations.',
        clientName: 'Education Ministry',
        clientImage: undefined,
        startDate: '2025-03-05',
        deadline: '2025-03-19',
        status: 'In Progress',
        budget: 1200,
        completionPercentage: 45,
        location: 'Dodoma, Tanzania',
        projectType: 'Solar Installation',
        projectScope: [
          'Site assessment and preparation',
          'Solar panel mounting',
          'Electrical wiring and connections',
          'Battery storage setup',
          'System testing and commissioning',
          'User training'
        ],
        milestones: [
          {
            id: 1,
            title: 'Initial Site Assessment',
            description: 'Complete site assessment, take measurements, and prepare installation plan.',
            dueDate: '2025-03-07',
            status: 'Completed',
            amount: 180
          },
          {
            id: 2,
            title: 'Solar Panel Mounting',
            description: 'Mount solar panels on the roof structure according to the approved design.',
            dueDate: '2025-03-12',
            status: 'In Progress',
            amount: 400
          },
          {
            id: 3,
            title: 'Electrical System Installation',
            description: 'Install inverters, connect wiring, and set up the electrical components.',
            dueDate: '2025-03-16',
            status: 'Pending',
            amount: 350
          },
          {
            id: 4,
            title: 'Battery Storage Setup',
            description: 'Install and configure the battery storage system.',
            dueDate: '2025-03-18',
            status: 'Pending',
            amount: 270
          }
        ],
        attachments: [
          {
            id: 1,
            name: 'Project Scope Document.pdf',
            type: 'pdf',
            uploadedOn: '2025-03-05',
            uploadedBy: 'Client'
          },
          {
            id: 2,
            name: 'Site Assessment Report.docx',
            type: 'document',
            uploadedOn: '2025-03-07',
            uploadedBy: 'You'
          },
          {
            id: 3,
            name: 'Panel Layout Design.png',
            type: 'image',
            uploadedOn: '2025-03-08',
            uploadedBy: 'You'
          }
        ]
      };
      
      setProject(projectData);
      setIsLoading(false);
    }, 1000);
  }, [id]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'On Hold':
        return 'bg-yellow-100 text-yellow-800';
      case 'Pending Client Review':
        return 'bg-purple-100 text-purple-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getMilestoneStatusColor = (status: string) => {
    switch(status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Pending':
        return 'bg-gray-100 text-gray-700';
      case 'Overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getFileIcon = (type: string) => {
    switch(type) {
      case 'pdf':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        );
      case 'document':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        );
      case 'image':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col pt-20">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col pt-20">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Project Not Found</h2>
            <p className="text-gray-600 mb-6">The project you're looking for doesn't exist or has been removed.</p>
            <Link to="/active-projects" className="px-4 py-2 bg-green-600 text-white rounded-md">
              View Active Projects
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col pt-20">
      <Navbar />
      
      <div className="flex-grow flex flex-col md:flex-row bg-gray-50">
        <DashboardSidebar userType="engineer" />
        
        <main className="flex-grow p-6">
          <div className="mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <Link 
                  to="/active-projects" 
                  className="inline-flex items-center text-sm text-green-600 hover:text-green-700 mb-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Projects
                </Link>
                <h1 className="text-2xl font-bold text-gray-800">{project.title}</h1>
              </div>
              
              <div className="mt-4 md:mt-0 flex items-center">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
                <div className="ml-4">
                  <Link
                    to={`/messages/${project.id}`}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium text-sm transition-colors duration-200"
                  >
                    Message Client
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Project navigation tabs */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-3 px-4 text-sm font-medium border-b-2 transition-colors duration-200 ${
                  activeTab === 'overview'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('milestones')}
                className={`py-3 px-4 text-sm font-medium border-b-2 transition-colors duration-200 ${
                  activeTab === 'milestones'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Milestones
              </button>
              <button
                onClick={() => setActiveTab('files')}
                className={`py-3 px-4 text-sm font-medium border-b-2 transition-colors duration-200 ${
                  activeTab === 'files'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Files
              </button>
              <button
                onClick={() => setActiveTab('payments')}
                className={`py-3 px-4 text-sm font-medium border-b-2 transition-colors duration-200 ${
                  activeTab === 'payments'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Payments
              </button>
            </nav>
          </div>
          
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">Project Description</h2>
                  <p className="text-gray-700 mb-6 whitespace-pre-line">{project.description}</p>
                  
                  <h3 className="text-md font-semibold text-gray-800 mb-3">Project Scope</h3>
                  <ul className="list-disc pl-5 mb-6 space-y-1 text-gray-700">
                    {project.projectScope.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Location</h3>
                      <p className="text-gray-800">{project.location}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Project Type</h3>
                      <p className="text-gray-800">{project.projectType}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Start Date</h3>
                      <p className="text-gray-800">{formatDate(project.startDate)}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Deadline</h3>
                      <p className="text-gray-800 font-medium">{formatDate(project.deadline)}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">Project Progress</h2>
                  
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Completion Status</span>
                      <span className="text-sm font-medium">{project.completionPercentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-green-600 h-3 rounded-full"
                        style={{ width: `${project.completionPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                      <p className="text-sm text-blue-600 mb-1">Milestone</p>
                      <p className="font-semibold text-blue-800">In Progress</p>
                      <p className="text-sm text-blue-700 mt-1">Solar Panel Mounting</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <p className="text-sm text-gray-600 mb-1">Budget</p>
                      <p className="font-semibold text-gray-900">${project.budget}</p>
                      <p className="text-sm text-gray-700 mt-1">Total Value</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 text-center">
                      <p className="text-sm text-green-600 mb-1">Released</p>
                      <p className="font-semibold text-green-800">${180}</p>
                      <p className="text-sm text-green-700 mt-1">1 of 4 Milestones</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">Client Information</h2>
                  
                  <div className="flex items-center mb-4">
                    <div className="mr-3">
                      {project.clientImage ? (
                        <img 
                          src={project.clientImage} 
                          alt={project.clientName}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                    ) : (
                        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                          <span className="text-green-600 font-medium text-lg">
                            {project.clientName.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{project.clientName}</h3>
                      <p className="text-sm text-gray-500">Client</p>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4">
                    <Link
                      to={`/messages/${project.id}`}
                      className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 transition-colors duration-200"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      Message Client
                    </Link>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h2>
                  
                  <div className="space-y-4">
                    <div className="flex">
                      <div className="mr-3 flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-800">Milestone "Initial Site Assessment" completed</p>
                        <p className="text-xs text-gray-500">Today, 9:41 AM</p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="mr-3 flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-800">New file uploaded: "Panel Layout Design.png"</p>
                        <p className="text-xs text-gray-500">Today, 8:15 AM</p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="mr-3 flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-800">Client sent a message</p>
                        <p className="text-xs text-gray-500">Yesterday, 4:30 PM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Milestones Tab */}
          {activeTab === 'milestones' && (
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">Project Milestones</h2>
                <p className="text-gray-600 text-sm mt-1">Track progress and payment releases for each milestone</p>
              </div>
              
              <div className="divide-y divide-gray-200">
                {project.milestones.map((milestone) => (
                  <div key={milestone.id} className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-md font-medium text-gray-900">{milestone.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{milestone.description}</p>
                      </div>
                      <div className="mt-4 md:mt-0">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getMilestoneStatusColor(milestone.status)}`}>
                          {milestone.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Due Date</p>
                        <p className="font-medium text-gray-800">{formatDate(milestone.dueDate)}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Payment Amount</p>
                        <p className="font-medium text-gray-800">${milestone.amount}</p>
                      </div>
                      <div className="flex items-center justify-start md:justify-end mt-4 md:mt-0">
                        {milestone.status === 'Pending' && (
                          <button 
                            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors duration-200"
                          >
                            Start Milestone
                          </button>
                        )}
                        {milestone.status === 'In Progress' && (
                          <button 
                            className="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 transition-colors duration-200"
                          >
                            Mark as Completed
                          </button>
                        )}
                        {milestone.status === 'Completed' && (
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-green-700 font-medium">Payment Released</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Files Tab */}
          {activeTab === 'files' && (
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">Project Files</h2>
                  <p className="text-gray-600 text-sm mt-1">View and download project documentation</p>
                </div>
                <button className="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 transition-colors duration-200 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  Upload File
                </button>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {project.attachments.map((file) => (
                    <div key={file.id} className="flex border border-gray-200 rounded-lg p-4">
                      {getFileIcon(file.type)}
                      <div className="ml-4 flex-grow">
                        <h3 className="text-md font-medium text-gray-900">{file.name}</h3>
                        <div className="flex justify-between text-sm text-gray-500 mt-1">
                          <span>Uploaded by: {file.uploadedBy}</span>
                          <span>{formatDate(file.uploadedOn)}</span>
                        </div>
                      </div>
                      <button className="text-gray-600 hover:text-gray-900">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* Payments Tab */}
          {activeTab === 'payments' && (
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">Payment History</h2>
                <p className="text-gray-600 text-sm mt-1">Track payments for completed milestones</p>
              </div>
              
              <div className="p-6">
                <div className="mb-6 bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Total Budget</p>
                      <p className="text-xl font-semibold text-gray-900">${project.budget}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Released</p>
                      <p className="text-xl font-semibold text-green-600">$180</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Remaining</p>
                      <p className="text-xl font-semibold text-gray-900">${project.budget - 180}</p>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg">
                  <div className="grid grid-cols-5 bg-gray-100 p-4 rounded-t-lg text-sm font-medium text-gray-700">
                    <div className="col-span-2">Milestone</div>
                    <div>Due Date</div>
                    <div>Amount</div>
                    <div>Status</div>
                  </div>
                  
                  <div className="divide-y divide-gray-200">
                    {project.milestones.map((milestone) => (
                      <div key={milestone.id} className="grid grid-cols-5 p-4 text-sm">
                        <div className="col-span-2">
                          <p className="font-medium text-gray-900">{milestone.title}</p>
                        </div>
                        <div className="text-gray-700">{formatDate(milestone.dueDate)}</div>
                        <div className="text-gray-700">${milestone.amount}</div>
                        <div>
                          {milestone.status === 'Completed' ? (
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-md text-xs font-medium">
                              Paid
                            </span>
                          ) : (
                            <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-md text-xs font-medium">
                              Pending
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProjectDetails;