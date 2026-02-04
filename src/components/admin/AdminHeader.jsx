import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, Home } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';

const AdminHeader = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    return (
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex items-center justify-between gap-3">
                <div className="flex items-center space-x-4 min-w-0">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800 truncate">Admin Dashboard</h2>
                </div>

                <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                    {/* View Site Button */}
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open('/', '_blank')}
                        className="hidden sm:flex"
                    >
                        <Home className="h-4 w-4 sm:mr-2" />
                        <span className="hidden md:inline">View Site</span>
                    </Button>

                    {/* User Info */}
                    <div className="hidden lg:flex items-center space-x-2 px-3 py-2 bg-gray-50 rounded-lg">
                        <User className="h-4 w-4 text-gray-600" />
                        <span className="text-sm font-medium text-gray-700 max-w-[150px] truncate">
                            {user?.email || 'Admin'}
                        </span>
                    </div>

                    {/* Logout Button */}
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleLogout}
                        className="text-red-600 border-red-200 hover:bg-red-50"
                    >
                        <LogOut className="h-4 w-4 sm:mr-2" />
                        <span className="hidden sm:inline">Logout</span>
                    </Button>
                </div>
            </div>
        </header>
    );
};

export default AdminHeader;
