import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, ArrowRight, Loader2, Check, User, AlertCircle } from 'lucide-react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import AuthInput from '../components/AuthInput';
import AuthCheckbox from '../components/AuthCheckbox';
import SocialButton from '../components/SocialButton';
import lifestyleImg from '../assets/auth-lifestyle.png';
import { useStore } from '../store/useStore';

// Google Icon Component
const GoogleIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
        <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
        />
        <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
        />
        <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.21.81-.63z"
            fill="#FBBC05"
        />
        <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
        />
    </svg>
);

const AuthPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');

    // Form States
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newsletter, setNewsletter] = useState(false);

    const { loginUser, registerUser, googleAuth, user } = useStore();

    const handleGoogleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            setIsLoading(true);
            try {
                // Fetch user info from Google
                const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
                }).then(res => res.json());

                // Send to backend
                const res = await googleAuth(userInfo.email, userInfo.name, userInfo.sub);

                if (res.success) {
                    setIsSuccess(true);
                    setTimeout(() => {
                        navigate('/account');
                    }, 2000);
                } else {
                    setError(res.message || 'Google Login failed');
                }
            } catch (err) {
                setError('Failed to Connect with Google');
            } finally {
                setIsLoading(false);
            }
        },
        onError: () => setError('Google Login Failed'),
    });

    // Check if user is already logged in
    useEffect(() => {
        if (user) {
            navigate('/account');
        }
    }, [user, navigate]);

    useEffect(() => {
        // Reset states when switching modes
        setIsSuccess(false);
        setIsLoading(false);
        setError('');
        setName('');
        setEmail('');
        setPassword('');
    }, [isLogin]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            let res;
            if (isLogin) {
                res = await loginUser(email, password);
            } else {
                res = await registerUser(name, email, password);
            }

            if (res.success) {
                setIsSuccess(true);
                setTimeout(() => {
                    navigate('/account');
                }, 2000);
            } else {
                setError(res.message || 'Something went wrong. Please try again.');
            }
        } catch (err) {
            setError(err.message || 'An unexpected error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-background text-auth-text font-auth-body overflow-hidden">
            {/* Left Side - Lifestyle Image */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="hidden lg:block w-[60%] relative overflow-hidden"
            >
                <img
                    src={lifestyleImg}
                    alt="Cozy living room"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-10000 hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 backdrop-brightness-95" /> {/* Overlay for text readability if needed */}

                <div className="absolute bottom-16 left-16 text-white max-w-lg">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="text-5xl font-auth-heading mb-6 leading-tight"
                    >
                        Sanctuary.<br />Curated.
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                        className="text-lg font-light tracking-wide text-white/90"
                    >
                        Discover furniture that tells your story.
                    </motion.p>
                </div>
            </motion.div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-[40%] flex flex-col justify-center items-center p-8 lg:p-16 relative bg-white lg:bg-transparent">
                <div className="w-full max-w-md">

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-10"
                    >
                        <h1 className="text-4xl font-auth-heading text-auth-primary mb-2">
                            {isLogin ? 'Welcome Home' : 'Join the Circle'}
                        </h1>
                        <p className="text-taupe">
                            {isLogin
                                ? 'Sign in to curate your sanctuary and view saved items.'
                                : 'Start your design journey with exclusive benefits.'}
                        </p>
                    </motion.div>

                    {/* Success Message Animation */}
                    <AnimatePresence mode="wait">
                        {isSuccess ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col items-center justify-center py-10"
                            >
                                <motion.div
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 1, ease: "easeInOut" }}
                                    className="w-20 h-20 text-auth-success mb-6"
                                >
                                    <Check className="w-full h-full" strokeWidth={1.5} />
                                </motion.div>
                                <h3 className="text-2xl font-auth-heading text-auth-primary mb-2">Welcome back to comfort.</h3>
                                <p className="text-taupe">Redirecting you to your feed...</p>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="form"
                                initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
                                transition={{ duration: 0.4 }}
                            >
                                {/* Social Login */}
                                <div className="space-y-4 mb-8">
                                    <SocialButton platform="Google" icon={<GoogleIcon />} onClick={() => handleGoogleLogin()} />
                                </div>

                                <div className="relative mb-8">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-200"></div>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-2 bg-white text-gray-400">Or connect with</span>
                                    </div>
                                </div>

                                {/* Error Message */}
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mb-4 p-3 bg-red-50 border border-red-100 rounded-lg flex items-center gap-2 text-red-600 text-sm"
                                    >
                                        <AlertCircle size={16} />
                                        <span>{error}</span>
                                    </motion.div>
                                )}

                                {/* Form */}
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    {!isLogin && (
                                        <AuthInput
                                            id="name"
                                            type="text"
                                            label="Full Name"
                                            placeholder="John Doe"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            icon={User}
                                            required
                                        />
                                    )}

                                    <AuthInput
                                        id="email"
                                        type="email"
                                        label="Email Address"
                                        placeholder="you@yourhome.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        icon={Mail}
                                        required
                                    />

                                    <AuthInput
                                        id="password"
                                        type="password"
                                        label="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        icon={Lock}
                                        required
                                        showStrengthMeter={!isLogin}
                                    />

                                    {!isLogin && (
                                        <div className="mt-2">
                                            <AuthCheckbox
                                                id="newsletter"
                                                label="Send me interior design trends and exclusive furniture drops."
                                                checked={newsletter}
                                                onChange={setNewsletter}
                                            />
                                        </div>
                                    )}

                                    {isLogin && (
                                        <div className="flex justify-end pt-1">
                                            <Link to="/forgot-password" className="text-sm text-auth-primary hover:underline underline-offset-4">Forgot Password?</Link>
                                        </div>
                                    )}

                                    <motion.button
                                        whileHover={{ y: -2, boxShadow: "0 4px 6px rgba(93, 64, 55, 0.2)" }}
                                        whileTap={{ scale: 0.98 }}
                                        type="submit"
                                        className="w-full bg-auth-primary text-white py-4 rounded-lg font-medium tracking-wide flex items-center justify-center group relative overflow-hidden mt-6"
                                        disabled={isLoading}
                                    >
                                        <AnimatePresence mode="wait">
                                            {isLoading ? (
                                                <motion.div
                                                    key="loading"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                >
                                                    <Loader2 className="animate-spin" size={24} />
                                                </motion.div>
                                            ) : (
                                                <motion.span
                                                    key="text"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    className="flex items-center"
                                                >
                                                    {isLogin ? 'Unlock My Account' : 'Create Account'}
                                                    <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                                </motion.span>
                                            )}
                                        </AnimatePresence>
                                    </motion.button>
                                </form>

                                {/* Toggle Mode */}
                                <div className="mt-8 text-center">
                                    <p className="text-gray-600">
                                        {isLogin ? "New here? " : "Already have an account? "}
                                        <button
                                            onClick={() => setIsLogin(!isLogin)}
                                            className="text-auth-primary font-semibold hover:underline underline-offset-4 ml-1"
                                        >
                                            {isLogin ? "Start your design journey." : "Sign in."}
                                        </button>
                                    </p>

                                    <div className="mt-6">
                                        <button
                                            onClick={() => navigate('/checkout')}
                                            className="text-sm text-gray-400 hover:text-auth-primary transition-colors"
                                        >
                                            Just browsing? Continue as Guest
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
