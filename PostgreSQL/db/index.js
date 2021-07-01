const { Pool } = require('pg');
// const { user, password, database, host } = require('./token.js');

const pool = new Pool({
  user: process.env.DB_USER,
  host: host.docker.internal,
  database: process.env.DB_DB ,
  password: process.env.DB_PW,
  port: 5432,
  max: 95,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

module.exports = pool;
