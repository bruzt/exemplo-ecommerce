module.exports = {
    testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
    bail: 1,
    clearMocks: true,
    collectCoverage: true,
    collectCoverageFrom: ['src/components/**/*.test.tsx', 'src/pages/**/*.test.tsx'],
    coverageReporters: ['lcov', 'text'],
    verbose: true,
    moduleNameMapper: {
        "\\.(css|less)$": "identity-obj-proxy"
    },
    testEnvironment: 'jsdom'
};