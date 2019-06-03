'use strict';

// DB configuration
var knex = require('../knex/knex');
/**
 * Books available in the inventory
 * List of books available in the inventory
 *
 * offset Integer Pagination offset. Default is 0. (optional)
 * limit Integer Maximum number of items per page. Default is 20 and cannot exceed 500. (optional)
 * returns List
 **/
 exports.genresGET = function (offset, limit) {
    return knex('authors')
        .join('books', 'books.author_id', '=', 'authors.id')
        .select()
        .distinct('genre')
        .offset(offset)
        .limit(limit)
        .then((book) => {
            return book.map(e => {
                // console.log("\nid " + e.book_id);
                // console.log("\nname " + e.title);
                return formatBook(e);
            });
        })
        .catch((err) => console.log(err));
};


function formatBook(book){
  book.author = { id: book.author_id, name: book.name, picture: book.picture, bio: book.bio };
  delete book.author_id;
  delete book.name;
  delete book.picture;
  delete book.bio;

  book.price = { value: book.value, currency: book.currency };
  delete book.currency;
  delete book.value;
  delete book.created_at;
  delete book.updated_at;
    return book;
}
