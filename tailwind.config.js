const defaultTheme = require('tailwindcss/defaultTheme');

const pxToRem = (px) => `${px / 16}rem`;

const range = (start, end) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => start + i);
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  future: {
    // https://github.com/tailwindlabs/tailwindcss/pull/8394
    hoverOnlyWhenSupported: true,
  },
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,jsx,ts,tsx}',
    './src/layout/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    data: {
      active: 'ui~="active"',
    },
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
    borderWidth: {
      ...range(0, 10).reduce((acc, px) => {
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
        secondary: 'var(--color-secondary)',
        text: 'var(--color-text)',
        'custom-gray': 'var(--text-custom-gray)',
        hyperlink: 'var(--color-hyperlink)',
        'article-background': 'var(--article-background)',
        'article-border': 'var(--article-border)',
        'code-block': 'var(--color-code-block)',
        'button-text': 'var(--button-text)',
        divider: 'var(--color-divider)',
      },
      fontFamily: {
        spoqa: ['Spoqa Han Sans Neo', ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        'text-underline': '0 1px 0 0 currentColor',
      },
    },
  },
  plugins: [require('./src/plugins/scrollbar-hide'), require('./src/plugins/visually-hide')],
};
