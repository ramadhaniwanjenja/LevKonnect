import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import DashboardSidebar from '../../components/DashboardSidebar';

interface Project {
  id: number;
  title: string;
  clientName: string;
  startDate: string;
  deadline: string;
  status: 'In Progress' | 'On Hold' | 'Pending Client Review';
  budget: number;
  completionPercentage: number;
  nextMilestone: string;
  nextMilestoneDate: string;
}

const ActiveProjects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    // Simulate API call to fetch active projects
    setTimeout(() => {
      // This would be replaced with an actual API call
      const projectsData: Project[] = [
        {
          id: 1,
          title: 'Solar Panel Installation for Rural School',
          clientName: 'Education Ministry',
          startDate: '2025-03-05',
          deadline: '2025-03-19',
          status: 'In Progress',
          budget: 1200,
          completionPercentage: 45,
          nextMilestone: 'Solar Panel Mounting',
          nextMilestoneDate: '2025-03-12'
        },
        {
          id: 2,
          title: 'PV System Design for Residential Complex',
          clientName: 'TanHomes Development',
          startDate: '2025-02-28',
          deadline: '2025-03-25',
          status: 'Pending Client Review',
          budget: 1800,
          completionPercentage: 65,
          nextMilestone: 'System Component Approval',
          nextMilestoneDate: '2025-03-10'
        },
        {
          id: 3,
          title: 'Maintenance of Solar Water Pump',
          clientName: 'Mwanza Community Center',
          startDate: '2025-03-01',
          deadline: '2025-03-10',
          status: 'On Hold',
          budget: 450,
          completionPercentage: 30,
          nextMilestone: 'Pump Motor Replacement',
          nextMilestoneDate: '2025-03-15'
        }
      ];
      
      setProjects(projectsData);
      setIsLoading(false);
    }, 1000);
  }, []);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.status.toLowerCase().includes(filter.toLowerCase()));

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'On Hold':
        return 'bg-yellow-100 text-yellow-800';
      case 'Pending Client Review':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen flex flex-col pt-20">
      <Navbar />
      
      <div className="flex-grow flex flex-col md:flex-row bg-gray-50">
        <DashboardSidebar userType="engineer" />
        
        <main className="flex-grow p-6">
          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-1">Active Projects</h1>
              <p className="text-gray-600">Manage your ongoing projects and track their progress</p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              >
                <option value="all">All Projects</option>
                <option value="in progress">In Progress</option>
                <option value="on hold">On Hold</option>
                <option value="pending">Pending Review</option>
              </select>
            </div>
          </div>
          
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">No active projects found</h2>
              <p className="text-gray-600 mb-6">You don't have any active projects matching your filter criteria.</p>
              <Link
                to="/find-jobs"
                className="inline-block px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium transition-colors duration-200"
              >
                Find New Projects
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {filteredProjects.map((project) => (
                <div key={project.id} className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <h2 className="text-xl font-semibold text-gray-800 mb-2 md:mb-0">
                        <Link to={`/project-details/${project.id}`} className="hover:text-green-600">
                          {project.title}
                        </Link>
                      </h2>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Client</p>
                        <p className="font-medium">{project.clientName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Budget</p>
                        <p className="font-medium">${project.budget}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Start Date</p>
                        <p className="font-medium">{formatDate(project.startDate)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Deadline</p>
                        <p className="font-medium">{formatDate(project.deadline)}</p>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Progress</span>
                        <span className="text-sm font-medium">{project.completionPercentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: `${project.completionPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-md flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <p className="text-sm font-medium text-blue-700">Next Milestone: {project.nextMilestone}</p>
                        <p className="text-sm text-blue-600">Due by {formatDate(project.nextMilestoneDate)}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 px-6 py-3 flex flex-wrap gap-2">
                    <Link
                      to={`/project-details/${project.id}`}
                      className="text-green-600 hover:text-green-700 text-sm font-medium"
                    >
                      View Details
                    </Link>
                    <span className="text-gray-300 mx-2">|</span>
                    <Link
                      to={`/project-milestones/${project.id}`}
                      className="text-green-600 hover:text-green-700 text-sm font-medium"
                    >
                      Manage Milestones
                    </Link>
                    <span className="text-gray-300 mx-2">|</span>
                    <Link
                      to={`/messages/${project.id}`}
                      className="text-green-600 hover:text-green-700 text-sm font-medium"
                    >
                      Client Messages
                    </Link>
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

export default ActiveProjects;