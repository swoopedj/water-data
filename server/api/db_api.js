var express = require('express');
var router = express.Router();
var db = require('../../db/db.js');

module.exports = db_api = {};

//create new user in db
db_api.createUser = function(login) {
  
  return new Promise(function(resolve, reject){
    db.one('INSERT INTO users(user_name, password, email, active) VALUES($1, $2, $3, $4) RETURNING user_id', [login.username, login.password, login.email, true], function(results) {
      console.log("RESULTS: ", results)
      resolve(results)
    })
  })

};

//authenticate user in db
db_api.authUser = function() {
  
};

db_api.verifySession = function(sessID) {
  return new Promise(function(resolve, reject){
    db.any('SELECT * FROM user_sessions WHERE sid = $1', [sessID])
    .then(function(data) {
        resolve(data[0]);
    })
    .catch(function(error) {
        console.log("Error: ", error)
    })
  })
};