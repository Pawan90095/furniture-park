import express from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import dotenv from 'dotenv';
import asyncHandler from 'express-async-handler';

dotenv.config();

const router = express.Router();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// @desc    Create Razorpay Order
// @route   POST /api/payment/create-order
// @access  Private
router.post('/create-order', asyncHandler(async (req, res) => {
    const { amount } = req.body;

    const options = {
        amount: Math.round(amount * 100), // Amount in smallest currency unit (paise)
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
    };

    try {
        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
}));

// @desc    Verify Razorpay Payment
// @route   POST /api/payment/verify
// @access  Private
router.post('/verify', asyncHandler(async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSign = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(sign.toString())
        .digest("hex");

    if (razorpay_signature === expectedSign) {
        res.status(200).json({ message: "Payment verified successfully" });
    } else {
        res.status(400);
        throw new Error("Invalid signature sent!");
    }
}));

export default router;
