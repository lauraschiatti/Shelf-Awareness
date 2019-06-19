'use strict';



// DB configuration
var knex = require('../knex/knex');
/**
 * Authors available in the inventory
 * List of authors available in the inventory
 *
 * offset Integer Pagination offset. Default is 0. (optional)
 * limit Integer Maximum number of items per page. Default is 20 and cannot exceed 500. (optional)
 * returns List
 **/
exports.authorsGET = function(offset, limit) {
  return knex('authors')
    .select()
    .orderBy('name', 'asc')
    .then((author) => {
      return author.map(e => {
        return formatAuthor(e);
      });
    })
    .catch((err) => console.log(err));
};


/**
 * Find author by ID
 * Returns a author
 *
 * authorId Long ID of author to return
 * returns Author
 **/
exports.getAuthorById = function(authorId) {
  return knex('authors')
    .select()
    .where('authors.id', authorId)
    .then((author) => {
      // console.log("\nauthor name is " + author.name);
      return formatAuthor(author);
    })
    .catch((err) => console.log(err));
};

function formatAuthor(author) {

  return author;
}