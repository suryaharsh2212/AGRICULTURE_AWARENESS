import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { User, Clock, ArrowLeft, Calendar } from 'lucide-react';
import { articlesAPI } from '../services/api';

const ArticleDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchArticle();
    }, [id]);

    const fetchArticle = async () => {
        try {
            setLoading(true);
            const response = await articlesAPI.getById(id);
            setArticle(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to load article');
            console.error('Error fetching article:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading article...</p>
                </div>
            </div>
        );
    }

    if (error || !article) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Article not found</h2>
                    <Button onClick={() => navigate('/awareness')}>Back to Awareness Hub</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Button */}
                <Button
                    variant="ghost"
                    onClick={() => navigate('/awareness')}
                    className="mb-6"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Knowledge Hub
                </Button>

                {/* Article Content */}
                <div className="bg-white rounded-xl shadow-soft overflow-hidden mb-6">
                    {article.image && (
                        <div className="w-full h-64 sm:h-96">
                            <img
                                src={article.image}
                                alt={article.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}
                    
                    <div className="p-6 md:p-10">
                        <Badge variant="primary" className="mb-4">
                            {article.category}
                        </Badge>
                        
                        <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">
                            {article.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-gray-200 text-gray-600">
                            <div className="flex items-center space-x-2">
                                <User className="h-5 w-5" />
                                <span>{article.author || 'Agri Platform Expert'}</span>
                            </div>
                            {article.readTime && (
                                <div className="flex items-center space-x-2">
                                    <Clock className="h-5 w-5" />
                                    <span>{article.readTime}</span>
                                </div>
                            )}
                            <div className="flex items-center space-x-2">
                                <Calendar className="h-5 w-5" />
                                <span>{new Date(article.createdAt || Date.now()).toLocaleDateString()}</span>
                            </div>
                        </div>

                        {/* Article Text Content */}
                        <div className="prose prose-lg max-w-none text-gray-700">
                            {/* Assuming article.content contains newline characters for paragraphs */}
                            {article.content.split('\n').map((paragraph, index) => (
                                paragraph.trim() && <p key={index} className="mb-4">{paragraph}</p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArticleDetail;
