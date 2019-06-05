const reviewsData = require('../../data/reviews');
const usersData = require('../../data/users');
const authorsData = require('../../data/authors');
const booksData = require('../../data/books');
const similarBooksData = require('../../data/similar_books');
const eventsData = require('../../data/events');
const booksInCartData = require('../../data/books_in_cart');

exports.seed = function(knex, Promise) {
  return knex('reviews').del()
    .then(() => {
      return knex('books_in_cart').del();
    })
    .then(() => {
      return knex('users').del();
    })
    .then(() => {
      return knex('events').del();
    })
    .then(() => {
      return knex('similar_books').del();
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
      let similarBooksPromises = [];
      similarBooksData.forEach((row) => {
        let book_1 = row.book_1;
        let book_2 = row.book_2;
        similarBooksPromises.push(createSimilarBooks(knex, book_1, book_2));
      });

      return Promise.all(similarBooksPromises);
    })
    .then(() => {
      let booksInCartPromises = [];
      booksInCartData.forEach((bookInCart) => {
        let user = bookInCart.user;
        let book = bookInCart.book;
        booksInCartPromises.push(createBookInCart(knex, bookInCart, user, book));
      });

      return Promise.all(booksInCartPromises);
    })
    .then(() => {
      let eventPromises = [];
      eventsData.forEach((event) => {
        let book = event.book;
        eventPromises.push(createEvent(knex, event, book));
      });

      return Promise.all(eventPromises);
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
        value: book.value,
        interview: book.interview
      });
    });
};

const createSimilarBooks = (knex, book_1, book_2) => {
  console.log('storing similar books seeds ...');
  return knex('books').where('title', book_1).first()
    .then((book1Record) => {
      return knex('books').where('title', book_2).first()
        .then((book2Record) => {
          return knex('similar_books').insert({
            book_1: book1Record.id,
            book_2: book2Record.id
          });
        });
    });
};

const createBookInCart = (knex, bookInCart, user, book) => {
  console.log('storing books in cart seeds ...');
  return knex('users').where('email', user).first()
    .then((userRecord) => {
      return knex('books').where('title', book).first()
        .then((bookRecord) => {
          return knex('books_in_cart').insert({
            book_id: bookRecord.id,
            user_id: userRecord.id,
            status: bookInCart.status,
            quantity: bookInCart.quantity
          });
        });
    });
};

const createEvent = (knex, event, book) => {
  console.log('storing event seeds ...');
  return knex('books').where('title', book).first()
    .then((bookRecord) => {
      return knex('events').insert({
        location: event.location,
        held_on: event.held_on,
        book_id: bookRecord.id
      });
    });
};

const createReview = (knex, review, user, book) => {
  console.log('storing review seeds ...');
  return knex('users').where('email', user).first()
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
