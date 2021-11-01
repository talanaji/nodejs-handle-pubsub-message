'use strict';

const { publishMessage, readMessage } = require('./helpers/pubsub');
const { deleteTokens } = require('./helpers/tokens');
const logger = require('logging');
const config = require('./config');
const express = require('express');
const app = express();

// This middleware is available in Express v4.16.0 onwards
const jsonBodyParser = express.json();

// [START gae_flex_pubsub_push]
app.post('/pubsub/push', jsonBodyParser, async (req, res) => {
  if (req.query.token !== config.verificationToken) {
    res.status(400).send();
    return;
  }

  // Reading secrets
  await config.setSecrets();

  const pubsubMessage = req.body.message;

  try {
    logger.info('Function started', pubsubMessage);

    const data = readMessage(pubsubMessage);

    logger.info('Message read', data);
    logger.info('config', config);
    // not recommended, message will do one thing
    // if (!data || data.action !== 'deleteToken') {
    //   logger.warn('Function stopped', data);
    //   return;
    // }

    logger.debug('deleting tokens started');
    const { deleteInfo } = await deleteTokens();

    logger.debug('Tokens successfully deleted', deleteInfo);

    const message = { deleteInfo: deleteInfo };
    logger.debug('Publishing message started', message);
    publishMessage(message);
    logger.debug('Message successfully published', message);

    logger.info('Function successfully completed');
    res.status(200).send('OK');
  } catch (err) {
    logger.error('Function failed', err);
    res.status(400).send();
  }
});
// [END gae_flex_pubsub_push]

// Start the server
const PORT = config.port || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

module.exports = app;
