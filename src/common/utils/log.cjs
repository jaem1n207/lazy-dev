const { Signale } = require("signale");

const types = {
  await: {
    badge: "⏳",
    color: "yellow",
    label: "await",
  },
  complete: {
    badge: "✅",
    color: "green",
    label: "complete",
  },
  error: {
    badge: "❌",
    label: "error",
  },
  info: {
    badge: "ℹ️ ",
    label: "info",
  },
  rocket: {
    badge: "🚀",
    color: "green",
    label: "publish",
    logLevel: "info",
  },
  path: {
    badge: "📁",
    color: "magentaBright",
    label: "path",
    logLevel: "info",
  },
  contents: {
    badge: "📝",
    label: "contents",
    color: "cyanBright",
  },
  santa: {
    badge: "🎅",
    color: "green",
    label: "Happy Blogging! 🎅",
    logLevel: "info",
  },
};

const makeCustomSignale = () => {
  const options = {
    interactive: false,
    types,
  };

  return new Signale(options);
};

const makeInteractiveSignale = () => {
  const options = {
    interactive: true,
    types,
  };

  return new Signale(options);
};

module.exports = {
  makeCustomSignale,
  makeInteractiveSignale,
};
