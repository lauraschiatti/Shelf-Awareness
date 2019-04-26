'use strict';

/**
 * Books available in the inventory
 * List of books available in the inventory
 *
 * offset Integer Pagination offset. Default is 0. (optional)
 * limit Integer Maximum number of items per page. Default is 20 and cannot exceed 500. (optional)
 * returns List
 **/

// DB configuration
var knex = require('../knex/knex');

exports.booksGET = function (offset, limit) {
    return knex('books')
        .join('authors', 'authors.id', '=', 'books.author_id')
        .select()
        .offset(offset)
        .limit(limit)
        .orderBy('title', 'asc')
        .then((book) => {
            return book.map(e => {
                e.author = { name: e.name, picture: e.picture, bio: e.bio };
                delete e.author_id;
                delete e.name;
                delete e.picture;
                delete e.bio;

                e.price = { value: e.value, currency: e.currency };

                delete e.currency;
                delete e.value;
                delete e.created_at;
                delete e.updated_at;

                return e;
            });
        })
        .catch((err) => console.log(err));
};


/**
 * Find book by ID
 * Returns a book
 *
 * bookId Long ID of book to return
 * returns Book
 **/
exports.getBookById = function(bookId) {
    return new Promise(function(resolve, reject) {
        var examples = {};
        examples['application/json'] = {
            "author" : "Dino Buzzati",
            "price" : {
                "currency" : "eur",
                "value" : 6.027456183070404E14
            },
            "id" : 0,
            "title" : "Il deserto dei tartari",
            "status" : "available"
        };
        if (Object.keys(examples).length > 0) {
            resolve(examples[Object.keys(examples)[0]]);
        } else {
            resolve();
        }
    });
}
