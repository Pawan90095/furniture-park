import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import connectDB from './config/db.js';

// Load env vars
dotenv.config();

// Connect to Database (async, don't block serverless function)
(async () => {
    try {
        await connectDB();
    } catch (error) {
        console.error('DB Connection Failed (non-fatal):', error.message);
    }
})();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

import productRoutes from './routes/productRoutes.js';



import userRoutes from './routes/userRoutes.js';



import orderRoutes from './routes/orderRoutes.js';
import siteSettingsRoutes from './routes/siteSettingsRoutes.js';




import uploadRoutes from './routes/uploadRoutes.js';
import path from 'path';



app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/settings', siteSettingsRoutes);
app.use('/api/upload', uploadRoutes);

import paymentRoutes from './routes/paymentRoutes.js';
app.use('/api/payment', paymentRoutes);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));




// Basic Route
app.get('/', (req, res) => {
    const dbStatus = mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected';
    res.json({
        message: 'API is running...',
        dbStatus,
        env: process.env.NODE_ENV,
        ver: 'v3-db-check'
    });
});

import { notFound, errorHandler } from './middleware/errorMiddleware.js';

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Only listen if the file is run directly (not imported)
import { fileURLToPath } from 'url';
if (process.argv[1] === fileURLToPath(import.meta.url)) {
    app.listen(PORT, () => {
        console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    });
}

export default app;
