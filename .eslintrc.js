'use strict';

const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks',
    'jsx-a11y',
    'import',
    'unused-imports',
    'eslint-plugin-import',
    'prettier',
  ],
  globals: {
    graphql: true,
    Queries: true,
    __PATH_PREFIX__: true,
    __dirname: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['node_modules', '**/build/*', 'public', '.eslintrc.js', '*.js'],
  parser: '@typescript-eslint/parser',
  rules: {
    'no-console': OFF,
    'react-hooks/rules-of-hooks': ERROR,
    'react-hooks/exhaustive-deps': ERROR,
    'prettier/prettier': ERROR,
    'import/order': [
      ERROR,
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'Components',
            group: 'external',
            position: 'after',
          },
          {
            pattern: 'Hooks',
            group: 'external',
            position: 'after',
          },
          {
            pattern: 'Images',
            group: 'external',
            position: 'after',
          },
          {
            pattern: 'Pages',
            group: 'external',
            position: 'after',
          },
          {
            pattern: 'Styles',
            group: 'external',
            position: 'after',
          },
          {
            pattern: 'Layout',
            group: 'external',
            position: 'after',
          },
          {
            pattern: 'Types',
            group: 'external',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        'newlines-between': 'always',
      },
    ],
    'no-unused-vars': OFF,
    'unused-imports/no-unused-imports': ERROR,
    'unused-imports/no-unused-vars': [
      WARN,
      { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
    ],
    'react/no-unknown-property': [ERROR, { ignore: ['css'] }],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      alias: {
        map: [
          ['Components', './src/components'],
          ['Hooks', './src/hooks'],
          ['Images', './src/images'],
          ['Pages', './src/pages'],
          ['Styles', './src/styles'],
          ['Layout', './src/layout'],
          ['Templates', './src/templates'],
          ['Types', './src/types'],
        ],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      },
    },
  },
};
