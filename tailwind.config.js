/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        lato: ['Lato', 'sans-serif'],
      },
      colors: {
        'threads-bg': '#16161A',
        'threads-purple': '#7F5AF0',
        'threads-white': '#FFFFFE',
        'threads-gray': '#94A1B2',
        'threads-dark': '#242629',
      },
    },
  },
  plugins: [],
};
