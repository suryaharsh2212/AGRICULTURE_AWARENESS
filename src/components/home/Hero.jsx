import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import farmLogo from '../../assets/images/farm-logo.png';

const Hero = () => {
    const navigate = useNavigate();

    return (
        <div className="relative bg-black text-white overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-60">
                <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
                    backgroundImage: `url("https://res.cloudinary.com/dllgqcla4/image/upload/v1773333536/IMG_5732_-_Copy.JPG_trndrh.jpg")`,
                }} />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
                <div className="text-center space-y-8">
                    {/* Logo */}
                   

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
                            className="w-full sm:w-auto bg-white text-black hover:bg-black hover:text-white shadow-xl font-semibold"
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
        </div>
    );
};

export default Hero;
