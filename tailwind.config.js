/* eslint-disable global-require */
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx}',
        './src/pages/**/*.{js,ts,jsx,tsx}',
        './src/components/**/*.{js,ts,jsx,tsx}',
        './src/assets/**/*.{js,ts,jsx,tsx}',
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
            keyframes: {
                wiggle: {
                    '0%, 100%': { transform: 'rotate(-5deg)' },
                    '50%': { transform: 'rotate(5deg)' },
                },
                stutteredSpin: {
                    '0%': { transform: 'rotate(0deg)' },
                    '50%': { transform: 'rotate(270deg)' },
                    '55%': { borderRadius: '100%', backgroundColor: '#8b5cf6' },
                    '100%': { transform: 'rotate(360deg)', borderRadius: '0%' },
                },
            },
            animation: {
                wiggle: 'wiggle 1s ease-in-out infinite',
                'stuttered-spin': 'stutteredSpin 2s ease-in-out infinite',
            },
        },
    },
    plugins: [require('@tailwindcss/typography')],
};
