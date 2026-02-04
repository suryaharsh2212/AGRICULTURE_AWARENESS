import React, { useState, useEffect } from 'react';
import ArticleCard from '../components/awareness/ArticleCard';
import Button from '../components/ui/Button';
import { articlesAPI } from '../services/api';

const Awareness = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const categories = ['All', 'Pest Control', 'Soil Health', 'Water Management', 'Climate', 'Government Schemes', 'Market Trends'];

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        try {
            setLoading(true);
            const response = await articlesAPI.getAll();
            setArticles(response.data || []);
            setError(null);
        } catch (err) {
            setError('Failed to load articles');
            console.error('Error fetching articles:', err);
        } finally {
            setLoading(false);
        }
    };

    const filteredArticles = activeCategory === 'All'
        ? articles
        : articles.filter((article) => article.category === activeCategory);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading articles...</p>
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
                        Awareness & Knowledge Hub
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
                        <Button
                            key={category}
                            variant={activeCategory === category ? 'primary' : 'outline'}
                            onClick={() => setActiveCategory(category)}
                        >
                            {category}
                        </Button>
                    ))}
                </div>

                {/* Articles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredArticles.map((article) => (
                        <ArticleCard key={article._id} article={article} />
                    ))}
                </div>

                {filteredArticles.length === 0 && !loading && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">
                            {articles.length === 0
                                ? 'No articles available yet. Admin can add articles from the admin panel.'
                                : 'No articles found in this category.'}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Awareness;
