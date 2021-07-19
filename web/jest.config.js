module.exports = {
    testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
    bail: 6,
    testTimeout: 10000,
    clearMocks: true,
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.test.tsx'],
    coverageReporters: ['lcov', 'text'],
    verbose: true,
    moduleNameMapper: {
        "\\.(css|less)$": "identity-obj-proxy"
    },
    testEnvironment: 'jsdom',
};