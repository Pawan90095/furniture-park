import React from 'react';

export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    disabled = false,
    type = 'button',
    onClick,
    ...props
}) {
    const baseStyles = "font-bold uppercase tracking-wider transition-all duration-200 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-900 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 active:scale-95";

    const variants = {
        primary: "bg-stone-900 text-white hover:opacity-90",
        secondary: "border-2 border-stone-900 text-stone-900 bg-transparent hover:bg-stone-900 hover:text-white",
        outline: "border-2 border-gray-300 text-gray-700 bg-transparent hover:border-stone-900 hover:text-stone-900",
        ghost: "text-stone-900 bg-transparent hover:bg-gray-100"
    };

    const sizes = {
        sm: "px-4 py-2 text-xs",
        md: "px-6 py-3 text-sm",
        lg: "px-8 py-4 text-base"
    };

    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
