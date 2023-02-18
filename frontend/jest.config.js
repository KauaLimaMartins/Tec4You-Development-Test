module.exports = {
  testPathIgnorePatterns: ["/node_modules", ".next/", "node_modules/(?!@ngrx|(?!deck.gl)|ng-dynamic)"],
  setupFilesAfterEnv: ["<rootDir>/tests/setupTests.ts"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
  },
  testEnvironment: "jsdom",
};
