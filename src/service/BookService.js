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
exports.booksGET = function(offset, limit) {
  return knex('authors')
    .join('books', 'books.author_id', '=', 'authors.id')
    .select()
    .offset(offset)
    .limit(limit)
    .orderBy('title', 'asc')
    .then((book) => {
      return book.map(e => {
        return formatBook(e);
      });
    })
    .catch((err) => console.log(err));
};

exports.booksByAuthorGET = function(authorId) {
  return knex('authors')
    .join('books', 'books.author_id', '=', 'authors.id')
    .select()
    .where('books.author_id', authorId)
    .orderBy('title', 'asc')
    .then((book) => {
      return book.map(e => {
        return formatBook(e);
      });
    })
    .catch((err) => console.log(err));
};

exports.booksByGenreGET = function(genre) {
  return knex('authors')
    .join('books', 'books.author_id', '=', 'authors.id')
    .select()
    .where('books.genre', '=', genre)
    .orderBy('title', 'asc')
    .then((book) => {
      return book.map(e => {
        return formatBook(e);
      });
    })
    .catch((err) => console.log(err));
};

exports.booksByThemeGET = function(theme) {
  return knex('authors')
    .join('books', 'books.author_id', '=', 'authors.id')
    .join('themes_in_book', 'themes_in_book.book_id', '=', 'books.id')
    .select()
    .where('themes_in_book.theme_id', '=', theme)
    .orderBy('title', 'asc')
    .then((book) => {
      return book.map(e => {
        return formatBook(e);
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
  return knex('authors')
    .join('books', 'books.author_id', '=', 'authors.id')
    .first()
    .where('books.id', bookId)
    .then((book) => {
      return formatBook(book);
    })
    .catch((err) => console.log(err));
};

exports.booksByIDsGET = function(bookIDs) {
    return knex('authors')
      .join('books', 'books.author_id', '=', 'authors.id')
      .select()
      .whereIn('books.id', bookIDs)
      .then((book) => {
        return book.map(e => {
          return formatBook(e);
        });
      })
      .catch((err) => console.log(err));
}

exports.similarBooksIdsGET = function(bookId) {
    return knex('similar_books')
      .select()
      .where('book_1', '=', bookId)
      .orWhere('book_2', '=', bookId)
      .catch((err) => console.log(err));
}


function formatBook(book) {
  book.author = {
    id: book.author_id,
    name: book.name,
    picture: book.picture,
    bio: book.bio
  };
  delete book.author_id;
  delete book.name;
  delete book.picture;
  delete book.bio;

  book.price = {
    value: book.value,
    currency: book.currency
  };
  delete book.currency;
  delete book.value;
  delete book.created_at;
  delete book.updated_at;

  return book;
}
