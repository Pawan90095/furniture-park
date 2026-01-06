import React, { useState } from 'react';
import { Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AuthInput = ({
    id,
    type = 'text',
    label,
    value,
    onChange,
    onBlur,
    error,
    icon: Icon,
    required = false,
    showStrengthMeter = false,
    placeholder = ''
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const inputType = type === 'password' && showPassword ? 'text' : type;

    // Password strength calculation
    const calculateStrength = (password) => {
        let score = 0;
        if (password.length > 8) score += 1;
        if (/[A-Z]/.test(password)) score += 1;
        if (/[0-9]/.test(password)) score += 1;
        if (/[^A-Za-z0-9]/.test(password)) score += 1;
        return score;
    };

    const strength = type === 'password' && showStrengthMeter ? calculateStrength(value) : 0;
    const strengthColor = ['bg-gray-200', 'bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-green-500'][strength];

    return (
        <div className="mb-6 relative">
            <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    {Icon && <Icon size={20} />}
                </div>

                <input
                    id={id}
                    type={inputType}
                    value={value}
                    onChange={onChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={(e) => {
                        setIsFocused(false);
                        onBlur && onBlur(e);
                    }}
                    className={`
            w-full bg-transparent border-b-2 py-3 px-10 text-auth-text outline-none transition-all duration-300
            ${error ? 'border-auth-error' : isFocused ? 'border-auth-primary' : 'border-gray-200'}
            font-auth-body text-base placeholder-transparent
          `}
                    placeholder={placeholder}
                    aria-label={label}
                />

                <label
                    htmlFor={id}
                    className={`
            absolute left-10 transition-all duration-300 pointer-events-none
            ${(isFocused || value) ? '-top-2 text-xs text-auth-primary' : 'top-1/2 -translate-y-1/2 text-gray-400 text-base'}
          `}
                >
                    {label}
                </label>

                {type === 'password' && (
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-auth-primary transition-colors"
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                )}
            </div>

            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="absolute -bottom-5 left-0 text-auth-error text-xs flex items-center mt-1"
                    >
                        <AlertCircle size={12} className="mr-1" />
                        <span>{error}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {showStrengthMeter && type === 'password' && value.length > 0 && (
                <div className="mt-2 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div
                        className={`h-full transition-all duration-500 ${strengthColor}`}
                        style={{ width: `${(strength / 4) * 100}%` }}
                    />
                </div>
            )}
        </div>
    );
};

export default AuthInput;
