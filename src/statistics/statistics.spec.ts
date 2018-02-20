import {TemperatureReading} from "../temperatures/temperature.model";

const statistics = require('./statistics');

describe('statistics', () => {
    describe('.average()', () => {
        it('should calculate the average from a list of temperature readings', () => {
            const readings: TemperatureReading[] = [
                {id: "a", timestamp: 1509493641, temperature: 3.53},
                {id: "a", timestamp: 1509493644, temperature: 3.63},
                {id: "a", timestamp: 1509493645, temperature: 4.63},
                {id: "a", timestamp: 1509493646, temperature: 3.53},
                {id: "a", timestamp: 1509493677, temperature: 3.66},
                {id: "a", timestamp: 1510128112, temperature: 3.67},
            ];
            const average = statistics.average(readings);
            expect(average).toBe(3.775)
        });

        it('should calculate the average from a list of negative temperature readings', () => {
            const readings: TemperatureReading[] = [
                {id: "a", timestamp: 1509493641, temperature: -1.53},
                {id: "a", timestamp: 1509493644, temperature: -4.63},
                {id: "a", timestamp: 1509493645, temperature: 1.63},
                {id: "a", timestamp: 1509493646, temperature: 0.53},
                {id: "a", timestamp: 1509493677, temperature: -3.66},
                {id: "a", timestamp: 1510128112, temperature: -5.67},
            ];
            const average = statistics.average(readings);
            expect(average).toBe(-2.2216666666666667)
        });

        it('should exclude readings with an invalid temperature', () => {
            const readings: TemperatureReading[] = [
                {id: "a", timestamp: 1509493641, temperature: NaN},
                {id: "a", timestamp: 1509493644, temperature: NaN},
                {id: "a", timestamp: 1509493645, temperature: 5.63},
                {id: "a", timestamp: 1509493646, temperature: 3.53},
                {id: "a", timestamp: 1509493677, temperature: 2.66},
                {id: "a", timestamp: 1510128112, temperature: 10.67},
            ];
            const average = statistics.average(readings);
            expect(average).toBe(5.6225000000000005)
        });
    });
    describe('.median()', () => {
        it('should return the median for an odd sized list', () => {
            const readings: TemperatureReading[] = [
                {id: "a", timestamp: 1509493641, temperature: 3.52},
                {id: "a", timestamp: 1509493646, temperature: 3.53},
                {id: "a", timestamp: 1509493644, temperature: 3.63},
                {id: "a", timestamp: 1509493677, temperature: 3.66},
                {id: "a", timestamp: 1510128112, temperature: 3.67},
                {id: "a", timestamp: 1510128112, temperature: 3.68},
                {id: "a", timestamp: 1509493645, temperature: 4.63},
            ];
            const median = statistics.median(readings);
            expect(median).toBe(3.66)
        });

        it('should return the median for an even sized list', () => {
            const readings: TemperatureReading[] = [
                {id: "a", timestamp: 1509493641, temperature: 1.53},
                {id: "a", timestamp: 1509493646, temperature: 3.52},
                {id: "a", timestamp: 1509493644, temperature: 3.63},
                {id: "a", timestamp: 1509493677, temperature: 3.66},
                {id: "a", timestamp: 1510128112, temperature: 3.67},
                {id: "a", timestamp: 1510128112, temperature: 3.68},
                {id: "a", timestamp: 1510128112, temperature: 3.69},
                {id: "a", timestamp: 1509493645, temperature: 4.63},
            ];
            const median = statistics.median(readings);
            expect(median).toBe(3.665)
        });

        it('should return zero for a list with zero elements', () => {
            const readings: TemperatureReading[] = [];
            const median = statistics.median(readings);
            expect(median).toBe(0)
        })
    });
    describe('.mode()', () => {
        it('should determine a single mode temperature from a list of readings', () => {
            const readings: TemperatureReading[] = [
                {id: "a", timestamp: 1509493641, temperature: 3.53},
                {id: "a", timestamp: 1509493645, temperature: 4.63},
                {id: "a", timestamp: 1509493646, temperature: 3.53},
                {id: "a", timestamp: 1509493646, temperature: 3.53},
                {id: "a", timestamp: 1509493677, temperature: 3.66},
                {id: "a", timestamp: 1510128112, temperature: 3.67},
                {id: "a", timestamp: 1509493641, temperature: 3.53},
            ];
            const mode = statistics.mode(readings);
            expect(mode).toEqual([3.53])
        });

        it('should determine multiple mode temperatures from a list of readings', () => {
            const readings: TemperatureReading[] = [
                {id: "a", timestamp: 1509493641, temperature: 3.53},
                {id: "a", timestamp: 1509493646, temperature: 3.53},
                {id: "a", timestamp: 1509493646, temperature: 3.53},
                {id: "a", timestamp: 1509493641, temperature: 3.53},
                {id: "a", timestamp: 1509493677, temperature: 3.66},
                {id: "a", timestamp: 1509493677, temperature: 3.66},
                {id: "a", timestamp: 1509493677, temperature: 3.66},
                {id: "a", timestamp: 1509493677, temperature: 3.66},
                {id: "a", timestamp: 1509493645, temperature: 4.63},
                {id: "a", timestamp: 1510128112, temperature: 3.67},
            ];
            const mode = statistics.mode(readings);
            expect(mode).toEqual([3.53, 3.66])
        });

        it('should return all readings when all readings occur equally', () => {
            const readings: TemperatureReading[] = [
                {id: "a", timestamp: 1509493641, temperature: 3.53},
                {id: "a", timestamp: 1509493677, temperature: 3.66},
                {id: "a", timestamp: 1509493645, temperature: 4.63},
                {id: "a", timestamp: 1510128112, temperature: 3.67},
            ];
            const mode = statistics.mode(readings);
            expect(mode).toEqual([3.53, 3.66, 4.63, 3.67])
        });
    });
});