const plugin = require("tailwindcss/plugin");

const dragNone = plugin(({ addUtilities }) => {
  addUtilities({
    ".drag-none": {
      "-webkit-user-drag": "none",
      "-khtml-user-drag": "none",
      "-moz-user-drag": "none",
      "-o-user-drag": "none",
      "user-drag": "none",
    },
  });
});

module.exports = dragNone;
