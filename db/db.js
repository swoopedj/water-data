var pgp = require('pg-promise')();
var pg_config = {
  host: 'localhost', // Server hosting the postgres database 
  port: 5432, //env var: PGPORT 
  database: 'waterdata', //env var: PGDATABASE
  user: 'dylanswoope', //env var: PGUSER 
  password: 'bnm88990', //env var: PGPASSWORD 

  idleTimeoutMillis: 30000 // how long a client is allowed to remain idle before being closed 
};
var db = pgp(pg_config);


module.exports = db;