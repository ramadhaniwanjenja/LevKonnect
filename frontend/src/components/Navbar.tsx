import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavbarProps {
  isLoggedIn?: boolean;
  userType?: 'client' | 'engineer' | 'admin';
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn = false, userType }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [atPageTop, setAtPageTop] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Check if at the top of the page
      if (currentScrollY <= 10) {
        setAtPageTop(true);
        setVisible(true);
      } else {
        setAtPageTop(false);
        
        // When scrolling down, hide the navbar
        // When scrolling up, show the navbar
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setVisible(false);
        } else {
          setVisible(true);
        }
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Calculate the navbar classes based on state
  const navbarClasses = `fixed w-full bg-white shadow-md py-4 z-50 transition-all duration-300 ${
    visible ? 'top-0' : '-top-24'
  } ${atPageTop ? 'opacity-100' : visible ? 'opacity-95' : 'opacity-0'}`;

  return (
    <nav className={navbarClasses}>
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-green-600 font-bold text-2xl mr-1">Lev</span>
              <span className="text-gray-800 font-bold text-2xl">Konnect</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/home"
              className={`text-gray-700 hover:text-green-600 transition-colors ${
                isActive('/home') ? 'font-medium text-green-600' : ''
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`text-gray-700 hover:text-green-600 transition-colors ${
                isActive('/about') ? 'font-medium text-green-600' : ''
              }`}
            >
              About
            </Link>
            <Link
              to="/services"
              className={`text-gray-700 hover:text-green-600 transition-colors ${
                isActive('/services') ? 'font-medium text-green-600' : ''
              }`}
            >
              Services
            </Link>
            <Link
              to="/how-it-works"
              className={`text-gray-700 hover:text-green-600 transition-colors ${
                isActive('/how-it-works') ? 'font-medium text-green-600' : ''
              }`}
            >
              How It Works
            </Link>
            <Link
              to="/contact"
              className={`text-gray-700 hover:text-green-600 transition-colors ${
                isActive('/contact') ? 'font-medium text-green-600' : ''
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Auth Buttons or User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="relative group">
                <button
                  className="flex items-center space-x-2 text-gray-700 hover:text-green-600 transition-colors"
                >
                  <span>My Account</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 invisible group-hover:visible">
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600"
                  >
                    Dashboard
                  </Link>
                  {userType === 'client' && (
                    <Link
                      to="/post-job"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600"
                    >
                      Post a Job
                    </Link>
                  )}
                  {userType === 'engineer' && (
                    <Link
                      to="/find-jobs"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600"
                    >
                      Find Jobs
                    </Link>
                  )}
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600"
                  >
                    My Profile
                  </Link>
                  <Link
                    to="/messages"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600"
                  >
                    Messages
                  </Link>
                  <div className="border-t border-gray-100 my-1"></div>
                  <Link
                    to="/logout"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600"
                  >
                    Sign Out
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-green-600 hover:text-green-700 font-medium transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium transition-colors"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-500 hover:text-green-600 focus:outline-none"
            >
              {mobileMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-gray-200">
            <div className="flex flex-col space-y-3">
              <Link
                to="/home"
                className={`text-gray-700 hover:text-green-600 transition-colors py-2 ${
                  isActive('/home') ? 'font-medium text-green-600' : ''
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/about"
                className={`text-gray-700 hover:text-green-600 transition-colors py-2 ${
                  isActive('/about') ? 'font-medium text-green-600' : ''
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/services"
                className={`text-gray-700 hover:text-green-600 transition-colors py-2 ${
                  isActive('/services') ? 'font-medium text-green-600' : ''
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                to="/how-it-works"
                className={`text-gray-700 hover:text-green-600 transition-colors py-2 ${
                  isActive('/how-it-works') ? 'font-medium text-green-600' : ''
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                How It Works
              </Link>
              <Link
                to="/contact"
                className={`text-gray-700 hover:text-green-600 transition-colors py-2 ${
                  isActive('/contact') ? 'font-medium text-green-600' : ''
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>

              {isLoggedIn ? (
                <>
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <Link
                      to="/dashboard"
                      className={`text-gray-700 hover:text-green-600 transition-colors py-2 block ${
                        isActive('/dashboard') ? 'font-medium text-green-600' : ''
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    {userType === 'client' && (
                      <Link
                        to="/post-job"
                        className={`text-gray-700 hover:text-green-600 transition-colors py-2 block ${
                          isActive('/post-job') ? 'font-medium text-green-600' : ''
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Post a Job
                      </Link>
                    )}
                    {userType === 'engineer' && (
                      <Link
                        to="/find-jobs"
                        className={`text-gray-700 hover:text-green-600 transition-colors py-2 block ${
                          isActive('/find-jobs') ? 'font-medium text-green-600' : ''
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Find Jobs
                      </Link>
                    )}
                    <Link
                      to="/profile"
                      className={`text-gray-700 hover:text-green-600 transition-colors py-2 block ${
                        isActive('/profile') ? 'font-medium text-green-600' : ''
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      My Profile
                    </Link>
                    <Link
                      to="/messages"
                      className={`text-gray-700 hover:text-green-600 transition-colors py-2 block ${
                        isActive('/messages') ? 'font-medium text-green-600' : ''
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Messages
                    </Link>
                    <Link
                      to="/logout"
                      className="text-gray-700 hover:text-green-600 transition-colors py-2 block"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign Out
                    </Link>
                  </div>
                </>
              ) : (
                <div className="border-t border-gray-200 pt-3 mt-3 flex flex-col space-y-3">
                  <Link
                    to="/login"
                    className="text-green-600 hover:text-green-700 font-medium transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium transition-colors text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;