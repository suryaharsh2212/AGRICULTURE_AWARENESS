import React, { useState } from 'react';
import VlogCard from '../components/vlogs/VlogCard';
import VlogFilters from '../components/vlogs/VlogFilters';
import { vlogs, filters } from '../data/mockData';

const Vlogs = () => {
    const [activeFilters, setActiveFilters] = useState({
        cropType: null,
        season: null,
        language: null,
    });

    const handleFilterChange = (filterType, value) => {
        setActiveFilters((prev) => ({
            ...prev,
            [filterType]: value,
        }));
    };

    const filteredVlogs = vlogs.filter((vlog) => {
        if (activeFilters.cropType && vlog.cropType !== activeFilters.cropType) {
            return false;
        }
        if (activeFilters.language && vlog.language !== activeFilters.language) {
            return false;
        }
        return true;
    });

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-2">
                        Farming Vlogs
                    </h1>
                    <p className="text-gray-600">
                        Learn from experienced farmers sharing their knowledge and daily farming practices
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Filters Sidebar */}
                    <div className="lg:col-span-1">
                        <VlogFilters
                            filters={filters}
                            activeFilters={activeFilters}
                            onFilterChange={handleFilterChange}
                        />
                    </div>

                    {/* Vlogs Grid */}
                    <div className="lg:col-span-3">
                        <div className="mb-4 text-sm text-gray-600">
                            Showing {filteredVlogs.length} vlog{filteredVlogs.length !== 1 ? 's' : ''}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {filteredVlogs.map((vlog) => (
                                <VlogCard key={vlog.id} vlog={vlog} />
                            ))}
                        </div>
                        {filteredVlogs.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-gray-500">No vlogs found matching your filters.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Vlogs;
