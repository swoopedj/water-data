var pgp = require('pg-promise')();
var pg_config = {
  host: 'localhost',  
  port: 5432, 
  database: 'waterdata', 
  user: process.env.DB_USER, 
  password: process.env.DB_PASS,  
  idleTimeoutMillis: 30000 
};
var db = pgp(pg_config);


module.exports = db;