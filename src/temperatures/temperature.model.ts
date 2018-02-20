export interface TemperatureReading {
    id: string;
    timestamp: number;
    temperature: number;
}

export interface TemperatureReadingGrouping {
    [id: string]: TemperatureReading[]
}

export interface TemperatureStatistics {
    id: string;
    average: number;
    median: number;
    mode: number[];
}