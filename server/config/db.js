import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        console.log('Attempting MongoDB connection...');
        console.log('MONGO_URI exists:', !!process.env.MONGO_URI);
        console.log('URI preview:', process.env.MONGO_URI ? process.env.MONGO_URI.substring(0, 30) + '...' : 'MISSING');

        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`MongoDB Connected: ${conn.connection.host}`);
        console.log('Connection ReadyState:', mongoose.connection.readyState);
    } catch (error) {
        console.error(`MongoDB Connection Error: ${error.message}`);
        console.error('Full error:', error);
        console.error('Error code:', error.code);
        console.error('Error name:', error.name);
        // Do NOT exit process in serverless environment
    }
};

export default connectDB;
