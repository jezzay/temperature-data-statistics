import {
    calculateTemperatureStatistics,
    groupReadingById,
    sortReadings,
    TemperatureReading,
    TemperatureStatistics
} from "../temperatures";

const fs = require('fs');
const {promisify} = require('util');
const readFileAsync = promisify(fs.readFile);
const fileExistsAsync = promisify(fs.exists);

/**
 * Read in a JSON file from the given path, and computes temperature statistics.
 *
 * Sorts the source file, groups by temperature id and computes the average, median and mode for a temperature grouping
 *
 * @param {string} path file path to a file containing JSON in the TemperatureReading format
 * @returns {Promise<TemperatureStatistics[]>}
 */
export const calculateDataStatistics: (path: string) => Promise<TemperatureStatistics[]> = async (path: string) => {
    try {
        const temperatureFile = await readTemperatureFile(path);
        const temperatureData = await parseFileToJSON(temperatureFile);

        const sortedTemperatures = sortReadings(temperatureData);
        const readings = groupReadingById(sortedTemperatures);

        const stats = [];
        for (const reading in readings) {
            stats.push(calculateTemperatureStatistics(readings[reading]))
        }
        return stats;

    } catch (error) {
        return Promise.reject(error);
    }
};

const readTemperatureFile = async (path: string): Promise<string> => {
    try {
        if (await fileExistsAsync(path)) {
            return await readFileAsync(path);
        } else {
            return Promise.reject(new Error(`Path ${path} does not exist`));
        }
    } catch (error) {
        return Promise.reject(new Error(`Unable to read Temperature file at ${path}`))
    }
};


const parseFileToJSON = async (file: string): Promise<TemperatureReading[]> => {
    return new Promise<TemperatureReading[]>(((resolve, reject) => {
        let temperatures;
        try {
            temperatures = JSON.parse(file);
            return resolve(temperatures)
        } catch (error) {
            return reject(error);
        }
    }));
};