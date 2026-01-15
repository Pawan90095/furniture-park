import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/userModel.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const resetAdminPassword = async () => {
    try {
        const email = 'pjat95105@gmail.com';
        const newPassword = 'pawan900@';

        const user = await User.findOne({ email });

        if (user) {
            user.password = newPassword;
            await user.save();
            console.log(`\nSUCCESS: Password for ${email} has been reset to: ${newPassword}\n`);
        } else {
            console.log(`\nERROR: User with email ${email} not found.\n`);
        }
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

resetAdminPassword();
