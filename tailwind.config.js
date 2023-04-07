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
      ...range(12, 96).reduce((acc, px) => {
        acc[`${px}pxr`] = pxToRem(px);
        return acc;
      }, {}),
    },
    spacing: {
      ...range(0, 400).reduce((acc, px) => {
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
      display: { max: '1440px' },
      desktop: { max: '1024px' },
      tablet: { max: '768px' },
      foldable: { max: '523px' },
      mobile: { max: '360px' },
    },
    extend: {
      spacing: {
        '10vw': '10vw',
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        white: 'var(--color-white)',
        black: 'var(--color-black)',

        gray: {
          100: 'var(--color-gray-100)',
          200: 'var(--color-gray-200)',
          300: 'var(--color-gray-300)',
          400: 'var(--color-gray-400)',
          500: 'var(--color-gray-500)',
          600: 'var(--color-gray-600)',
          700: 'var(--color-gray-700)',
          800: 'var(--color-gray-800)',
          900: 'var(--color-gray-900)',
        },
        slate: {
          500: 'var(--color-slate-500)',
        },
        red: {
          500: 'var(--color-red-500)',
        },

        'tag-text': 'var(--color-tag-text)',
        'tag-background-checked': 'var(--color-tag-bg-checked)',
        'tag-text-checked': 'var(--color-tag-text-checked)',

        /* contents */
        primary: 'var(--color-primary)',
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'bg-primary': 'var(--color-bg-primary)',
        'bg-secondary': 'var(--color-bg-secondary)',
        'bg-divider': 'var(--color-bg-divider)',
        'border-primary': 'var(--color-border-primary)',
        'all-custom-gray': 'var(--color-all-custom-gray)',
        'bg-tag': 'var(--color-bg-tag)',

        /* markdown */
        'border-highlight': 'var(--color-border-highlight)',
        'gradient-cyan': 'var(--color-cyan-50)',
      },
      fontFamily: {
        'noto-sans-kr': ['Noto Sans KR', ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        'text-underline': '0 1px 0 0 currentColor',
      },
      typography: (theme) => ({
        light: {
          css: [
            {
              color: theme('colors.gray.500'),
              a: {
                color: theme('colors.team.current'),
              },
              strong: {
                color: theme('colors.black'),
              },
              hr: {
                borderColor: theme('colors.gray.200'),
              },
              code: {
                color: theme('colors.gray.800'),
              },
              'h1, h2, h3, h4, h5, h6': {
                color: theme('colors.black'),
              },
              blockquote: {
                color: theme('colors.gray.500'),
                backgroundColor: theme('colors.gray.100'),
              },
              'thead, tbody tr': {
                borderBottomColor: theme('colors.gray.200'),
              },
            },
          ],
        },
        dark: {
          css: [
            {
              color: theme('colors.slate.500'),
              a: {
                color: theme('colors.team.current'),
              },
              strong: {
                color: theme('colors.white'),
              },
              hr: {
                borderColor: theme('colors.gray.600'),
              },
              code: {
                color: theme('colors.gray.100'),
              },
              'h1, h2, h3, h4, h5, h6': {
                color: theme('colors.white'),
              },
              blockquote: {
                color: theme('colors.slate.500'),
                backgroundColor: theme('colors.gray.800'),
              },
              'thead, tbody tr': {
                borderBottomColor: theme('colors.gray.600'),
              },
            },
          ],
        },
      }),
    },
  },
  plugins: [
    require('./src/plugins/scrollbar-hide'),
    require('./src/plugins/visually-hide'),
    require('./src/plugins/drag-none'),
    require('@tailwindcss/typography'),
  ],
};
