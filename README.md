# temperature-data-statistics [![Build Status](https://travis-ci.org/jezzay/temperature-data-statistics.svg?branch=master)](https://travis-ci.org/jezzay/temperature-data-statistics)

Generates statistics from temperature data

## Installation 

Clone this repo, then run: 

```
npm install
npm link
```

> Note: temperature-data-statistics requires Node.js 8.x+

## Usage

`temperature-data-statistics` provides a CLI that reads in a JSON file with temperature data. 
See [`temperatures.json`](temperatures.json) for an example file. 

Usage: 
```
temperature-data-statistics <file-path>

# using file in current directory: 
temperature-data-statistics temperatures.json

# supports relative file path
temperature-data-statistics ../temperatures.json
```

## Implementation decisions and Assumptions 

### Implementation decisions

- Typescript has been used; this gives a number of benefits: 
    - static type checking; which helps prevent errors earlier in the dev cycle
    - The latest ES6+ syntax is available, while allowing to be transpiled to lower ECMAScript versions.  
    - function input and output types become self documenting  
- Small, testable functions have been created for the individual statistic calculations, which allows the core 
statistic logic to be tested + verified in isolation
- Individual functions are combined together (eg temperature processing, statistics calculations); 
    - Composing together the individual functions makes it easy to implement other input methods (eg http server) in 
    the future, without changing the core temperature grouping and statistics calculations
- The full list of temperature readings is sorted once, so multiple sort operations on subsets are not required. 
- Temperature readings are grouped by ID, then the statistics are calculated on the group subsets
    - This allows the statistics calculations to be improved to run in parallel in the future.   


### Assumptions
- The aggregated source data needs to be sorted; if this is not required 
 the [sortReadings](https://github.com/jezzay/temperature-data-statistics/blob/master/src/cli/cli.ts#L27) function 
 can be removed
- The input source file is currently read into memory; assumed that the file size is of a reasonable size and can 
 fit within the nodejs processes memory allocation.   
    - streaming the source file could be used if file size is excessively large, and the whole file can't fit within memory.   


## Building 

To compile the typescript sources, run `npm run build`

To re-compile the sources on file changes, run `npm run watch`

To run the Jest unit tests in watch mode, run `npm test`