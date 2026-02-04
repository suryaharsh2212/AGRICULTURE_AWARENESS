import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Sprout, Shield, Lock, Mail, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { authAPI } from '../../services/api';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const AdminLogin = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await authAPI.login(formData);
            login(response.user, response.token);
            navigate('/admin/dashboard');
        } catch (err) {
            setError(err.message || 'Invalid credentials. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center px-4 py-8 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 left-0 w-96 h-96 bg-primary-600 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-600 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8 items-center relative z-10">
                {/* Left Side - Branding */}
                <div className="hidden md:block space-y-6">
                    <div className="flex items-center space-x-3 mb-8">
                        <div className="bg-gradient-to-br from-primary-600 to-primary-700 p-4 rounded-2xl shadow-lg">
                            <Sprout className="h-10 w-10 text-white" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-display font-bold text-gray-900">
                                Farm Frontier
                            </h1>
                            <p className="text-gray-600">Admin Portal</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-start space-x-4 bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-primary-100">
                            <div className="bg-primary-100 p-3 rounded-lg">
                                <Shield className="h-6 w-6 text-primary-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-1">Secure Access</h3>
                                <p className="text-sm text-gray-600">
                                    Protected admin dashboard with JWT authentication
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4 bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-primary-100">
                            <div className="bg-secondary-100 p-3 rounded-lg">
                                <Lock className="h-6 w-6 text-secondary-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-1">Full Control</h3>
                                <p className="text-sm text-gray-600">
                                    Manage products, vlogs, and articles with ease
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 p-6 bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl text-white">
                        <p className="text-sm opacity-90 mb-2">Welcome back!</p>
                        <p className="text-lg font-semibold">
                            Login to manage your Farm Frontier platform
                        </p>
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="w-full">
                    {/* Mobile Logo */}
                    <div className="md:hidden text-center mb-8">
                        <div className="inline-flex items-center space-x-2 mb-4">
                            <div className="bg-gradient-to-br from-primary-600 to-primary-700 p-3 rounded-xl">
                                <Sprout className="h-8 w-8 text-white" />
                            </div>
                            <span className="text-3xl font-display font-bold text-gray-900">
                                Farm Frontier
                            </span>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-8 py-6">
                            <h2 className="text-2xl font-bold text-white mb-1">Admin Login</h2>
                            <p className="text-primary-100">Enter your credentials to continue</p>
                        </div>

                        {/* Form */}
                        <div className="p-8">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {error && (
                                    <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-lg flex items-start space-x-3">
                                        <div className="flex-shrink-0">
                                            <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className="text-sm">{error}</div>
                                    </div>
                                )}

                                <div>
                                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Mail className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="admin@farmfrontier.com"
                                            className="pl-10"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Lock className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <Input
                                            id="password"
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="••••••••"
                                            className="pl-10"
                                            required
                                        />
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <span className="flex items-center justify-center">
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                            Logging in...
                                        </span>
                                    ) : (
                                        <span className="flex items-center justify-center">
                                            <LogIn className="h-5 w-5 mr-2" />
                                            Login to Dashboard
                                        </span>
                                    )}
                                </Button>
                            </form>

                            {/* Back to Home */}
                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <button
                                    onClick={() => navigate('/')}
                                    className="w-full flex items-center justify-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors text-sm font-medium"
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                    <span>Back to Home</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Security Note */}
                    <div className="mt-4 text-center">
                        <p className="text-xs text-gray-500">
                            🔒 Secured with JWT authentication
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
