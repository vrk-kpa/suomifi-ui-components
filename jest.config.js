const { defaults: tsjPreset } = require('ts-jest/presets');
// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  testEnvironment: 'jsdom',
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  collectCoverage: true,
  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.ts',
    'src/**/*.tsx',
    '!src/**/index.tsx',
    '!src/**/index.ts',
    '!src/**/*.d.ts',
    '!src/**/*.test.ts',
    '!src/**/*.test.tsx',
    '!**/node_modules/**',
  ],
  coverageThreshold: {
    global: {
      branches: 30,
      functions: 30,
      lines: 40,
      statements: 50,
    },
  },

  transform: {
    ...tsjPreset.transform,
    '\\.(svg)$': '<rootDir>/jest/jest.transformer.js',
    '\\.(css||scss)$':
      '<rootDir>/jest/jest.transformer.js' /** hack to dismiss css imports */,
  },

  setupFilesAfterEnv: [require.resolve('./jest/jest.setup.js')],

  // Not working after jest update
  // moduleNameMapper: {
  //   '\\.(css||scss)$': 'identity-obj-proxy',
  // },
};
