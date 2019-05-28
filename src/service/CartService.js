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
        .catch((err) =>  console.log(err));
};
exports.getBookIDs = function(cartId) {
    return knex('books_in_cart')
        .select()
        .where('books_in_cart.cart_id', cartId)
        .then((books) => {
            return books.map(e => {
                console.log("\nid " + e.book_id);
                return e;
            });
        })
        .catch((err) => console.log(err));
};
