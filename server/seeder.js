import mongoose from 'mongoose';
import dotenv from 'dotenv';
// import colors from 'colors'; // Optional, but usually needs install. I'll rely on console logs.
import products from './data/products.js';
import Product from './models/productModel.js';
import User from './models/userModel.js';
import SiteSettings from './models/siteSettingsModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await Product.deleteMany();
        await User.deleteMany();
        await SiteSettings.deleteMany();

        await Product.insertMany(products);

        // Create Admin User
        const createdUser = await User.create({
            name: 'Admin User',
            email: 'pjat95105@gmail.com',
            password: 'pawan900@#', // Will be hashed by pre-save hook
            role: 'admin'
        });

        // Initialize Site Settings
        await SiteSettings.create({
            bannerText: 'FREE SHIPPING ON ORDERS OVER ₹10,000 • HANDCRAFTED IN INDIA • SUSTAINABLE MATERIALS • ',
            categories: [
                {
                    id: 'living-room',
                    name: 'Living Room',
                    thumbnail: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
                    description: 'Comfortable and stylish living room furniture'
                },
                {
                    id: 'bedroom',
                    name: 'Bedroom',
                    thumbnail: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
                    description: 'Relaxing bedroom furniture and decor'
                },
                {
                    id: 'dining',
                    name: 'Dining',
                    thumbnail: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
                    description: 'Elegant dining room sets'
                },
                {
                    id: 'office',
                    name: 'Office',
                    thumbnail: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
                    description: 'Productive home office furniture'
                }
            ]
        });

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Product.deleteMany();
        await User.deleteMany();
        await SiteSettings.deleteMany();

        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
