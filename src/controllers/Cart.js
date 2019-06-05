'use strict';

var utils = require("../utils/writer.js");
var CartService = require("../service/CartService");

module.exports.cartCartIdGET = function cartCartIdGET(req, res, next) {
  var cartId = req.swagger.params["cartId"].value;
  if (!req.session || !req.session.loggedin) {
    utils.writeJson(res, {
      error: "sorry, you must be authorized"
    }, 404);
  } else {
      CartService.getBookIDs(cartId)
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
  if (!req.session || !req.session.loggedin) {
    utils.writeJson(res, {
      error: "sorry, you must be authorized"
    }, 404);
  } else {

  }
}

const calcTotalOfCart = function(books) {
    var total = { 'currency': 'eur', 'value' : 0};
    var sum = 0.0;
    books.forEach(book => {
        sum += parseFloat(book.price.value);
    });
    total.value = sum.toFixed(2);
    return total;
}
