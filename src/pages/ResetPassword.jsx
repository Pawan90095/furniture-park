import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';

export default function ResetPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const { resetToken } = useParams();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        setLoading(true);
        const API_URL = import.meta.env.VITE_API_URL || '';

        try {
            const res = await fetch(`${API_URL}/api/users/resetpassword/${resetToken}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });

            const data = await res.json();

            if (res.ok) {
                alert("Password Updated Successfully");
                navigate('/login');
            } else {
                alert(data.message || 'Error updating password');
            }
        } catch (error) {
            alert('Failed to connect to server');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-20 flex items-center justify-center bg-gray-50 px-4">
            <div className="bg-white p-8 rounded-2xl shadow-luxury max-w-md w-full relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-20"></div>

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-display font-medium text-primary mb-3">Reset Password</h1>
                    <p className="text-taupe text-sm leading-relaxed">
                        Enter your new password below.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-2">New Password</label>
                        <div className="relative group">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={18} />
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-gray-300 text-sm"
                                placeholder="Min 6 characters"
                                required
                                minLength={6}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors focus:outline-none"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-2">Confirm Password</label>
                        <div className="relative group">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={18} />
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-gray-300 text-sm"
                                placeholder="Re-enter password"
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
                        ) : (
                            <>
                                <span>Update Password</span>
                                <ArrowRight size={16} />
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
