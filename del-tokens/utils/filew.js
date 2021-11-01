'use strict';

const fs = require('fs');

const writeToJsonFile = (jsonData, fileName = './key.json') => {
  let data = JSON.stringify(jsonData);
  fs.writeFileSync(fileName, data);
  return fileName;
};

module.exports = writeToJsonFile;
