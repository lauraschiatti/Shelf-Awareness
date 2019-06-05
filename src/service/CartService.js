'use strict';

// DB configuration
var knex = require('../knex/knex');

exports.getBooks = function(cartId) {
  return knex('books_in_cart')
    .join('books', 'books.id', '=', 'books_in_cart.book_id')
    .join('authors', 'authors.id', '=', 'books.author_id')
    .select()
    .where('books_in_cart.user_id', cartId)
    .then((books) => {
      return books.map(e => {
        // console.log("\nid " + e.book_id);
        return formatBook(e);
      });
    })
    .catch((err) => console.log(err));
};

exports.addBook = function(userId, bookId) {
    // TODO: if we have amount column then check if the combination <user, book> already exists
    return knex('books_in_cart').insert({
        book_id: bookId,
        status: "added",
        user_id: userId
      })
      .then(function(result) {
          return new Promise(function(resolve, reject) {
              resolve("OK");
          });
      });
}


function formatBook(bic) {
  // bic = book in cart
  delete bic.id;
  delete bic.cart_id;

  bic.author = {
    name: bic.name,
    picture: bic.picture,
    bio: bic.bio
  };
  delete bic.author_id;
  delete bic.name;
  delete bic.picture;
  delete bic.bio;

  bic.price = {
    value: bic.value,
    currency: bic.currency
  };
  delete bic.currency;
  delete bic.value;
  delete bic.created_at;
  delete bic.updated_at;

  return bic;
}
