import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Eye, MapPin, Play, User } from 'lucide-react';

const VlogCard = ({ vlog }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/vlogs/${vlog._id}`)}
            className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer transform hover:-translate-y-2 border border-gray-100"
        >
            {/* Thumbnail with Overlay */}
            <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-gray-900 to-gray-700">
                <img
                    src={vlog.thumbnail}
                    alt={vlog.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform duration-300">
                        <Play className="h-8 w-8 text-primary-600 ml-1" fill="currentColor" />
                    </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-3 right-3">
                    <div className="flex items-center gap-1.5 bg-black/80 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-lg">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{vlog.duration || 'N/A'}</span>
                    </div>
                </div>

                {/* Category Badge */}
                {vlog.category && (
                    <div className="absolute top-3 left-3">
                        <div className="bg-gradient-to-r from-primary-600 to-green-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg">
                            {vlog.category}
                        </div>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-5 space-y-4">
                {/* Title */}
                <h3 className="font-bold text-xl text-gray-900 line-clamp-2 leading-tight group-hover:text-primary-600 transition-colors duration-300">
                    {vlog.title}
                </h3>

                {/* Description (if available) */}
                {vlog.description && (
                    <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                        {vlog.description}
                    </p>
                )}

                {/* Creator Info */}
                <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-green-500 flex items-center justify-center text-white font-bold text-sm shadow-md flex-shrink-0">
                        {vlog.farmer?.charAt(0)?.toUpperCase() || vlog.author?.charAt(0)?.toUpperCase() || <User className="h-5 w-5" />}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="font-semibold text-gray-900 text-sm truncate">
                            {vlog.farmer || vlog.author || 'Unknown Creator'}
                        </div>
                        {vlog.location && (
                            <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                                <MapPin className="h-3 w-3 flex-shrink-0" />
                                <span className="truncate">{vlog.location}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Tags & Stats */}
                <div className="space-y-3">
                    {/* Tags */}
                    {(vlog.cropType || vlog.language) && (
                        <div className="flex flex-wrap gap-2">
                            {vlog.cropType && (
                                <span className="inline-flex items-center gap-1 bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-xs font-semibold border border-primary-200">
                                     {vlog.cropType}
                                </span>
                            )}
                            {vlog.language && (
                                <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold border border-blue-200">
                                     {vlog.language}
                                </span>
                            )}
                        </div>
                    )}

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                            <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg">
                                <Eye className="h-4 w-4 text-gray-500" />
                                <span className="font-semibold text-gray-700">
                                    {vlog.views?.toLocaleString() || 0}
                                </span>
                            </div>
                        </div>

                        {vlog.createdAt && (
                            <div className="text-xs text-gray-500">
                                {new Date(vlog.createdAt).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric'
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VlogCard;
