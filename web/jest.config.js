module.exports = {
    testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
    bail: 6,
    testTimeout: 10000,
    clearMocks: true,
    collectCoverage: true,
    watchAll: false,
    testRegex: "\\.test\\.(ts|tsx)",
    collectCoverageFrom: ["src/**/*", "!src/@types/**/*", "!src/styles/**/*", "!**/*.d.ts"],
    coverageReporters: ['lcov', 'text'],
    coverageDirectory: "./coverage",
    verbose: true,
    moduleNameMapper: {
        "\\.(css|less)$": "identity-obj-proxy"
    },
    testEnvironment: 'jsdom',
};