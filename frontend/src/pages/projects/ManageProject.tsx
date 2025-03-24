import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import DashboardSidebar from '../../components/DashboardSidebar';

interface Bid {
  id: number;
  engineer: {
    id: number;
    username: string;
    email: string;
  };
  bid_amount: number;
  delivery_days: number;
  cover_letter: string;
  status: string;
  submitted_date: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  budget: number;
  status: string;
  deadline: string;
  created_at: string;
  bids: Bid[];
  location: string;
  category: string;
  duration: number;
  requiredSkills: string[];
}

const ManageProjects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('all');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('You must be logged in to view your projects.');
        }

        const response = await axios.get('http://localhost:5000/api/jobs/client/jobs', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('Fetched projects:', response.data);

        const mappedProjects: Project[] = response.data.map((project: any) => ({
          id: project.id,
          title: project.title,
          description: project.description,
          budget: parseFloat(project.budget),
          status: project.status,
          deadline: project.deadline,
          created_at: project.createdAt,
          bids: project.bids || [],
          location: project.location,
          category: project.category,
          duration: project.duration,
          requiredSkills: project.requiredSkills || [],
        }));

        setProjects(mappedProjects);
        setIsLoading(false);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          console.error('Error fetching projects:', err.response ? err.response.data : err.message);
        } else {
          console.error('Error fetching projects:', err);
        }
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || err.message || 'Failed to fetch projects. Please try again.');
        } else {
          setError('An unexpected error occurred. Please try again.');
        }
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleAcceptBid = async (jobId: number, bidId: number) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('You must be logged in to accept a bid.');
      }

      const response = await axios.post(
        `http://localhost:5000/api/jobs/${jobId}/bids/${bidId}/accept`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Bid accepted:', response.data);

      // Refresh the projects list
      const updatedProjects = projects.map(project => {
        if (project.id === jobId) {
          return {
            ...project,
            status: 'in-progress',
            bids: project.bids.map(bid => {
              if (bid.id === bidId) {
                return { ...bid, status: 'accepted' };
              }
              return { ...bid, status: bid.status === 'pending' ? 'rejected' : bid.status };
            }),
          };
        }
        return project;
      });

      setProjects(updatedProjects);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error('Error accepting bid:', err.response ? err.response.data : err.message);
      } else {
        console.error('Error accepting bid:', err);
      }
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || err.message || 'Failed to accept bid. Please try again.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  const filteredProjects = activeFilter === 'all'
    ? projects
    : activeFilter === 'pending'
    ? projects.filter(project => project.bids.some(bid => bid.status === 'pending'))
    : projects.filter(project => project.status === activeFilter);

  const formatDate = (dateString: string) => {
    if (!dateString || isNaN(new Date(dateString).getTime())) {
      return 'Invalid Date';
    }
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusBadgeClass = (status: string) => {
    switch(status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'canceled':
        return 'bg-red-100 text-red-800';
      case 'open':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch(status) {
      case 'pending':
        return 'Pending';
      case 'in-progress':
        return 'In Progress';
      case 'completed':
        return 'Completed';
      case 'canceled':
        return 'Canceled';
      case 'open':
        return 'Open';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen flex flex-col pt-20">
      <Navbar />
      
      <div className="flex-grow flex flex-col md:flex-row bg-gray-50">
        <DashboardSidebar userType="client" />
        
        <main className="flex-grow p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">My Projects</h1>
            <p className="text-gray-600">Manage and track all your ongoing and completed projects</p>
          </div>
          
          {/* Filters */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  activeFilter === 'all' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                All Projects
              </button>
              <button
                onClick={() => setActiveFilter('open')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  activeFilter === 'open' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Open
              </button>
              <button
                onClick={() => setActiveFilter('pending')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  activeFilter === 'pending' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => setActiveFilter('in-progress')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  activeFilter === 'in-progress' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                In Progress
              </button>
              <button
                onClick={() => setActiveFilter('completed')}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  activeFilter === 'completed' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Completed
              </button>
            </div>
          </div>
          
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
          ) : error ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Error</h2>
              <p className="text-gray-600 mb-6">{error}</p>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">No projects found</h2>
              <p className="text-gray-600 mb-6">
                {activeFilter === 'all' 
                  ? "You don't have any projects yet. Post a job to get started." 
                  : `You don't have any ${activeFilter} projects.`}
              </p>
              <Link
                to="/post-job"
                className="inline-block px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium transition-colors duration-200"
              >
                Post a New Job
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {filteredProjects.map(project => (
                <div key={project.id} className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(project.status)}`}>
                          {getStatusLabel(project.status)}
                        </span>
                        <h2 className="text-xl font-semibold text-gray-800 mt-2">{project.title}</h2>
                      </div>
                      <div className="mt-4 md:mt-0">
                        <Link
                          to={`/project-details/${project.id}`}
                          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium text-sm transition-colors duration-200"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <div className="flex items-center mb-2">
                        <span className="text-sm font-medium text-gray-500 w-32">Description:</span>
                        <span>{project.description}</span>
                      </div>
                      <div className="flex items-center mb-2">
                        <span className="text-sm font-medium text-gray-500 w-32">Budget:</span>
                        <span>${project.budget}</span>
                      </div>
                      <div className="flex items-center mb-2">
                        <span className="text-sm font-medium text-gray-500 w-32">Created:</span>
                        <span>{formatDate(project.created_at)}</span>
                      </div>
                      <div className="flex items-center mb-2">
                        <span className="text-sm font-medium text-gray-500 w-32">Deadline:</span>
                        <span>{formatDate(project.deadline)}</span>
                      </div>
                      <div className="mt-4">
                        <h3 className="text-lg font-medium">Bids</h3>
                        {project.bids && project.bids.length > 0 ? (
                          <div className="space-y-4 mt-2">
                            {project.bids.map((bid: Bid) => (
                              <div key={bid.id} className="border-t pt-2">
                                <p>
                                  <strong>Engineer:</strong>{' '}
                                  <Link to={`/engineer-profile/${bid.engineer.id}`} className="text-green-600 hover:text-green-700">
                                    {bid.engineer.username} ({bid.engineer.email})
                                  </Link>
                                </p>
                                <p><strong>Bid Amount:</strong> ${bid.bid_amount}</p>
                                <p><strong>Delivery Days:</strong> {bid.delivery_days}</p>
                                <p><strong>Cover Letter:</strong> {bid.cover_letter}</p>
                                <p><strong>Status:</strong> {bid.status}</p>
                                <p><strong>Submitted:</strong> {formatDate(bid.submitted_date)}</p>
                                {project.status === 'open' && bid.status === 'pending' && (
                                  <button
                                    onClick={() => handleAcceptBid(project.id, bid.id)}
                                    className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium text-sm transition-colors duration-200"
                                  >
                                    Accept Bid
                                  </button>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-500">No bids yet.</p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 px-6 py-3 border-t border-gray-100">
                    <div className="flex flex-wrap gap-2">
                      <Link
                        to={`/messages/project/${project.id}`}
                        className="inline-flex items-center text-sm text-gray-600 hover:text-green-600"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                        Messages
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default ManageProjects;