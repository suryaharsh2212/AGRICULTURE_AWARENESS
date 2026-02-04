import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import { vlogsAPI } from '../../services/api';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

const VlogForm = ({ vlog, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        category: '',
        duration: '',
        thumbnail: '',
        videoUrl: '',
        description: '',
        views: 0,
        date: new Date().toISOString().split('T')[0],
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (vlog) {
            setFormData({
                ...vlog,
                date: vlog.date ? new Date(vlog.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
            });
        }
    }, [vlog]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (vlog) {
                await vlogsAPI.update(vlog._id, formData);
            } else {
                await vlogsAPI.create(formData);
            }
            onSuccess();
        } catch (err) {
            setError(err.message || 'Failed to save vlog');
        } finally {
            setLoading(false);
        }
    };

    const categories = ['Crop Management', 'Livestock', 'Organic Farming', 'Technology', 'Irrigation', 'Harvesting'];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center space-x-4">
                <Button variant="outline" onClick={onClose}>
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        {vlog ? 'Edit Vlog' : 'Add New Vlog'}
                    </h1>
                    <p className="text-gray-600 mt-1">
                        {vlog ? 'Update vlog information' : 'Create a new vlog'}
                    </p>
                </div>
            </div>

            {/* Form */}
            <Card className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Title */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Vlog Title *
                            </label>
                            <Input
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="e.g., Modern Wheat Farming Techniques"
                                required
                            />
                        </div>

                        {/* Author */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Author Name *
                            </label>
                            <Input
                                name="author"
                                value={formData.author}
                                onChange={handleChange}
                                placeholder="e.g., Rajesh Kumar"
                                required
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Category *
                            </label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                required
                            >
                                <option value="">Select Category</option>
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Duration */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Duration *
                            </label>
                            <Input
                                name="duration"
                                value={formData.duration}
                                onChange={handleChange}
                                placeholder="e.g., 15:30"
                                required
                            />
                        </div>

                        {/* Date */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Upload Date *
                            </label>
                            <Input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Thumbnail URL */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Thumbnail URL *
                            </label>
                            <Input
                                name="thumbnail"
                                value={formData.thumbnail}
                                onChange={handleChange}
                                placeholder="https://example.com/thumbnail.jpg"
                                required
                            />
                        </div>

                        {/* Video URL */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Video URL *
                            </label>
                            <Input
                                name="videoUrl"
                                value={formData.videoUrl}
                                onChange={handleChange}
                                placeholder="https://youtube.com/watch?v=..."
                                required
                            />
                        </div>

                        {/* Description */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="4"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                placeholder="Vlog description..."
                            />
                        </div>

                        {/* Views */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Views
                            </label>
                            <Input
                                type="number"
                                name="views"
                                value={formData.views}
                                onChange={handleChange}
                                min="0"
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end space-x-4 pt-4 border-t">
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? (
                                <span className="flex items-center">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                    Saving...
                                </span>
                            ) : (
                                <span className="flex items-center">
                                    <Save className="h-5 w-5 mr-2" />
                                    {vlog ? 'Update' : 'Create'} Vlog
                                </span>
                            )}
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default VlogForm;
