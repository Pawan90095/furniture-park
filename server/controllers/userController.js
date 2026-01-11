import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';
import sendEmail from '../utils/sendEmail.js';
import mongoose from 'mongoose';
import crypto from 'crypto';

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
            savedAddresses: user.savedAddresses,
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

// @desc    Google Auth (Login or Register)
// @route   POST /api/users/google
// @access  Public
const googleLogin = asyncHandler(async (req, res) => {
    const { email, name, googleId } = req.body;

    let user = await User.findOne({ email });

    if (user) {
        // User exists, log them in
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
            savedAddresses: user.savedAddresses,
        });
    } else {
        // Create new user
        // Generate random password as they used Google
        const randomPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);

        user = await User.create({
            name,
            email,
            password: randomPassword,
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
                savedAddresses: user.savedAddresses,
            });
        } else {
            res.status(400);
            throw new Error('Invalid user data');
        }
    }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log("Register Request:", { name, email });

        // Check DB Status
        if (mongoose.connection.readyState !== 1) {
            throw new Error("Database not connected (ReadyState: " + mongoose.connection.readyState + ")");
        }

        const userExists = await User.findOne({ email });

        if (userExists) {
            res.status(400);
            throw new Error('User already exists');
        }

        console.log("Creating user...");
        const user = await User.create({
            name,
            email,
            password,
        });

        console.log("User created:", user._id);

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
                savedAddresses: user.savedAddresses
            });
        } else {
            res.status(400);
            throw new Error('Invalid user data');
        }
    } catch (error) {
        console.error("Register Error CRASH:", error);
        // Force send JSON even if it crashed
        res.status(500).json({
            message: "Registration Failed: " + error.message,
            stack: error.stack,
            type: "CatchBlock"
        });
    }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            savedAddresses: user.savedAddresses
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Forgot Password
// @route   POST /api/users/forgotpassword
// @access  Public
const forgotPassword = asyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        res.status(404);
        throw new Error('User not found with this email');
    }

    // Get reset token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    // Create reset url (frontend url)
    // NOTE: This should point to your FRONTEND URL, not backend
    const resetUrl = `${req.headers.origin}/reset-password/${resetToken}`;
    // If testing locally on port 5173, make sure req.headers.origin is correct or hardcode it.
    // Ideally use process.env.FRONTEND_URL

    console.log(`Checking user for email: ${req.body.email}`);

    // Email Message
    const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

    try {
        await sendEmail({
            email: user.email,
            subject: 'Furniture Park Password Reset Token',
            message: `Click the link to reset your password: \n\n ${resetUrl} \n\n This link expires in 10 minutes.`
        });

        res.status(200).json({ success: true, data: 'Email sent' });
    } catch (error) {
        console.error(error);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        res.status(500);
        throw new Error('Email could not be sent');
    }
});

// @desc    Reset Password
// @route   PUT /api/users/resetpassword/:resetToken
// @access  Public
const resetPassword = asyncHandler(async (req, res) => {
    // Get hashed token
    const resetPasswordToken = crypto
        .createHash('sha256')
        .update(req.params.resetToken)
        .digest('hex');

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
        res.status(400);
        throw new Error('Invalid token');
    }

    // Set new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(201).json({
        success: true,
        data: 'Password updated success'
    });
});

export { authUser, registerUser, getUserProfile, forgotPassword, resetPassword, googleLogin };
