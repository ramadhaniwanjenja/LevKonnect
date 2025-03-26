/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
    container: {
      center: true, // Centers all .container elements
      padding: "1rem", // Adds padding to prevent overflow
    },
  },
  plugins: [],
};

export const theme = {
  extend: {
    animation: {
      'fade-in': 'fadeIn 1s ease-in-out',
      'fade-in-up': 'fadeInUp 1s ease-in-out',
      'fade-in-down': 'fadeInDown 1s ease-in-out',
      'bounce-slow': 'bounce 3s infinite',
    },
    keyframes: {
      fadeIn: {
        '0%': { opacity: '0' },
        '100%': { opacity: '1' },
      },
      fadeInUp: {
        '0%': { opacity: '0', transform: 'translateY(20px)' },
        '100%': { opacity: '1', transform: 'translateY(0)' },
      },
      fadeInDown: {
        '0%': { opacity: '0', transform: 'translateY(-20px)' },
        '100%': { opacity: '1', transform: 'translateY(0)' },
      },
    },
  },
};