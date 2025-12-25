import React from 'react';

export default function Input({
    type = 'text',
    placeholder,
    value,
    onChange,
    className = '',
    icon: Icon,
    ...props
}) {
    return (
        <div className="relative">
            {Icon && (
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <Icon size={20} />
                </div>
            )}
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`w-full bg-gray-50 text-gray-900 px-4 py-3 rounded-lg transition-all duration-200 focus:outline-none focus:bg-white focus:ring-2 focus:ring-amber-500/50 ${Icon ? 'pl-12' : ''} ${className}`}
                {...props}
            />
        </div>
    );
}
