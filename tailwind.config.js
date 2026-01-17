/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#111111", // Main Text (Soft Black)
                secondary: "#6B7280", // Muted Text (Gray)
                accent: "#000000", // Strong Accent (Pure Black)
                background: "#FFFFFF", // White
                surface: "#F9FAFB", // Light Gray Surface
                border: "#E5E7EB", // Light Border

                // Keep auth colors but map them to the new neutral system where possible
                'auth-primary': "#111111",
                'auth-bg': "#FFFFFF",
                'auth-text': "#111111",
                'auth-accent': "#000000",
                'auth-error': "#EF4444",
                'auth-success': "#10B981",
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Inter', 'sans-serif'],
                body: ['Inter', 'sans-serif'],
            },
            borderRadius: {
                // Defaulting to sharp/minimal
                'none': '0',
                'sm': '0.125rem',
                'DEFAULT': '0.25rem',
                'md': '0.375rem',
                'lg': '0.5rem',
            }
        },
    },
    plugins: [],
}
