import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import DashboardSidebar from '../../components/DashboardSidebar';

interface Job {
  id: number;
  title: string;
  category: string;
  location: string;
  budget: number;
  duration: number;
  postedDate: string;
  deadline: string;
  requiredSkills: string[];
  clientName: string;
  clientRating: number;
}

const FindJobs: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  // Categories for filtering
  const categories = [
    'All Categories',
    'Solar Installation',
    'Energy Efficiency',
    'Wind Energy',
    'Biogas',
    'Micro-hydro',
    'Energy Storage',
    'Power Distribution',
    'Energy Audit',
    'Energy Consulting',
    'Maintenance & Repair'
  ];
  
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('You must be logged in to view jobs.');
        }

        const response = await axios.get('http://localhost:5000/api/jobs/engineer/recommended', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('API Response:', response.data);

        if (!Array.isArray(response.data)) {
          throw new Error('Unexpected response format: Expected an array of jobs.');
        }

        const fetchedJobs: Job[] = response.data.map((job: any) => ({
          id: job.id,
          title: job.title,
          category: job.category,
          location: job.location,
          budget: job.budget,
          duration: job.duration,
          postedDate: job.createdAt, // Use createdAt from the API response
          deadline: job.deadline,
          requiredSkills: job.requiredSkills || [], // Use requiredSkills (camelCase) and default to empty array if undefined
          clientName: job.client?.username || 'Unknown Client',
          clientRating: 4.5, // Placeholder since we don't have client ratings in the database yet
        }));

        setJobs(fetchedJobs);
        setFilteredJobs(fetchedJobs);
      } catch (err) {
        console.error('Error fetching jobs:', err.response ? err.response.data : err.message);
        setError(err.response?.data?.message || err.message || 'Failed to fetch jobs. Please try again.');
        setJobs([]);
        setFilteredJobs([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);
  
  // Filter jobs based on search term and category
  useEffect(() => {
    let results = jobs;
    
    if (searchTerm) {
      results = results.filter(job => 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (job.requiredSkills && job.requiredSkills.some(skill => 
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        ))
      );
    }
    
    if (selectedCategory && selectedCategory !== 'All Categories') {
      results = results.filter(job => job.category === selectedCategory);
    }
    
    setFilteredJobs(results);
  }, [searchTerm, selectedCategory, jobs]);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  return (
    <div className="min-h-screen flex flex-col pt-15">
      <Navbar />
      
      <div className="flex-grow flex flex-col md:flex-row bg-gray-50">
        <DashboardSidebar userType="engineer" />
        
        <main className="flex-grow p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Find Jobs</h1>
            <p className="text-gray-600">Browse available jobs that match your skills and experience.</p>
          </div>
          
          {/* Search and Filter Section */}
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="col-span-2">
                <input
                  type="text"
                  placeholder="Search jobs by title, location, or skills..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full p-3 border border-gray-300 rounded"
                />
              </div>
              <div>
                <select
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  className="w-full p-3 border border-gray-300 rounded"
                >
                  {categories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          {/* Jobs Listing */}
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
          ) : error ? (
            <div className="bg-white p-8 rounded-lg shadow text-center">
              <div className="text-red-500 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Error</h3>
              <p className="text-gray-600">{error}</p>
            </div>
          ) : (
            <>
              <div className="mb-4">
                <p className="text-gray-600">{filteredJobs.length} jobs found</p>
              </div>
              
              {filteredJobs.length > 0 ? (
                <div className="space-y-6">
                  {filteredJobs.map(job => (
                    <div key={job.id} className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                        <div>
                          <h2 className="text-xl font-semibold text-gray-800 mb-2">
                            <Link to={`/job-details/${job.id}`} className="hover:text-green-600">
                              {job.title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap items-center text-sm text-gray-600 mb-3">
                            <span className="mr-4 mb-2">
                              <span className="font-medium">Category:</span> {job.category}
                            </span>
                            <span className="mr-4 mb-2">
                              <span className="font-medium">Location:</span> {job.location}
                            </span>
                            <span className="mr-4 mb-2">
                              <span className="font-medium">Budget:</span> ${job.budget}
                            </span>
                            <span className="mb-2">
                              <span className="font-medium">Duration:</span> {job.duration} days
                            </span>
                          </div>
                        </div>
                        <div className="md:text-right mt-3 md:mt-0">
                          <p className="text-sm text-gray-600 mb-1">
                            Posted: {formatDate(job.postedDate)}
                          </p>
                          <p className="text-sm text-gray-600">
                            Deadline: <span className="font-medium text-red-600">{formatDate(job.deadline)}</span>
                          </p>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">Required Skills:</p>
                        <div className="flex flex-wrap gap-2">
                          {(job.requiredSkills && Array.isArray(job.requiredSkills) ? job.requiredSkills : []).map((skill, index) => (
                            <span 
                              key={index} 
                              className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pt-4 border-t border-gray-200">
                        <div className="flex items-center mb-4 sm:mb-0">
                          <div className="mr-2">
                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700">
                              {job.clientName.charAt(0)}
                            </div>
                          </div>
                          <div>
                            <p className="text-sm font-medium">{job.clientName}</p>
                            <div className="flex items-center">
                              <span className="text-yellow-400 mr-1">★</span>
                              <span className="text-sm">{job.clientRating.toFixed(1)}</span>
                            </div>
                          </div>
                        </div>
                        <Link 
                          to={`/job-details/${job.id}`} 
                          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm font-medium transition-colors duration-200"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white p-8 rounded-lg shadow text-center">
                  <div className="text-gray-400 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
                  <p className="text-gray-600">
                    Try adjusting your search criteria or check back later for new opportunities.
                  </p>
                </div>
              )}
            </>
          )}
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default FindJobs;