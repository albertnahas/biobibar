/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      primary: '#de9f26',
      'primary-light': '#e3bf22',
      secondary: '#193f1f',
      'secondary-dark': '#283318',
      'text': '#231f20',
      'white': '#fff',
      transparent: 'transparent',
      red: colors.red,
      gray: colors.gray,
      indigo: colors.indigo,
    },
    fontFamily: {
      'sans': ['Rollgates Luxury', 'sans-serif'],
    },
    scale: {
      '-100': '-1',
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
