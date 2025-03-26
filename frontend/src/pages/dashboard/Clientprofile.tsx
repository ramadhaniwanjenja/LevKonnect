import * as React from 'react';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; // Added Link for navigation
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import DashboardSidebar from '../../components/DashboardSidebar';

interface ClientProfileData {
  id: string;
  name: string;
  company: string;
  location: string;
  memberSince: string;
  image?: string;
  bio: string;
  totalJobsPosted: number;
  verification: {
    email: boolean;
    payment: boolean;
    identity: boolean;
  };
  rating: {
    average: number;
    totalReviews: number;
  };
  recentJobs: {
    id: string;
    title: string;
    status: 'active' | 'completed';
    budget: number;
    date: string;
  }[];
  reviews: {
    id: string;
    engineerName: string;
    engineerImage?: string;
    rating: number;
    comment: string;
    date: string;
    jobTitle: string;
  }[];
}

const ClientProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [client, setClient] = useState<ClientProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'jobs' | 'reviews'>('jobs');
  const isOwnProfile = true; // Simulated; this should be determined by authentication state (e.g., comparing user ID with profile ID)

  useEffect(() => {
    // Simulate API call to fetch client data
    setTimeout(() => {
      const mockClientData: ClientProfileData = {
        id: id || '1',
        name: 'Education Ministry',
        company: 'Tanzania Education Ministry',
        location: 'Dar es Salaam, Tanzania',
        memberSince: '2023-01-15',
        bio: 'We are a governmental organization focused on improving educational facilities across Tanzania. Our mission is to ensure quality education for all by implementing sustainable solutions including renewable energy in schools.',
        totalJobsPosted: 12,
        verification: {
          email: true,
          payment: true,
          identity: true,
        },
        rating: {
          average: 4.8,
          totalReviews: 8,
        },
        recentJobs: [
          {
            id: '101',
            title: 'Solar Panel Installation for Rural School',
            status: 'active',
            budget: 1200,
            date: '2025-03-01',
          },
          {
            id: '102',
            title: 'Battery Storage System for High School',
            status: 'completed',
            budget: 950,
            date: '2025-02-15',
          },
          {
            id: '103',
            title: 'Solar Water Heating System for University',
            status: 'completed',
            budget: 1350,
            date: '2025-01-20',
          },
          {
            id: '104',
            title: 'Energy Audit for Technical College',
            status: 'completed',
            budget: 800,
            date: '2024-12-10',
          },
        ],
        reviews: [
          {
            id: '201',
            engineerName: 'John Mbugua',
            engineerImage: undefined,
            rating: 5,
            comment: 'Great client to work with. Clear requirements and prompt payment. The team was very supportive throughout the project.',
            date: '2025-02-25',
            jobTitle: 'Battery Storage System for High School',
          },
          {
            id: '202',
            engineerName: 'Sarah Ochieng',
            engineerImage: undefined,
            rating: 4.5,
            comment: 'The ministry was very professional in their approach. They provided all necessary information and were quick to respond to queries.',
            date: '2025-01-30',
            jobTitle: 'Solar Water Heating System for University',
          },
          {
            id: '203',
            engineerName: 'David Kamau',
            engineerImage: undefined,
            rating: 5,
            comment: 'Excellent experience working with the Education Ministry. Their commitment to improving education through sustainable energy is commendable.',
            date: '2024-12-15',
            jobTitle: 'Energy Audit for Technical College',
          },
        ],
      };

      setClient(mockClientData);
      setIsLoading(false);
    }, 1500);
  }, [id]);

  // Format date to more readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Calculate time since member joined
  const calculateMembershipDuration = (dateString: string) => {
    const joinDate = new Date(dateString);
    const currentDate = new Date();
    const diffYears = currentDate.getFullYear() - joinDate.getFullYear();
    const diffMonths = currentDate.getMonth() - joinDate.getMonth();

    if (diffYears > 0) {
      return `${diffYears} ${diffYears === 1 ? 'year' : 'years'}`;
    } else if (diffMonths > 0) {
      return `${diffMonths} ${diffMonths === 1 ? 'month' : 'months'}`;
    } else {
      return 'Less than a month';
    }
  };

  // Render star rating component
  const renderStars = (rating: number) => {
    const stars: JSX.Element[] = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`star-${i}`} className="fas fa-star text-yellow-500"></i>);
    }

    if (hasHalfStar) {
      stars.push(<i key="half-star" className="fas fa-star-half-alt text-yellow-500"></i>);
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="far fa-star text-yellow-500"></i>);
    }

    return stars;
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

  if (!client) {
    return (
      <div className="min-h-screen flex flex-col pt-20">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Client Not Found</h2>
            <p className="text-gray-600 mb-6">The profile you're looking for doesn't exist or has been removed.</p>
            <Link to="/clients" className="px-4 py-2 bg-green-600 text-white rounded-md">
              Browse Clients
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
        {/* Add DashboardSidebar for client if viewing own profile */}
        {isOwnProfile && <DashboardSidebar userType="client" />}

        <main className="flex-grow p-4 md:p-6">
          {/* Client Header */}
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <div className="flex flex-col md:flex-row">
              <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                {client.image ? (
                  <img
                    src={client.image}
                    alt={client.name}
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-lg bg-green-100 flex items-center justify-center">
                    <span className="text-green-700 text-2xl font-bold">
                      {client.name.charAt(0)}
                    </span>
                  </div>
                )}
                <div className="mt-2">
                  {client.verification.email && (
                    <span className="inline-flex items-center px-2 py-1 mr-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      <i className="fas fa-check-circle mr-1"></i> Email
                    </span>
                  )}
                  {client.verification.payment && (
                    <span className="inline-flex items-center px-2 py-1 mr-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <i className="fas fa-credit-card mr-1"></i> Payment
                    </span>
                  )}
                  {client.verification.identity && (
                    <span className="inline-flex items-center px-2 py-1 mr-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      <i className="fas fa-id-card mr-1"></i> Identity
                    </span>
                  )}
                </div>
              </div>
              <div className="flex-grow">
                <h1 className="text-2xl font-bold text-gray-800">{client.name}</h1>
                <p className="text-gray-600">{client.company}</p>
                <div className="flex items-center mt-2">
                  <i className="fas fa-map-marker-alt text-gray-500 mr-1"></i>
                  <span className="text-gray-500">{client.location}</span>
                </div>
                <div className="flex items-center mt-1">
                  <i className="fas fa-calendar-alt text-gray-500 mr-1"></i>
                  <span className="text-gray-500">
                    Member for {calculateMembershipDuration(client.memberSince)}
                  </span>
                </div>
                <div className="flex items-center mt-1">
                  <i className="fas fa-briefcase text-gray-500 mr-1"></i>
                  <span className="text-gray-500">{client.totalJobsPosted} jobs posted</span>
                </div>
                <div className="flex items-center mt-1">
                  <div className="flex mr-2">{renderStars(client.rating.average)}</div>
                  <span className="text-gray-500">
                    {client.rating.average.toFixed(1)} ({client.rating.totalReviews} reviews)
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <h2 className="text-lg font-semibold text-gray-700 mb-2">About</h2>
              <p className="text-gray-600">{client.bio}</p>
            </div>
            {isOwnProfile && (
              <div className="mt-4">
                <Link
                  to="/edit-profile"
                  className="px-6 py-2 border border-green-600 text-green-600 hover:bg-green-50 rounded-md font-medium transition-colors"
                >
                  Edit Profile
                </Link>
              </div>
            )}
          </div>

          {/* Tabs */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="border-b border-gray-200">
              <nav className="flex">
                <button
                  onClick={() => setActiveTab('jobs')}
                  className={`px-6 py-4 text-sm font-medium ${
                    activeTab === 'jobs'
                      ? 'text-green-600 border-b-2 border-green-500'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Posted Jobs ({client.recentJobs.length})
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`px-6 py-4 text-sm font-medium ${
                    activeTab === 'reviews'
                      ? 'text-green-600 border-b-2 border-green-500'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Reviews ({client.reviews.length})
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'jobs' && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Jobs</h2>
                  {client.recentJobs.map((job) => (
                    <div
                      key={job.id}
                      className="border-b border-gray-200 pb-4 mb-4 last:border-b-0 last:mb-0 last:pb-0"
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <h3 className="text-lg font-medium text-gray-800">{job.title}</h3>
                        <div className="mt-2 md:mt-0">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              job.status === 'active'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}
                          >
                            {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                          </span>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <i className="fas fa-dollar-sign mr-1"></i>
                        <span>Budget: ${job.budget}</span>
                        <span className="mx-2">•</span>
                        <i className="far fa-calendar-alt mr-1"></i>
                        <span>Posted: {formatDate(job.date)}</span>
                      </div>
                      <div className="mt-3">
                        <Link
                          to={`/jobs/${job.id}`}
                          className="text-green-600 hover:text-green-700 font-medium text-sm"
                        >
                          View Job Details
                          <i className="fas fa-arrow-right ml-1"></i>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'reviews' && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Engineer Reviews</h2>
                  {client.reviews.map((review) => (
                    <div
                      key={review.id}
                      className="border-b border-gray-200 pb-4 mb-4 last:border-b-0 last:mb-0 last:pb-0"
                    >
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mr-4">
                          {review.engineerImage ? (
                            <img
                              src={review.engineerImage}
                              alt={review.engineerName}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                              <span className="text-green-700 font-medium">
                                {review.engineerName.charAt(0)}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="flex-grow">
                          <div className="flex justify-between">
                            <h3 className="text-md font-medium text-gray-800">{review.engineerName}</h3>
                            <span className="text-sm text-gray-500">{formatDate(review.date)}</span>
                          </div>
                          <div className="flex mt-1">{renderStars(review.rating)}</div>
                          <p className="mt-2 text-gray-600">{review.comment}</p>
                          <p className="mt-1 text-sm text-gray-500">
                            <i className="fas fa-briefcase mr-1"></i>
                            {review.jobTitle}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default ClientProfile;