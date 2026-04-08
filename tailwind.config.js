/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#000000',
        secondary: '#6B7280',
        accent: '#FF6B6B',
        'accent-dark': '#E85555',
        'accent-light': '#FF8A8A',
        background: '#FFFFFF',
        'background-alt': '#F8F8F8',
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};