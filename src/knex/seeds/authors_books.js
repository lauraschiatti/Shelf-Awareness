const authorsData = require('../../data/authors');
const booksData = require('../../data/books');

exports.seed = function(knex, Promise) {
    return knex('books').del()
        .then(() => {
            return knex('authors').del();
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