const { Pool } = require('pg');
const token = require('./token.js');

const pool = new Pool({
  user: 'hrvy',
  host: 'localhost',
  database: 'atelier',
  password: token,
  port:5432,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

module.exports = pool;
