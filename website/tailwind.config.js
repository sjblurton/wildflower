/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,js,ts,jsx,tsx,css,md}', './public/**/*.html'],
  safelist: [],
  theme: {
    extend: {},
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      'lofi',
      'black',
      'dracula',
      'pastel',
      'night',
      'winter',
      'valentine',
      'garden',
      'retro',
      'cupcake',
    ],
  },
};
