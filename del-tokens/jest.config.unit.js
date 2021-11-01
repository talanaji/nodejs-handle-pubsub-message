const config = require('./jest.config');
config.testRegex = ['\\.unit\\.test\\.js$']; // Overriding testRegex option
console.log('RUNNING UNIT TESTS');
module.exports = config;
