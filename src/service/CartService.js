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

exports.addBook = function(userId, bookId, quantity) {
    var record;
    knex('books_in_cart')
      .first()
      .where({
        'book_id': bookId,
        'user_id': userId
      })
      .then((result) => {
        record = result;
        if (record == undefined) {
            knex('books_in_cart').insert({
                book_id: bookId,
                status: "added",
                user_id: userId,
                quantity: quantity
              })
              .then(function(result) {
                  return new Promise(function(resolve, reject) {
                      resolve("OK");
                  });
              });
        } else {
            var newQty = record.quantity + quantity;
            knex('books_in_cart')
              .where({
                'book_id': bookId,
                'user_id': userId
              })
              .update({
                quantity: newQty
              })
              .then(function(result) {
                return new Promise(function(resolve, reject) {
                  resolve("OK");
                });
            });
        }
      })
      .catch((err) => new Promise(function(resolve, reject) {
        reject("NOK");
      }));
    return new Promise(function(resolve, reject) {
        resolve("OK");
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

  var total = bic.value * bic.quantity;
  bic.price = {
    value: bic.value,
    currency: bic.currency,
    total: total.toFixed(2)
  };
  delete bic.currency;
  delete bic.value;
  delete bic.created_at;
  delete bic.updated_at;

  return bic;
}
