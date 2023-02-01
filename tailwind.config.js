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
      'secondary-dark2': '#234220',
      'text': '#231f20',
      'white': '#fff',
      transparent: 'transparent',
      red: colors.red,
      gray: colors.gray,
      indigo: colors.indigo,
    },
    fontFamily: {
      'sans': ['Rollgates Luxury', 'sans-serif'],
      'arabic': ['ARBFONTS BEDAYAH', 'sans-serif'],
    },
    scale: {
      '-100': '-1',
    },
    // that is animation class
    animation: {
      delayedFade: 'fadeOut 200ms ease-in-out 3.3s forwards',
    },

    // that is actual animation
    keyframes: theme => ({
      fadeOut: {
        '0%': { opacity: 1 },
        '100%': { opacity: 0 },
      },
    }),
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
