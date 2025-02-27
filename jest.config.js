module.exports = {
  preset: 'ts-jest',  // Ensure ts-jest is set as the preset
  testEnvironment: 'node', // or 'jsdom' if you are testing a frontend app
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // Use ts-jest to process TypeScript files
  },
  testMatch: ['**/?(*.)+(spec|test).ts?(x)'], // Match test files
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'node'],
};
