import {TemperatureReading, TemperatureReadingGrouping, TemperatureStatistics} from "./temperature.model";
import {average, median, mode} from "../statistics";


export const sortReadings = (readings: TemperatureReading[]): TemperatureReading[] => {
    return readings.sort(readingComparator)
};

export const groupReadingById = (readings: TemperatureReading[]): TemperatureReadingGrouping => {
    return readings.reduce(createGrouping, {});
};

export const calculateTemperatureStatistics = (readings: TemperatureReading[]): TemperatureStatistics => {
    const readingAverage = toTwoDecimalPlaces(average(readings));
    const readingMedian = toTwoDecimalPlaces(median(readings));
    const readingModes = mode(readings);
    return {id: readings[0].id, average: readingAverage, median: readingMedian, mode: readingModes}
};

const toTwoDecimalPlaces = (input: number) : number => {
    return Number(input.toFixed(2));
};

const createGrouping = (grouping: TemperatureReadingGrouping, reading: TemperatureReading) => {
    if (grouping[reading.id]) {
        grouping[reading.id].push(reading)
    } else {
        grouping[reading.id] = [reading]
    }
    return grouping;
};

/**
 * Compare two TemperatureReadings based on temperature, ordering by lowest temperature
 *
 * @param {TemperatureReading} a
 * @param {TemperatureReading} b
 * @returns {-1 | 1 | 0}
 */
const readingComparator = (a: TemperatureReading, b: TemperatureReading): -1 | 1 | 0 => {
    if (a.temperature === b.temperature) {
        return 0;
    }
    if (a.temperature < b.temperature) {
        return -1;
    }
    return 1;
};