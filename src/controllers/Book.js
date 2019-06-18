'use strict';

var utils = require('../utils/writer.js');
var BookService = require('../service/BookService');

module.exports.booksGET = function booksGET (req, res, next) {
  var offset = req.swagger.params['offset'].value;
  var limit = req.swagger.params['limit'].value;

  BookService.booksGET(offset,limit)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getBookById = function getBookById (req, res, next) {
  var bookId = req.swagger.params['bookId'].value;

  BookService.getBookById(bookId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.booksByAuthorGET = function booksByAuthorGET (req, res, next) {
  var authorId = req.swagger.params['authorId'].value;

  BookService.booksByAuthorGET(authorId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.booksByGenreGET = function booksByGenreGET (req, res, next) {
  var genre = req.swagger.params['genre'].value;

  BookService.booksByGenreGET(genre)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.booksByThemeGET = function booksByThemeGET (req, res, next) {
  var theme = req.swagger.params['theme'].value;

  BookService.booksByThemeGET(theme)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.similarBooksGET = function similarBooksGET(req, res, next) {
    var bookId = req.swagger.params['bookId'].value;

    BookService.similarBooksIdsGET(bookId)
      .then(function (response) {
        var bookIDs = [];
        response.forEach(elem => {
            bookIDs.push(elem.book_1 == bookId ? elem.book_2 : elem.book_1);
        });
        BookService.booksByIDsGET(bookIDs)
          .then(function (result) {
            utils.writeJson(res, result);
          })
          .catch(function (result) {
            utils.writeJson(res, result);
          });
      })
      .catch(function (response) {
        utils.writeJson(res, response);
    });
}

module.exports.favoriteReadingsGET = function favoriteReadingsGET (req, res, next) {
  var offset = req.swagger.params['offset'].value;
  var limit = req.swagger.params['limit'].value;

  BookService.favoriteReadingsGET(offset,limit)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
