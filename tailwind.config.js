/* eslint-disable global-require */
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx}',
        './src/pages/**/*.{js,ts,jsx,tsx}',
        './src/components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Kanit', 'serif'],
            },
            colors: {
                primary: '#8b5cf6',
                neutral: '#1e1e1e',
                light: '#444444',
            },
        },
    },
    plugins: [require('@tailwindcss/typography')],
};
