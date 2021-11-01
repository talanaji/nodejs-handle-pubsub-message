'use strict';

const { PubSub } = require('@google-cloud/pubsub');
const config = require('../config');
const { isCached, setCache } = require('../utils/cache');

// @ts-ignore
const pubSub = new PubSub({
  projectId: config.pubSub.projectId,
  keyFilename: config.pubSub.keyFilename,
});

const publishMessage = message => {
  const topic = pubSub.topic(config.pubSub.topicName);
  topic.publishJSON(message);
};

const readMessage = message => {
  if (!message) {
    throw new Error('invalid message');
  }
  if (isCached(message.messageId)) {
    throw new Error('duplicated id');
  }
  setCache(message.messageId);
  const messageFromBuffer = Buffer.from(message.data, 'base64').toString('utf-8');
  // return typeof messageFromBuffer === 'string' || typeof messageFromBuffer === 'number'
  //   ? messageFromBuffer
  //   : JSON.parse(messageFromBuffer);
  return messageFromBuffer;
};

module.exports = {
  publishMessage,
  readMessage,
};
