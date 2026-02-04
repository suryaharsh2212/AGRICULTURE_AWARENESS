import React, { useState, useEffect } from 'react';
import VlogCard from '../components/vlogs/VlogCard';
import { vlogsAPI } from '../services/api';

const Vlogs = () => {
    const [vlogs, setVlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeCategory, setActiveCategory] = useState('All');

    const categories = ['All', 'Crop Management', 'Livestock', 'Organic Farming', 'Technology', 'Irrigation', 'Harvesting'];

    useEffect(() => {
        fetchVlogs();
    }, []);

    const fetchVlogs = async () => {
        try {
            setLoading(true);
            const response = await vlogsAPI.getAll();
            setVlogs(response.data || []);
            setError(null);
        } catch (err) {
            setError('Failed to load vlogs');
            console.error('Error fetching vlogs:', err);
        } finally {
            setLoading(false);
        }
    };

    const filteredVlogs = activeCategory === 'All'
        ? vlogs
        : vlogs.filter((vlog) => vlog.category === activeCategory);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading vlogs...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-2">
                        Farming Vlogs
                    </h1>

                </div>

                {error && (
                    <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                        {error}
                    </div>
                )}

                {/* Category Filters */}
                <div className="flex flex-wrap gap-3 mb-8">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${activeCategory === category
                                ? 'bg-primary-600 text-white'
                                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-300'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Vlogs Grid */}
                <div className="mb-4 text-sm text-gray-600">
                    Showing {filteredVlogs.length} vlog{filteredVlogs.length !== 1 ? 's' : ''}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredVlogs.map((vlog) => (
                        <VlogCard key={vlog._id} vlog={vlog} />
                    ))}
                </div>

                {filteredVlogs.length === 0 && !loading && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">
                            {vlogs.length === 0
                                ? 'No vlogs available yet. Admin can add vlogs from the admin panel.'
                                : 'No vlogs found in this category.'}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Vlogs;
