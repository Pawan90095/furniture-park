import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/userModel.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const testAuth = async () => {
    try {
        const email = 'pjat95105@gmail.com';
        const password = 'pawan900@';

        console.log(`Checking auth for: ${email}`);

        const user = await User.findOne({ email });

        if (!user) {
            console.log('User not found!');
        } else {
            console.log('User found:', user._id);
            console.log('Stored Hashed Password:', user.password);

            const isMatch = await user.matchPassword(password);

            if (isMatch) {
                console.log('SUCCESS: Password matches!');
            } else {
                console.log('FAILURE: Password does NOT match.');
            }
        }
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

testAuth();
