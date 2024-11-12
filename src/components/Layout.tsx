import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { logout } from '../store/slices/authSlice';
import { LayoutDashboard, Users, LogOut, GraduationCap } from 'lucide-react';

const Layout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Students', href: '/students', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-indigo-600">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`${
                        location.pathname === item.href
                          ? 'bg-indigo-700 text-white'
                          : 'text-white hover:bg-indigo-500'
                      } px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-2`}
                    >
                      {React.createElement(item.icon, {
                        className: 'h-5 w-5',
                      })}
                      <span>{item.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-white mr-4">{user?.fullName}</span>
                <button
                  onClick={handleLogout}
                  className="relative inline-flex items-center gap-x-1.5 rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  <LogOut className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;