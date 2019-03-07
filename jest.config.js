const { defaults: tsjPreset } = require('ts-jest/presets');
// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
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
    '\\.(svg)$': '<rootDir>/jest.transformer.js',
  },

  testMatch: tsjPreset.testMatch,
  moduleFileExtensions: tsjPreset.moduleFileExtensions,

  setupTestFrameworkScriptFile: require.resolve('./jest.setup.js'),

  snapshotSerializers: ['jest-emotion'],
  moduleNameMapper: {
    '\\.css$': '<rootDir>/jest.styleMock.js',
  },
};
