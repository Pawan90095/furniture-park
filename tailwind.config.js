/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#2c2c2c", // Dark Charcoal
                secondary: "#A05A2C", // Burnt Sienna
                accent: "#0058A3",
                background: "#F9F8F6", // Alabaster
                surface: "#FFFFFF",
                taupe: "#5a5a5a", // Body text
            },
            fontFamily: {
                display: ['Tenor Sans', 'sans-serif'],
                body: ['Work Sans', 'sans-serif'],
                sans: ['Work Sans', 'sans-serif']
            },
            boxShadow: {
                'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
                'luxury': '0 20px 40px -4px rgba(0, 0, 0, 0.1)',
            }
        },
    },
    plugins: [],
}
