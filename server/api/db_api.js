var express = require('express');
var router = express.Router();
var db = require('../../db/db.js');

module.exports = db_api = {};

//create new user in db
db_api.createUser = function(login) {
  
  return new Promise(function(resolve, reject){
    db.one('INSERT INTO users(username, password, email, active) VALUES($1, $2, $3, $4) RETURNING user_id', [login.username, login.password, login.email, true], function(results) {
      resolve(results)
    })
  })

};

//authenticate user in db
db_api.authUser = function(loginData, session_id) {
  
  return new Promise((resolve, reject)=> {
    let query = 'SELECT * FROM users WHERE username = $1 AND password = $2'
    db.any(query, [loginData.username, loginData.password, true])
    .then(data => {
      return data[0];
    })
    .then(user => {
      db.one(`UPDATE users SET current_session = '${session_id}' WHERE user_id = ${user.user_id} RETURNING current_session`)
      .then(result => {
        user.session_id = session_id
        resolve(user);
      })
      .catch(error => {
        console.log('Error updating user session: ', error);
      })
    })
    .catch(error => {
        console.log('Error authenticating user :', error);
    });
  })
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

db_api.addToUserSites = function(subscription) {

  return new Promise(function(resolve, reject){
    db.one('INSERT INTO user_sites(user_id, site_id, email, text_msg) VALUES($1, $2, $3, $4) RETURNING subscription_id', [subscription.user_id, subscription.site_id, false, false], function(results) {
      resolve(results)
    })
  })
};

db_api.listUserSites = function(user_id) {
  
  user_id = user_id.toString()
  return new Promise(function(resolve, reject){
    db.many('SELECT * FROM user_sites WHERE user_id =$1', user_id)
    .then(function(data) {
      resolve(data)
    })
  });
}




