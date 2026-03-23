/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./assets/js/**/*.js"],
  theme: {
    extend: {
      colors: {
        cream: '#f5f0e8',
        'cream-dark': '#ede5d5',
        'brown-light': '#c8a97e',
        'brown-medium': '#a0785a',
        'brown-dark': '#6b4c3b',
        terracotta: '#c4614a',
        'terracotta-light': '#d4846f',
        'green-leaf': '#7a9e7e',
        'green-dark': '#4d7a52',
      },
      fontFamily: {
        script: ['"Great Vibes"', '"Dancing Script"', 'cursive'],
        display: ['"Playfair Display"', 'serif'],
        sans: ['Lato', '"Open Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
