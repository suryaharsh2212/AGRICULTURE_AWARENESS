import React, { useState } from 'react';
import ArticleCard from '../components/awareness/ArticleCard';
import { articles } from '../data/mockData';
import Button from '../components/ui/Button';

const Awareness = () => {
    const [activeCategory, setActiveCategory] = useState('All');

    const categories = ['All', 'Modern Farming', 'Organic Farming', 'Weather Tips'];

    const filteredArticles = activeCategory === 'All'
        ? articles
        : articles.filter((article) => article.category === activeCategory);

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-2">
                        Awareness & Knowledge Hub
                    </h1>
                    <p className="text-gray-600">
                        Stay informed with the latest farming techniques, sustainable practices, and expert insights
                    </p>
                </div>

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
                        <ArticleCard key={article.id} article={article} />
                    ))}
                </div>

                {filteredArticles.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No articles found in this category.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Awareness;
