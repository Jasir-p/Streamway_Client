/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
      extend: {
        colors: {
          primary: {
            50: '#eef4ff',
            100: '#e0eaff',
            200: '#c7d7fe',
            300: '#a4bcfd',
            400: '#8098fb',
            500: '#1a56ff', // Main blue color
            600: '#0037d6',
            700: '#0029b3',
            800: '#002192',
            900: '#001c7a',
          },
          secondary: {
            50: '#f4f7ff',
            100: '#e9efff',
            200: '#d4deff',
            300: '#b3c5ff',
            400: '#809cff',
            500: '#4d73ff',
            600: '#1a4bff',
            700: '#0033e6',
            800: '#002bb3',
            900: '#002299',
          },
          'custom-light-blue': '#F1F8FF',
        },
        boxShadow: {
          'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        }
      },
    },
    plugins: [],
  };