import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const AuthCheckbox = ({ id, label, checked, onChange }) => {
    return (
        <div className="flex items-center cursor-pointer group" onClick={() => onChange(!checked)}>
            <div className="relative w-5 h-5 mr-3 flex-shrink-0">
                <motion.div
                    className={`w-full h-full border-2 rounded transition-colors duration-200 ${checked ? 'bg-auth-accent border-auth-accent' : 'border-gray-300 group-hover:border-auth-accent'}`}
                    whileTap={{ scale: 0.9 }}
                />
                {checked && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute inset-0 flex items-center justify-center text-white"
                    >
                        <Check size={14} strokeWidth={3} />
                    </motion.div>
                )}
            </div>
            <label htmlFor={id} className="text-sm text-gray-600 font-auth-body cursor-pointer select-none">
                {label}
            </label>
        </div>
    );
};

export default AuthCheckbox;
