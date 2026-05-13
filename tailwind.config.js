/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      colors: {
        navy: {
          950: '#020818',
          900: '#050f2a',
          800: '#091432',
          700: '#0d1e47',
        },
        cyan: {
          glow: '#00f5ff',
        },
        purple: {
          glow: '#a855f7',
        },
      },
      animation: {
        'gradient-x': 'gradient-x 8s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'glitch': 'glitch 2s steps(2, end) infinite',
        'scanline': 'scanline 8s linear infinite',
        'bounce-slow': 'bounce 3s infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glitch: {
          '0%': { 'clip-path': 'inset(40% 0 61% 0)', transform: 'translate(-2px, 2px)' },
          '20%': { 'clip-path': 'inset(92% 0 1% 0)', transform: 'translate(1px, -1px)' },
          '40%': { 'clip-path': 'inset(43% 0 1% 0)', transform: 'translate(2px, 3px)' },
          '60%': { 'clip-path': 'inset(25% 0 58% 0)', transform: 'translate(-2px, 0px)' },
          '80%': { 'clip-path': 'inset(54% 0 7% 0)', transform: 'translate(3px, 2px)' },
          '100%': { 'clip-path': 'inset(58% 0 43% 0)', transform: 'translate(-3px, -1px)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
