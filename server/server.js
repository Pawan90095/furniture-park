import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

// Load env vars
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

import productRoutes from './routes/productRoutes.js';

// ...

import userRoutes from './routes/userRoutes.js';

// ...

import orderRoutes from './routes/orderRoutes.js';
import siteSettingsRoutes from './routes/siteSettingsRoutes.js';

// ...

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
import uploadRoutes from './routes/uploadRoutes.js';
import path from 'path';

// ...

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/settings', siteSettingsRoutes);
app.use('/api/upload', uploadRoutes);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));




// Basic Route
app.get('/', (req, res) => {
    res.send('API is running...');
});

import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// ...

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
