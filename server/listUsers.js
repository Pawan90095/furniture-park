import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/userModel.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const listUsers = async () => {
    try {
        const users = await User.find({});
        console.log('\n--- REGISTERED USERS ---');
        users.forEach(user => {
            console.log(`ID: ${user._id}`);
            console.log(`Name: ${user.name}`);
            console.log(`Email: ${user.email}`);
            console.log(`Role: ${user.role || (user.isAdmin ? 'admin' : 'user')}`);
            console.log('------------------------');
        });
        console.log(`Total Users: ${users.length}\n`);
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

listUsers();
