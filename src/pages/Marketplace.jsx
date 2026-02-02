import React, { useState } from 'react';
import ProductCard from '../components/marketplace/ProductCard';
import { products } from '../data/mockData';
import Button from '../components/ui/Button';

const Marketplace = () => {
    const [activeCategory, setActiveCategory] = useState('All');

    const categories = ['All', 'Seeds', 'Fertilizers', 'Tools', 'Organic Inputs'];

    const filteredProducts = activeCategory === 'All'
        ? products
        : products.filter((product) => product.category === activeCategory);

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-2">
                        Agriculture Product Marketplace
                    </h1>
                    <p className="text-gray-600">
                        Quality seeds, fertilizers, tools, and organic inputs at fair prices
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

                {/* Products Grid */}
                <div className="mb-4 text-sm text-gray-600">
                    Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {filteredProducts.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No products found in this category.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Marketplace;
