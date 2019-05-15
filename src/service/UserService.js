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
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Register
 * Register into the store
 *
 * body User
 * no response value expected for this operation
 **/
exports.userRegisterPOST = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
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
