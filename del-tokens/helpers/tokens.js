'use strict';

const { getPool } = require('../utils/sql');

const deleteTokens = async _ => {
  const result = await getPool().query('delete from token where 1=1');
  return { deleteInfo: result };
};

module.exports = {
  deleteTokens,
};
