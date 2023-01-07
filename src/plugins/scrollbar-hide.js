const plugin = require('tailwindcss/plugin');

const scrollbarHide = plugin(({ addUtilities }) => {
  addUtilities({
    '.scrollbar-hide': {
      '-ms-overflow-style': 'none',
      scrollbarWidth: 'none',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
  });
});

module.exports = scrollbarHide;
