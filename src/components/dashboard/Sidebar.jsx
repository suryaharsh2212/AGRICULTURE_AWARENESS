import React, { useState } from 'react';
import { Video, Bookmark, ShoppingBag, User, Upload, Settings } from 'lucide-react';

const Sidebar = ({ activeSection, onSectionChange }) => {
    const sections = [
        { id: 'uploaded', label: 'Uploaded Vlogs', icon: Upload },
        { id: 'saved', label: 'Saved Vlogs', icon: Bookmark },
        { id: 'orders', label: 'Orders & Purchases', icon: ShoppingBag },
        { id: 'profile', label: 'Profile & Settings', icon: Settings },
    ];

    return (
        <div className="bg-white rounded-xl shadow-soft p-4">
            <div className="flex items-center space-x-2 mb-6 p-2">
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-semibold text-lg">
                    F
                </div>
                <div>
                    <div className="font-semibold text-gray-900">Farmer Name</div>
                    <div className="text-sm text-gray-500">farmer@email.com</div>
                </div>
            </div>

            <nav className="space-y-1">
                {sections.map((section) => {
                    const Icon = section.icon;
                    return (
                        <button
                            key={section.id}
                            onClick={() => onSectionChange(section.id)}
                            className={`
                w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all
                ${activeSection === section.id
                                    ? 'bg-primary-50 text-primary-700 font-medium'
                                    : 'text-gray-600 hover:bg-gray-50'
                                }
              `}
                        >
                            <Icon className="h-5 w-5" />
                            <span>{section.label}</span>
                        </button>
                    );
                })}
            </nav>
        </div>
    );
};

export default Sidebar;
