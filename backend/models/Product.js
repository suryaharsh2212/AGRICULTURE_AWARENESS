import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        category: {
            type: String,
            required: true,
            enum: ['Seeds', 'Fertilizers', 'Tools', 'Organic Inputs', 'Pesticides'],
        },
        price: {
            type: Number,
            required: true,
        },
        unit: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        inStock: {
            type: Boolean,
            default: true,
        },
        rating: {
            type: Number,
            default: 4.5,
            min: 0,
            max: 5,
        },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
