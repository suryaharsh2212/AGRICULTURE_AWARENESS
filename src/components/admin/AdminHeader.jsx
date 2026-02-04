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
        <header className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <h2 className="text-xl font-semibold text-gray-800">Admin Dashboard</h2>
                </div>

                <div className="flex items-center space-x-3">
                    {/* View Site Button */}
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open('/', '_blank')}
                        className="hidden sm:flex"
                    >
                        <Home className="h-4 w-4 mr-2" />
                        View Site
                    </Button>

                    {/* User Info */}
                    <div className="hidden md:flex items-center space-x-2 px-3 py-2 bg-gray-50 rounded-lg">
                        <User className="h-4 w-4 text-gray-600" />
                        <span className="text-sm font-medium text-gray-700">
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
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                    </Button>
                </div>
            </div>
        </header>
    );
};

export default AdminHeader;
