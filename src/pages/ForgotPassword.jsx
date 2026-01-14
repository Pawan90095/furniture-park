import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function ForgotPassword() {
    const { toast } = useToast();
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const API_URL = import.meta.env.VITE_API_URL || '';

        try {
            const res = await fetch(`${API_URL}/api/users/forgotpassword`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (res.ok) {
                setSubmitted(true);
            } else {
                toast.error(data.message || 'Something went wrong');
            }
        } catch (error) {
            console.error("Forgot Password Error:", error);
            toast.error('Failed to connect to server. Make sure the backend is running.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-20 flex items-center justify-center bg-gray-50 px-4">
            <div className="bg-white p-8 rounded-2xl shadow-luxury max-w-md w-full relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-20"></div>

                {!submitted ? (
                    <>
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-display font-medium text-primary mb-3">Forgot Password?</h1>
                            <p className="text-taupe text-sm leading-relaxed">
                                Don't worry! It happens. Please enter the email address associated with your account.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-2">Email Address</label>
                                <div className="relative group">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={18} />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-gray-300 text-sm"
                                        placeholder="name@example.com"
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-primary text-white py-3.5 rounded-lg font-bold uppercase tracking-widest text-xs hover:bg-secondary transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : 'Send Reset Link'}
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="text-center py-4">
                        <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                            <CheckCircle size={32} />
                        </div>
                        <h2 className="text-2xl font-display text-primary mb-2">Check your mail</h2>
                        <p className="text-taupe text-sm mb-8 leading-relaxed">
                            We have sent a password recover instructions to your email <strong>{email}</strong>.
                        </p>
                        <button
                            onClick={() => setSubmitted(false)}
                            className="text-primary text-xs font-bold uppercase tracking-widest hover:underline"
                        >
                            Resend email
                        </button>
                    </div>
                )}

                <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                    <Link to="/login" className="inline-flex items-center gap-2 text-taupe hover:text-primary transition-colors text-sm font-medium">
                        <ArrowLeft size={16} />
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
}
