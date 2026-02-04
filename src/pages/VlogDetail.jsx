import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { ThumbsUp, MessageCircle, Share2, Bookmark, ArrowLeft, Clock, Eye, User } from 'lucide-react';
import { vlogsAPI } from '../services/api';

const VlogDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [vlog, setVlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [liked, setLiked] = useState(false);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        fetchVlog();
    }, [id]);

    const fetchVlog = async () => {
        try {
            setLoading(true);
            const response = await vlogsAPI.getById(id);
            setVlog(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to load vlog');
            console.error('Error fetching vlog:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading vlog...</p>
                </div>
            </div>
        );
    }

    if (error || !vlog) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Vlog not found</h2>
                    <Button onClick={() => navigate('/vlogs')}>Back to Vlogs</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Button */}
                <Button
                    variant="ghost"
                    onClick={() => navigate('/vlogs')}
                    className="mb-6"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Vlogs
                </Button>

                {/* Video Player */}
                <div className="bg-white rounded-xl shadow-soft overflow-hidden mb-6">
                    <div className="aspect-video bg-gray-900 flex items-center justify-center">
                        {vlog.videoUrl ? (
                            <iframe
                                src={vlog.videoUrl}
                                title={vlog.title}
                                className="w-full h-full"
                                allowFullScreen
                            />
                        ) : (
                            <img
                                src={vlog.thumbnail}
                                alt={vlog.title}
                                className="w-full h-full object-cover"
                            />
                        )}
                    </div>
                </div>

                {/* Vlog Info */}
                <div className="bg-white rounded-xl shadow-soft p-6 mb-6">
                    <h1 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-4">
                        {vlog.title}
                    </h1>

                    <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="primary">{vlog.category}</Badge>
                    </div>

                    <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-semibold text-lg">
                                <User className="h-6 w-6" />
                            </div>
                            <div>
                                <div className="font-semibold text-gray-900">{vlog.author}</div>
                                <div className="text-sm text-gray-500">Farmer & Content Creator</div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                                <Eye className="h-4 w-4" />
                                <span>{vlog.views?.toLocaleString() || 0}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <Clock className="h-4 w-4" />
                                <span>{vlog.duration}</span>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3 mb-6">
                        <Button
                            variant={liked ? 'primary' : 'outline'}
                            onClick={() => setLiked(!liked)}
                        >
                            <ThumbsUp className="h-4 w-4 mr-2" />
                            {liked ? 'Liked' : 'Like'}
                        </Button>
                        <Button variant="outline">
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Comment
                        </Button>
                        <Button variant="outline">
                            <Share2 className="h-4 w-4 mr-2" />
                            Share
                        </Button>
                        <Button
                            variant={saved ? 'primary' : 'outline'}
                            onClick={() => setSaved(!saved)}
                        >
                            <Bookmark className="h-4 w-4 mr-2" />
                            {saved ? 'Saved' : 'Save'}
                        </Button>
                    </div>

                    {/* Description */}
                    {vlog.description && (
                        <div className="mb-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-3">Description</h2>
                            <p className="text-gray-700 leading-relaxed">{vlog.description}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VlogDetail;
