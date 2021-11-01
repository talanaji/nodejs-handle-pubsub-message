const config = require('./config');
const logger = require('logging');
const { Storage } = require('@google-cloud/storage');

const storage = new Storage();
const bucket = storage.bucket(config.bucketName);
const fileName = 'email.html';
const remoteFile = bucket.file(fileName);

logger.info('Reading File');
var archivo = remoteFile.createReadStream();
logger.info('Concat Data');
var buf = '';
/**
 * @function readReplaceEmailTemp 
 * we use this function to read email.html template from Google Storage and replace the content with pub/sub message 
 * @param  {} message
 */
const readReplaceEmailTemp = (message) => archivo.on('data', function (d) {
    buf += d;
}).on('end', function () {
    logger.info(buf);
    var result = buf.replace("[MSG]", message);
    logger.info(result);
    return result;
});
module.exports = readReplaceEmailTemp;