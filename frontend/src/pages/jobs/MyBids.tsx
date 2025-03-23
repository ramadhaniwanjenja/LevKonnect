import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import DashboardSidebar from '../../components/DashboardSidebar';

interface Bid {
  id: number;
  jobId: number;
  jobTitle: string;
  clientName: string;
  bidAmount: number;
  deliveryDays: number;
  status: 'pending' | 'shortlisted' | 'accepted' | 'rejected';
  submittedDate: string;
}

const MyBids: React.FC = () => {
  const [bids, setBids] = useState<Bid[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBids = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found. Please log in.');
        }

        const response = await axios.get('http://localhost:5000/api/bids/my-bids', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const transformedBids: Bid[] = response.data.map((bid: any) => ({
          id: bid.id,
          jobId: bid.job_id,
          jobTitle: bid.job?.title || 'Unknown Job',
          clientName: bid.job?.client?.username || 'Unknown Client',
          bidAmount: parseFloat(bid.bid_amount),
          deliveryDays: bid.delivery_days,
          status: bid.status as 'pending' | 'shortlisted' | 'accepted' | 'rejected',
          submittedDate: bid.submitted_date || new Date().toISOString(),
        }));

        setBids(transformedBids);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching bids:', err);
        setError('Failed to load bids. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchBids();
  }, []);

  const filteredBids = filter === 'all' 
    ? bids 
    : bids.filter(bid => bid.status === filter);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'pending':
        return <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">Pending</span>;
      case 'shortlisted':
        return <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">Shortlisted</span>;
      case 'accepted':
        return <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">Accepted</span>;
      case 'rejected':
        return <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">Rejected</span>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col pt-15">
      <Navbar />
      
      <div className="flex-grow flex flex-col md:flex-row bg-gray-50">
        <DashboardSidebar userType="engineer" />
        
        <main className="flex-grow p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">My Bids</h1>
            <p className="text-gray-600">Track and manage your job proposals</p>
          </div>
          
          {/* Filter tabs */}
          <div className="bg-white rounded-lg shadow mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                <button 
                  onClick={() => setFilter('all')} 
                  className={`py-4 px-6 font-medium text-sm border-b-2 ${
                    filter === 'all' 
                      ? 'border-green-500 text-green-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } transition-colors duration-200`}
                >
                  All Bids
                </button>
                <button 
                  onClick={() => setFilter('pending')} 
                  className={`py-4 px-6 font-medium text-sm border-b-2 ${
                    filter === 'pending' 
                      ? 'border-green-500 text-green-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } transition-colors duration-200`}
                >
                  Pending
                </button>
                <button 
                  onClick={() => setFilter('shortlisted')} 
                  className={`py-4 px-6 font-medium text-sm border-b-2 ${
                    filter === 'shortlisted' 
                      ? 'border-green-500 text-green-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } transition-colors duration-200`}
                >
                  Shortlisted
                </button>
                <button 
                  onClick={() => setFilter('accepted')} 
                  className={`py-4 px-6 font-medium text-sm border-b-2 ${
                    filter === 'accepted' 
                      ? 'border-green-500 text-green-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } transition-colors duration-200`}
                >
                  Accepted
                </button>
                <button 
                  onClick={() => setFilter('rejected')} 
                  className={`py-4 px-6 font-medium text-sm border-b-2 ${
                    filter === 'rejected' 
                      ? 'border-green-500 text-green-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } transition-colors duration-200`}
                >
                  Rejected
                </button>
              </nav>
            </div>
          </div>
          
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
          ) : error ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-red-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h2 className="text-xl font-bold text-gray-800 mb-2">Error</h2>
              <p className="text-gray-600 mb-6">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="inline-block px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium transition-colors duration-200"
              >
                Retry
              </button>
            </div>
          ) : filteredBids.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h2 className="text-xl font-bold text-gray-800 mb-2">No Bids Found</h2>
              <p className="text-gray-600 mb-6">
                {filter === 'all' 
                  ? "You haven't submitted any bids yet."
                  : `You don't have any ${filter} bids.`}
              </p>
              <Link 
                to="/find-jobs" 
                className="inline-block px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium transition-colors duration-200"
              >
                Find Jobs to Bid On
              </Link>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Job Details
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Bid Amount
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Delivery
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Submitted
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredBids.map((bid) => (
                      <tr key={bid.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 hover:text-green-600">
                            <Link to={`/job-details/${bid.jobId}`}>{bid.jobTitle}</Link>
                          </div>
                          <div className="text-sm text-gray-500">{bid.clientName}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">${bid.bidAmount}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{bid.deliveryDays} days</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(bid.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{formatDate(bid.submittedDate)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link to={`/bid-details/${bid.id}`} className="text-green-600 hover:text-green-900 mr-4">
                            View
                          </Link>
                          {bid.status === 'pending' && (
                            <Link to={`/edit-bid/${bid.id}`} className="text-blue-600 hover:text-blue-900">
                              Edit
                            </Link>
                          )}
                          {bid.status === 'accepted' && (
                            <Link to={`/project/${bid.id}`} className="text-indigo-600 hover:text-indigo-900">
                              Go to Project
                            </Link>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          <div className="mt-8 bg-blue-50 rounded-lg p-6 border border-blue-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Tips for Successful Bidding</h2>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Personalize your proposals and address the specific needs mentioned in the job posting.</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Highlight your relevant experience and portfolio projects that demonstrate your skills.</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Be realistic about your delivery timeline and pricing to build trust with potential clients.</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Respond promptly to client messages and clarification requests to show your professionalism.</span>
              </li>
            </ul>
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default MyBids;