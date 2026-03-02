/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                mono: ['"JetBrains Mono"', 'monospace'],
            },
            colors: {
                // We'll rely mostly on default Tailwind greens (green-300, 400, 500)
            },
            dropShadow: {
                'glow': '0 0 20px rgba(74, 222, 128, 0.6)',
            }
        },
    },
    plugins: [],
}
