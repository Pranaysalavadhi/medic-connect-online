
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { UserIcon, Calendar, FileText, LogOut, Menu, X } from 'lucide-react';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary">
                HealthSync
              </span>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="px-3 py-2 text-sm font-medium text-gray-900 hover:text-primary"
                >
                  Dashboard
                </Link>
                
                {user?.role === 'PATIENT' && (
                  <>
                    <Link
                      to="/appointments"
                      className="px-3 py-2 text-sm font-medium text-gray-900 hover:text-primary"
                    >
                      My Appointments
                    </Link>
                    <Link
                      to="/records"
                      className="px-3 py-2 text-sm font-medium text-gray-900 hover:text-primary"
                    >
                      Health Records
                    </Link>
                  </>
                )}
                
                {user?.role === 'DOCTOR' && (
                  <Link
                    to="/appointments"
                    className="px-3 py-2 text-sm font-medium text-gray-900 hover:text-primary"
                  >
                    Appointments
                  </Link>
                )}
                
                <div className="flex items-center space-x-2 border-l pl-3 ml-3">
                  <UserIcon className="h-5 w-5 text-gray-500" />
                  <span className="text-sm font-medium text-gray-900">
                    {user?.name}
                  </span>
                  
                  <button
                    onClick={handleLogout}
                    className="ml-2 px-3 py-2 text-sm font-medium text-gray-900 hover:text-red-600 inline-flex items-center"
                  >
                    <LogOut className="h-4 w-4 mr-1" />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-3 py-2 text-sm font-medium text-gray-900 hover:text-primary"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-3 py-2 text-sm font-medium bg-primary text-white rounded-md hover:bg-primary/90"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="pt-2 pb-3 space-y-1">
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50 hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              
              {user?.role === 'PATIENT' && (
                <>
                  <Link
                    to="/appointments"
                    className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50 hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Calendar className="inline-block w-5 h-5 mr-2" />
                    My Appointments
                  </Link>
                  <Link
                    to="/records"
                    className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50 hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FileText className="inline-block w-5 h-5 mr-2" />
                    Health Records
                  </Link>
                </>
              )}
              
              {user?.role === 'DOCTOR' && (
                <Link
                  to="/appointments"
                  className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50 hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Calendar className="inline-block w-5 h-5 mr-2" />
                  Appointments
                </Link>
              )}
              
              <div className="border-t border-gray-200 pt-4 pb-3">
                <div className="flex items-center px-4">
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">{user?.name}</div>
                    <div className="text-sm font-medium text-gray-500">{user?.email}</div>
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                  >
                    <LogOut className="inline-block w-5 h-5 mr-2" />
                    Sign out
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50 hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50 hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
