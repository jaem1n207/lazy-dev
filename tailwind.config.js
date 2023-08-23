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
    './gatsby-ssr.tsx',
    './src/pages/**/*.{js,jsx,ts,tsx}',
    './src/layout/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
    './src/apps/**/*.{js,jsx,ts,tsx}',
    './src/templates/**/*.{js,jsx,ts,tsx}',
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
      gridTemplateColumns: {
        'main-three-large': '15fr 60fr 25fr',
        'main-three-small': '2fr 5fr 3fr',
        'main-two': '66fr 34fr',
      },
      spacing: {
        '10vw': '10vw',
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        white: 'var(--color-white)',
        black: 'var(--color-black)',

        blue: {
          300: 'var(--color-blue-300)',
          500: 'var(--color-blue-500)',
        },
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
        zinc: {
          900: 'var(--color-zinc-900)',
        },
        slate: {
          200: 'var(--color-slate-200)',
          500: 'var(--color-slate-500)',
          700: 'var(--color-slate-700)',
        },
        neutral: {
          300: 'var(--color-neutral-300)',
        },
        red: {
          500: 'var(--color-red-500)',
        },
        cyan: {
          50: 'var(--color-cyan-50)',
        },

        /* contents */
        primary: 'var(--color-primary)',
        violet: 'var(--color-violet)',
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'text-inner': 'var(--color-text-inner)',
        'bg-primary': 'var(--color-bg-primary)',
        'bg-secondary': 'var(--color-bg-secondary)',
        'bg-inner': 'var(--color-bg-inner)',
        'bg-divider': 'var(--color-bg-divider)',
        'border-primary': 'var(--color-border-primary)',
        'border-secondary': 'var(--color-border-secondary)',
        'all-custom-gray': 'var(--color-all-custom-gray)',
        'bg-tag': 'var(--color-bg-tag)',

        /* markdown */
        'paragraph-text': 'var(--color-paragraph-text)',
        'border-highlight': 'var(--color-border-highlight)',
        'gradient-cyan': 'var(--color-cyan-50)',
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
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography'),
  ],
};
