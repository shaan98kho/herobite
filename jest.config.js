const nextJest = require('next/jest');

const createJestConfig = nextJest({

  dir: './',
});


const customJestConfig = {
  
  testEnvironment: 'jest-environment-jsdom',
  
  moduleNameMapper: {
    '^.+\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '^.+\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};


module.exports = createJestConfig(customJestConfig);
