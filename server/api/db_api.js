var express = require('express');
var router = express.Router();
var db = require('../../db/db.js');

module.exports = db_api = {};

//create new user in db
db_api.createUser = function(login) {
  
  return new Promise(function(resolve, reject){
    let query = 'INSERT INTO users(username, password, email, active) VALUES($1, $2, $3, $4) RETURNING user_id';
    db.one(query, [login.username, login.password, login.email, true], function(results) {
      console.log("RESULTS: ", results)
      resolve(results)
    })
  })

};

//authenticate user in db
db_api.authUser = function(loginData, session_id) {
  console.log("SESSID 1: ", session_id)
  return new Promise((resolve, reject)=> {
    let query = 'SELECT * FROM users WHERE username = $1 AND password = $2'
    db.any(query, [loginData.username, loginData.password, true])
    .then(data => {
        console.log('DATA in authUser:', data); // print data;
        // resolve(data);

        return data[0];
    })
    .then(user => {
      db.one(`UPDATE users SET current_session = "${session_id}" WHERE user_id = ${user.user_id} RETURNING current_session`)
      .then(result => {
        console.log("RESULT ~~~~~~: ", result)
        user.current_session_id = session_id
        resolve(user);
      })

    })
    .catch(error => {
        console.log('ERROR:', error); // print the error;
    });
  })
};

