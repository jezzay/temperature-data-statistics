import {calculateTemperatureStatistics, groupReadingById, sortReadings} from "./temperature";

describe('temperature', () => {
    describe('.sortReadings()', () => {
        it('should sort readings based on temperature', () => {
            const temp1 = {
                "id": "a",
                "timestamp": 1509493641,
                "temperature": 4.53
            };
            const temp2 = {
                "id": "a",
                "timestamp": 1509493642,
                "temperature": 3.53
            };

            const result = sortReadings([temp1, temp2]);
            expect(result).toEqual([temp2, temp1])
        });

        it('should group equal readings together based on temperature', () => {
            const temp1 = {
                "id": "a",
                "timestamp": 1509493641,
                "temperature": 3.53
            };
            const temp2 = {
                "id": "a",
                "timestamp": 1509493642,
                "temperature": 2.16
            };
            const temp3 = {
                "id": "a",
                "timestamp": 1509493642,
                "temperature": 3.53
            };
            const temp4 = {
                "id": "a",
                "timestamp": 1509493642,
                "temperature": 6.53
            };
            const result = sortReadings([temp1, temp2, temp3, temp4]);
            expect(result).toEqual([temp2, temp1, temp3, temp4])
        });

        it('should sort negative readings before positive temperature readings', () => {
            const readings = [
                {
                    "id": "k",
                    "timestamp": 1209493641,
                    "temperature": 2.94
                },
                {
                    "id": "a",
                    "timestamp": 1509493641,
                    "temperature": 0.53
                },
                {
                    "id": "c",
                    "timestamp": 1505493641,
                    "temperature": -1.03
                },
                {
                    "id": "n",
                    "timestamp": 1609493641,
                    "temperature": 3.12
                },
                {
                    "id": "a",
                    "timestamp": 1709493641,
                    "temperature": -4.53
                }

            ];
            const result = sortReadings(readings);
            expect(result[0].temperature).toEqual(-4.53)
        });
    });
    describe('.groupReadingById()', () => {
        it('should group multiple temperature readings together', () => {
            const readings = [
                {
                    "id": "c",
                    "timestamp": 1709493641,
                    "temperature": -4.53
                },
                {
                    "id": "a",
                    "timestamp": 1509493641,
                    "temperature": 0.53
                },
                {
                    "id": "b",
                    "timestamp": 1505493641,
                    "temperature": -1.03
                },
                {
                    "id": "a",
                    "timestamp": 1209493641,
                    "temperature": 2.94
                },
                {
                    "id": "b",
                    "timestamp": 1609493641,
                    "temperature": 3.12
                },
            ];
            const result = groupReadingById(readings);
            expect(result['a']).toBeTruthy();
            expect(result['a'].length).toBe(2)
        });
    });
    describe('.calculateTemperatureStatistics()', () => {
        it('calculates the average of the temperature readings to two decimal places', () => {
            const readings = [
                {
                    "id": "a",
                    "timestamp": 1709493641,
                    "temperature": -4.53
                },
                {
                    "id": "a",
                    "timestamp": 1509493641,
                    "temperature": 0.53
                },
                {
                    "id": "a",
                    "timestamp": 1505493641,
                    "temperature": -1.03
                },
                {
                    "id": "a",
                    "timestamp": 1209493641,
                    "temperature": 2.94
                },
                {
                    "id": "a",
                    "timestamp": 1609493641,
                    "temperature": 3.12
                },
            ];
            const temperatureStatistics = calculateTemperatureStatistics(readings);
            expect(temperatureStatistics.id).toEqual('a');
            // TODO: promise
            expect(temperatureStatistics.average).toEqual(0.21)
        });

        it('calculates the median of the temperature readings to two decimal places', () => {
            const readings = [
                {
                    "id": "a",
                    "timestamp": 1509493641,
                    "temperature": 0.53
                },
                {
                    "id": "a",
                    "timestamp": 1505493641,
                    "temperature": 1.03
                },
                {
                    "id": "a",
                    "timestamp": 1209493641,
                    "temperature": 2.94
                },
                {
                    "id": "a",
                    "timestamp": 1609493641,
                    "temperature": 3.12
                },
            ];
            const temperatureStatistics = calculateTemperatureStatistics(readings);
            expect(temperatureStatistics.id).toEqual('a');
            // TODO: promise
            expect(temperatureStatistics.median).toEqual(1.98)
        });
        it('calculates the modes of the temperature readings to two decimal places', () => {
            const readings = [
                {
                    "id": "a",
                    "timestamp": 1509493641,
                    "temperature": 0.53
                },
                {
                    "id": "a",
                    "timestamp": 1505493641,
                    "temperature": 1.03
                },
                {
                    "id": "a",
                    "timestamp": 1509493641,
                    "temperature": 0.53
                },
                {
                    "id": "a",
                    "timestamp": 1209493641,
                    "temperature": 2.94
                },
                {
                    "id": "a",
                    "timestamp": 1509493641,
                    "temperature": 0.53
                },
                {
                    "id": "a",
                    "timestamp": 1609493641,
                    "temperature": 3.12
                },
                {
                    "id": "a",
                    "timestamp": 1509493641,
                    "temperature": 0.53
                },
            ];
            const temperatureStatistics = calculateTemperatureStatistics(readings);
            expect(temperatureStatistics.id).toEqual('a');
            // TODO: promise
            expect(temperatureStatistics.mode).toEqual([0.53])
        });
    })
});