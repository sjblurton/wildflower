/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,js,ts,jsx,tsx,css,md}', './public/**/*.html'],
  safelist: [
    'bg-base-200/10',
    'bg-base-200/20',
    'bg-base-200/30',
    'bg-base-200/40',
    'bg-base-200/50',
    'bg-base-200/60',
    'bg-base-200/70',
    'bg-base-200/80',
  ],
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
