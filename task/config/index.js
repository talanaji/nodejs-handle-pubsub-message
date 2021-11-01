'use strict';

require('dotenv').config();

const config = {
  projectId: process.env.PROJECT_ID,
  secrets: process.env.SENDGRID_API_KEY,
  datasetName: process.env.DATASET_NAME,
  tableName: process.env.TABLE_NAME,
  bucketName:process.env.BUCKET_NAME
};

// const isValidateConfig = _ => true;

// const getConfig = () => {
//   isValidateConfig() ? config : throw new Error('invalid config');
// };

module.exports = config;
