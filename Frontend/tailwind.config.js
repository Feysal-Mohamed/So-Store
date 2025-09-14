/** @type {import('tailwindcss').Config} */
export default {
   content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
   extend: {
  keyframes: {
    fadeInLeft: {
      '0%': { opacity: '0', transform: 'translateX(-50px)' },
      '100%': { opacity: '1', transform: 'translateX(0)' },
    },
    fadeInRight: {
      '0%': { opacity: '0', transform: 'translateX(50px)' },
      '100%': { opacity: '1', transform: 'translateX(0)' },
    },
    fadeInUp: {
      '0%': { opacity: '0', transform: 'translateY(50px)' },
      '100%': { opacity: '1', transform: 'translateY(0)' },
    },
  },
  animation: {
    fadeInLeft: 'fadeInLeft 1s ease-out',
    fadeInRight: 'fadeInRight 1s ease-out',
    fadeInUp: 'fadeInUp 1s ease-out',
  },
}

  },
  plugins: [],
}

