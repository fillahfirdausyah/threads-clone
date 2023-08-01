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
        'threads-purple': {
          50: '#f4f3ff',
          100: '#eceafd',
          200: '#dcd7fd',
          300: '#c1b7fb',
          400: '#a38ff6',
          500: '#7f5af0',
          600: '#7440e7',
          700: '#642ed3',
          800: '#5426b1',
          900: '#462191',
          950: '#2a1362',
        },

        'threads-white': '#FFFFFE',
        'threads-gray': '#94A1B2',
        'threads-dark': '#242629',
      },
      outlineWidth: {
        0.5: '0.5px',
      },
    },
  },
  plugins: [],
};
