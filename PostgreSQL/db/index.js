const { Pool } = require('pg');
// const { user, password, database, host } = require('./token.js');

const pool = new Pool({
  user: ${DB_USER},
  host: ${DB_HOST},
  database: ${DB_DB} ,
  password: ${DB_PW},
  port: 5432,
  max: 95,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

module.exports = pool;
