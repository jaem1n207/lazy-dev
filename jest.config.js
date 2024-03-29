module.exports = {
  globals: {
    __PATH_PREFIX__: "",
  },
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss)$": "identity-obj-proxy",
    ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/file-mock.js",
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  setupFiles: ["<rootDir>/loadershim.js"],
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/setup-test-env.js"],
  testMatch: ["<rootDir>/src/**/__tests__/**/?(*.)+(test).[jt]s?(x)"],
  testPathIgnorePatterns: ["node_modules", "\\.cache", "<rootDir>.*/public"],
  transformIgnorePatterns: [
    "node_modules/(?!(gatsby|gatsby-script|gatsby-link|escape-string-regexp)/)",
  ],
  transform: {
    "^.+\\.[jt]sx?$": "<rootDir>/jest-preprocess.js",
  },
};
