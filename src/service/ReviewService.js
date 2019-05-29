'use strict';

/**
 * Reviews available in the inventory
 * List of reviews available in the inventory
 *
 * offset Integer Pagination offset. Default is 0. (optional)
 * limit Integer Maximum number of items per page. Default is 20 and cannot exceed 500. (optional)
 * returns List
 **/

// DB configuration
var knex = require('../knex/knex');

exports.reviewsGET = function(offset, limit) {
  return knex('reviews')
    .join('users', 'users.id', '=', 'reviews.user_id')
    .join('books', 'books.id', '=', 'reviews.book_id')
    .select()
    .offset(offset)
    .limit(limit)
    .orderBy('reviews.id', 'asc')
    .then((review) => {
      return review.map(e => {
        return formatReview(e);
      });
    })
    .catch((err) => console.log(err));
};


/**
 * Find review by ID
 * Returns a review
 *
 * reviewId Long ID of review to return
 * returns Review
 **/
exports.getReviewById = function(reviewId) {
  return knex('reviews')
    .join('users', 'users.id', '=', 'reviews.user_id')
    .join('books', 'books.id', '=', 'reviews.book_id')
    .first()
    .where('reviews.id', reviewId)
    .then((review) => {
      return formatReview(review);
    })
    .catch((err) => console.log(err));
};

exports.getReviewsByBook = function(bookId) {
  return knex('reviews')
    .join('users', 'users.id', '=', 'reviews.user_id')
    .select()
    .where('reviews.book_id', bookId)
    .then((reviews) => {
      return reviews.map(e => {
        return e;
      });
    })
    .catch((err) => console.log(err));
};


exports.createReview = function(user, bookId, comment) {
  knex('reviews').insert({
      comment: "" + comment + "",
      user: "" + user + "",
      book: "" + bookId + ""
    }).then(function(result) {
      console.log("inserting review");
      return new Promise(function(resolve, reject) {
        resolve("OK");
      });
      // result.json({ success: true, message: 'ok' });     // respond back to request
    })
    .catch((err) => console.log(err));
}

function formatReview(review) {
  review.user = {
    name: review.name,
    email: review.email,
    password: review.password,
    address: review.address,
    creditcard: review.creditcard
  };
  review.book = {
    title: review.title,
    author: review.author,
    cover: review.cover,
    abstract: review.abstract,
    genre: review.genre,
    currency: review.currency,
    value: review.value,
    interview: review.interview
  };

  delete review.user_id;
  delete review.book_id;
  delete review.password;
  delete review.address;
  delete review.creditcard;
  delete review.cover;
  delete review.abstract;
  delete review.genre;
  delete review.currency;
  delete review.value;
  delete review.status;
  delete review.created_at;
  delete review.updated_at;
  delete review.author_id;
  delete review.interview;

  delete review.user.password;
  delete review.user.address;
  delete review.user.creditcard;
  delete review.book.cover;
  delete review.book.abstract;
  delete review.book.genre;
  delete review.book.currency;
  delete review.book.value;
  delete review.book.author_id;
  delete review.book.status;
  delete review.book.created_at;
  delete review.book.updated_at;

  return review;
}
