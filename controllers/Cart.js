'use strict';

var utils = require("../utils/writer.js");
var CartService = require("../service/CartService");

module.exports.cartGET = function cartGET(req, res, next) {
  if (!req.session || !req.session.loggedin) {
    utils.writeJson(res, {
      error: "sorry, you must be authorized"
    }, 404);
  } else {
      var cartId = req.session.id;
      CartService.getBooks(cartId)
        .then(function(response) {
          var result = {};
          result["total"] = calcTotalOfCart(response);
          result["books"] = response;
          utils.writeJson(res, result);
        })
        .catch(function(response) {
          utils.writeJson(res, response);
        });
  }
};

module.exports.addBookPOST = function addBookPOST(req, res, next) {
  var bookId = req.swagger.params["bookId"].value;
  var userId = req.session.id;
  var quantity = req.swagger.params["quantity"].value;
  if (!req.session || !req.session.loggedin) {
    utils.writeJson(res, {
      error: "sorry, you must be authorized"
    }, 404);
  } else {
      CartService.addBook(userId, bookId, quantity)
        .then(function(response) {
            utils.writeJson(res, result);
        })
        .catch(function(response) {
          utils.writeJson(res, response);
        });
  }
}

module.exports.purchaseBooksPOST = function purchaseBooksPOST(req, res, next) {
    var userId = req.session.id;
    if (!req.session || !req.session.loggedin) {
      utils.writeJson(res, {
        error: "sorry, you must be authorized"
      }, 404);
    } else {
        CartService.purchaseBooks(userId)
          .then(function(response) {
              utils.writeJson(res, result);
          })
          .catch(function(response) {
            utils.writeJson(res, response);
          });
    }
}

const calcTotalOfCart = function(books) {
    // TODO: figure out the currency of the total from books
    var total = { 'currency': 'eur', 'value' : 0, 'items': 0};
    var sum = 0.0;
    var items = 0;
    books.forEach(book => {
        var quantity = parseInt(book.quantity)
        sum += parseFloat(book.price.value) * quantity;
        items += quantity;
    });
    total.value = sum.toFixed(2);
    total.items = items;
    return total;
}
