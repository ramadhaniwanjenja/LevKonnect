import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import DashboardSidebar from '../../components/DashboardSidebar';

interface JobDetail {
  id: number;
  title: string;
  category: string;
  description: string;
  location: string;
  budget: number;
  duration: number;
  postedDate: string;
  deadline: string;
  requiredSkills: string[];
  clientName: string;
  clientRating: number;
  clientJobs: number;
  clientImage?: string;
  additionalInstructions?: string;
}

const JobDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<JobDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showBidForm, setShowBidForm] = useState(false);
  const [bidAmount, setBidAmount] = useState('');
  const [deliveryDays, setDeliveryDays] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('You must be logged in to view job details.');
        }

        const response = await axios.get(`http://localhost:5000/api/jobs/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('Job Details Response:', response.data);

        const jobData = response.data;
        setJob({
          id: jobData.id,
          title: jobData.title,
          category: jobData.category,
          description: jobData.description,
          location: jobData.location,
          budget: jobData.budget,
          duration: jobData.duration,
          postedDate: jobData.createdAt,
          deadline: jobData.deadline,
          requiredSkills: jobData.requiredSkills || [],
          clientName: jobData.client?.username || 'Unknown Client',
          clientRating: 4.5,
          clientJobs: 12,
          clientImage: undefined,
          additionalInstructions: jobData.additionalInstructions || 'No additional instructions provided.',
        });
      } catch (err) {
        console.error('Error fetching job:', err.response ? err.response.data : err.message);
        setError(err.response?.data?.message || err.message || 'Failed to fetch job details. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleBidSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Validate form
    const newErrors: Record<string, string> = {};
    if (!bidAmount.trim()) {
      newErrors.bidAmount = 'Bid amount is required';
    } else if (isNaN(Number(bidAmount)) || Number(bidAmount) <= 0) {
      newErrors.bidAmount = 'Please enter a valid amount';
    }
  
    if (!deliveryDays.trim()) {
      newErrors.deliveryDays = 'Delivery time is required';
    } else if (isNaN(Number(deliveryDays)) || Number(deliveryDays) <= 0) {
      newErrors.deliveryDays = 'Please enter a valid number of days';
    }
  
    if (!coverLetter.trim()) {
      newErrors.coverLetter = 'Cover letter is required';
    } else if (coverLetter.length < 100) {
      newErrors.coverLetter = 'Cover letter should be at least 100 characters';
    }
  
    setErrors(newErrors);
  
    if (Object.keys(newErrors).length === 0) {
      try {
        setIsSubmitting(true);
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('You must be logged in to submit a bid.');
        }
  
        console.log('Submitting bid with payload:', {
          job_id: id,
          bid_amount: Number(bidAmount),
          delivery_days: Number(deliveryDays),
          cover_letter: coverLetter,
        });
        await axios.post(
          'http://localhost:5000/api/bids',
          {
            job_id: id,
            bid_amount: Number(bidAmount),
            delivery_days: Number(deliveryDays),
            cover_letter: coverLetter,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        navigate('/bid-submitted');
      } catch (err) {
        console.error('Error submitting bid:', err.response ? err.response.data : err.message);
        setErrors({
          submit: err.response?.data?.message || err.message || 'Failed to submit bid. Please try again.',
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col pt-15">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen flex flex-col pt-15">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Error</h2>
            <p className="text-gray-600 mb-6">{error || 'The job you\'re looking for doesn\'t exist or has been removed.'}</p>
            <Link to="/find-jobs" className="px-4 py-2 bg-green-600 text-white rounded-md">
              Browse Available Jobs
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col pt-15">
      <Navbar />
      
      <div className="flex-grow flex flex-col md:flex-row bg-gray-50">
        <DashboardSidebar userType="engineer" />
        
        <main className="flex-grow p-6">
          <div className="mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <Link 
                  to="/find-jobs" 
                  className="inline-flex items-center text-sm text-green-600 hover:text-green-700 mb-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Jobs
                </Link>
                <h1 className="text-2xl font-bold text-gray-800">{job.title}</h1>
              </div>
              
              <div className="mt-4 md:mt-0">
                <button 
                  onClick={() => setShowBidForm(!showBidForm)} 
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium transition-colors duration-200"
                >
                  {showBidForm ? 'Cancel Bid' : 'Place a Bid'}
                </button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main job details */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Job Description</h2>
                <p className="text-gray-700 mb-6 whitespace-pre-line">{job.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Category</h3>
                    <p className="text-gray-800">{job.category}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Location</h3>
                    <p className="text-gray-800">{job.location}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Budget</h3>
                    <p className="text-gray-800">${job.budget}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Duration</h3>
                    <p className="text-gray-800">{job.duration} days</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Posted Date</h3>
                    <p className="text-gray-800">{formatDate(job.postedDate)}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Bid Deadline</h3>
                    <p className="font-medium text-red-600">{formatDate(job.deadline)}</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Required Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {job.requiredSkills.map((skill, index) => (
                      <span 
                        key={index} 
                        className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                {job.additionalInstructions && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Additional Instructions</h3>
                    <p className="text-gray-700 whitespace-pre-line">{job.additionalInstructions}</p>
                  </div>
                )}
              </div>
              
              {showBidForm && (
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">Submit Your Proposal</h2>
                  {errors.submit && <p className="text-red-500 mb-4 text-sm">{errors.submit}</p>}
                  <form onSubmit={handleBidSubmit} className="space-y-4">
  <div>
    <label htmlFor="bidAmount" className="block text-sm font-medium text-gray-700">
      Bid Amount ($)
    </label>
    <input
      type="number"
      id="bidAmount"
      name="bidAmount" // Add name attribute
      value={bidAmount}
      onChange={(e) => setBidAmount(e.target.value)}
      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
      placeholder="Enter your bid amount"
      disabled={isSubmitting}
    />
    {errors.bidAmount && <p className="text-red-500 text-sm mt-1">{errors.bidAmount}</p>}
  </div>

  <div>
    <label htmlFor="deliveryDays" className="block text-sm font-medium text-gray-700">
      Delivery Time (days)
    </label>
    <input
      type="number"
      id="deliveryDays"
      name="deliveryDays" // Add name attribute
      value={deliveryDays}
      onChange={(e) => setDeliveryDays(e.target.value)}
      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
      placeholder="Enter delivery time in days"
      disabled={isSubmitting}
    />
    {errors.deliveryDays && <p className="text-red-500 text-sm mt-1">{errors.deliveryDays}</p>}
  </div>

  <div>
    <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700">
      Cover Letter
    </label>
    <textarea
      id="coverLetter"
      name="coverLetter" // Add name attribute
      value={coverLetter}
      onChange={(e) => setCoverLetter(e.target.value)}
      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
      rows={5}
      placeholder="Write a cover letter to the client"
      disabled={isSubmitting}
    />
    {errors.coverLetter && <p className="text-red-500 text-sm mt-1">{errors.coverLetter}</p>}
  </div>

  {errors.submit && <p className="text-red-500 text-sm">{errors.submit}</p>}

  <button
    type="submit"
    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
    disabled={isSubmitting}
  >
    {isSubmitting ? 'Submitting...' : 'Submit Proposal'}
  </button>
</form>
                </div>
              )}
            </div>
            
            {/* Client info sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">About the Client</h2>
                
                <div className="flex items-center mb-4">
                  <div className="mr-3">
                    {job.clientImage ? (
                      <img 
                        src={job.clientImage} 
                        alt={job.clientName}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 text-xl font-semibold">
                        {job.clientName.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">{job.clientName}</h3>
                    <div className="flex items-center">
                      <div className="flex text-yellow-400 mr-1">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${i < Math.floor(job.clientRating) ? 'text-yellow-400' : 'text-gray-300'}`} viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">{job.clientRating.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Jobs Posted</span>
                    <span className="font-medium">{job.clientJobs}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Member Since</span>
                    <span className="font-medium">Jan 2023</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Verification</span>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Verified</span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-4">
                  This client has a verified payment method and has successfully completed multiple projects on our platform.
                </p>
                
                <Link 
                  to={`/client-profile/${job.clientName}`} 
                  className="block w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 text-center rounded font-medium transition-colors duration-200"
                >
                  View Client Profile
                </Link>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6 mt-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Similar Jobs</h2>
                
                <div className="space-y-4">
                  <div className="p-3 border border-gray-200 rounded hover:border-green-300 transition-colors">
                    <h3 className="font-medium text-gray-800 mb-1">
                      <Link to="/job-details/2" className="hover:text-green-600">Solar Maintenance for Hospital</Link>
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">Arusha, Tanzania • $950</p>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Posted 2 days ago</span>
                      <span className="font-medium text-green-600">5 bids</span>
                    </div>
                  </div>
                  
                  <div className="p-3 border border-gray-200 rounded hover:border-green-300 transition-colors">
                    <h3 className="font-medium text-gray-800 mb-1">
                      <Link to="/job-details/3" className="hover:text-green-600">PV System for Community Center</Link>
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">Mwanza, Tanzania • $1,300</p>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Posted 3 days ago</span>
                      <span className="font-medium text-green-600">7 bids</span>
                    </div>
                  </div>
                  
                  <div className="p-3 border border-gray-200 rounded hover:border-green-300 transition-colors">
                    <h3 className="font-medium text-gray-800 mb-1">
                      <Link to="/job-details/4" className="hover:text-green-600">Solar Water Pumping System</Link>
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">Dodoma, Tanzania • $1,100</p>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Posted 1 day ago</span>
                      <span className="font-medium text-green-600">3 bids</span>
                    </div>
                  </div>
                </div>
                
                <Link 
                  to="/find-jobs" 
                  className="block w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 text-center rounded font-medium transition-colors duration-200 mt-4"
                >
                  Browse More Jobs
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default JobDetails;