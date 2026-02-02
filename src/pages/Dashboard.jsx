import React, { useState } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { Upload, Video, Package, User } from 'lucide-react';

const Dashboard = () => {
    const [activeSection, setActiveSection] = useState('uploaded');

    const renderContent = () => {
        switch (activeSection) {
            case 'uploaded':
                return (
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-display font-bold text-gray-900">
                                My Uploaded Vlogs
                            </h2>
                            <Button>
                                <Upload className="h-4 w-4 mr-2" />
                                Upload New Vlog
                            </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[1, 2, 3].map((i) => (
                                <Card key={i}>
                                    <div className="p-6">
                                        <div className="flex items-start space-x-4">
                                            <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
                                                <Video className="h-8 w-8 text-gray-400" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-gray-900 mb-2">
                                                    Sample Vlog Title {i}
                                                </h3>
                                                <div className="flex flex-wrap gap-2 mb-3">
                                                    <Badge variant="primary" size="sm">Rice</Badge>
                                                    <Badge variant="success" size="sm">Published</Badge>
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    Views: 1,234 • Likes: 89
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                );

            case 'saved':
                return (
                    <div>
                        <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">
                            Saved Vlogs
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <Card key={i} hover>
                                    <div className="aspect-video bg-gray-200"></div>
                                    <div className="p-4">
                                        <h3 className="font-semibold text-gray-900 mb-2">
                                            Saved Vlog Title {i}
                                        </h3>
                                        <p className="text-sm text-gray-600">By Farmer Name</p>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                );

            case 'orders':
                return (
                    <div>
                        <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">
                            Orders & Purchases
                        </h2>
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <Card key={i}>
                                    <div className="p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <div className="font-semibold text-gray-900 mb-1">
                                                    Order #{1000 + i}
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    Placed on Jan {i}, 2024
                                                </div>
                                            </div>
                                            <Badge variant="success">Delivered</Badge>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                                                <Package className="h-6 w-6 text-gray-400" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="font-medium text-gray-900">
                                                    Product Name {i}
                                                </div>
                                                <div className="text-sm text-gray-600">Quantity: 2</div>
                                            </div>
                                            <div className="text-lg font-bold text-primary-700">
                                                ₹{500 * i}
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                );

            case 'profile':
                return (
                    <div>
                        <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">
                            Profile & Settings
                        </h2>
                        <Card>
                            <div className="p-6">
                                <div className="flex items-center space-x-4 mb-6">
                                    <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-semibold text-2xl">
                                        F
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900">Farmer Name</h3>
                                        <p className="text-gray-600">farmer@email.com</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            defaultValue="Farmer Name"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            defaultValue="farmer@email.com"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Location
                                        </label>
                                        <input
                                            type="text"
                                            defaultValue="Punjab, India"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                        />
                                    </div>
                                    <div className="pt-4">
                                        <Button>Save Changes</Button>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-8">
                    Farmer Dashboard
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <Sidebar
                            activeSection={activeSection}
                            onSectionChange={setActiveSection}
                        />
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
