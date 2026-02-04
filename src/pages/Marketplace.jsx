import React, { useState, useEffect } from 'react';
import ProductCard from '../components/marketplace/ProductCard';
import Button from '../components/ui/Button';
import { productsAPI } from '../services/api';

const Marketplace = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const categories = ['All', 'Seeds', 'Fertilizers', 'Tools', 'Organic Inputs', 'Pesticides'];

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await productsAPI.getAll();
            setProducts(response.data || []);
            setError(null);
        } catch (err) {
            setError('Failed to load products');
            console.error('Error fetching products:', err);
        } finally {
            setLoading(false);
        }
    };

    const filteredProducts = activeCategory === 'All'
        ? products
        : products.filter((product) => product.category === activeCategory);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading products...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                

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

                {/* Products Grid */}
                <div className="mb-4 text-sm text-gray-600">
                    Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>

                {filteredProducts.length === 0 && !loading && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">
                            {products.length === 0
                                ? 'No products available yet. Admin can add products from the admin panel.'
                                : 'No products found in this category.'}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Marketplace;
