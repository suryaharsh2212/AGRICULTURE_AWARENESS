import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sprout, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, Globe } from 'lucide-react';

const Footer = () => {
    const [language, setLanguage] = useState('en');

    const quickLinks = [
        { name: 'Home', path: '/' },
        { name: 'Farming Vlogs', path: '/vlogs' },
        { name: 'Knowledge Hub', path: '/awareness' },
        { name: 'Marketplace', path: '/marketplace' },
    ];

    const supportLinks = [
        { name: 'Help Center', path: '#' },
        { name: 'Contact Us', path: '#' },
        { name: 'FAQs', path: '#' },
        { name: 'Terms of Service', path: '#' },
    ];

    const socialLinks = [
        { name: 'Facebook', icon: Facebook, url: '#' },
        { name: 'Twitter', icon: Twitter, url: '#' },
        { name: 'Instagram', icon: Instagram, url: '#' },
        { name: 'YouTube', icon: Youtube, url: '#' },
    ];

    const languages = [
        { code: 'en', name: 'English' },
        { code: 'hi', name: 'हिंदी' },
        { code: 'ta', name: 'தமிழ்' },
        { code: 'te', name: 'తెలుగు' },
        { code: 'kn', name: 'ಕನ್ನಡ' },
    ];

    return (
        <footer className="bg-secondary-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <div className="bg-primary-600 p-2 rounded-lg">
                                <Sprout className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-xl font-display font-bold text-white">
                                AgriLearn
                            </span>
                        </div>
                        <p className="text-sm text-gray-400">
                            Empowering farmers with knowledge and connecting them to quality agricultural products.
                        </p>
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2 text-sm">
                                <Mail className="h-4 w-4 text-primary-500" />
                                <span>support@agrilearn.com</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm">
                                <Phone className="h-4 w-4 text-primary-500" />
                                <span>+91 1800-XXX-XXXX</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm">
                                <MapPin className="h-4 w-4 text-primary-500" />
                                <span>New Delhi, India</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className="text-sm hover:text-primary-400 transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Support</h3>
                        <ul className="space-y-2">
                            {supportLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.path}
                                        className="text-sm hover:text-primary-400 transition-colors"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Language & Social */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Language</h3>
                        <div className="relative mb-6">
                            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <select
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-secondary-800 border border-secondary-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                            >
                                {languages.map((lang) => (
                                    <option key={lang.code} value={lang.code}>
                                        {lang.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <h3 className="text-white font-semibold mb-4">Follow Us</h3>
                        <div className="flex space-x-3">
                            {socialLinks.map((social) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={social.name}
                                        href={social.url}
                                        className="bg-secondary-800 p-2 rounded-lg hover:bg-primary-600 transition-colors"
                                        aria-label={social.name}
                                    >
                                        <Icon className="h-5 w-5" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-8 pt-8 border-t border-secondary-800 text-center text-sm text-gray-400">
                    <p>&copy; {new Date().getFullYear()} AgriLearn. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
