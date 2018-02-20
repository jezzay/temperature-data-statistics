import {TemperatureReading} from "../temperatures";


export const average = (readings: TemperatureReading[]): number => {
    if (!readings || readings.length === 0) {
        return 0;
    }
    let sum = 0;
    let totalValidReadings = 0;
    for (let reading of readings) {
        if (reading.temperature && !isNaN(reading.temperature)) {
            sum += reading.temperature;
            totalValidReadings++
        }
    }
    return sum / totalValidReadings
};

export const median = (readings: TemperatureReading[]): number => {
    if (!readings || readings.length === 0) {
        return 0;
    }
    if (readings.length % 2 === 0) {
        // even sized list, return mean of middle values
        const evenHalf = readings.length / 2;
        return (readings[evenHalf - 1].temperature + readings[evenHalf].temperature) / 2
    }
    // odd sized list, return middle value
    const half = (readings.length - 1) / 2;
    return readings[half].temperature;
};

export const mode = (readings: TemperatureReading[]): number[] => {
    let modes: number[] = [];
    let maxFrequency = 0;
    const occurrences: { [key: number]: number; } = {};

    for (const reading of readings) {
        // only count valid readings
        if (reading.temperature) {
            if (occurrences[reading.temperature]) {
                occurrences[reading.temperature]++
            } else {
                occurrences[reading.temperature] = 1;
            }

            if (occurrences[reading.temperature] > maxFrequency) {
                modes = [reading.temperature];
                maxFrequency = occurrences[reading.temperature]
            } else if (occurrences[reading.temperature] === maxFrequency) {
                modes.push(reading.temperature)
            }
        }
    }
    return modes;
};

