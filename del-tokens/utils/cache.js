'use strict';

const NodeCache = require('node-cache');
const cache = new NodeCache();

const isCached = key => cache.get(key);

const setCache = key => (isCached(key) ? false : cache.set(key, true, 600));

module.exports = {
  isCached,
  setCache,
};
