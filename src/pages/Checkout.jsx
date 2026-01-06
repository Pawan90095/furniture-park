import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CreditCard, Banknote, ArrowRight, Truck, Loader2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useStore } from '../store/useStore';

export default function Checkout() {
    const { cart, clearCart, cartTotal } = useCart();
    const { user, createOrder } = useStore(); // Get user and createOrder
    const navigate = useNavigate();
    const subtotal = cartTotal;
    const shipping = subtotal > 50000 ? 0 : 500;
    const total = subtotal + shipping;

    const [paymentMethod, setPaymentMethod] = useState('card');
    const [isProcessing, setIsProcessing] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [formData, setFormData] = useState({
        firstName: user?.name?.split(' ')[0] || '',
        lastName: user?.name?.split(' ')[1] || '',
        email: user?.email || '',
        address: '',
        city: '',
        pincode: '',
        phone: '',
    });

    // ... (useEffect redirect logic remains same)
    React.useEffect(() => {
        if (cart.length === 0 && !isProcessing) {
            navigate('/shop');
        }
    }, [cart, navigate, isProcessing]);

    if (cart.length === 0) return null;

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePlaceOrderClick = (e) => {
        e.preventDefault();
        // Basic Validation
        if (!formData.address || !formData.phone) {
            alert("Please fill in all shipping details.");
            return;
        }
        setShowPaymentModal(true);
    };

    // Load Razorpay Script
    const loadRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handleConfirmPayment = async () => {
        if (paymentMethod === 'cod') {
            // Existing Logic for COD
            handlePlaceOrder(null);
            return;
        }

        // 0. Check for Frontend Key
        const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;
        if (!razorpayKey) {
            alert("Error: VITE_RAZORPAY_KEY_ID is missing in frontend environment variables.");
            return;
        }

        setIsProcessing(true);
        const res = await loadRazorpay();

        if (!res) {
            alert('Razorpay SDK failed to load. Are you online?');
            setIsProcessing(false);
            return;
        }

        try {
            // 1. Create Order on Backend
            const API_URL = import.meta.env.VITE_API_URL || ''; // Use relative path for Vercel/proxies usually, or env.
            // Note: On Vercel, if VITE_API_URL is not set, it might default to '' which is fine for same-domain.

            console.log("Creating order at:", `${API_URL}/api/payment/create-order`);

            const result = await fetch(`${API_URL}/api/payment/create-order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({ amount: total }),
            });

            const data = await result.json();

            if (!result.ok) {
                console.error("Order Creation Failed:", data);
                alert(`Order Creation Failed: ${data.message || result.statusText}`);
                setIsProcessing(false);
                return;
            }

            // 2. Open Razorpay Options
            const options = {
                key: razorpayKey,
                amount: data.amount,
                currency: data.currency,
                name: "Furniture Park",
                description: "Luxury Furniture Transaction",
                order_id: data.id,
                handler: async function (response) {
                    // 3. Verify Payment
                    try {
                        const verifyRes = await fetch(`${API_URL}/api/payment/verify`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${user.token}`
                            },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature
                            }),
                        });

                        const verifyData = await verifyRes.json();

                        if (verifyRes.ok) {
                            // Payment Verified -> Create Order in DB
                            handlePlaceOrder({
                                id: response.razorpay_payment_id,
                                status: 'COMPLETED',
                                update_time: new Date().toISOString(),
                                email_address: formData.email
                            });
                        } else {
                            alert(verifyData.message || 'Payment Verification Failed');
                        }
                    } catch (error) {
                        console.error(error);
                        alert('Internal Server Error during Verification: ' + error.message);
                    }
                },
                prefill: {
                    name: `${formData.firstName} ${formData.lastName}`,
                    email: formData.email,
                    contact: formData.phone,
                },
                notes: {
                    address: formData.address,
                },
                theme: {
                    color: "#0F172A",
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
            setIsProcessing(false);

        } catch (error) {
            console.error("Checkout Error:", error);
            alert(`Something went wrong: ${error.message} \n(Check Console for details)`);
            setIsProcessing(false);
        }
    };

    // Helper to Create Order in DB (Abstracted from original logic)
    const handlePlaceOrder = async (paymentResult) => {
        setIsProcessing(true);
        const orderData = {
            orderItems: cart.map(item => ({
                name: item.name,
                qty: item.quantity,
                image: item.image,
                price: item.price,
                product: item.id
            })),
            shippingAddress: {
                address: formData.address,
                city: formData.city,
                postalCode: formData.pincode,
                country: 'India' // Hardcoded for now
            },
            paymentMethod: paymentMethod === 'upi' || paymentMethod === 'card' ? 'Online' : 'COD',
            paymentResult: paymentResult || {}, // Empty for COD or Pending
            itemsPrice: subtotal,
            shippingPrice: shipping,
            taxPrice: 0,
            totalPrice: total
        };

        const result = await createOrder(orderData);

        setIsProcessing(false);
        setShowPaymentModal(false);

        if (result.success) {
            navigate('/order-success');
        } else {
            alert('Order Failed: ' + (result.message || 'Unknown Error'));
        }
    };

    return (
        <div className="pt-32 pb-16 min-h-screen bg-background relative">
            {/* Payment Modal */}
            {showPaymentModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-white rounded-lg shadow-2xl p-6 max-w-sm w-full"
                    >
                        <h3 className="text-xl font-bold mb-4 font-serif text-primary">Confirm Payment</h3>
                        <div className="mb-6 space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Amount to Pay</span>
                                <span className="font-bold text-lg">₹{total.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Method</span>
                                <span className="uppercase font-medium">{paymentMethod}</span>
                            </div>
                            <div className="bg-blue-50 p-3 rounded text-xs text-blue-700">
                                <span className="font-bold block mb-1">Mock Gateway</span>
                                Click "Pay Now" to simulate a successful transaction.
                            </div>
                        </div>
                        <div className="flex space-x-3">
                            <button
                                onClick={() => setShowPaymentModal(false)}
                                disabled={isProcessing}
                                className="flex-1 py-3 border border-gray-300 rounded font-bold text-gray-600 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmPayment}
                                disabled={isProcessing}
                                className="flex-1 py-3 bg-green-600 text-white rounded font-bold hover:bg-green-700 flex justify-center items-center gap-2"
                            >
                                {isProcessing && <Loader2 className="animate-spin" size={16} />}
                                {isProcessing ? 'Paying...' : 'Pay Now'}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* ... (Header remains same) */}
                <h1 className="text-4xl font-serif font-bold text-primary mb-12 text-center">Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Left Column: Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-xl font-serif font-bold mb-6 border-b border-gray-200 pb-2">Shipping Information</h2>
                        <form id="checkout-form" onSubmit={handlePlaceOrderClick} className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">First Name</label>
                                    <input required name="firstName" value={formData.firstName} onChange={handleInputChange} type="text" className="w-full bg-white border border-gray-200 px-4 py-3 rounded-sm focus:outline-none focus:border-secondary transition-colors" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Last Name</label>
                                    <input required name="lastName" value={formData.lastName} onChange={handleInputChange} type="text" className="w-full bg-white border border-gray-200 px-4 py-3 rounded-sm focus:outline-none focus:border-secondary transition-colors" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email Address</label>
                                <input required name="email" value={formData.email} onChange={handleInputChange} type="email" className="w-full bg-white border border-gray-200 px-4 py-3 rounded-sm focus:outline-none focus:border-secondary transition-colors" />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Street Address</label>
                                <input required name="address" value={formData.address} onChange={handleInputChange} type="text" className="w-full bg-white border border-gray-200 px-4 py-3 rounded-sm focus:outline-none focus:border-secondary transition-colors" />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">City</label>
                                    <input required name="city" value={formData.city} onChange={handleInputChange} type="text" className="w-full bg-white border border-gray-200 px-4 py-3 rounded-sm focus:outline-none focus:border-secondary transition-colors" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Pincode</label>
                                    <input required name="pincode" value={formData.pincode} onChange={handleInputChange} type="text" className="w-full bg-white border border-gray-200 px-4 py-3 rounded-sm focus:outline-none focus:border-secondary transition-colors" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Phone</label>
                                    <input required name="phone" value={formData.phone} onChange={handleInputChange} type="tel" className="w-full bg-white border border-gray-200 px-4 py-3 rounded-sm focus:outline-none focus:border-secondary transition-colors" />
                                </div>
                            </div>

                            <h2 className="text-xl font-serif font-bold mt-10 mb-6 border-b border-gray-200 pb-2">Payment Method</h2>
                            <div className="space-y-4">
                                <div
                                    onClick={() => setPaymentMethod('card')}
                                    className={`flex items-center p-4 border rounded-sm cursor-pointer transition-colors ${paymentMethod === 'card' ? 'border-secondary bg-secondary/5' : 'border-gray-200'}`}
                                >
                                    <CreditCard className="mr-4 text-primary" size={24} />
                                    <span className="font-medium text-primary">Credit / Debit Card</span>
                                </div>
                                <div
                                    onClick={() => setPaymentMethod('upi')}
                                    className={`flex items-center p-4 border rounded-sm cursor-pointer transition-colors ${paymentMethod === 'upi' ? 'border-secondary bg-secondary/5' : 'border-gray-200'}`}
                                >
                                    <span className="mr-4 text-primary font-bold text-xl w-6 text-center">@</span>
                                    <span className="font-medium text-primary">UPI</span>
                                </div>
                                <div
                                    onClick={() => setPaymentMethod('cod')}
                                    className={`flex items-center p-4 border rounded-sm cursor-pointer transition-colors ${paymentMethod === 'cod' ? 'border-secondary bg-secondary/5' : 'border-gray-200'}`}
                                >
                                    <Banknote className="mr-4 text-primary" size={24} />
                                    <span className="font-medium text-primary">Cash on Delivery</span>
                                </div>
                            </div>
                        </form>
                    </motion.div>

                    {/* Right Column: Summary */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-white p-8 h-fit shadow-soft rounded-sm sticky top-28"
                    >
                        {/* ... (Summary content remains same) */}
                        <h2 className="text-xl font-serif font-bold mb-6">Order Summary</h2>
                        <div className="space-y-4 mb-8">
                            {cart.map((item) => (
                                <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                                    <div className="flex items-center">
                                        <div className="w-12 h-12 bg-gray-100 mr-4 rounded-sm overflow-hidden">
                                            <img src={item.image} alt="" className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-primary">{item.name}</p>
                                            <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                        </div>
                                    </div>
                                    <p className="text-sm font-medium text-primary">₹{(item.price * item.quantity).toLocaleString()}</p>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-2 text-sm border-t border-gray-100 pt-4 mb-6">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span>₹{subtotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Shipping</span>
                                <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-center font-bold text-xl text-primary border-t border-black pt-4 mb-8">
                            <span>Total</span>
                            <span>₹{total.toLocaleString()}</span>
                        </div>

                        <button
                            form="checkout-form"
                            type="submit"
                            disabled={isProcessing}
                            className="w-full bg-primary text-white py-4 font-medium hover:bg-secondary transition-colors flex items-center justify-center space-x-2 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {/* ... (Original button content) */}
                            {isProcessing ? (
                                <>
                                    <Loader2 className="animate-spin" size={20} />
                                    <span>Processing...</span>
                                </>
                            ) : (
                                <>
                                    <span>Place Order</span>
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </button>
                        <div className="mt-4 flex justify-center space-x-4 text-gray-400">
                            <Truck size={18} />
                            <span className="text-xs">Secure Shipping</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
