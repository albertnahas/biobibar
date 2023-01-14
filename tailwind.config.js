/** @type {import('tailwindcss').Config} */
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
    },
    fontFamily: {
      'sans': ['Rollgates Luxury', 'sans-serif'],
    },
    scale: {
      '-100': '-1',
    }
  },
  plugins: [],
}
