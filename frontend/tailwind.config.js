/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        glassWhite: 'rgba(255, 255, 255, 0.2)',
        darkBg: '#121212',
        darkText: '#ffffff',
        lightText: '#000000',
      },
      fontFamily: {
        'brave': ['Brave New', 'sans-serif'], // Contoh font
      },
    },
  },
  plugins: [],
}