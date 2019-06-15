'use strict';

// DB configuration
var knex = require('../knex/knex');

/**
 * Themes available in the inventory
 * List of themes available in the inventory
 *
 * offset Integer Pagination offset. Default is 0. (optional)
 * limit Integer Maximum number of items per page. Default is 20 and cannot exceed 500. (optional)
 * returns List
 **/
exports.themesGET = function(offset, limit) {
  return knex('themes')
    .select()
    .offset(offset)
    .limit(limit)
    .catch((err) => console.log(err));
};
