const plugin = require("tailwindcss/plugin");

// 내용을 스크린 리더에만 표시하고 시각적으로는 표시하지 않습니다.
const visuallyHide = plugin(({ addUtilities }) => {
  addUtilities({
    ".visually-hide": {
      position: "absolute",
      width: "1px",
      height: "1px",
      padding: "0",
      margin: "-1px",
      overflow: "hidden",
      clip: "rect(0, 0, 0, 0)",
      whiteSpace: "nowrap",
      border: "0",
    },
  });
});

module.exports = visuallyHide;
