import React from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { Calendar, User, Clock, ArrowRight } from 'lucide-react';

const ArticleCard = ({ article }) => {
    return (
        <Card hover className="h-full flex flex-col">
            {/* Image */}
            <div className="aspect-video overflow-hidden">
                <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
            </div>

            {/* Content */}
            <div className="p-6 flex-1 flex flex-col">
                <Badge variant="primary" size="sm" className="w-fit mb-3">
                    {article.category}
                </Badge>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                    {article.title}
                </h3>

                <p className="text-gray-600 mb-4 line-clamp-3 flex-1">
                    {article.excerpt}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                            <User className="h-4 w-4" />
                            <span>{article.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{article.readTime}</span>
                        </div>
                    </div>
                </div>

                <button className="mt-4 text-primary-600 font-medium flex items-center space-x-1 hover:space-x-2 transition-all">
                    <span>Read More</span>
                    <ArrowRight className="h-4 w-4" />
                </button>
            </div>
        </Card>
    );
};

export default ArticleCard;
