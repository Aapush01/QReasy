/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'rgb-1': {
          '0%, 100%': { color: 'rgb(255, 0, 0)' },   // Red
          '50%': { color: 'rgb(0, 255, 0)' },        // Green
        },
        'rgb-2': {
          '0%, 100%': { color: 'rgb(0, 255, 0)' },   // Green
          '50%': { color: 'rgb(0, 0, 255)' },        // Blue
        },
        'rgb-3': {
          '0%, 100%': { color: 'rgb(0, 0, 255)' },   // Blue
          '50%': { color: 'rgb(255, 0, 0)' },        // Red
        },
      },
      animation: {
        'rgb-1': 'rgb-1 3s ease-in-out infinite',
        'rgb-2': 'rgb-2 3s ease-in-out infinite',
        'rgb-3': 'rgb-3 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

