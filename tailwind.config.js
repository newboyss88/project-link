/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['"Inter"', 'system-ui', 'sans-serif'], // Or 'San Francisco', Inter is a great alternative
            },
            colors: {
                'bento-bg': '#f5f7fa',
                'card-white': 'rgba(255, 255, 255, 0.9)',
                'text-primary': '#1d1d1f',
                'text-secondary': '#86868b',
                // Card specifics
                'card-purple': '#f3e8ff', // Vibe Coding
                'card-pink': '#fae8ff',   // Framer
                'card-peach': '#ffedd5',  // Insan
                'card-gray': '#f3f4f6',   // Portfolio
            },
            boxShadow: {
                'bento': '0 10px 40px -10px rgba(0,0,0,0.05)',
                'bento-hover': '0 20px 40px -10px rgba(0,0,0,0.1)',
            }
        },
    },
    plugins: [],
}
