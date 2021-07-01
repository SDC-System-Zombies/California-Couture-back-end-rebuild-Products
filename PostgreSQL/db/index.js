const { Pool } = require('pg');
const { user, password, database, host } = require('./token.js');

const pool = new Pool({
  user,
  host,
  database,
  password,
  port: 5432,
  max: 95,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

module.exports = pool;
