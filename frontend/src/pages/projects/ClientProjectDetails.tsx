import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
// Removed duplicate import of axios
import { jwtDecode } from 'jwt-decode'; // Import jwt-decode as a named import
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import DashboardSidebar from '../../components/DashboardSidebar';
import axios, { AxiosError } from 'axios';

interface DecodedToken {
  id: number;
  user_type: 'client' | 'engineer' | 'admin';
}

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
  createdAt: string; // Changed from submitted_date to createdAt
}

interface ProjectDetail {
  id: number;
  title: string;
  description: string;
  budget: number;
  status: string;
  deadline: string;
  createdAt: string; // Changed from created_at to createdAt
  location: string;
  category: string;
  duration: number;
  requiredSkills: string[];
  bids: Bid[];
}

const ClientProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<ProjectDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [userType, setUserType] = useState<'client' | null>(null);

  // Use VITE_API_URL from environment variables
  const API_URL = import.meta.env.VITE_API_URL || 'https://levkonnect-backend.onrender.com';
  console.log('API_URL being used:', API_URL);

  useEffect(() => {
    const fetchUserTypeAndProject = async () => {
      try {
        setIsLoading(true);
        setError('');

        // Get the token from localStorage
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('You must be logged in to view project details.');
        }

        // Decode the token to get user_type
        const decoded: DecodedToken = jwtDecode(token);
        const userTypeFromToken = decoded.user_type;
        if (userTypeFromToken !== 'client') {
          throw new Error('This page is for clients only');
        }
        setUserType(userTypeFromToken);

        const response = await axios.get(`${API_URL}/api/jobs/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('Fetched project:', response.data);

        const projectData: ProjectDetail = {
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          budget: parseFloat(response.data.budget),
          status: response.data.status,
          deadline: response.data.deadline,
          createdAt: response.data.createdAt, // Use createdAt
          location: response.data.location,
          category: response.data.category,
          duration: response.data.duration,
          requiredSkills: response.data.requiredSkills || [],
          bids: response.data.bids.map((bid: any) => ({
            id: bid.id,
            engineer: {
              id: bid.engineer.id,
              username: bid.engineer.username,
              email: bid.engineer.email,
            },
            bid_amount: parseFloat(bid.bid_amount),
            delivery_days: bid.delivery_days,
            cover_letter: bid.cover_letter,
            status: bid.status,
            createdAt: bid.createdAt, // Use createdAt
          })) || [],
        };

        setProject(projectData);
        setIsLoading(false);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          console.error('Error fetching project:', err.response ? err.response.data : err.message);
          setError(err.response?.data?.message || err.message || 'Failed to fetch project details. Please try again.');
        } else {
          console.error('Error fetching project:', err);
          if (err instanceof Error) {
            if (err instanceof Error) {
              if (err instanceof Error) {
                if (err instanceof Error) {
                  if (err instanceof Error) {
                    setError(err.message || 'An unexpected error occurred. Please try again.');
                  } else {
                    setError('An unexpected error occurred. Please try again.');
                  }
                } else {
                  setError('An unexpected error occurred. Please try again.');
                }
              } else {
                setError('An unexpected error occurred. Please try again.');
              }
            } else {
              setError('An unexpected error occurred. Please try again.');
            }
          } else {
            setError('An unexpected error occurred. Please try again.');
          }
        }
        setIsLoading(false);
      }
    };

    fetchUserTypeAndProject();
  }, [id]);

  const handleAcceptBid = async (jobId: number, bidId: number) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('You must be logged in to accept a bid.');
      }
  
      const response = await axios.post(
        `${API_URL}/api/jobs/${jobId}/bids/${bidId}/accept`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log('Bid accepted:', response.data);
  
      // Refresh the projects list
      setProject((prevProject) => {
        if (!prevProject) return null;
        if (prevProject.id === jobId) {
          return {
            ...prevProject,
            status: 'in-progress',
            bids: prevProject.bids.map((bid) => {
              if (bid.id === bidId) {
                return { ...bid, status: 'accepted' };
              }
              return { ...bid, status: bid.status === 'pending' ? 'rejected' : bid.status };
            }),
          };
        }
        return prevProject;
      });
  
      setProject((prevProject) => {
        if (!prevProject) return null;
        return {
          ...prevProject,
          status: 'in-progress',
          bids: prevProject.bids.map((bid) => {
            if (bid.id === bidId) {
              return { ...bid, status: 'accepted' };
            }
            return { ...bid, status: bid.status === 'pending' ? 'rejected' : bid.status };
          }),
        };
      });
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError<{ message?: string }>;
        console.error('Error accepting bid:', axiosError.response ? axiosError.response.data : axiosError.message);
        setError(axiosError.response?.data?.message || axiosError.message || 'Failed to accept bid. Please try again.');
      } else {
        const error = err as Error;
        console.error('Error accepting bid:', error);
        setError(error.message || 'An unexpected error occurred. Please try again.');
      }
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString || isNaN(new Date(dateString).getTime())) {
      return 'Invalid Date';
    }
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-gray-100 text-gray-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'canceled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
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

  if (error || !project || !userType) {
    return (
      <div className="min-h-screen flex flex-col pt-20">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{error ? 'Error' : 'Project Not Found'}</h2>
            <p className="text-gray-600 mb-6">{error || "The project you're looking for doesn't exist or has been removed."}</p>
            <Link to="/manage-projects" className="px-4 py-2 bg-green-600 text-white rounded-md">
              Back to My Projects
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
        <DashboardSidebar userType="client" />
        
        <main className="flex-grow p-6">
          <div className="mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <Link 
                  to="/manage-projects" 
                  className="inline-flex items-center text-sm text-green-600 hover:text-green-700 mb-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to My Projects
                </Link>
                <h1 className="text-2xl font-bold text-gray-800">{project.title}</h1>
              </div>
              
              <div className="mt-4 md:mt-0 flex items-center">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Project Description</h2>
                <p className="text-gray-700 mb-6 whitespace-pre-line">{project.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Category</h3>
                    <p className="text-gray-800">{project.category}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Location</h3>
                    <p className="text-gray-800">{project.location}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Created</h3>
                    <p className="text-gray-800">{formatDate(project.createdAt)}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Deadline</h3>
                    <p className="text-gray-800 font-medium">{formatDate(project.deadline)}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Budget</h3>
                    <p className="text-gray-800">${project.budget}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Duration</h3>
                    <p className="text-gray-800">{project.duration} days</p>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-md font-semibold text-gray-800 mb-3">Required Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {Array.isArray(project.requiredSkills) && project.requiredSkills.length > 0 ? (
                      project.requiredSkills.map((skill, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-800 rounded-md text-sm">
                          {skill}
                        </span>
                      ))
                    ) : (
                      <p className="text-gray-500">No required skills specified.</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Bids</h2>
                {project.bids && project.bids.length > 0 ? (
                  <div className="space-y-4">
                    {project.bids.map((bid) => (
                      <div key={bid.id} className="border-t pt-4">
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
                        <p><strong>Submitted:</strong> {formatDate(bid.createdAt)}</p>
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
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default ClientProjectDetails;