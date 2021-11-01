'use strict';

const mysql = require('mysql2');
const config = require('../config');
const R = require('ramda');

const getPool = () =>
  mysql
    .createPool({
      host: config.sql.host,
      port: config.sql.port,
      database: config.sql.database,
      user: config.secrets.user,
      password: config.secrets.password,
    })
    .promise();

module.exports = {
  getPool: R.memoizeWith(() => 'singleton', getPool),
};
