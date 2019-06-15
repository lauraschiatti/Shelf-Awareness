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


// module.exports.getBookByGenre = function getBookByGenre (req, res, next) {
//   var genre = req.swagger.params['genre'].value;
//
//   BookService.getBookByGenre(genre)
//     .then(function (response) {
//       utils.writeJson(res, response);
//     })
//     .catch(function (response) {
//       utils.writeJson(res, response);
//     });
// };
