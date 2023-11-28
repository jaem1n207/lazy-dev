module.exports = {
  globals: {
    __PATH_PREFIX__: '',
  },
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss)$': `identity-obj-proxy`,
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': `<rootDir>/__mocks__/file-mock.js`,
    '^Components(.*)$': '<rootDir>/src/components$1',
    '^Hooks(.*)$': '<rootDir>/src/hooks$1',
    '^Images(.*)$': '<rootDir>/src/images$1',
    '^Pages(.*)$': '<rootDir>/src/pages$1',
    '^Styles(.*)$': '<rootDir>/src/styles$1',
    '^Layout(.*)$': '<rootDir>/src/layout$1',
    '^Templates(.*)$': '<rootDir>/src/templates$1',
    '^Types(.*)$': '<rootDir>/src/types$1',
    '^Apps(.*)$': '<rootDir>/src/apps$1',
    '^Utils(.*)$': '<rootDir>/src/utils$1',
  },
  setupFiles: ['<rootDir>/loadershim.js'],
  testEnvironment: `jsdom`,
  setupFilesAfterEnv: ['<rootDir>/setup-test-env.js'],
  testMatch: ['<rootDir>/src/**/__tests__/**/?(*.)+(test).[jt]s?(x)'],
  testPathIgnorePatterns: [`node_modules`, `\\.cache`, `<rootDir>.*/public`],
  transformIgnorePatterns: [
    `node_modules/(?!(gatsby|gatsby-script|gatsby-link|escape-string-regexp)/)`,
  ],
  transform: {
    '^.+\\.[jt]sx?$': '<rootDir>/jest-preprocess.js',
  },
};
