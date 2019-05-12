const usersData = require('../../data/users');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(() => {
        return knex('users').insert(usersData);
    });
};
