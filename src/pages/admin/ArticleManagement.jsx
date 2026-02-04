import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { articlesAPI } from '../../services/api';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import ArticleForm from '../../components/admin/ArticleForm';

const ArticleManagement = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [editingArticle, setEditingArticle] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        try {
            setLoading(true);
            const response = await articlesAPI.getAll();
            setArticles(response.data || []);
        } catch (err) {
            setError('Failed to fetch articles');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this article?')) return;

        try {
            await articlesAPI.delete(id);
            setArticles(articles.filter((a) => a._id !== id));
        } catch (err) {
            alert('Failed to delete article');
            console.error(err);
        }
    };

    const handleEdit = (article) => {
        setEditingArticle(article);
        setShowForm(true);
    };

    const handleFormClose = () => {
        setShowForm(false);
        setEditingArticle(null);
    };

    const handleFormSuccess = () => {
        fetchArticles();
        handleFormClose();
    };

    const filteredArticles = articles.filter((article) =>
        article.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.author?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (showForm) {
        return (
            <ArticleForm
                article={editingArticle}
                onClose={handleFormClose}
                onSuccess={handleFormSuccess}
            />
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Article Management</h1>
                    <p className="text-gray-600 mt-1">Manage awareness articles</p>
                </div>
                <Button onClick={() => setShowForm(true)}>
                    <Plus className="h-5 w-5 mr-2" />
                    Add Article
                </Button>
            </div>

            {/* Search */}
            <Card className="p-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search articles..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                </div>
            </Card>

            {/* Articles Grid */}
            {loading ? (
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                </div>
            ) : error ? (
                <Card className="p-8 text-center">
                    <p className="text-red-600">{error}</p>
                </Card>
            ) : filteredArticles.length === 0 ? (
                <Card className="p-8 text-center">
                    <p className="text-gray-500">No articles found</p>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredArticles.map((article) => (
                        <Card key={article._id} className="overflow-hidden">
                            <img
                                src={article.image}
                                alt={article.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
                                        {article.category}
                                    </span>
                                    <span className="text-xs text-gray-500">{article.readTime}</span>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                                    {article.title}
                                </h3>
                                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                    {article.excerpt}
                                </p>
                                <div className="flex items-center justify-between pt-3 border-t">
                                    <span className="text-xs text-gray-500">By {article.author}</span>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleEdit(article)}
                                            className="text-primary-600 hover:text-primary-900"
                                        >
                                            <Edit className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(article._id)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ArticleManagement;
