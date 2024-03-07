const fs = require('fs');
const util = require('util');

// promisify the readFromFile and writeFile methods
const readFromFile = util.promisify(fs.readFile);

const writeFile = util.promisify(fs.writeFile);

// helper function to write given content to given destination
const writeToFile = (destination, content) =>
  writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
    );

// helper function to read given file and add given content to it
const readAndAppend = (content, file) => {
fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
    console.error(err);
    } else {
    const parsedData = JSON.parse(data);
    parsedData.push(content);
    writeToFile(file, parsedData);
    }
});
};

// export all helper functions
module.exports = { readFromFile, writeToFile, readAndAppend };
