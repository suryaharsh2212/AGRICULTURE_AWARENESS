import React from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { Star, ShoppingCart } from 'lucide-react';

const ProductCard = ({ product }) => {
    return (
        <Card hover className="h-full flex flex-col">
            {/* Image */}
            <div className="aspect-square overflow-hidden bg-gray-100">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
            </div>

            {/* Content */}
            <div className="p-4 flex-1 flex flex-col">
                <Badge variant="secondary" size="sm" className="w-fit mb-2">
                    {product.category}
                </Badge>

                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 flex-1">
                    {product.name}
                </h3>

                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {product.description}
                </p>

                {/* Rating */}
                <div className="flex items-center space-x-2 mb-3">
                    <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium text-gray-900">{product.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
                </div>

                {/* Price and Action */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div>
                        <div className="text-2xl font-bold text-primary-700">
                            ₹{product.price}
                        </div>
                        {!product.inStock && (
                            <Badge variant="danger" size="sm" className="mt-1">
                                Out of Stock
                            </Badge>
                        )}
                    </div>
                    <Button
                        size="sm"
                        disabled={!product.inStock}
                        className="flex items-center space-x-1"
                    >
                        <ShoppingCart className="h-4 w-4" />
                        <span>Add</span>
                    </Button>
                </div>
            </div>
        </Card>
    );
};

export default ProductCard;
