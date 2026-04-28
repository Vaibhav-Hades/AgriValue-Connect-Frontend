/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: { 50: '#f0fdf4', 100: '#dcfce7', 200: '#bbf7d0', 300: '#86efac', 400: '#4ade80', 500: '#22c55e', 600: '#16a34a', 700: '#15803d', 800: '#166534', 900: '#14532d' },
        earth: { 50: '#fdf8f0', 100: '#faefd8', 200: '#f4dba8', 300: '#ecc06e', 400: '#e2a03a', 500: '#d4851e', 600: '#b86a14', 700: '#964f12', 800: '#7a3f15', 900: '#643514' },
        cream: { 50: '#fefdf8', 100: '#fdf9ed', 200: '#faf0d0', 300: '#f5e3a3', 400: '#edd070', 500: '#e3bb45', 600: '#cfa030', 700: '#ac8025', 800: '#8a6422', 900: '#714f1f' },
      },
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
      animation: { 'fade-in': 'fadeIn 0.5s ease-in-out', 'slide-up': 'slideUp 0.4s ease-out' },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { transform: 'translateY(20px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
      },
    },
  },
  plugins: [],
}
