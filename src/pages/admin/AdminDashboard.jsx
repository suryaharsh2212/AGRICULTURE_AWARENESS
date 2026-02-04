import React, { useState, useEffect } from 'react';
import { ShoppingBag, Video, BookOpen, TrendingUp } from 'lucide-react';
import { productsAPI, vlogsAPI, articlesAPI } from '../../services/api';
import Card from '../../components/ui/Card';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        products: 0,
        vlogs: 0,
        articles: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const [productsRes, vlogsRes, articlesRes] = await Promise.all([
                productsAPI.getAll(),
                vlogsAPI.getAll(),
                articlesAPI.getAll(),
            ]);

            setStats({
                products: productsRes.data?.length || 0,
                vlogs: vlogsRes.data?.length || 0,
                articles: articlesRes.data?.length || 0,
            });
        } catch (error) {
            console.error('Error fetching stats:', error);
        } finally {
            setLoading(false);
        }
    };

    const statCards = [
        {
            title: 'Total Products',
            value: stats.products,
            icon: ShoppingBag,
            color: 'bg-blue-500',
            bgColor: 'bg-blue-50',
        },
        {
            title: 'Total Vlogs',
            value: stats.vlogs,
            icon: Video,
            color: 'bg-purple-500',
            bgColor: 'bg-purple-50',
        },
        {
            title: 'Total Articles',
            value: stats.articles,
            icon: BookOpen,
            color: 'bg-green-500',
            bgColor: 'bg-green-50',
        },
        {
            title: 'Total Content',
            value: stats.products + stats.vlogs + stats.articles,
            icon: TrendingUp,
            color: 'bg-orange-500',
            bgColor: 'bg-orange-50',
        },
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
                <p className="text-gray-600 mt-1">Welcome to Farm Frontier Admin Panel</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={stat.title} className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                                    <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                                </div>
                                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                                    <Icon className={`h-6 w-6 ${stat.color.replace('bg-', 'text-')}`} />
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>

            {/* Quick Actions */}
            <Card className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <a
                        href="/admin/products"
                        className="flex items-center space-x-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                    >
                        <ShoppingBag className="h-6 w-6 text-blue-600" />
                        <span className="font-medium text-blue-900">Manage Products</span>
                    </a>
                    <a
                        href="/admin/vlogs"
                        className="flex items-center space-x-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
                    >
                        <Video className="h-6 w-6 text-purple-600" />
                        <span className="font-medium text-purple-900">Manage Vlogs</span>
                    </a>
                    <a
                        href="/admin/articles"
                        className="flex items-center space-x-3 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
                    >
                        <BookOpen className="h-6 w-6 text-green-600" />
                        <span className="font-medium text-green-900">Manage Articles</span>
                    </a>
                </div>
            </Card>
        </div>
    );
};

export default AdminDashboard;
