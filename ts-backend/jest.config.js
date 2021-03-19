
module.exports = {
    "transform": {
        "^.+\\.ts$": "ts-jest"
      },
      "testRegex": "\\.test\\.ts",
      "moduleFileExtensions": [
        "ts",
        "js",
        "json",
        "node"
      ],
      "collectCoverageFrom": ["src/**/*", "!src/@types/*", "!src/server.ts", "!src/databases/typeorm/migrations/*"],
      "modulePathIgnorePatterns": ["build"],
      "verbose": true,
      "maxWorkers": 1,
      "testTimeout": 10000,
      "collectCoverage": true,
      "coverageDirectory": "./coverage"
}
