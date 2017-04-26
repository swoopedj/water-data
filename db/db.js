var env = require('node-env-file');
env('./.env');
var pgp = require('pg-promise')();
var pg_config = {
  host: 'localhost',
  port: 5432,
  database: 'waterdata',
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  idleTimeoutMillis: 30000 // how long a client is allowed to remain idle before being closed 
};
var db = pgp(pg_config);

module.exports = db;
