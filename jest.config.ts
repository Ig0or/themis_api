module.exports = {
  setupFiles: ["<rootDir>/test/setupEnv.ts"],
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/test"],
  moduleNameMapper: {
    "^@domain(.*)$": "<rootDir>/src/domain/$1",
    "^@infrastructure(.*)$": "<rootDir>/src/infrastructure/$1",
    "^@services(.*)$": "<rootDir>/src/services/$1",
    "^@repositories(.*)$": "<rootDir>/src/repositories/$1",
    "^@root(.*)$": "<rootDir>/$1",
  },
  collectCoverageFrom: [
    "src/**/*.ts",
    "!**/src/infrastructure/DI/**",
    "!**/src/repositories/**",
  ],
};
