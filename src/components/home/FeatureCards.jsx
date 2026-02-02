import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../ui/Card';
import { Video, Sprout, FileText, ShoppingCart } from 'lucide-react';

const FeatureCards = () => {
    const navigate = useNavigate();

    const features = [
        {
            title: 'Daily Farming Vlogs',
            description: 'Watch real farmers share their daily experiences, techniques, and success stories.',
            icon: Video,
            color: 'primary',
            path: '/vlogs',
        },
        {
            title: 'Crop Awareness',
            description: 'Learn about different crops, seasons, and best practices for sustainable farming.',
            icon: Sprout,
            color: 'secondary',
            path: '/awareness',
        },
        {
            title: 'Government Schemes',
            description: 'Stay updated with latest government schemes, subsidies, and support programs.',
            icon: FileText,
            color: 'accent',
            path: '/awareness',
        },
        {
            title: 'Buy Farming Products',
            description: 'Access quality seeds, fertilizers, tools, and organic inputs at fair prices.',
            icon: ShoppingCart,
            color: 'primary',
            path: '/marketplace',
        },
    ];

    const colorClasses = {
        primary: 'bg-primary-100 text-primary-700',
        secondary: 'bg-secondary-100 text-secondary-700',
        accent: 'bg-orange-100 text-orange-700',
    };

    return (
        <div className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
                        Everything You Need to Grow
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Comprehensive resources and tools designed specifically for the farming community
                    </p>
                </div>

                {/* Feature Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature) => {
                        const Icon = feature.icon;
                        return (
                            <Card
                                key={feature.title}
                                hover
                                onClick={() => navigate(feature.path)}
                                className="group"
                            >
                                <div className="p-6 space-y-4">
                                    <div className={`w-14 h-14 rounded-xl ${colorClasses[feature.color]} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                                        <Icon className="h-7 w-7" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default FeatureCards;
