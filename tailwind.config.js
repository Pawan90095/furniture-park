/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#111111", // Soft Black
                secondary: "#6B7280", // Muted Gray
                accent: "#556B2F", // Muted Olive (from previous updates)
                background: "#FFFFFF",
                surface: "#F9F8F6", // Warm Light Gray (Scandi)
                border: "#E5E7EB",

                // Specific semantic colors
                taupe: "#D2B48C",
                charcoal: "#2C2C2C",

                // Auth backward compatibility
                'auth-primary': "#111111",
                'auth-bg': "#FFFFFF",
                'auth-text': "#111111",
                'auth-success': "#10B981",
                'auth-error': "#EF4444",
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Playfair Display', 'serif'], // The Missing Piece
                body: ['Inter', 'sans-serif'],
                // specific aliases if needed
                'auth-heading': ['Playfair Display', 'serif'],
                'auth-body': ['Inter', 'sans-serif'],
            },
            borderRadius: {
                'none': '0',
                'sm': '0.125rem',
                'DEFAULT': '0.25rem',
                'md': '0.375rem',
                'lg': '0.5rem',
                'xl': '0.75rem',
                '2xl': '1rem',
                '3xl': '1.5rem',
            },
            boxShadow: {
                'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
                'card': '0 10px 15px -3px rgba(0, 0, 0, 0.05)',
            }
        },
    },
    plugins: [],
}
