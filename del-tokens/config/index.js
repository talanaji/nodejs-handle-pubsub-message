'use strict';

require('dotenv').config();
// const fileWriter = require('../utils/filew');
const secretreader = require('../utils/secret');

const setSecrets = async () => {
  config.secrets = {};
  config.secrets.user = await secretreader(
    'projects/single-frame-328518/secrets/curamet-db-user/versions/1',
  );
  config.secrets.password = await secretreader(
    'projects/single-frame-328518/secrets/curamet-db-secret/versions/1',
  );
  // config.pubSub.keyFilename = fileWriter(
  //   await secretreader('projects/single-frame-328518/secrets/key-from-another-project/versions/1'),
  // );
};

const config = {
  port: parseInt(process.env.PORT),
  projectId: process.env.PROJECT_ID,
  verificationToken: process.env.VERIFICATION_TOKEN,
  pubSub: {
    projectId: process.env.PUB_SUB_PROJECT_ID,
    topicName: process.env.PUB_SUB_TOPIC_NAME,
    keyFilename: 'key.json',
  },
  sql: {
    host: process.env.SQL_HOST,
    port: parseInt(process.env.SQL_PORT),
    database: process.env.SQL_DATABASE,
  },
  setSecrets,
};
// secrets1: JSON.parse(process.env.SECRET_ENV),
// keyFilename: process.env.PUB_SUB_KEY_FILE_NAME,

// const isValidateConfig = _ => true;

// const getConfig = () => {
//   isValidateConfig() ? config : throw new Error('invalid config');
// };

module.exports = config;
