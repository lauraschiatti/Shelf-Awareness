'use strict';

// DB configuration
var knex = require('../knex/knex');
/**
 * View the content of the cart
 *
 * cartId Long
 * returns Cart
 **/
exports.getCartById = function(cartId) {
  return knex('carts')
    .select()
    .where('carts.id', cartId)
    .then((cart) => {
      return cart;
    })
    .catch((err) => console.log(err));
};

exports.getBookIDs = function(cartId) {
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
