const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'tw-',
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      screens: {
        'xs': '580px',
      },
      colors: {
        'hz-lightgray': '#FBF9F6',
        'hz-gray': '#9a9999',
        'hz-lightblue': '#f6f8fc',
        'hz-blue': '#143157',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
};
