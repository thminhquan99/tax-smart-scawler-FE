/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                display: ['"Playfair Display"', 'serif'],
                body: ['"Merriweather"', 'serif'],
                ui: ['"Inter"', 'sans-serif'],
            },
            colors: {
                parchment: {
                    light: '#f5e6c8',
                    DEFAULT: '#ecdbb6',
                    dark: '#dcc89b',
                    deep: '#d4b896',
                },
                wood: {
                    light: '#a0764a',
                    DEFAULT: '#7a5230',
                    dark: '#5c3d2e',
                    deep: '#3e2a1e',
                },
                gold: {
                    light: '#e8c87a',
                    DEFAULT: '#c8a96e',
                    dark: '#a88a4e',
                },
            }
        },
    },
    plugins: [],
}
