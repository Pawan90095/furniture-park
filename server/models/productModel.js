import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, required: true, default: 0 },
    colors: [{ type: String }],
    image: { type: String, required: true },
    description: { type: String, required: true },
    isBestseller: { type: Boolean, default: false },
    badge: { type: String },
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

export default Product;
