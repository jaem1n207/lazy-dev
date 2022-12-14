const defaultTheme = require('tailwindcss/defaultTheme');

const pxToRem = (px) => `${px / 16}rem`;

const range = (start, end) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => start + i);
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
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
      desktop: { max: '1024px' },
      tablet: { max: '768px' },
      foldable: { max: '523px' },
      mobile: { max: '360px' },
    },
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        background: 'var(--color-background)',
        text: 'var(--color-text)',
        hyperlink: 'var(--color-hyperlink)',
      },
      fontFamily: {
        spoqa: ['Spoqa Han Sans Neo', ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        'text-underline': '0 1px 0 0 currentColor',
      },
    },
  },
  plugins: [],
};
