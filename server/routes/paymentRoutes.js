import express from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import dotenv from 'dotenv';
import asyncHandler from 'express-async-handler';

dotenv.config();

const router = express.Router();

// Initialize Razorpay credentials
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || 'rzp_live_S1SDwHGOyh7OzV';
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || 'jjqDENOmOvx2d5zd1jsl1KHG';

// Log credential status (without exposing full keys)
console.log('🔐 Razorpay Configuration:', {
    keyIdExists: !!RAZORPAY_KEY_ID,
    keySecretExists: !!RAZORPAY_KEY_SECRET,
    keyIdPrefix: RAZORPAY_KEY_ID?.substring(0, 8),
    isLive: RAZORPAY_KEY_ID?.startsWith('rzp_live'),
    source: process.env.RAZORPAY_KEY_ID ? 'env' : 'fallback'
});

// Create Razorpay instance with validated credentials
let razorpay;
try {
    razorpay = new Razorpay({
        key_id: RAZORPAY_KEY_ID,
        key_secret: RAZORPAY_KEY_SECRET,
    });
    console.log('✅ Razorpay instance created successfully');
} catch (error) {
    console.error('❌ Failed to create Razorpay instance:', error.message);
}

// @desc    Create Razorpay Order
// @route   POST /api/payment/create-order
// @access  Private
router.post('/create-order', asyncHandler(async (req, res) => {
    const { amount } = req.body;

    console.log('💰 Payment Request:', {
        amount,
        timestamp: new Date().toISOString(),
        hasRazorpay: !!razorpay
    });

    // Validate amount
    if (!amount || isNaN(amount) || amount <= 0) {
        console.error('❌ Invalid amount:', amount);
        return res.status(400).json({
            message: `Invalid amount: ${amount}`,
            success: false
        });
    }

    // Check if Razorpay is initialized
    if (!razorpay) {
        console.error('❌ Razorpay instance not initialized');
        return res.status(500).json({
            message: 'Payment gateway not configured',
            success: false
        });
    }

    // Validate credentials
    if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
        console.error('❌ Razorpay credentials missing');
        return res.status(500).json({
            message: 'Payment gateway credentials missing',
            success: false
        });
    }

    const options = {
        amount: Math.round(amount * 100), // Amount in smallest currency unit (paise)
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
    };

    console.log('📦 Creating order with options:', options);

    try {
        const order = await razorpay.orders.create(options);

        console.log('✅ Order created successfully:', {
            orderId: order.id,
            amount: order.amount,
            currency: order.currency
        });

        res.json({
            ...order,
            key: RAZORPAY_KEY_ID,
            success: true
        });
    } catch (error) {
        console.error('❌ Razorpay API Error:', {
            message: error.message,
            description: error.error?.description,
            statusCode: error.statusCode,
            error: error.error,
            fullError: error
        });

        // Extract useful message from various Razorpay error formats
        let errorMessage = error.error?.description || error.description || error.message;
        if (!errorMessage) errorMessage = "Unknown Razorpay Error";

        // Check for authentication errors
        if (errorMessage.toLowerCase().includes('authentication') ||
            errorMessage.toLowerCase().includes('invalid key') ||
            error.statusCode === 401) {
            errorMessage = 'Authentication failed. Please verify Razorpay credentials on server.';
            console.error('🔑 Authentication Error - Check credentials:', {
                keyIdUsed: RAZORPAY_KEY_ID?.substring(0, 12) + '...',
                keyIdLength: RAZORPAY_KEY_ID?.length,
                keySecretLength: RAZORPAY_KEY_SECRET?.length
            });
        }

        res.status(500).json({
            message: errorMessage,
            success: false,
            serverVersion: "v3-auth-fix",
            detail: {
                statusCode: error.statusCode,
                description: error.error?.description,
                field: error.error?.field
            }
        });
    }
}));

// @desc    Verify Razorpay Payment
// @route   POST /api/payment/verify
// @access  Private
router.post('/verify', asyncHandler(async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    console.log('🔍 Verifying payment:', {
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id
    });

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        console.error('❌ Missing verification parameters');
        return res.status(400).json({
            message: 'Missing payment verification data',
            success: false
        });
    }

    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSign = crypto
        .createHmac("sha256", RAZORPAY_KEY_SECRET)
        .update(sign.toString())
        .digest("hex");

    if (razorpay_signature === expectedSign) {
        console.log('✅ Payment verified successfully');
        res.status(200).json({
            message: "Payment verified successfully",
            success: true
        });
    } else {
        console.error('❌ Signature mismatch');
        res.status(400).json({
            message: "Invalid signature",
            success: false
        });
    }
}));

export default router;
