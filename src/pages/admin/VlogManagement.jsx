import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { vlogsAPI } from '../../services/api';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import VlogForm from '../../components/admin/VlogForm';

const VlogManagement = () => {
    const [vlogs, setVlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [editingVlog, setEditingVlog] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchVlogs();
    }, []);

    const fetchVlogs = async () => {
        try {
            setLoading(true);
            const response = await vlogsAPI.getAll();
            setVlogs(response.data || []);
        } catch (err) {
            setError('Failed to fetch vlogs');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this vlog?')) return;

        try {
            await vlogsAPI.delete(id);
            setVlogs(vlogs.filter((v) => v._id !== id));
        } catch (err) {
            alert('Failed to delete vlog');
            console.error(err);
        }
    };

    const handleEdit = (vlog) => {
        setEditingVlog(vlog);
        setShowForm(true);
    };

    const handleFormClose = () => {
        setShowForm(false);
        setEditingVlog(null);
    };

    const handleFormSuccess = () => {
        fetchVlogs();
        handleFormClose();
    };

    const filteredVlogs = vlogs.filter((vlog) =>
        vlog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vlog.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vlog.author?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (showForm) {
        return (
            <VlogForm
                vlog={editingVlog}
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
                    <h1 className="text-3xl font-bold text-gray-900">Vlog Management</h1>
                    <p className="text-gray-600 mt-1">Manage farming vlogs</p>
                </div>
                <Button onClick={() => setShowForm(true)}>
                    <Plus className="h-5 w-5 mr-2" />
                    Add Vlog
                </Button>
            </div>

            {/* Search */}
            <Card className="p-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search vlogs..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                </div>
            </Card>

            {/* Vlogs Table */}
            {loading ? (
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                </div>
            ) : error ? (
                <Card className="p-8 text-center">
                    <p className="text-red-600">{error}</p>
                </Card>
            ) : filteredVlogs.length === 0 ? (
                <Card className="p-8 text-center">
                    <p className="text-gray-500">No vlogs found</p>
                </Card>
            ) : (
                <Card className="overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Vlog
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Author
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Category
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Duration
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredVlogs.map((vlog) => (
                                    <tr key={vlog._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <img
                                                    src={vlog.thumbnail}
                                                    alt={vlog.title}
                                                    className="h-16 w-24 rounded object-cover"
                                                />
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {vlog.title}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {vlog.views} views
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {vlog.author}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded">
                                                {vlog.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {vlog.duration}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                onClick={() => handleEdit(vlog)}
                                                className="text-primary-600 hover:text-primary-900 mr-4"
                                            >
                                                <Edit className="h-5 w-5" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(vlog._id)}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                <Trash2 className="h-5 w-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            )}
        </div>
    );
};

export default VlogManagement;
