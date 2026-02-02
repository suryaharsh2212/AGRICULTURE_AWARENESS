import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { Clock, Eye, MapPin } from 'lucide-react';

const VlogCard = ({ vlog }) => {
    const navigate = useNavigate();

    return (
        <Card hover onClick={() => navigate(`/vlogs/${vlog.id}`)}>
            {/* Thumbnail */}
            <div className="relative aspect-video overflow-hidden">
                <img
                    src={vlog.thumbnail}
                    alt={vlog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-2 right-2">
                    <Badge variant="default" className="bg-black/70 text-white">
                        <Clock className="h-3 w-3 mr-1" />
                        {vlog.duration}
                    </Badge>
                </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
                <h3 className="font-semibold text-lg text-gray-900 line-clamp-2">
                    {vlog.title}
                </h3>

                <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-semibold text-xs">
                            {vlog.farmer.charAt(0)}
                        </div>
                        <span className="ml-2">{vlog.farmer}</span>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2">
                    <Badge variant="primary" size="sm">
                        {vlog.cropType}
                    </Badge>
                    <Badge variant="default" size="sm">
                        <MapPin className="h-3 w-3 mr-1" />
                        {vlog.location}
                    </Badge>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 pt-2 border-t border-gray-100">
                    <div className="flex items-center space-x-1">
                        <Eye className="h-4 w-4" />
                        <span>{vlog.views.toLocaleString()} views</span>
                    </div>
                    <Badge variant="info" size="sm">
                        {vlog.language}
                    </Badge>
                </div>
            </div>
        </Card>
    );
};

export default VlogCard;
