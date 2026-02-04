import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sprout, Home, Video, BookOpen, ShoppingBag, User } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const navLinks = [
        { name: 'Home', path: '/', icon: Home },
        { name: 'Vlogs', path: '/vlogs', icon: Video },
        { name: 'Awareness', path: '/awareness', icon: BookOpen },
        { name: 'Marketplace', path: '/marketplace', icon: ShoppingBag },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2 group">
                        <div className="bg-primary-600 p-2 rounded-lg group-hover:bg-primary-700 transition-colors">
                            <Sprout className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-xl font-display font-bold text-gray-900">
                            Farm Frontier
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1">
                        {navLinks.map((link) => {
                            const Icon = link.icon;
                            return (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`
                    flex items-center space-x-1 px-4 py-2 rounded-lg font-medium transition-all duration-200
                    ${isActive(link.path)
                                            ? 'bg-primary-50 text-primary-700'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                        }
                  `}
                                >
                                    <Icon className="h-4 w-4" />
                                    <span>{link.name}</span>
                                </Link>
                            );
                        })}

                        {/* Admin Link */}
                        <Link
                            to="/admin/login"
                            className="flex items-center space-x-1 px-4 py-2 rounded-lg font-medium transition-all duration-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900 border border-gray-300"
                        >
                            <User className="h-4 w-4" />
                            <span>Admin</span>
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="md:hidden border-t border-gray-200 bg-white">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        {navLinks.map((link) => {
                            const Icon = link.icon;
                            return (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className={`
                    flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-all duration-200
                    ${isActive(link.path)
                                            ? 'bg-primary-50 text-primary-700'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                        }
                  `}
                                >
                                    <Icon className="h-5 w-5" />
                                    <span>{link.name}</span>
                                </Link>
                            );
                        })}

                        {/* Admin Link */}
                        <Link
                            to="/admin/login"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-all duration-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900 border border-gray-300"
                        >
                            <User className="h-5 w-5" />
                            <span>Admin</span>
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
