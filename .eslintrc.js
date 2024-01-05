// biome-ignore lint/suspicious/noRedundantUseStrict: <explanation>
"use strict";

const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  plugins: [
    "@typescript-eslint",
    "react",
    "react-hooks",
    "jsx-a11y",
    "import",
    "unused-imports",
    "eslint-plugin-import",
    "prettier",
  ],
  globals: {
    graphql: true,
    Queries: true,
    /* ESLint에게 `Theme`가 전역 유형이며 정의되지 않은 것으로 간주되어서는 안된다는 것을 알리도록 함 */
    Theme: "readonly",
  },
  extends: [
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:prettier/recommended",
  ],
  ignorePatterns: ["node_modules", "**/build/*", "public", ".eslintrc.js", "*.js"],
  parser: "@typescript-eslint/parser",
  rules: {
    "react/jsx-uses-react": OFF,
    "react/react-in-jsx-scope": OFF,
    "no-console": OFF,
    "react-hooks/rules-of-hooks": ERROR,
    "react-hooks/exhaustive-deps": ERROR,
    "prettier/prettier": OFF,
    "import/order": 0,
    "no-unused-vars": OFF,
    "unused-imports/no-unused-imports": ERROR,
    "unused-imports/no-unused-vars": [
      WARN,
      { vars: "all", varsIgnorePattern: "^_", args: "after-used", argsIgnorePattern: "^_" },
    ],
    "jsx-a11y/no-autofocus": [
      2,
      {
        ignoreNonDOM: true,
      },
    ],
  },
  settings: {
    react: {
      // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/README.md#configuration-legacy-eslintrc
      version: "detect",
    },
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
      alias: {
        map: [
          ["@", "./src"],
          ["@/assets", "./src/assets"],
          ["@/common", "./src/common"],
          ["@/features", "./src/features"],
        ],
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
      },
    },
  },
  overrides: [
    {
      files: ["*.ts"],
      rules: {
        "no-undef": "off",
      },
    },
    {
      files: ["*.ts", "*.tsx"],
      processor: "@graphql-eslint/graphql",
    },
    {
      files: ["*.graphql"],
      parser: "@graphql-eslint/eslint-plugin",
      plugins: ["@graphql-eslint"],
      rules: {
        "@graphql-eslint/known-type-names": OFF,
      },
    },
  ],
};
