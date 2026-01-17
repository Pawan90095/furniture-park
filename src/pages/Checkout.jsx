import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CreditCard, Banknote, ArrowRight, Truck, Loader2, ShieldCheck, Lock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useStore } from '../store/useStore';
import { useToast } from '../context/ToastContext';

export default function Checkout() {
    const { cart, clearCart, cartTotal } = useCart();
    const { user, createOrder } = useStore();
    const { toast } = useToast();
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
        if (!formData.address || !formData.phone) {
            toast.error("Please fill in all shipping details.");
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
            handlePlaceOrder(null);
            return;
        }

        setIsProcessing(true);
        const res = await loadRazorpay();

        if (!res) {
            toast.error('Razorpay SDK failed to load. Are you online?');
            setIsProcessing(false);
            return;
        }

        try {
            const API_URL = import.meta.env.VITE_API_URL || '';

            const headers = { 'Content-Type': 'application/json' };
            if (user?.token) headers['Authorization'] = `Bearer ${user.token}`;

            const result = await fetch(`${API_URL}/api/payment/create-order`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({ amount: total }),
            });

            const data = await result.json();

            if (!result.ok) {
                toast.error(`Order Creation Failed: ${data.message || result.statusText}`);
                setIsProcessing(false);
                return;
            }

            const finalKey = data.key || import.meta.env.VITE_RAZORPAY_KEY_ID;

            const options = {
                key: finalKey,
                amount: data.amount,
                currency: data.currency,
                name: "Furniture Park",
                description: "Luxury Furniture Transaction",
                order_id: data.id,
                handler: async function (response) {
                    try {
                        const verifyHeaders = { 'Content-Type': 'application/json' };
                        if (user?.token) verifyHeaders['Authorization'] = `Bearer ${user.token}`;

                        const verifyRes = await fetch(`${API_URL}/api/payment/verify`, {
                            method: 'POST',
                            headers: verifyHeaders,
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature
                            }),
                        });

                        if (verifyRes.ok) {
                            handlePlaceOrder({
                                id: response.razorpay_payment_id,
                                status: 'COMPLETED',
                                update_time: new Date().toISOString(),
                                email_address: formData.email
                            });
                        } else {
                            toast.error('Payment Verification Failed');
                        }
                    } catch (error) {
                        toast.error('Verification Error: ' + error.message);
                    }
                },
                prefill: {
                    name: `${formData.firstName} ${formData.lastName}`,
                    email: formData.email,
                    contact: formData.phone,
                },
                theme: { color: "#2C2C2C" },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
            setIsProcessing(false);

        } catch (error) {
            toast.error(`Error: ${error.message}`);
            setIsProcessing(false);
        }
    };

    const handlePlaceOrder = async (paymentResult) => {
        setIsProcessing(true);
        try {
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
                    country: 'India'
                },
                paymentMethod: paymentMethod === 'upi' || paymentMethod === 'card' ? 'Online' : 'COD',
                paymentResult: paymentResult || {},
                itemsPrice: subtotal,
                shippingPrice: shipping,
                taxPrice: 0,
                totalPrice: total
            };

            const result = await createOrder(orderData);

            if (result.success) {
                clearCart();
                navigate('/order-success');
            } else {
                setIsProcessing(false);
                setShowPaymentModal(false);
                toast.error('Order Failed: ' + result.message);
            }
        } catch (error) {
            setIsProcessing(false);
            setShowPaymentModal(false);
            toast.error('System Error: ' + error.message);
        }
    };

    return (
        <div className="pt-32 pb-24 min-h-screen bg-[#F9F8F6]">
            {/* Payment Modal */}
            {showPaymentModal && (
                <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full"
                    >
                        <h3 className="text-2xl font-display font-medium mb-6 text-primary">Confirm & Pay</h3>
                        <div className="mb-8 space-y-4">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-secondary">Amount to Pay</span>
                                <span className="font-bold text-xl text-primary">₹{total.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-secondary">Method</span>
                                <span className="uppercase font-medium bg-[#F9F8F6] px-3 py-1 rounded-full text-xs tracking-wider">{paymentMethod}</span>
                            </div>
                            <div className="bg-[#F0EFEC] p-4 rounded-xl text-xs text-primary/80 leading-relaxed flex gap-3">
                                <ShieldCheck size={16} className="shrink-0 text-[#556B2F]" />
                                <span>Payments are secure and encrypted. You will be redirected to verify your transaction.</span>
                            </div>
                        </div>
                        <div className="flex space-x-3">
                            <button
                                onClick={() => setShowPaymentModal(false)}
                                disabled={isProcessing}
                                className="flex-1 py-3.5 border border-[#E6E1D6] rounded-xl font-medium text-secondary hover:bg-[#F9F8F6] transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmPayment}
                                disabled={isProcessing}
                                className="flex-1 py-3.5 bg-[#2C2C2C] text-white rounded-xl font-medium hover:bg-[#556B2F] transition-all flex justify-center items-center gap-2 shadow-lg hover:shadow-xl"
                            >
                                {isProcessing && <Loader2 className="animate-spin" size={18} />}
                                {isProcessing ? 'Processing' : 'Pay Now'}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}

            <div className="max-w-[1440px] mx-auto px-6">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-display font-medium text-primary mb-4">Checkout</h1>
                    <p className="text-secondary flex items-center justify-center gap-2 text-sm">
                        <Lock size={14} /> Secure Encryption
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                    {/* Left Column: Form */}
                    <motion.div
                        className="lg:col-span-7"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <section className="bg-white rounded-2xl p-8 shadow-sm border border-[#F0EFEC] mb-8">
                            <h2 className="text-2xl font-display font-medium mb-8 flex items-center gap-3">
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#2C2C2C] text-white text-sm font-sans font-bold">1</span>
                                Shipping Details
                            </h2>
                            <form id="checkout-form" onSubmit={handlePlaceOrderClick} className="space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-secondary uppercase tracking-wider">First Name</label>
                                        <input
                                            required name="firstName" value={formData.firstName} onChange={handleInputChange}
                                            className="w-full bg-[#F9F8F6] border-transparent focus:bg-white focus:border-[#556B2F] focus:ring-0 rounded-xl px-4 py-3 transition-all outline-none border border-[#F9F8F6]"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-secondary uppercase tracking-wider">Last Name</label>
                                        <input
                                            required name="lastName" value={formData.lastName} onChange={handleInputChange}
                                            className="w-full bg-[#F9F8F6] border-transparent focus:bg-white focus:border-[#556B2F] focus:ring-0 rounded-xl px-4 py-3 transition-all outline-none border border-[#F9F8F6]"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-secondary uppercase tracking-wider">Email Address</label>
                                    <input
                                        required name="email" value={formData.email} onChange={handleInputChange} type="email"
                                        className="w-full bg-[#F9F8F6] border-transparent focus:bg-white focus:border-[#556B2F] focus:ring-0 rounded-xl px-4 py-3 transition-all outline-none border border-[#F9F8F6]"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-secondary uppercase tracking-wider">Street Address</label>
                                    <input
                                        required name="address" value={formData.address} onChange={handleInputChange}
                                        className="w-full bg-[#F9F8F6] border-transparent focus:bg-white focus:border-[#556B2F] focus:ring-0 rounded-xl px-4 py-3 transition-all outline-none border border-[#F9F8F6]"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-secondary uppercase tracking-wider">City</label>
                                        <input
                                            required name="city" value={formData.city} onChange={handleInputChange}
                                            className="w-full bg-[#F9F8F6] border-transparent focus:bg-white focus:border-[#556B2F] focus:ring-0 rounded-xl px-4 py-3 transition-all outline-none border border-[#F9F8F6]"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-secondary uppercase tracking-wider">Pincode</label>
                                        <input
                                            required name="pincode" value={formData.pincode} onChange={handleInputChange}
                                            className="w-full bg-[#F9F8F6] border-transparent focus:bg-white focus:border-[#556B2F] focus:ring-0 rounded-xl px-4 py-3 transition-all outline-none border border-[#F9F8F6]"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-secondary uppercase tracking-wider">Phone</label>
                                    <input
                                        required name="phone" value={formData.phone} onChange={handleInputChange} type="tel"
                                        className="w-full bg-[#F9F8F6] border-transparent focus:bg-white focus:border-[#556B2F] focus:ring-0 rounded-xl px-4 py-3 transition-all outline-none border border-[#F9F8F6]"
                                    />
                                </div>
                            </form>
                        </section>

                        <section className="bg-white rounded-2xl p-8 shadow-sm border border-[#F0EFEC]">
                            <h2 className="text-2xl font-display font-medium mb-8 flex items-center gap-3">
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#2C2C2C] text-white text-sm font-sans font-bold">2</span>
                                Payment Method
                            </h2>
                            <div className="grid sm:grid-cols-3 gap-4">
                                <div
                                    onClick={() => setPaymentMethod('card')}
                                    className={`relative p-6 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-[#556B2F] bg-[#556B2F]/5 shadow-sm' : 'border-[#F0EFEC] hover:border-[#E6E1D6]'}`}
                                >
                                    {paymentMethod === 'card' && <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-[#556B2F]" />}
                                    <CreditCard className={`mb-3 ${paymentMethod === 'card' ? 'text-[#556B2F]' : 'text-secondary'}`} size={24} />
                                    <span className={`block font-medium ${paymentMethod === 'card' ? 'text-primary' : 'text-secondary'}`}>Card</span>
                                </div>
                                <div
                                    onClick={() => setPaymentMethod('upi')}
                                    className={`relative p-6 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'upi' ? 'border-[#556B2F] bg-[#556B2F]/5 shadow-sm' : 'border-[#F0EFEC] hover:border-[#E6E1D6]'}`}
                                >
                                    {paymentMethod === 'upi' && <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-[#556B2F]" />}
                                    <span className={`block mb-3 font-bold text-xl ${paymentMethod === 'upi' ? 'text-[#556B2F]' : 'text-secondary'}`}>@</span>
                                    <span className={`block font-medium ${paymentMethod === 'upi' ? 'text-primary' : 'text-secondary'}`}>UPI</span>
                                </div>
                                <div
                                    onClick={() => setPaymentMethod('cod')}
                                    className={`relative p-6 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-[#556B2F] bg-[#556B2F]/5 shadow-sm' : 'border-[#F0EFEC] hover:border-[#E6E1D6]'}`}
                                >
                                    {paymentMethod === 'cod' && <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-[#556B2F]" />}
                                    <Banknote className={`mb-3 ${paymentMethod === 'cod' ? 'text-[#556B2F]' : 'text-secondary'}`} size={24} />
                                    <span className={`block font-medium ${paymentMethod === 'cod' ? 'text-primary' : 'text-secondary'}`}>Cash on Delivery</span>
                                </div>
                            </div>
                        </section>
                    </motion.div>

                    {/* Right Column: Summary */}
                    <div className="lg:col-span-5">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="bg-white p-8 lg:p-10 shadow-soft rounded-2xl sticky top-32 border border-[#F0EFEC]"
                        >
                            <h2 className="text-2xl font-display font-medium mb-8">Order Summary</h2>
                            <div className="space-y-6 mb-8 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                {cart.map((item) => (
                                    <div key={item.id} className="flex gap-4 items-start">
                                        <div className="w-16 h-20 bg-[#F0EFEC] rounded-lg overflow-hidden shrink-0">
                                            <img src={item.image} alt="" className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-display text-primary truncate">{item.name}</p>
                                            <p className="text-sm text-secondary mt-1">Qty: {item.quantity}</p>
                                        </div>
                                        <p className="font-medium text-primary">₹{(item.price * item.quantity).toLocaleString()}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-3 py-6 border-t border-[#F0EFEC]">
                                <div className="flex justify-between text-secondary">
                                    <span>Subtotal</span>
                                    <span>₹{subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-secondary">
                                    <span>Shipping</span>
                                    <span className={shipping === 0 ? "text-[#556B2F] font-medium" : ""}>
                                        {shipping === 0 ? 'Free' : `₹${shipping}`}
                                    </span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center py-6 border-t border-[#F0EFEC] mb-8">
                                <span className="text-lg font-medium text-primary">Total</span>
                                <span className="text-3xl font-display font-medium text-primary">₹{total.toLocaleString()}</span>
                            </div>

                            <button
                                form="checkout-form"
                                type="submit"
                                disabled={isProcessing}
                                className="w-full bg-[#2C2C2C] text-white py-4 rounded-full font-medium hover:bg-[#556B2F] transition-all flex items-center justify-center gap-3 shadow-lg active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed text-lg"
                            >
                                {isProcessing ? (
                                    <>
                                        <Loader2 className="animate-spin" size={24} />
                                    </>
                                ) : (
                                    <>
                                        <span>Place Order</span>
                                        <ArrowRight size={20} />
                                    </>
                                )}
                            </button>

                            <div className="mt-6 flex flex-col items-center gap-3 text-secondary">
                                <div className="flex items-center gap-2 text-xs uppercase tracking-wider">
                                    <Truck size={14} />
                                    <span>Free Shipping over ₹50,000</span>
                                </div>
                                <div className="flex gap-3 opacity-50 grayscale">
                                    {/* Mock Payment Icons */}
                                    <div className="w-8 h-5 bg-gray-200 rounded"></div>
                                    <div className="w-8 h-5 bg-gray-200 rounded"></div>
                                    <div className="w-8 h-5 bg-gray-200 rounded"></div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
