import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface DashboardSidebarProps {
  userType: 'client' | 'engineer' | 'admin';
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ userType }) => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  const getMenuItems = () => {
    switch (userType) {
      case 'client':
        return [
          { path: '/dashboard', label: 'Dashboard', icon: '📊' },
          { path: '/post-job', label: 'Post Job', icon: '➕' },
          { path: '/manage-projects', label: 'My Projects', icon: '📂' },
          { path: '/messages', label: 'Messages', icon: '💬' },
          { path: '/payments', label: 'Payments', icon: '💳' },
          { path: '/client-profile', label: 'My Profile', icon: '👤' },
        ];
      case 'engineer':
        return [
          { path: '/engineer-dashboard', label: 'Dashboard', icon: '📊' },
          { path: '/find-jobs', label: 'Find Jobs', icon: '🔍' },
          { path: '/my-bids', label: 'My Bids', icon: '📝' },
          { path: '/active-projects', label: 'Active Projects', icon: '⚙️' },
          { path: '/messages', label: 'Messages', icon: '💬' },
          { path: '/earnings', label: 'Earnings', icon: '💰' },
          { path: '/engineer-profile', label: 'My Profile', icon: '👤' },
        ];
      case 'admin':
        return [
          { path: '/admin', label: 'Admin Dashboard', icon: '📈' },
          { path: '/jobs/all', label: 'All Jobs', icon: '📋' },
          { path: '/manage-users', label: 'Manage Users', icon: '👥' },
        ];
      default:
        return [];
    }
  };
  
  const menuItems = getMenuItems();

  return (
    <aside className="w-full md:w-64 bg-white shadow-md md:min-h-screen">
      <div className="p-6 border-b border-gray-200">
        <h2 className="font-bold text-xl text-gray-800">
          {userType === 'client' ? 'Client Portal' : userType === 'engineer' ? 'Engineer Portal' : 'Admin Portal'}
        </h2>
      </div>
      
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className={`flex items-center p-3 rounded-lg transition-colors duration-200 
                  ${isActive(item.path) ? 'bg-green-50 text-green-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 mt-8 border-t border-gray-200">
        <Link
          to="/settings"
          className="flex items-center p-3 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200"
        >
          <span className="mr-3">⚙️</span>
          <span>Settings</span>
        </Link>
        <Link
          to="/login"
          className="flex items-center p-3 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200"
        >
          <span className="mr-3">🚪</span>
          <span>Sign Out</span>
        </Link>
      </div>
    </aside>
  );
};

export default DashboardSidebar;