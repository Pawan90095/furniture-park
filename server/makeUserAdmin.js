import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/userModel.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const makeUserAdmin = async () => {
    try {
        // Change this email to the user you want to promote
        const email = 'pjat95105@gmail.com';

        const user = await User.findOne({ email });

        if (user) {
            user.role = 'admin';
            user.isAdmin = true; // Setting both just in case, though schema uses role
            await user.save();
            console.log(`\nSUCCESS: User ${email} is now an Admin!\n`);
        } else {
            console.log(`\nERROR: User with email ${email} not found.\n`);
        }
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

makeUserAdmin();
