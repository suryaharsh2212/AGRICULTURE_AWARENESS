import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';

const Hero = () => {
    const navigate = useNavigate();

    return (
        <div className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900 text-white overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='100' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }} />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
                <div className="text-center space-y-8">
                    {/* Headline */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight">
                        Learn Farming from Real Farmers <br />
                        <span className="text-primary-300">One Vlog at a Time</span>
                    </h1>

                    {/* Subheadline */}
                    <p className="text-lg md:text-xl text-primary-100 max-w-3xl mx-auto">
                        Discover practical farming techniques, connect with experienced farmers, and access quality agricultural products all in one place.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                        <Button
                            size="lg"
                            onClick={() => navigate('/vlogs')}
                            className="w-full sm:w-auto bg-white text-primary-700 hover:bg-primary-50 shadow-xl"
                        >
                            Watch Farming Vlogs
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            onClick={() => navigate('/marketplace')}
                            className="w-full sm:w-auto border-white text-white hover:bg-white/10"
                        >
                            Explore Products
                        </Button>
                        <Button
                            size="lg"
                            variant="ghost"
                            onClick={() => navigate('/awareness')}
                            className="w-full sm:w-auto text-white hover:bg-white/10"
                        >
                            Join Community
                        </Button>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 max-w-4xl mx-auto">
                        {[
                            { label: 'Farming Vlogs', value: '500+' },
                            { label: 'Active Farmers', value: '10K+' },
                            { label: 'Products', value: '1000+' },
                            { label: 'Communities', value: '50+' },
                        ].map((stat) => (
                            <div key={stat.label} className="text-center">
                                <div className="text-3xl md:text-4xl font-bold text-primary-300">{stat.value}</div>
                                <div className="text-sm text-primary-100 mt-1">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Wave Divider */}
            <div className="absolute bottom-0 left-0 right-0">
                <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#fafaf9" />
                </svg>
            </div>
        </div>
    );
};

export default Hero;
