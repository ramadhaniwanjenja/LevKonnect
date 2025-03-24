import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import axios for API calls
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import DashboardSidebar from '../../components/DashboardSidebar';

const Dashboard: React.FC = () => {
  const [userType] = useState<'client' | 'engineer'>('client'); // For demo, would come from auth
  const [stats, setStats] = useState({
    activeProjects: 0,
    completedProjects: 0,
    pendingBids: 0,
    earnings: 0,
  });
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch metrics from the backend
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found');
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const metricsResponse = await axios.get('http://localhost:5000/api/dashboard/metrics', config);
        setStats({
          activeProjects: metricsResponse.data.activeProjects,
          completedProjects: metricsResponse.data.completedProjects,
          pendingBids: metricsResponse.data.pendingBids,
          earnings: 0, // Earnings not implemented for client; can be added for engineer later
        });

        // Keep recent activity static for now to match the screenshot
        if (userType === 'client') {
          setRecentActivity([
            { id: 1, type: 'bid', title: 'New bid on Solar Installation Project', date: '2025-03-05' },
            { id: 2, type: 'milestone', title: 'Milestone completed on Wind Energy Assessment', date: '2025-03-03' },
            { id: 3, type: 'message', title: 'New message from John Doe', date: '2025-03-01' },
          ]);
        } else {
          setRecentActivity([
            { id: 1, type: 'job', title: 'New job matching your skills: Solar Panel Installation', date: '2025-03-06' },
            { id: 2, type: 'payment', title: 'Payment received for Energy Audit', date: '2025-03-04' },
            { id: 3, type: 'message', title: 'New message from TanzSolar Ltd.', date: '2025-03-02' },
          ]);
        }

        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [userType]);

  const renderActivityIcon = (type: string) => {
    switch (type) {
      case 'bid':
        return <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">📝</div>;
      case 'milestone':
        return <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-500">🏆</div>;
      case 'message':
        return <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-500">💬</div>;
      case 'job':
        return <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-500">👨‍💼</div>;
      case 'payment':
        return <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-500">💰</div>;
      default:
        return <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">📌</div>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col pt-12">
      <Navbar />
      
      <div className="flex-grow flex flex-col md:flex-row bg-gray-50">
        <DashboardSidebar userType={userType} />
        
        <main className="flex-grow p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here's what's happening.</p>
          </div>
          
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
          ) : error ? (
            <div className="text-red-500 text-center">{error}</div>
          ) : (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Active Projects</h3>
                  <p className="text-3xl font-bold text-gray-800">{stats.activeProjects}</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Completed Projects</h3>
                  <p className="text-3xl font-bold text-gray-800">{stats.completedProjects}</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Pending Bids</h3>
                  <p className="text-3xl font-bold text-gray-800">{stats.pendingBids}</p>
                </div>
                
                {userType === 'engineer' && (
                  <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Total Earnings</h3>
                    <p className="text-3xl font-bold text-gray-800">${stats.earnings}</p>
                  </div>
                )}
                
                {userType === 'client' && (
                  <div className="bg-white p-6 rounded-lg shadow">
                    <Link 
                      to="/post-job" 
                      className="flex items-center justify-center h-full w-full text-green-600 hover:text-green-700"
                    >
                      <span className="mr-2">+</span> Post New Job
                    </Link>
                  </div>
                )}
              </div>
              
              {/* Recent Activity */}
              <div className="bg-white rounded-lg shadow mb-8">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="font-medium text-gray-800">Recent Activity</h2>
                </div>
                <div className="divide-y divide-gray-200">
                  {recentActivity.length > 0 ? (
                    recentActivity.map((activity) => (
                      <div key={activity.id} className="px-6 py-4 flex items-start">
                        {renderActivityIcon(activity.type)}
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-800">{activity.title}</p>
                          <p className="text-xs text-gray-500">{new Date(activity.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="px-6 py-4 text-center text-gray-500">No recent activity</div>
                  )}
                </div>
                <div className="px-6 py-3 bg-gray-50 text-right rounded-b-lg">
                  <Link to="/activity" className="text-sm text-blue-600 hover:underline">View All Activity</Link>
                </div>
              </div>
              
              {/* Quick Actions */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="font-medium text-gray-800">Quick Actions</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
                  {userType === 'client' ? (
                    <>
                      <Link to="/post-job" className="btn bg-green-600 hover:bg-green-700 text-white text-center py-2 px-4 rounded">
                        Post New Job
                      </Link>
                      <Link to="/manage-projects" className="btn bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-4 rounded">
                        Manage Projects
                      </Link>
                      <Link to="/messages" className="btn bg-purple-600 hover:bg-purple-700 text-white text-center py-2 px-4 rounded">
                        Messages
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link to="/find-jobs" className="btn bg-green-600 hover:bg-green-700 text-white text-center py-2 px-4 rounded">
                        Find Jobs
                      </Link>
                      <Link to="/my-bids" className="btn bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-4 rounded">
                        My Bids
                      </Link>
                      <Link to="/messages" className="btn bg-purple-600 hover:bg-purple-700 text-white text-center py-2 px-4 rounded">
                        Messages
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default Dashboard;