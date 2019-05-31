'use strict';

var utils = require("../utils/writer.js");
var Cart = require("../service/CartService");

module.exports.cartCartIdGET = function cartCartIdGET(req, res, next) {
  var cartId = req.swagger.params["cartId"].value;
  if (!req.session || !req.session.loggedin) {
    utils.writeJson(res, { error: "sorry, you must be authorized" }, 404);
  } else {
    Cart.getCartById(cartId)
      .then(function(response) {
          var cart = response[0];
          Cart.getBookIDs(cartId)
          .then(function(response){
              var result = {};
              result['total'] = {
                  "currency": cart.currency,
                  "value": cart.value
              };
              // console.log(response);
              result["books"] = response;

              utils.writeJson(res, result);
          })
          .catch(function(response) {
            utils.writeJson(res, response);
          });

      })
      .catch(function(response) {
        utils.writeJson(res, response);
      });
  }
};

module.exports.addBookPOST = function addBookPOST(req, res, next) {
    var bookId = req.swagger.params["bookId"].value;
    var userId = req.swagger.params["userId"].value;
    // TODO: can we get the userId from session?
    if (!req.session || !req.session.loggedin) {
        utils.writeJson(res, { error: "sorry, you must be authorized" }, 404);
    } else {

    }
}
