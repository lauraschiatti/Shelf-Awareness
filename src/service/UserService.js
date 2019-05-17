'use strict';




/**
 * Login
 * Login with a form
 *
 * username String
 * password String
 * no response value expected for this operation
 **/
exports.userLoginPOST = function(username,password) {
  return knex('users')
      .select()
      .where('users.email','=', username)
      .andWhere('users.password','=', password)
      .then((user) => {
        console.log(user[0].email);
          return formatUser(user);
      })
      .catch((err) => console.log(err));
};


/**
 * Register
 * Register into the store
 *
 * body User
 * no response value expected for this operation
 **/
exports.userRegisterPOST = function(body) {
  var registeredUser;
  knex('users')
      .first()
      .where('users.email', body.email)
      .then((user) => {
          registeredUser = user;
      })
      .catch((err) => registeredUser = undefined);
      console.log(registeredUser);
    if(registeredUser==undefined && body.name!=undefined){
      console.log("usao u upis");
      knex('users').insert({
        name: ""+body.name+"",
        email:""+body.email+"",
        password:""+body.password+"",
        address:""+body.address+"",
        creditcard:""+body.creditcard+""
      });
    }
  return knex('users')
      .select()
      .where('users.email', body.email)
      .then((user) => {
          return formatUser(user);
      })
      .catch((err) => console.log(err));
}

/**
 * Users available in the inventory
 * List of users available in the inventory
 *
 * offset Integer Pagination offset. Default is 0. (optional)
 * limit Integer Maximum number of items per page. Default is 20 and cannot exceed 500. (optional)
 * returns List
 **/

// DB configuration
var knex = require('../knex/knex');

exports.usersGET = function (offset, limit) {
    return knex('users')
        .select()
        .offset(offset)
        .limit(limit)
        .orderBy('id', 'asc')
        .then((user) => {
            return user.map(e => {
                return formatUser(e);
            });
        })
        .catch((err) => console.log(err));
};


/**
 * Find user by ID
 * Returns a user
 *
 * userId Long ID of user to return
 * returns User
 **/
exports.getUserById = function(userId) {
    return knex('users')
        .first()
        .where('users.id', userId)
        .then((user) => {
            return formatUser(user);
        })
        .catch((err) => console.log(err));
};

function formatUser(user){
    delete user.password;

    return user;
}
