const defaultTheme = require('tailwindcss/defaultTheme');

const pxToRem = (px) => `${px / 16}rem`;

const range = (start, end) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => start + i);
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,jsx,ts,tsx}',
    './src/layout/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    fontSize: {
      ...range(12, 48).reduce((acc, px) => {
        acc[`${px}pxr`] = pxToRem(px);
        return acc;
      }, {}),
    },
    spacing: {
      ...range(0, 100).reduce((acc, px) => {
        acc[`${px}pxr`] = pxToRem(px);
        return acc;
      }, {}),
    },
    screens: {
      mobile: '360px',
      foldable: '523px',
      tablet: '768px',
    },
    extend: {
      colors: {
        primary: '#ffa7c4',
        dark: '#282c35',
        white: '#fff',
      },
      fontFamily: {
        sans: ['Spoqa Han Sans Neo', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
