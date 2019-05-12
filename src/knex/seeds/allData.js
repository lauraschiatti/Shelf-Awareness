
const reviewsData = require('../../data/reviews');
const usersData = require('../../data/users');
const authorsData = require('../../data/authors');
const booksData = require('../../data/books');

exports.seed = function(knex, Promise) {
  return knex('reviews').del()
  .then(() => {
      return knex('users').del();
  })
  .then(() => {
      return knex('books').del();
  })
  .then(() => {
      return knex('authors').del();
  })
  .then(() => {
      return knex('users').insert(usersData);
  })
  .then(() => {
      return knex('authors').insert(authorsData);
  })
  .then(() => {
      let bookPromises = [];
      booksData.forEach((book) => {
          let author = book.author;
          bookPromises.push(createBook(knex, book, author));
      });

      return Promise.all(bookPromises);
  })
  .then(() => {
      let reviewsPromises = [];
      reviewsData.forEach((review) => {
          let user = review.user;
          let book = review.book;
          reviewsPromises.push(createReview(knex, review, user, book));
      });

      return Promise.all(reviewsPromises);
  });
};
const createBook = (knex, book, author) => {
    console.log('storing book seeds ...');
    return knex('authors').where('name', author).first()
        .then((authorRecord) => {
            return knex('books').insert({
                title: book.title,
                author_id: authorRecord.id,
                cover: book.cover,
                abstract: book.abstract,
                genre: book.genre,
                currency: book.currency,
                value: book.value
            });
        });
};

const createReview = (knex, review, user, book) => {
    console.log('storing review seeds ...');
    return knex('users').where('email' , user).first()
        .then((userRecord) => {
            return knex('books').where('title', book).first()
                .then((bookRecord) => {
                    return knex('reviews').insert({
                                    comment: review.comment,
                                    user_id: userRecord.id,
                                    book_id: bookRecord.id
                                });
                });
        });

};
