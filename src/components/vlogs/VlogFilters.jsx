import React from 'react';
import { Filter } from 'lucide-react';
import Button from '../ui/Button';

const VlogFilters = ({ filters, activeFilters, onFilterChange }) => {
    return (
        <div className="bg-white rounded-xl shadow-soft p-6 space-y-6">
            <div className="flex items-center space-x-2 text-gray-900">
                <Filter className="h-5 w-5" />
                <h3 className="font-semibold text-lg">Filters</h3>
            </div>

            {/* Crop Type Filter */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                    Crop Type
                </label>
                <div className="flex flex-wrap gap-2">
                    <Button
                        size="sm"
                        variant={!activeFilters.cropType ? 'primary' : 'outline'}
                        onClick={() => onFilterChange('cropType', null)}
                    >
                        All
                    </Button>
                    {filters.cropTypes.map((crop) => (
                        <Button
                            key={crop}
                            size="sm"
                            variant={activeFilters.cropType === crop ? 'primary' : 'outline'}
                            onClick={() => onFilterChange('cropType', crop)}
                        >
                            {crop}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Season Filter */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                    Season
                </label>
                <div className="flex flex-wrap gap-2">
                    <Button
                        size="sm"
                        variant={!activeFilters.season ? 'primary' : 'outline'}
                        onClick={() => onFilterChange('season', null)}
                    >
                        All
                    </Button>
                    {filters.seasons.map((season) => (
                        <Button
                            key={season}
                            size="sm"
                            variant={activeFilters.season === season ? 'primary' : 'outline'}
                            onClick={() => onFilterChange('season', season)}
                        >
                            {season}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Language Filter */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                    Language
                </label>
                <select
                    value={activeFilters.language || ''}
                    onChange={(e) => onFilterChange('language', e.target.value || null)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                    <option value="">All Languages</option>
                    {filters.languages.map((lang) => (
                        <option key={lang} value={lang}>
                            {lang}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default VlogFilters;
