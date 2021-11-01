const dateNow = require('../utils/dateNow');
const config = require('../config');
const { BigQuery } = require('@google-cloud/bigquery');

const bigquery = new BigQuery({ projectId: config.projectId ,keyFilename: '../key.json' });
const dataset = bigquery.dataset(config.datasetName);
const table = dataset.table(config.tableName);
/**
 * @function saveMsg
 * we use this function to save date on big query table 
 * @param  {} result
 */
const saveMsg = (result) => table.insert({ message: result, added_date: dateNow })
    .then((data) => {
        const apiResponse = data[0];
        return apiResponse;
    })
    .catch((err) => {
        return err;
    });
module.exports = saveMsg;