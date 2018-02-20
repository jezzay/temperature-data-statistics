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
    mapCoverage: true,
    testEnvironment: 'node'
};