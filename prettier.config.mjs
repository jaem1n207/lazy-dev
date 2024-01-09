/** @type {import("prettier").Config} */
const config = {
  arrowParens: "always",
  bracketSameLine: false,
  bracketSpacing: true,
  semi: true,
  singleQuote: false,
  jsxSingleQuote: false,
  quoteProps: "as-needed",
  trailingComma: "all",
  singleAttributePerLine: false,
  htmlWhitespaceSensitivity: "css",
  vueIndentScriptAndStyle: false,
  insertPragma: false,
  printWidth: 100,
  requirePragma: false,
  tabWidth: 2,
  useTabs: false,
  proseWrap: "never",
  embeddedLanguageFormatting: "auto",
  importOrder: ["^(react|react-dom)$", "^([a-z]|@[a-z])", "", "@/[a-z]", "", ".*"],
  plugins: ["@ianvs/prettier-plugin-sort-imports", "prettier-plugin-tailwindcss"],
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrderTypeScriptVersion: "5.2.2",
};

export default config;
