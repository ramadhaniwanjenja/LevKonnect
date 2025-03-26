import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import axiosInstance from '../../axiosInstance'; // Import axiosInstance
import { isAxiosError } from 'axios'; // Import isAxiosError
import { jwtDecode } from 'jwt-decode';

// Types (unchanged)
interface User {
  id: number;
  name: string;
  email: string;
  role: 'client' | 'engineer' | 'admin';
  status: 'active' | 'pending' | 'suspended';
  joinedDate: string;
}

interface Job {
  id: number;
  title: string;
  clientName: string;
  category: string;
  location: string;
  budget: number;
  status: 'open' | 'assigned' | 'completed' | 'disputed';
  postedDate: string;
}

interface PlatformStats {
  totalUsers: number;
  newUsersThisMonth: number;
  activeJobs: number;
  completedJobs: number;
  totalRevenue: number;
  pendingVerifications: number;
}

interface DecodedToken {
  id: number;
  user_type: 'client' | 'engineer' | 'admin';
  iat: number;
  exp: number;
}

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'jobs' | 'content'>('overview');
  const [stats, setStats] = useState<PlatformStats | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [error, setError] = useState<string>('');

  const [userPage, setUserPage] = useState(1);
  const [jobPage, setJobPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError('');
  
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          throw new Error('No authentication token found. Please log in.');
        }
  
        const decoded: DecodedToken = jwtDecode(token);
        console.log('Decoded token in AdminDashboard:', decoded);
        if (decoded.user_type !== 'admin') {
          navigate('/login');
          throw new Error('You do not have permission to access this dashboard. Please log in as an admin.');
        }
  
        // Fetch users using axiosInstance
        console.log('Fetching users with URL:', `/api/users/admin/users?page=${userPage}&limit=${itemsPerPage}`); // Debug
        const usersResponse = await axiosInstance.get(`/api/users/admin/users?page=${userPage}&limit=${itemsPerPage}`);
        console.log('Users API Response:', usersResponse.data);
  
        if (usersResponse.data.message === 'Requires Admin Role!') {
          navigate('/login');
          throw new Error('You do not have permission to access this dashboard. Please log in as an admin.');
        }
  
        const transformedUsers: User[] = (usersResponse.data.data || []).map((user: any) => ({
          id: user.id,
          name: `${user.first_name || ''} ${user.last_name || ''}`.trim() || user.username,
          email: user.email,
          role: user.user_type as 'client' | 'engineer' | 'admin',
          status: user.is_verified ? 'active' : 'pending',
          joinedDate: user.created_at || user.createdAt || new Date().toISOString(),
        }));
        setUsers(transformedUsers);
  
        // Fetch jobs using axiosInstance
        const jobsResponse = await axiosInstance.get('/api/jobs/all');
        console.log('Jobs API Response:', jobsResponse.data);
  
        const transformedJobs: Job[] = (jobsResponse.data || []).map((job: any) => ({
          id: job.id,
          title: job.title,
          clientName: job.client?.username || 'Unknown Client',
          category: job.category || 'N/A',
          location: job.location || 'N/A',
          budget: job.budget || 0,
          status: job.status as 'open' | 'assigned' | 'completed' | 'disputed',
          postedDate: job.created_at || job.createdAt || new Date().toISOString(),
        }));
        setJobs(transformedJobs);
  
        // Calculate platform stats
        const currentMonth = new Date().getMonth() + 1;
        const currentYear = new Date().getFullYear();
  
        const newUsersThisMonth = transformedUsers.filter(user => {
          const joinedDate = new Date(user.joinedDate);
          return joinedDate.getMonth() + 1 === currentMonth && joinedDate.getFullYear() === currentYear;
        }).length;
  
        const activeJobs = transformedJobs.filter(job => job.status === 'open' || job.status === 'assigned').length;
        const completedJobs = transformedJobs.filter(job => job.status === 'completed').length;
        const totalRevenue = transformedJobs.reduce((sum, job) => sum + job.budget, 0);
        const pendingVerifications = transformedUsers.filter(user => user.status === 'pending').length;
  
        const platformStats: PlatformStats = {
          totalUsers: transformedUsers.length,
          newUsersThisMonth,
          activeJobs,
          completedJobs,
          totalRevenue,
          pendingVerifications,
        };
        setStats(platformStats);
  
      } catch (error) {
        console.error('Error fetching data:', error);
        if (isAxiosError(error)) {
          if (isAxiosError(error)) {
            setError(error.response?.data?.message || error.message || 'Failed to load dashboard data');
          } else if (typeof error === 'object' && error !== null && 'message' in error) {
            setError((error as any).message || 'Failed to load dashboard data');
          } else {
            setError('Failed to load dashboard data');
          }
        } else if (error instanceof Error) {
          setError(error.message || 'Failed to load dashboard data');
        } else {
          setError('Failed to load dashboard data');
        }
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, [navigate, userPage]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = searchTerm === '' ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = searchTerm === '' ||
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.clientName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = selectedStatus === 'all' || job.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const paginatedJobs = filteredJobs.slice((jobPage - 1) * itemsPerPage, jobPage * itemsPerPage);

  const changeUserStatus = async (userId: number, newStatus: 'active' | 'pending' | 'suspended') => {
    try {
      await axiosInstance.put(`/api/users/admin/users/${userId}/deactivate`, {
        is_verified: newStatus === 'active',
      });
      setUsers(users.map(user =>
        user.id === userId ? { ...user, status: newStatus } : user
      ));
    } catch (error) {
      console.error('Error updating user status:', error);
      setError('Failed to update user status');
    }
  };

  const changeJobStatus = async (jobId: number, newStatus: 'open' | 'assigned' | 'completed' | 'disputed') => {
    try {
      await axiosInstance.put(`/api/jobs/${jobId}`, { status: newStatus });
      setJobs(jobs.map(job =>
        job.id === jobId ? { ...job, status: newStatus } : job
      ));
    } catch (error) {
      console.error('Error updating job status:', error);
      setError('Failed to update job status');
    }
  };

  // Rest of the component (unchanged)
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

  if (error) {
    return (
      <div className="min-h-screen flex flex-col pt-10">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-red-500 text-center">
            <p>Error: {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Retry
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col pt-10 bg-gray-50">
      <Navbar />
      
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage users, jobs, and platform content</p>
        </div>
        
        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'overview' 
                  ? 'border-b-2 border-green-500 text-green-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'users' 
                  ? 'border-b-2 border-green-500 text-green-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Users
            </button>
            <button
              onClick={() => setActiveTab('jobs')}
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'jobs' 
                  ? 'border-b-2 border-green-500 text-green-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Jobs
            </button>
            <button
              onClick={() => setActiveTab('content')}
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'content' 
                  ? 'border-b-2 border-green-500 text-green-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Content
            </button>
          </div>
          
          {/* Overview Tab Content */}
          {activeTab === 'overview' && stats && (
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Platform Overview</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Total Users</h3>
                  <p className="text-2xl font-bold text-gray-800">{stats.totalUsers.toLocaleString()}</p>
                  <p className="text-sm text-green-600 mt-2">+{stats.newUsersThisMonth} this month</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Active Jobs</h3>
                  <p className="text-2xl font-bold text-gray-800">{stats.activeJobs.toLocaleString()}</p>
                  <p className="text-sm text-gray-500 mt-2">{stats.completedJobs} completed total</p>
                </div>
                
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Total Revenue</h3>
                  <p className="text-2xl font-bold text-gray-800">{formatCurrency(stats.totalRevenue)}</p>
                  <p className="text-sm text-gray-500 mt-2">Platform fees collected</p>
                </div>
              </div>
              
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-8">
                <div className="flex items-center">
                  <div className="mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-orange-800">Pending Verification Requests</h3>
                    <p className="text-orange-700">{stats.pendingVerifications} users waiting for approval</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-800 mb-3">Recent Users</h3>
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {users.slice(0, 5).map(user => (
                          <tr key={user.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{user.name}</div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                user.role === 'client' ? 'bg-blue-100 text-blue-800' : 
                                user.role === 'engineer' ? 'bg-green-100 text-green-800' : 
                                'bg-purple-100 text-purple-800'
                              }`}>
                                {user.role}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatDate(user.joinedDate)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
                      <Link to="/admin/users" className="text-sm font-medium text-green-600 hover:text-green-500">
                        View all users
                      </Link>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-800 mb-3">Recent Jobs</h3>
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {jobs.slice(0, 5).map(job => (
                          <tr key={job.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{job.title}</div>
                              <div className="text-sm text-gray-500">{formatCurrency(job.budget)}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {job.clientName}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                job.status === 'open' ? 'bg-green-100 text-green-800' : 
                                job.status === 'assigned' ? 'bg-yellow-100 text-yellow-800' : 
                                job.status === 'completed' ? 'bg-blue-100 text-blue-800' : 
                                'bg-red-100 text-red-800'
                              }`}>
                                {job.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
                      <Link to="/admin/jobs" className="text-sm font-medium text-green-600 hover:text-green-500">
                        View all jobs
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Users Tab Content */}
          {activeTab === 'users' && (
            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 md:mb-0">Manage Users</h2>
                
                <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full md:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-md"
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full md:w-40 px-4 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined Date</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers.map(user => (
                      <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold">
                                {user.name.charAt(0)}
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{user.name}</div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.role === 'client' ? 'bg-blue-100 text-blue-800' : 
                            user.role === 'engineer' ? 'bg-green-100 text-green-800' : 
                            'bg-purple-100 text-purple-800'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.status === 'active' ? 'bg-green-100 text-green-800' : 
                            user.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-red-100 text-red-800'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(user.joinedDate)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <Link to={`/admin/users/${user.id}`} className="text-indigo-600 hover:text-indigo-900">
                              View
                            </Link>
                            <div className="relative group">
                              <button className="text-gray-500 hover:text-gray-700">
                                Change Status
                              </button>
                              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                                <button
                                  onClick={() => changeUserStatus(user.id, 'active')}
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                >
                                  Set as Active
                                </button>
                                <button
                                  onClick={() => changeUserStatus(user.id, 'pending')}
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                >
                                  Set as Pending
                                </button>
                                <button
                                  onClick={() => changeUserStatus(user.id, 'suspended')}
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                >
                                  Suspend User
                                </button>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredUsers.length === 0 && (
                  <div className="px-6 py-10 text-center">
                    <p className="text-gray-500">No users found matching your criteria.</p>
                  </div>
                )}
                <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    Showing {filteredUsers.length} of {users.length} users
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setUserPage(prev => Math.max(prev - 1, 1))}
                      className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                      disabled={userPage === 1}
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setUserPage(prev => prev + 1)}
                      className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                      disabled={filteredUsers.length < itemsPerPage}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Jobs Tab Content */}
          {activeTab === 'jobs' && (
            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 md:mb-0">Manage Jobs</h2>
                
                <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search jobs..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full md:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-md"
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full md:w-40 px-4 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="all">All Status</option>
                    <option value="open">Open</option>
                    <option value="assigned">Assigned</option>
                    <option value="completed">Completed</option>
                    <option value="disputed">Disputed</option>
                  </select>
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posted Date</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {paginatedJobs.map(job => (
                      <tr key={job.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{job.title}</div>
                          <div className="text-sm text-gray-500">{formatCurrency(job.budget)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.clientName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.category}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(job.budget)}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            job.status === 'open' ? 'bg-green-100 text-green-800' :
                            job.status === 'assigned' ? 'bg-yellow-100 text-yellow-800' :
                            job.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {job.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(job.postedDate)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <Link to={`/admin/jobs/${job.id}`} className="text-indigo-600 hover:text-indigo-900">
                              View
                            </Link>
                            <div className="relative group">
                              <button className="text-gray-500 hover:text-gray-700">
                                Change Status
                              </button>
                              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                                <button
                                  onClick={() => changeJobStatus(job.id, 'open')}
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                >
                                  Set as Open
                                </button>
                                <button
                                  onClick={() => changeJobStatus(job.id, 'assigned')}
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                >
                                  Assign Job
                                </button>
                                <button
                                  onClick={() => changeJobStatus(job.id, 'completed')}
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                >
                                  Mark as Completed
                                </button>
                                <button
                                  onClick={() => changeJobStatus(job.id, 'disputed')}
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                >
                                  Mark as Disputed
                                </button>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {paginatedJobs.length === 0 && (
                  <div className="px-6 py-10 text-center">
                    <p className="text-gray-500">No jobs found matching your criteria.</p>
                  </div>
                )}

                <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    Showing {paginatedJobs.length} of {filteredJobs.length} jobs
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setJobPage(prev => Math.max(prev - 1, 1))}
                      className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                      disabled={jobPage === 1}
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setJobPage(prev => prev + 1)}
                      className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                      disabled={paginatedJobs.length < itemsPerPage}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Content Tab Content */}
          {activeTab === 'content' && (
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Manage Content</h2>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <p className="text-gray-600 mb-4">
                  This section will allow you to manage platform content such as blog posts, announcements, or other resources.
                </p>
                <div className="flex justify-center">
                  <button
                    onClick={() => alert('Feature coming soon!')}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Add New Content
                  </button>
                </div>
                <div className="mt-6 text-center text-gray-500">
                  <p>No content available yet. Check back later or add new content to get started!</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AdminDashboard;