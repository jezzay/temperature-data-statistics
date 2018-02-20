#!/usr/bin/env node

const path = require('path');
const temperatureDataCli = require('../dist/cli/index');

const filePath = process.argv.slice(2)[0];

const cliUsage = () => {
    return `temperature-data-statistics <file-path>`
};

if (filePath) {
    const fullFilePath = `${process.cwd()}${path.sep}${filePath}`;

    temperatureDataCli.calculateDataStatistics(fullFilePath)
        .then(result => process.stdout.write(JSON.stringify(result, null, 2)))
        .catch(error => process.stderr.write(error.message));

} else {
    process.stderr.write(`Usage: ${cliUsage()}`)
}




