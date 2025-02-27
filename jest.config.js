module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // Process TypeScript files
  },
  testPathIgnorePatterns: ['/node_modules/', '/.next/'], // Ignore these folders
  moduleFileExtensions: ['js', 'ts', 'tsx', 'json', 'node'], // Add TypeScript support
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'], // Setup Jest DOM for assertions
  testMatch: ['**/?(*.)+(spec|test).ts?(x)'], // Look for test files with .test.tsx or .spec.tsx
};
