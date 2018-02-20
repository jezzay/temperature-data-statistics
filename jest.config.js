module.exports = {
    moduleFileExtensions: [
        'ts',
        'js'
    ],
    transform: {
        '^.+\\.ts$': 'ts-jest'
    },
    testMatch: [
        '**/src/**/*.spec.ts'
    ],
    coveragePathIgnorePatterns: ['/node_modules/','index.ts'],
    mapCoverage: true,
    testEnvironment: 'node'
};